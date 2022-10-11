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
	"errors"
	"github.com/Khan/genqlient/graphql"
	"github.com/google/uuid"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/queuefx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/staticanalysis/rules"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/util"
	"github.com/lunasec-io/lunasec/lunatrace/cli/gql"
	"github.com/rs/zerolog/log"
	"go.uber.org/fx"
	"net/http"
	"os"
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

func (s *staticAnalysisQueueHandler) ingestPackageAndGetUpstreamUrl(
	ctx context.Context,
	manifestDependencyEdgeUUID uuid.UUID,
	packageName string,
) (*string, error) {
	log.Info().
		Str("package name", packageName).
		Msg("ingesting package metadata")

	_, err := s.Ingester.Ingest(ctx, packageName)
	if err != nil {
		log.Error().
			Err(err).
			Str("package name", packageName).
			Msg("failed to ingest package")
		return nil, err
	}

	resp, err := s.getManifestDependencyEdge(ctx, manifestDependencyEdgeUUID)
	if err != nil {
		return nil, err
	}

	upstreamBlobUrl := resp.Manifest_dependency_edge_by_pk.Parent.Release.Upstream_blob_url
	if upstreamBlobUrl == nil {
		log.Error().
			Err(err).
			Str("parent package", packageName).
			Msg("failed to ingest package and dependencies for package")
		return nil, errors.New("failed to get upstream blob url after ingesting package")
	}
	return upstreamBlobUrl, nil
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
			Str("manifest dependency edge id", queueRecord.ManifestDependencyEdgeId).
			Msg("failed to parse package release id as uuid")
		return err
	}

	vulnerabilityUUID, err := uuid.Parse(queueRecord.VulnerabilityID)
	if err != nil {
		log.Error().
			Err(err).
			Str("vulnerability id", queueRecord.VulnerabilityID).
			Msg("failed to parse vulnerability id as uuid")
		return err
	}

	resp, err := s.getManifestDependencyEdge(ctx, manifestDependencyEdgeUUID)
	if err != nil {
		return err
	}

	if resp.Manifest_dependency_edge_by_pk == nil {
		log.Error().
			Err(err).
			Msg("manifest dependency edge is nil")
		return errors.New("manifest dependency edge nil")
	}

	if resp.Manifest_dependency_edge_by_pk.Child == nil {
		log.Error().
			Err(err).
			Interface("manifest dependency edge", resp.Manifest_dependency_edge_by_pk).
			Msg("child dependency is nil")
		return errors.New("child dependency is nil")
	}
	childPackageName := resp.Manifest_dependency_edge_by_pk.Child.Release.Package.Name

	if resp.Manifest_dependency_edge_by_pk.Parent == nil {
		log.Error().
			Err(err).
			Interface("manifest dependency edge", resp.Manifest_dependency_edge_by_pk).
			Msg("parent dependency is nil")
		return errors.New("child dependency is nil")
	}

	if resp.Manifest_dependency_edge_by_pk.Parent.Release == nil {
		log.Error().
			Err(err).
			Interface("manifest dependency edge", resp.Manifest_dependency_edge_by_pk).
			Msg("parent dependency release is nil")
		return errors.New("parent dependency release is nil")
	}

	parentPackageName := resp.Manifest_dependency_edge_by_pk.Parent.Release.Package.Name
	upstreamBlobUrl := resp.Manifest_dependency_edge_by_pk.Parent.Release.Upstream_blob_url

	if upstreamBlobUrl == nil {
		upstreamBlobUrl, err = s.ingestPackageAndGetUpstreamUrl(ctx, manifestDependencyEdgeUUID, parentPackageName)
		if err != nil {
			return err
		}
	}

	log.Info().
		Str("parent package", parentPackageName).
		Str("child package", childPackageName).
		Msg("statically analyzing parent child relationship")

	upstreamUrlResp, err := http.Get(*upstreamBlobUrl)
	if err != nil {
		log.Error().
			Err(err).
			Str("parent package", parentPackageName).
			Str("child package", childPackageName).
			Str("parent package code", *upstreamBlobUrl).
			Msg("failed to download package blob")
		return err
	}

	tmpDir, err := os.MkdirTemp("", "")
	if err != nil {
		log.Error().
			Str("parent package", parentPackageName).
			Str("child package", childPackageName).
			Err(err).
			Msg("failed to create temporary directory for parent package code")
		return err
	}
	defer os.RemoveAll(tmpDir)

	log.Info().
		Str("upstream url", *upstreamBlobUrl).
		Str("tmp dir", tmpDir).
		Msg("extracting package code")

	err = util.ExtractTarGz(upstreamUrlResp.Body, tmpDir)
	if err != nil {
		log.Error().
			Str("parent package", parentPackageName).
			Str("child package", childPackageName).
			Err(err).
			Msg("failed to extract parent package code to directory")
		return err
	}

	log.Info().
		Str("parent package", parentPackageName).
		Str("child package", childPackageName).
		Msg("analyzing code for usages of child in parent")

	importedAndCalled, err := rules.DependencyIsImportedAndCalledInCode(childPackageName, tmpDir)
	if err != nil {
		log.Error().
			Str("parent package", parentPackageName).
			Str("child package", childPackageName).
			Err(err).
			Msg("failed to determine if child is imported and called by parent")
	}

	findingType := func() gql.Analysis_finding_type_enum {
		if importedAndCalled {
			return gql.Analysis_finding_type_enumVulnerable
		}
		return gql.Analysis_finding_type_enumNotVulnerable
	}()

	log.Info().
		Str("parent package", parentPackageName).
		Str("child package", childPackageName).
		Str("finding type", string(findingType)).
		Msg("saving results of analysis")

	result := &gql.Analysis_manifest_dependency_edge_result_insert_input{
		Finding_source:              util.Ptr(gql.Analysis_finding_source_enumSemgrepImportedCalled),
		Finding_type:                util.Ptr(findingType),
		Manifest_dependency_edge_id: util.Ptr(manifestDependencyEdgeUUID),
		Vulnerability_id:            util.Ptr(vulnerabilityUUID),
	}

	analysisResp, err := gql.InsertManifestDependencyEdgeAnalysis(ctx, s.GQLClient, result)
	if err != nil {
		util.LogGraphqlError(
			err,
			"failed to insert edge analysis",
			util.GraphqlLogContext{
				Key:   "parent package",
				Value: parentPackageName,
			},
			util.GraphqlLogContext{
				Key:   "child package",
				Value: childPackageName,
			},
		)
		return err
	}

	insertedAnalysisID := analysisResp.GetInsert_analysis_manifest_dependency_edge_result_one().GetId().String()

	log.Info().
		Str("parent package", parentPackageName).
		Str("child package", childPackageName).
		Str("results id", insertedAnalysisID).
		Msg("inserted edge analysis results")

	return nil
}
