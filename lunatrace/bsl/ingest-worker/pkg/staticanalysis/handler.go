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
package staticanalysis

import (
	"context"
	"encoding/json"

	"github.com/Khan/genqlient/graphql"
	"github.com/rs/zerolog/log"
	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/queuefx"
)

type QueueRecord struct {
	VulnerabilityID          string `json:"vulnerability_id"`
	ManifestDependencyEdgeId string `json:"manifest_dependency_edge_id"`
	SaveResults              bool   `json:"save_results"`
}

type Params struct {
	fx.In

	Ingester        metadata.PackageIngester
	GQLClient       graphql.Client
	PackageRegistry metadata.NpmRegistry
}

type staticAnalysisQueueHandler struct {
	Params
}

func NewStaticAnalysisQueueHandler(p Params) queuefx.HandlerResult {
	return queuefx.HandlerResult{
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

	return s.handleManifestDependencyEdgeAnalysis(ctx, queueRecord)
}
