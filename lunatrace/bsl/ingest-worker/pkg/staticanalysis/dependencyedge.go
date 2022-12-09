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
	"errors"
	"gocloud.dev/blob"
	"io"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/google/uuid"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	_ "gocloud.dev/blob/s3blob"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/staticanalysis/rules"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/util"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/gql"
)

func validateGetManifestDependencyEdgeResponse(logger zerolog.Logger, resp *gql.GetManifestDependencyEdgeResponse) error {
	if resp.Manifest_dependency_edge_by_pk == nil {
		logger.Warn().
			Msg("manifest dependency edge is nil")
		return errors.New("manifest dependency edge nil")
	}

	if resp.Manifest_dependency_edge_by_pk.Child == nil {
		logger.Warn().
			Interface("manifest dependency edge", resp.Manifest_dependency_edge_by_pk).
			Msg("child dependency is nil")
		return errors.New("child dependency is nil")
	}

	if resp.Manifest_dependency_edge_by_pk.Parent == nil {
		logger.Warn().
			Interface("manifest dependency edge", resp.Manifest_dependency_edge_by_pk).
			Msg("parent dependency is nil")
		return errors.New("child dependency is nil")
	}

	if resp.Manifest_dependency_edge_by_pk.Parent.Release == nil {
		logger.Warn().
			Interface("manifest dependency edge", resp.Manifest_dependency_edge_by_pk).
			Msg("parent dependency release is nil")
		return errors.New("parent dependency release is nil")
	}
	return nil
}

func getManifestDependencyEdgeLocations(output *rules.SemgrepRuleOutput) *gql.Analysis_manifest_dependency_edge_result_location_arr_rel_insert_input {
	if len(output.Results) == 0 {
		return nil
	}

	var locations []*gql.Analysis_manifest_dependency_edge_result_location_insert_input
	for _, result := range output.Results {
		locations = append(locations, &gql.Analysis_manifest_dependency_edge_result_location_insert_input{
			End_column:   util.Ptr(int(result.End.Col)),
			End_row:      util.Ptr(int(result.End.Line)),
			Path:         util.Ptr(result.Path),
			Start_column: util.Ptr(int(result.Start.Col)),
			Start_row:    util.Ptr(int(result.Start.Line)),
		})
	}

	return &gql.Analysis_manifest_dependency_edge_result_location_arr_rel_insert_input{
		Data: locations,
	}
}

func (s *staticAnalysisQueueHandler) handleManifestDependencyEdgeAnalysis(ctx context.Context, queueRecord QueueRecord) error {
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

	logger := log.With().
		Str("manifest dependency edge", queueRecord.ManifestDependencyEdgeId).
		Str("vulnerability id", queueRecord.VulnerabilityID).
		Logger()

	resp, err := s.getManifestDependencyEdge(ctx, manifestDependencyEdgeUUID)
	if err != nil {
		return err
	}

	err = validateGetManifestDependencyEdgeResponse(logger, resp)
	if err != nil {
		logger.Warn().
			Err(err).
			Msg("failed to validate manifest dependency edge")
		return nil
	}

	childPackageName := resp.Manifest_dependency_edge_by_pk.Child.Release.Package.Name

	parentPackageName := resp.Manifest_dependency_edge_by_pk.Parent.Release.Package.Name
	upstreamBlobUrl := resp.Manifest_dependency_edge_by_pk.Parent.Release.Upstream_blob_url

	// use the mirroredBlobUrl if we have it
	mirroredBlobUrl := resp.Manifest_dependency_edge_by_pk.Parent.Release.Mirrored_blob_url
	if mirroredBlobUrl != nil {
		upstreamBlobUrl = mirroredBlobUrl
	}

	logger = logger.With().
		Str("parent package", parentPackageName).
		Str("child package", childPackageName).
		Logger()

	findingType, results := s.runSemgrepRuleOnParentPackage(ctx, logger, upstreamBlobUrl, manifestDependencyEdgeUUID, parentPackageName, childPackageName)

	if queueRecord.SaveResults {
		logger.Info().Msg("saving results")
		err = s.saveResults(ctx, results, findingType, manifestDependencyEdgeUUID, vulnerabilityUUID)
		if err != nil {
			return err
		}
	} else {
		logger.Info().Msg("skipped saving results")
	}

	return nil
}

