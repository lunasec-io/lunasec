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
	util2 "github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/util"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/gql"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/gql/types"
	"github.com/rs/zerolog/log"
	"time"

	"github.com/Khan/genqlient/graphql"
	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/mapper"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/util"
)

// todo tune date
const refetchDays = 0

type Params struct {
	fx.In

	Fetcher   metadata.Fetcher
	GQLClient graphql.Client
}

type hasuraNPMIngester struct {
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

func (h *hasuraNPMIngester) Ingest(ctx context.Context, packageName string) ([]string, error) {
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

	pkg, err := h.deps.Fetcher.Fetch(ctx, packageName)
	if err != nil {
		log.Error().
			Err(err).
			Str("package", packageName).
			Msg("failed to fetch package")
		return nil, err
	}

	gqlPkg, err := mapper.Map(pkg)
	if err != nil {
		log.Error().
			Err(err).
			Str("package", packageName).
			Msg("failed to map package")
		return nil, err
	}

	res, err := gql.UpsertPackage(ctx, h.deps.GQLClient, gqlPkg, metadata.PackageOnConflict)
	if err != nil {
		util2.LogGraphqlError(
			err,
			"failed to upsert package",
			util2.GraphqlLogContext{Key: "package", Value: packageName},
		)
		return nil, err
	}

	needToCheck := make(map[string]struct{})

	for _, rel := range res.Insert_package_one.Releases {
		for _, dep := range rel.Release_dependencies {
			if dep.Dependency_package == nil ||
				dep.Dependency_package.Last_successful_fetch == nil ||
				dep.Dependency_package.Last_successful_fetch.Before(time.Now().AddDate(0, 0, -refetchDays)) {
				needToCheck[dep.Dependency_package.Name] = struct{}{}
			}
		}
	}

	checkList := make([]string, 0, len(needToCheck))
	for pkgName := range needToCheck {
		checkList = append(checkList, pkgName)
	}

	return checkList, nil
}

func (h *hasuraNPMIngester) IngestPackageAndDependencies(
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

func NewHasuraIngester(p Params) metadata.Ingester {
	return &hasuraNPMIngester{deps: p}
}
