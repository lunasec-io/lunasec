package replicator

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"github.com/Khan/genqlient/graphql"
	"github.com/cenkalti/backoff/v4"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/util"
	"github.com/lunasec-io/lunasec/lunatrace/cli/gql"
	"github.com/rs/zerolog/log"
	"github.com/schollz/progressbar/v3"
	"go.uber.org/fx"
	"net/http"
	"strings"
)

const (
	batchSize = 1000
)

type npmReplicatorDeps struct {
	fx.In
	Client    *http.Client
	GQLClient graphql.Client
}

type npmReplicator struct {
	deps npmReplicatorDeps
}

type AllDocsReqMeta struct {
	TotalRows int `json:"total_rows"`
	Offset    int `json:"offset"`
}

type AllDocsReqRev struct {
	Rev string `json:"rev"`
}

type AllDocsReqItem struct {
	Id    string        `json:"id"`
	Key   string        `json:"key"`
	Value AllDocsReqRev `json:"value"`
}

type ChangesReqChange struct {
	Rev string `json:"rev"`
}

type ChangesReqItem struct {
	Seq     string             `json:"seq"`
	Id      string             `json:"id"`
	Changes []ChangesReqChange `json:"changes"`
	Deleted bool               `json:"deleted"`
	Doc     json.RawMessage    `json:"doc"`
}

type Job struct {
	Offset int
	Size   int
}

func (n *npmReplicator) allDocsRequest(ctx context.Context, offset, limit int) (scanner *bufio.Scanner, cleanup func(), err error) {
	url := fmt.Sprintf("https://replicate.npmjs.com/_all_docs?skip=%d&limit=%d", offset, limit)

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
	return
}

func (n *npmReplicator) changesRequest(ctx context.Context, since int) (scanner *bufio.Scanner, cleanup func(), err error) {
	url := fmt.Sprintf("https://replicate.npmjs.com/_changes?skip=%d", since)

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
	return
}

func (n *npmReplicator) getDocCount(ctx context.Context) (int, error) {
	scanner, cleanup, err := n.allDocsRequest(ctx, 0, 1)
	if err != nil {
		return 0, err
	}
	defer cleanup()

	scanner.Scan()
	line := scanner.Text()
	if !strings.HasPrefix(line, "{\"total_rows\":") {
		return 0, fmt.Errorf("failed to parse total row line: %s", line)
	}

	line = strings.ReplaceAll(line, ",\"rows\":[", "}")

	var meta AllDocsReqMeta
	err = json.Unmarshal([]byte(line), &meta)
	if err != nil {
		log.Error().
			Err(err).
			Msg("failed to unmarshal all all docs meta")
		return 0, err
	}
	return meta.TotalRows, nil
}

func (n *npmReplicator) replicateFromOffset(ctx context.Context, offset, size int) error {
	var latestRevisions []*gql.Npm_latest_revision_insert_input

	scanner, cleanup, err := n.allDocsRequest(ctx, offset, size)
	if err != nil {
		return err
	}
	defer cleanup()

	totalCount := 0

	bar := progressbar.Default(int64(size), "replicating...")

	for scanner.Scan() {
		line := scanner.Text()

		if strings.HasPrefix(line, "{\"total_rows\":") {
			continue
		}

		formattedLine := line[:len(line)-1]

		var item AllDocsReqItem
		err = json.Unmarshal([]byte(formattedLine), &item)
		if err != nil {
			log.Warn().
				Err(err).
				Str("line", line).
				Msg("failed to unmarshal all latestRevisions item")
			continue
		}

		latestRevision := &gql.Npm_latest_revision_insert_input{
			Id: util.Ptr(item.Id),
			Revision: &gql.Npm_revision_obj_rel_insert_input{
				Data: &gql.Npm_revision_insert_input{
					Id:  util.Ptr(item.Id),
					Rev: util.Ptr(item.Value.Rev),
					Seq: nil,
				},
				On_conflict: &gql.Npm_revision_on_conflict{
					Constraint:     gql.Npm_revision_constraintRevisionPkey,
					Update_columns: []gql.Npm_revision_update_column{gql.Npm_revision_update_columnRev},
				},
			},
		}

		bar.Add(1)
		latestRevisions = append(latestRevisions, latestRevision)

		if len(latestRevisions)%batchSize == 0 {
			_, err := gql.InsertLatestRevisions(ctx, n.deps.GQLClient, latestRevisions)
			if err != nil {
				util.LogGraphqlError(err, "failed to insert latest revisions")
				return err
			}

			totalCount += len(latestRevisions)
			latestRevisions = []*gql.Npm_latest_revision_insert_input{}
		}
	}

	if err = scanner.Err(); err != nil {
		return err
	}

	return nil
}

func (n *npmReplicator) replicateChangesSince(ctx context.Context, since int) error {
	var latestRevisions []*gql.Npm_latest_revision_insert_input

	scanner, cleanup, err := n.changesRequest(ctx, since)
	if err != nil {
		return err
	}
	defer cleanup()

	totalCount := 0

	for scanner.Scan() {
		line := scanner.Text()

		var item ChangesReqItem
		err = json.Unmarshal([]byte(line), &item)
		if err != nil {
			log.Warn().
				Err(err).
				Str("line", line).
				Msg("failed to unmarshal changes item")
			continue
		}

		latestRevision := &gql.Npm_latest_revision_insert_input{
			Id: util.Ptr(item.Id),
			Revision: &gql.Npm_revision_obj_rel_insert_input{
				Data: &gql.Npm_revision_insert_input{
					Id:  util.Ptr(item.Id),
					Rev: util.Ptr(item.Value.Rev),
					Seq: nil,
				},
				On_conflict: &gql.Npm_revision_on_conflict{
					Constraint:     gql.Npm_revision_constraintRevisionPkey,
					Update_columns: []gql.Npm_revision_update_column{gql.Npm_revision_update_columnRev},
				},
			},
		}

		latestRevisions = append(latestRevisions, latestRevision)

		if len(latestRevisions)%batchSize == 0 {
			_, err := gql.InsertLatestRevisions(ctx, n.deps.GQLClient, latestRevisions)
			if err != nil {
				util.LogGraphqlError(err, "failed to insert latest revisions")
				return err
			}

			totalCount += len(latestRevisions)
			latestRevisions = []*gql.Npm_latest_revision_insert_input{}
		}
	}

	if err = scanner.Err(); err != nil {
		return err
	}

	return nil
}

func (n *npmReplicator) Replicate(ctx context.Context, offset int) error {
	totalCount, err := n.getDocCount(ctx)
	if err != nil {
		return err
	}

	replicate := func() error {
		return n.replicateFromOffset(ctx, offset, totalCount)
	}

	err = backoff.Retry(replicate, backoff.NewExponentialBackOff())
	if err != nil {
		log.Error().
			Err(err).
			Msg("failed to replicate from offset")
	}
	return nil
}

func (n *npmReplicator) ReplicateChanges(ctx context.Context, since int) error {
	return nil
}

func NewNPMReplicator(d npmReplicatorDeps) metadata.Replicator {
	return &npmReplicator{deps: d}
}