func (s *staticAnalysisQueueHandler) saveResults(ctx context.Context, results *rules.SemgrepRuleOutput, findingType gql.Analysis_finding_type_enum, manifestDependencyEdgeUUID uuid.UUID, vulnerabilityUUID uuid.UUID) error {
	logger := log.With().
		Str("mde", manifestDependencyEdgeUUID.String()).
		Str("vuln", vulnerabilityUUID.String()).
		Logger()
	var locations *gql.Analysis_manifest_dependency_edge_result_location_arr_rel_insert_input
	if results != nil {
		locations = getManifestDependencyEdgeLocations(results)
	}

	log.Info().
		Str("finding type", string(findingType)).
		Interface("locations", locations).
		Msg("saving results of analysis")

	result := &gql.Analysis_manifest_dependency_edge_result_insert_input{
		Finding_source:              util.Ptr(gql.Analysis_finding_source_enumSemgrepImportedCalled),
		Finding_type:                util.Ptr(findingType),
		Finding_source_version:      util.Ptr(rules.ImportedAndCalledRuleVersion),
		Manifest_dependency_edge_id: util.Ptr(manifestDependencyEdgeUUID),
		Vulnerability_id:            util.Ptr(vulnerabilityUUID),
		Locations:                   locations,
	}

	analysisResp, err := gql.InsertManifestDependencyEdgeAnalysis(ctx, s.GQLClient, result)
	if err != nil {
		util.LogGraphqlError(logger, "failed to insert edge analysis", err)
		return err
	}

	insertedAnalysisID := analysisResp.GetInsert_analysis_manifest_dependency_edge_result_one().GetId().String()

	logger.Info().
		Str("results id", insertedAnalysisID).
		Msg("inserted edge analysis results")
	return nil
}

func (s *staticAnalysisQueueHandler) getManifestDependencyEdge(ctx context.Context, manifestDependencyEdgeUUID uuid.UUID) (*gql.GetManifestDependencyEdgeResponse, error) {
	logger := log.With().
		Str("manifest dependency edge", manifestDependencyEdgeUUID.String()).
		Logger()

	resp, err := gql.GetManifestDependencyEdge(ctx, s.GQLClient, manifestDependencyEdgeUUID)
	if err != nil {
		util.LogGraphqlError(logger, "failed to get manifest dependency edge", err)
		return nil, err
	}
	return resp, nil
}

func (s *staticAnalysisQueueHandler) getUpstreamUrlForPackage(ctx context.Context, logger zerolog.Logger, manifestDependencyEdgeUUID uuid.UUID, packageName string) (string, error) {
	logger = logger.With().Str("package name", packageName).Logger()

	logger.Info().
		Msg("querying package metadata")

	packageMeta, err := s.PackageRegistry.GetPackageMetadata(packageName)
	if err != nil {
		logger.Error().
			Err(err).
			Msg("failed to get package metadata")
		return "", err
	}

	logger.Info().
		Msg("queried package metadata")

	resp, err := s.getManifestDependencyEdge(ctx, manifestDependencyEdgeUUID)
	if err != nil {
		return "", err
	}

	parentVersion := resp.Manifest_dependency_edge_by_pk.Parent.Release.Version

	for _, release := range packageMeta.Releases {
		if release.Version == parentVersion {
			return release.UpstreamBlobUrl, nil
		}
	}
	return "", errors.New("unable to find upstream blob url for package")

	/*
		TODO (cthompson) we should be able to get the `Upstream_blob_url` from this data, but since ingestion
		is too slow atm, we are skipping the ingestion (in case the package doesn't exist) and just processing the package metadata.

		// TODO (cthompson) put this on a queue?
		_, err := s.Ingester.IngestWithoutRefetch(ctx, packageName, time.Hour*24)
		if err != nil {
			log.Error().
				Err(err).
				Str("package name", packageName).
				Msg("failed to ingest package")
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
	*/
}

