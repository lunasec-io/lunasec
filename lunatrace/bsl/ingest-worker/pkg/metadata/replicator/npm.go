// Copyright by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Business Source License v1.1
// (the "License"); you may not use this file except in compliance with the
// License. You may obtain a copy of the License at
//
// https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
//
// See the License for the specific language governing permissions and
// limitations under the License.
package replicator

import (
	"bufio"
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/cenkalti/backoff/v4"
	"github.com/lib/pq"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/util"
	"github.com/rs/zerolog/log"
	"github.com/samber/lo"
	"go.uber.org/fx"
	"net/http"
	url2 "net/url"
	"strings"
	"time"
)

const (
	batchSize      = 100
	revisionUpsert = `
INSERT INTO npm.revision (seq, id, rev, doc, deleted)
VALUES %s
ON CONFLICT (seq)
DO UPDATE SET id = EXCLUDED.id, rev = EXCLUDED.rev, doc = EXCLUDED.doc, deleted = EXCLUDED.deleted
`
)

type npmReplicatorDeps struct {
	fx.In
	Client          *http.Client
	DB              *sql.DB
	PackageIngester metadata.PackageIngester
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

func (n *npmReplicator) changesRequest(ctx context.Context, since int, descending bool) (scanner *bufio.Scanner, cleanup func(), err error) {
	changesUrl, err := url2.Parse("https://replicate.npmjs.com/_changes")
	if err != nil {
		return nil, nil, err
	}

	values := changesUrl.Query()
	values.Add("feed", "continuous")
	values.Add("style", "main_only")
	values.Add("include_docs", "true")
	values.Add("descending", fmt.Sprintf("%v", descending))

	if since != -1 {
		values.Add("since", fmt.Sprintf("%d", since))
	}

	changesUrl.RawQuery = values.Encode()

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, changesUrl.String(), nil)
	if err != nil {
		log.Error().Err(err).Msg("failed to build request for all docs")
		return
	}

	client := http.Client{}

	res, err := client.Do(req)
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
	var (
		preparedInsertRows []string
		insertValues       []interface{}
	)

	revisionIds := lo.Map(revisions, func(revision ChangesReqItem, _ int) int { return revision.Seq })

	// TODO (cthompson) replace with Jet syntax
	for rowIdx, item := range revisions {
		if len(item.Changes) == 0 {
			log.Warn().
				Interface("item", item).
				Msg("no revision for change event")
			continue
		}
		rev := item.Changes[0].Rev

		numberOfColumns := 5
		var insertFormatNums []string
		for columnIdx := 0; columnIdx < numberOfColumns; columnIdx += 1 {
			insertFormatNums = append(insertFormatNums, fmt.Sprintf("$%d", (rowIdx*numberOfColumns)+columnIdx+1))
		}
		insertRowFormat := fmt.Sprintf("(%s)", strings.Join(insertFormatNums, ", "))

		preparedInsertRows = append(preparedInsertRows, insertRowFormat)
		insertValues = append(insertValues, item.Seq, item.Id, rev, string(item.Doc), item.Deleted)
	}

	stmt := fmt.Sprintf(
		revisionUpsert,
		strings.Join(preparedInsertRows, ","),
	)
	_, err := n.deps.DB.Exec(stmt, insertValues...)
	if err != nil {
		switch t := err.(type) {
		case *pq.Error:
			log.Error().
				Err(err).
				Str("stmt", stmt).
				Str("where", t.Where).
				Str("detail", t.Detail).
				Interface("revisions", revisionIds).
				Msg("failed to insert row")
		}
		return err
	}
	return nil
}

func (n *npmReplicator) replicateChangesSince(ctx context.Context, since, lastSeq int, replicatedPackages chan<- string) (int, error) {
	var revisions []ChangesReqItem

	log.Info().
		Int("since", since).
		Msg("replicating changes starting at seq")

	scanner, cleanup, err := n.changesRequest(ctx, since, false)
	if err != nil {
		return since, err
	}
	defer cleanup()

	totalCount := 0
	timeCheckpoint := time.Now()
	lastKnownSeq := 0

	for scanner.Scan() {
		line := scanner.Text()

		// TODO (cthompson) anything larger and it kind of tanks performance, we should figure out how to handle these better
		if len(line) > 30*1024*1024 {
			continue
		}

		var item ChangesReqItem
		err = json.Unmarshal([]byte(line), &item)
		if err != nil {
			log.Warn().
				Err(err).
				Str("line", line).
				Msg("failed to unmarshal changes item")
			continue
		}
		lastKnownSeq = item.Seq

		if lastSeq != 0 && lastSeq == item.Seq {
			log.Info().
				Int("seq", item.Seq).
				Msg("completed replication job to lastSeq")
			return 0, nil
		}

		// remove `\u0000` from doc
		item.Doc = util.SanitizeNullEscapes(item.Doc)

		revisions = append(revisions, item)

		if len(revisions)%batchSize == 0 {
			log.Info().
				Dur("delta", time.Now().Sub(timeCheckpoint)).
				Int("total count", totalCount).
				Int("target count", since+lastSeq).
				Int("seq", item.Seq).
				Msg("replication status")
			timeCheckpoint = time.Now()
			totalCount += len(revisions)

			err = n.bulkInsertChanges(revisions)
			if err != nil {
				log.Error().Err(err).Msg("failed to insert revisions")
				return item.Seq, err
			}
			// once revisions have been upserted, queue the package to be ingested
			for _, rev := range revisions {
				if !rev.Deleted {
					replicatedPackages <- rev.Id
				}
			}

			revisions = []ChangesReqItem{}
		}
	}

	if err = scanner.Err(); err != nil {
		log.Error().Err(err).Msg("error while scanning changes")
		return lastKnownSeq, err
	}

	return lastKnownSeq, nil
}

