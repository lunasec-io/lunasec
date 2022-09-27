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
	"github.com/lunasec-io/lunasec/lunatrace/cli/gql/types"
	"github.com/rs/zerolog/log"
	"time"

	"github.com/Khan/genqlient/graphql"
	"go.uber.org/fx"

	metadata2 "github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/mapper"
	"github.com/lunasec-io/lunasec/lunatrace/cli/gql"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/util"
)

// todo tune date
const refetchDays = 0

type Params struct {
	fx.In

	Fetcher   metadata2.Fetcher
	GQLClient graphql.Client
}

type hasuraNPMIngester struct {
	deps Params
}

var npmV types.PackageManager = types.NPM

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

	res, err := gql.UpsertPackage(ctx, h.deps.GQLClient, gqlPkg, gql.PackageOnConflict)
	if err != nil {
		util.LogGraphqlError(
			err,
			"failed to upsert package",
			util.GraphqlLogContext{Key: "package", Value: packageName},
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

func NewHasuraIngester(p Params) (metadata2.Ingester, error) {
	return &hasuraNPMIngester{deps: p}, nil
}