func getCodeBlobStream(ctx context.Context, logger zerolog.Logger, resolvedBlobUrl string, parsedResolvedBlobUrl *url.URL) (io.ReadCloser, error) {
	var codeBlobStream io.ReadCloser

	if strings.Contains(parsedResolvedBlobUrl.Host, ".s3.") {
		b, err := blob.OpenBucket(ctx, "s3://"+strings.Split(parsedResolvedBlobUrl.Host, ".")[0])
		if err != nil {
			logger.Error().
				Err(err).
				Msg("failed to open bucket from s3")
			return nil, err
		}

		codeBlobStream, err = b.NewReader(ctx, parsedResolvedBlobUrl.Path, nil)
		if err != nil {
			logger.Error().
				Err(err).
				Msg("failed to open package blob from s3")
			return nil, err
		}
	} else {
		upstreamUrlResp, err := http.Get(resolvedBlobUrl)
		if err != nil {
			logger.Error().
				Err(err).
				Msg("failed to download resolved blob url")
			return nil, err
		}
		codeBlobStream = upstreamUrlResp.Body
	}
	return codeBlobStream, nil
}

func (s *staticAnalysisQueueHandler) runSemgrepRuleOnParentPackage(
	ctx context.Context,
	logger zerolog.Logger,
	upstreamBlobUrl *string,
	manifestDependencyEdgeUUID uuid.UUID,
	parentPackageName, childPackageName string,
) (gql.Analysis_finding_type_enum, *rules.SemgrepRuleOutput) {
	var err error

	var resolvedBlobUrl string
	if upstreamBlobUrl == nil {
		resolvedBlobUrl, err = s.getUpstreamUrlForPackage(ctx, logger, manifestDependencyEdgeUUID, parentPackageName)
		if err != nil {
			logger.Error().
				Err(err).
				Msg("failed to determine upstream blob url")
			return gql.Analysis_finding_type_enumError, nil
		}
	} else {
		resolvedBlobUrl = *upstreamBlobUrl
	}

	logger.Info().
		Msg("statically analyzing parent child relationship")

	// todo s3 creds?

	parsedResolvedBlobUrl, err := url.Parse(resolvedBlobUrl)
	if err != nil {
		logger.Error().
			Err(err).
			Msg("failed to parse upstream blob url")
		return gql.Analysis_finding_type_enumError, nil
	}

	codeBlobStream, err := getCodeBlobStream(ctx, logger, resolvedBlobUrl, parsedResolvedBlobUrl)
	if err != nil {
		logger.Error().
			Err(err).
			Msg("failed to open package code")
		return gql.Analysis_finding_type_enumError, nil
	}
	defer codeBlobStream.Close()

	tmpDir, err := os.MkdirTemp("", "")
	if err != nil {
		logger.Error().
			Err(err).
			Msg("failed to create temporary directory for parent package code")
		return gql.Analysis_finding_type_enumError, nil
	}
	defer os.RemoveAll(tmpDir)

	logger.Info().
		Str("tmp dir", tmpDir).
		Msg("extracting package code")

	err = util.ExtractTarGz(codeBlobStream, tmpDir)
	if err != nil {
		logger.Error().
			Err(err).
			Msg("failed to extract parent package code to directory")
		return gql.Analysis_finding_type_enumError, nil
	}

	logger.Info().
		Msg("analyzing code for usages of child in parent")

	results, err := rules.AnalyzeCodeForImportingAndCallingPackage(tmpDir, childPackageName)
	if err != nil {
		logger.Error().
			Err(err).
			Msg("failed to determine if child is imported and called by parent")
		return gql.Analysis_finding_type_enumError, nil
	}

	// we can only say that we definitely know that a vulnerability is not reachable, otherwise we can't
	// say for certain if a vulnerability exists or not
	if len(results.Results) > 0 {
		return gql.Analysis_finding_type_enumUnknown, results
	}
	return gql.Analysis_finding_type_enumNotVulnerable, results
}
