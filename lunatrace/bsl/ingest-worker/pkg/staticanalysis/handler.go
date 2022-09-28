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
//
package staticanalysis

import (
	"context"
	"encoding/json"
	"github.com/Khan/genqlient/graphql"
	"github.com/google/uuid"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/queue"
	"github.com/lunasec-io/lunasec/lunatrace/cli/gql"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/util"
	"github.com/rs/zerolog/log"
	"go.uber.org/fx"
)

type QueueRecord struct {
	VulnerabilityID  string `json:"vulnerability_id"`
	PackageReleaseID string `json:"package_release_id"`
}

type Params struct {
	fx.In

	Ingester  metadata.Ingester
	GQLClient graphql.Client
}

type staticAnalysisQueueHandler struct {
	Params
}

func NewStaticAnalysisQueueHandler(p Params) queue.HandlerResult {
	return queue.HandlerResult{
		Handler: &staticAnalysisQueueHandler{
			Params: p,
		},
	}
}

func (s *staticAnalysisQueueHandler) GetHandlerKey() string {
	return "static-analysis"
}

func (s *staticAnalysisQueueHandler) HandleRecord(ctx context.Context, record json.RawMessage) error {
	var queueRecord QueueRecord
	err := json.Unmarshal(record, &queueRecord)
	if err != nil {
		log.Error().Err(err).Msg("failed to unmarshal static analysis record")
		return err
	}

	packageReleaseUUID, err := uuid.Parse(queueRecord.PackageReleaseID)
	if err != nil {
		log.Error().
			Err(err).
			Str("package release id", queueRecord.PackageReleaseID).
			Msg("failed to parse package release id as uuid")
		return err
	}

	resp, err := gql.GetPackageRelease(ctx, s.GQLClient, packageReleaseUUID)
	if err != nil {
		util.LogGraphqlError(
			err,
			"failed to get package release",
			util.GraphqlLogContext{
				Key:   "package release id",
				Value: queueRecord.PackageReleaseID,
			},
		)

	}

	if resp.Package_release_by_pk.Upstream_blob_url != nil {
		s.Ingester.IngestPackageAndDependencies(ctx)
	}

	s.Ingester.IngestPackageAndDependencies()
	return nil
}
