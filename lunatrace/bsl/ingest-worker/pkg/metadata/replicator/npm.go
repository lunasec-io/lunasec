package replicator

import (
	"bufio"
	"bytes"
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/cenkalti/backoff/v4"
	"github.com/gosuri/uilive"
	"github.com/lib/pq"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
	"github.com/rs/zerolog/log"
	"go.uber.org/fx"
	"net/http"
)

const (
	batchSize = 100
)

type npmReplicatorDeps struct {
	fx.In
	Client *http.Client
	DB     *sql.DB
}

type npmReplicator struct {
	deps npmReplicatorDeps
}

type ChangesReqChange struct {
	Rev string `json:"rev"`
}

type ChangesReqItem struct {
	Seq     int                `json:"seq"`
	Id      string             `json:"id"`
	Changes []ChangesReqChange `json:"changes"`
	Deleted bool               `json:"deleted"`
	Doc     json.RawMessage    `json:"doc"`
}

func (n *npmReplicator) changesRequest(ctx context.Context, since int) (scanner *bufio.Scanner, cleanup func(), err error) {
	url := fmt.Sprintf("https://replicate.npmjs.com/_changes?feed=continuously&style=main_only&include_docs=true&since=%d", since)

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		log.Error().Err(err).Msg("failed to build request for all docs")
		return
	}
	res, err := n.deps.Client.Do(req)
	if err != nil {
		log.Error().Err(err).Msg("failed to request all docs")
		return
	}
	cleanup = func() {
		res.Body.Close()
	}

	scanner = bufio.NewScanner(res.Body)
	// we have some big package jsons in here...
	const maxCapacity = 200 * 1024 * 1024
	buf := make([]byte, maxCapacity)
	scanner.Buffer(buf, maxCapacity)

	return
}

func (n *npmReplicator) bulkInsertChanges(revisions []ChangesReqItem) error {
	txn, err := n.deps.DB.Begin()
	if err != nil {
		return err
	}

	stmt, err := txn.Prepare(pq.CopyInSchema("npm", "revision", "seq", "id", "rev", "doc", "deleted"))
	if err != nil {
		return err
	}

	for _, item := range revisions {
		if len(item.Changes) == 0 {
			log.Warn().
				Err(err).
				Interface("item", item).
				Msg("no revision for change event")
			continue
		}
		rev := item.Changes[0].Rev

		_, err = stmt.Exec(item.Seq, item.Id, rev, string(item.Doc), item.Deleted)
		if err != nil {
			log.Error().Err(err).Str("doc", string(item.Doc)).Msg("failed to prepare insert row")
			return err
		}
	}

	_, err = stmt.Exec()
	if err != nil {
		switch t := err.(type) {
		case *pq.Error:
			log.Error().
				Err(err).
				Str("where", t.Where).
				Str("detail", t.Detail).
				Interface("revisions", revisions).
				Msg("failed to insert row")
		}
		return err
	}

	err = stmt.Close()
	if err != nil {
		return err
	}

	err = txn.Commit()
	if err != nil {
		return err
	}
	return nil
}

func (n *npmReplicator) replicateChangesSince(ctx context.Context, since int) error {
	var revisions []ChangesReqItem

	scanner, cleanup, err := n.changesRequest(ctx, since)
	if err != nil {
		return err
	}
	defer cleanup()

	writer := uilive.New()
	writer.Start()
	defer writer.Stop()

	totalCount := 0

	for scanner.Scan() {
		line := scanner.Text()

		// TODO (cthompson) anything larger and it kind of tanks performance, we should figure out how to handle these better
		if len(line) > 30*1024*1024 {
			continue
		}

		if line == "{\"results\":[" {
			continue
		}

		// remove the comma at the end of the line
		// line: "{\"seq\":2494937,\"id\":\"total-conquest-hacks-mod-apk\",\"changes\":[{\"rev\":\"3-bf5afc3ae04ef6a5f5609adf715e0663\"}],\"deleted\":true},"
		line = line[:len(line)-1]

		var item ChangesReqItem
		err = json.Unmarshal([]byte(line), &item)
		if err != nil {
			log.Warn().
				Err(err).
				Str("line", line).
				Msg("failed to unmarshal changes item")
			continue
		}

		// remove double null bytes
		item.Doc = bytes.ReplaceAll(item.Doc, []byte(`\u0000`), []byte{})

		revisions = append(revisions, item)
		totalCount += 1

		if len(revisions)%batchSize == 0 {
			err = n.bulkInsertChanges(revisions)
			if err != nil {
				log.Error().Err(err).Msg("failed to insert revisions")
				return err
			}
			revisions = []ChangesReqItem{}
		}

		_, err = fmt.Fprintf(writer, "replicating... %d\n", totalCount)
		if err != nil {
			log.Error().Err(err).Msg("failed to print status")
			return err
		}
	}

	if err = scanner.Err(); err != nil {
		log.Error().Err(err).Msg("error while scanning changes")
		return err
	}

	return nil
}

func (n *npmReplicator) Replicate(ctx context.Context) error {
	replicate := func() error {
		log.Info().Msg("determining last replicated sequence item")

		row := n.deps.DB.QueryRow(`SELECT COALESCE(MAX(seq), 0) FROM npm.revision`)

		var seq int
		err := row.Scan(&seq)
		if err != nil {
			log.Error().Err(err).Msg("failed to determine last sequence item")
			return err
		}

		log.Info().Int("since", seq).Msg("replicating changes from npm from last sequence")
		return n.replicateChangesSince(ctx, seq)
	}

	err := backoff.Retry(replicate, backoff.NewExponentialBackOff())
	if err != nil {
		log.Error().
			Err(err).
			Msg("failed to replicate from offset")
	}
	return nil
}

func NewNPMReplicator(d npmReplicatorDeps) metadata.Replicator {
	return &npmReplicator{deps: d}
}