func (n *npmReplicator) getLastSequenceFromChangeStream(ctx context.Context) (int, error) {
	scanner, cleanup, err := n.changesRequest(ctx, -1, true)
	if err != nil {
		return 0, err
	}
	defer cleanup()

	if !scanner.Scan() {
		err = errors.New("unable to read line to get current number of events")
		log.Error().
			Err(err).
			Msg("failed to unmarshal changes item")
		return 0, err
	}

	line := scanner.Text()

	var item ChangesReqItem
	err = json.Unmarshal([]byte(line), &item)
	if err != nil {
		log.Error().
			Err(err).
			Str("line", line).
			Msg("failed to unmarshal changes item")
		return 0, err
	}

	return item.Seq, nil
}

func (n *npmReplicator) GetLastReplicatedOffset() (int, error) {
	log.Info().Msg("determining last replicated sequence item")

	row := n.deps.DB.QueryRow(`SELECT COALESCE(MAX(seq), 0) FROM npm.revision`)

	var seq int
	err := row.Scan(&seq)
	if err != nil {
		log.Error().Err(err).Msg("failed to determine last sequence item")
		return 0, err
	}

	return seq, nil
}

type replicatorJob struct {
	startSeq int
	size     int
}

func (n *npmReplicator) replicationWorker(ctx context.Context, job replicatorJob, errors chan<- error, replicatedPackages chan<- string) {
	errors <- n.replicateChunk(ctx, job.startSeq, job.size, replicatedPackages)
}

func (n *npmReplicator) replicateToKnownSequence(ctx context.Context, endSeq int, replicatedPackages chan<- string) error {
	workerCount := 10
	workerJobChunkSize := endSeq / workerCount

	errorChan := make(chan error, workerCount)

	for w := 0; w < workerCount; w++ {
		job := replicatorJob{
			startSeq: w * workerJobChunkSize,
			size:     workerJobChunkSize,
		}
		go n.replicationWorker(ctx, job, errorChan, replicatedPackages)
	}

	errs := ""
	for err := range errorChan {
		if err != nil {
			log.Error().
				Err(err).
				Msg("worker failed to run")
			errs += err.Error()
		}
	}
	if errs != "" {
		return errors.New(errs)
	}
	return nil
}

func (n *npmReplicator) replicateChunk(ctx context.Context, seq, lastSeq int, replicatedPackages chan<- string) error {
	var (
		err          error
		lastKnownSeq int
	)

	replicate := func() error {
		// in the case that we experienced an error midway through replicating, restore the place that we left off
		if lastKnownSeq != 0 {
			seq = lastKnownSeq
		}

		lastKnownSeq, err = n.replicateChangesSince(ctx, seq, lastSeq, replicatedPackages)
		return err
	}

	expBackoff := backoff.NewExponentialBackOff()

	// This process takes a long time, make sure we have enough time in between errors
	expBackoff.MaxElapsedTime = time.Hour * 24

	err = backoff.Retry(replicate, expBackoff)
	if err != nil {
		log.Error().
			Err(err).
			Msg("failed to replicate from offset")
	}
	return nil
}

func (n *npmReplicator) ingestReplicatedPackages(ctx context.Context, replicatedPackages <-chan string) {
	for p := range replicatedPackages {
		_, err := n.deps.PackageIngester.Ingest(ctx, p)
		if err != nil {
			log.Error().
				Err(err).
				Str("package", p).
				Msg("failed to ingest package")
			continue
		}
	}
}

func (n *npmReplicator) InitialReplication(ctx context.Context) error {
	log.Info().
		Msg("initial replication of registry")

	lastSeq, err := n.getLastSequenceFromChangeStream(ctx)
	if err != nil {
		return err
	}

	replicatedPackages := make(chan string)
	defer close(replicatedPackages)

	go n.ingestReplicatedPackages(ctx, replicatedPackages)

	// try to do a fast catch-up by using a bunch of workers
	err = n.replicateToKnownSequence(ctx, lastSeq, replicatedPackages)
	if err != nil {
		return err
	}
	return nil
}

func (n *npmReplicator) ReplicateSince(ctx context.Context, since int) error {
	replicatedPackages := make(chan string)
	defer close(replicatedPackages)

	go n.ingestReplicatedPackages(ctx, replicatedPackages)

	for {
		log.Info().
			Int("since", since).
			Msg("starting to replicate registry")

		err := n.replicateChunk(ctx, since, 0, replicatedPackages)
		if err != nil {
			log.Warn().
				Err(err).
				Msg("error while replicating")
		}
		time.Sleep(time.Minute)
	}
}

func NewNPMReplicator(d npmReplicatorDeps) metadata.Replicator {
	return &npmReplicator{deps: d}
}
