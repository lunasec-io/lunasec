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
package ingester

import (
	"context"
	"database/sql"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/gql"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/gql/types"
	"github.com/rs/zerolog/log"
	"github.com/samber/lo"
	"time"

	"github.com/Khan/genqlient/graphql"
	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/util"
)

// todo tune date
const refetchDays = 0

type Params struct {
	fx.In

	DB                 *sql.DB
	PackageSQLIngester PackageSqlIngester
	GQLClient          graphql.Client
	NPMRegistry        metadata.NpmRegistry
}

type NPMPackageIngester struct {
	deps Params
}

var npmV types.PackageManager = types.NPM

func sliceContainsPackage(packageSlice []string, packageName string) bool {
	for _, p := range packageSlice {
		if packageName == p {
			return true
		}
	}
	return false
}

func (h *NPMPackageIngester) IngestAllPackagesFromRegistry(ctx context.Context, ignoreErrors bool) error {
	log.Info().
		Msg("collecting packages from npm registry")

	packageStream, err := h.deps.NPMRegistry.PackageStream()
	if err != nil {
		log.Error().
			Err(err).
			Msg("failed to get package stream from registry")
		return err
	}

	ingestedPackages := 0
	for packageName := range packageStream {
		log.Info().
			Str("package name", packageName).
			Msg("ingesting package")

		_, err = h.Ingest(ctx, packageName)
		if err != nil {
			log.Error().
				Err(err).
				Msg("failed to ingest package")

			if ignoreErrors {
				continue
			}
			return err
		}
		ingestedPackages += 1
	}

	log.Info().
		Int("ingested packages", ingestedPackages).
		Msg("collecting packages from npm registry")
	return nil
}

func (h *NPMPackageIngester) Ingest(ctx context.Context, packageName string) ([]string, error) {
	// todo make sure this isn't too restrictive
	// check if we've already fetched this package
	checkRes, err := gql.PackageFetchTime(ctx, h.deps.GQLClient, &npmV, util.Ptr(""), util.Ptr(packageName))
	if err != nil {
		return nil, err
	}
	for _, pkg := range checkRes.Package {
		if pkg.Last_successful_fetch != nil &&
			pkg.Last_successful_fetch.After(time.Now().AddDate(0, 0, -refetchDays)) {
			// bail out early
			log.Info().
				Str("package", packageName).
				Msg("package has already been ingested")
			return nil, nil
		}
	}

	log.Info().
		Str("package", packageName).
		Msg("collecting package metadata from registry")

	pkgMetadata, err := h.deps.NPMRegistry.GetPackageMetadata(packageName)
	if err != nil {
		log.Error().
			Err(err).
			Str("package", packageName).
			Msg("failed to get package metadata")
		return nil, err
	}

	if pkgMetadata == nil {
		log.Error().
			Str("package name", packageName).
			Msg("package metadata is null")
		return nil, err
	}

	log.Info().
		Str("package", packageName).
		Msg("upserting package data into db")

	_, err = h.deps.PackageSQLIngester.Ingest(ctx, pkgMetadata)
	if err != nil {
		log.Error().
			Err(err).
			Str("package name", packageName).
			Msg("failed to upsert package")
		return nil, err
	}

	var checkList []string
	for _, release := range pkgMetadata.Releases {
		for _, releaseDependency := range release.Dependencies {
			if !lo.Contains(checkList, releaseDependency.Name) {
				checkList = append(checkList, releaseDependency.Name)
			}
		}
	}
	return checkList, nil
}

func (h *NPMPackageIngester) IngestPackageAndDependencies(
	ctx context.Context,
	packageName string,
) error {
	var ingestedPkgs []string
	pkgs := []string{packageName}

	for len(pkgs) > 0 {
		packageToIngest := pkgs[0]
		pkgs = pkgs[1:]

		log.Info().
			Str("package", packageToIngest).
			Msg("ingesting package")

		newPkgs, err := h.Ingest(ctx, packageToIngest)
		if err != nil {
			log.Error().
				Err(err).
				Msg("failed to ingest packages")
			return err
		}
		ingestedPkgs = append(ingestedPkgs, packageToIngest)

		for _, newPkg := range newPkgs {
			// If the package to be scanned is already flagged to be ingested
			// or the package has already been ingested, then skip flagging this package
			if sliceContainsPackage(pkgs, newPkg) || sliceContainsPackage(ingestedPkgs, newPkg) {
				continue
			}
			pkgs = append(pkgs, newPkg)
		}

		log.Info().
			Str("package", packageToIngest).
			Strs("packages to ingest", pkgs).
			Msg("successfully ingested package")
	}
	return nil
}

func NewNPMPackageIngester(p Params) metadata.PackageIngester {
	return &NPMPackageIngester{deps: p}
}
