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
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/queuefx"
	"github.com/lunasec-io/lunasec/lunatrace/cli/gql"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/util"
	"github.com/rs/zerolog/log"
	"go.uber.org/fx"
)

type QueueRecord struct {
	VulnerabilityID          string `json:"vulnerability_id"`
	ManifestDependencyEdgeId string `json:"manifest_dependency_edge_id"`
}

type Params struct {
	fx.In

	Ingester  metadata.Ingester
	GQLClient graphql.Client
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

func (s *staticAnalysisQueueHandler) getManifestDependencyEdge(ctx context.Context, manifestDependencyEdgeUUID uuid.UUID) (*gql.GetManifestDependencyEdgeResponse, error) {
	resp, err := gql.GetManifestDependencyEdge(ctx, s.GQLClient, manifestDependencyEdgeUUID)
	if err != nil {
		util.LogGraphqlError(
			err,
			"failed to get manifest dependency edge",
			util.GraphqlLogContext{
				Key:   "manifest dependency edge",
				Value: manifestDependencyEdgeUUID.String(),
			},
		)
		return nil, err
	}
	return resp, nil
}

func (s *staticAnalysisQueueHandler) HandleRecord(ctx context.Context, record json.RawMessage) error {
	var queueRecord QueueRecord
	err := json.Unmarshal(record, &queueRecord)
	if err != nil {
		log.Error().Err(err).Msg("failed to unmarshal static analysis record")
		return err
	}

	manifestDependencyEdgeUUID, err := uuid.Parse(queueRecord.ManifestDependencyEdgeId)
	if err != nil {
		log.Error().
			Err(err).
			Str("package release id", queueRecord.ManifestDependencyEdgeId).
			Msg("failed to parse package release id as uuid")
		return err
	}

	resp, err := s.getManifestDependencyEdge(ctx, manifestDependencyEdgeUUID)
	if err != nil {
		return err
	}

	parentPackageName := resp.Manifest_dependency_edge_by_pk.Parent.Release.Package.Name
	childPackageName := resp.Manifest_dependency_edge_by_pk.Child.Release.Package.Name

	log.Info().
		Str("parent package", parentPackageName).
		Str("child package", childPackageName).
		Msg("statically analyzing parent child relationship")

	upstreamBlobUrl := resp.Manifest_dependency_edge_by_pk.Parent.Release.Upstream_blob_url
	if upstreamBlobUrl == nil {
		_, err = s.Ingester.Ingest(ctx, parentPackageName)
		if err != nil {
			log.Error().
				Err(err).
				Str("parent package", parentPackageName).
				Msg("failed to ingest package and dependencies for package")
			return err
		}

		resp, err = s.getManifestDependencyEdge(ctx, manifestDependencyEdgeUUID)
		if err != nil {
			return err
		}

		upstreamBlobUrl = resp.Manifest_dependency_edge_by_pk.Parent.Release.Upstream_blob_url
		if upstreamBlobUrl == nil {
			log.Error().
				Err(err).
				Str("parent package", parentPackageName).
				Msg("failed to ingest package and dependencies for package")
			return err
		}
	}

	log.Info().
		Str("parent package", parentPackageName).
		Str("parent package code", *upstreamBlobUrl).
		Str("child package", childPackageName).
		Msg("statically analyzing parent's code")

	return nil
}
