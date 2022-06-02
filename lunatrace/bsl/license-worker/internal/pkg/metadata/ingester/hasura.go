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
	"time"

	"github.com/Khan/genqlient/graphql"
	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/license-worker/internal/pkg/metadata"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/license-worker/internal/pkg/metadata/mapper"
	"github.com/lunasec-io/lunasec/lunatrace/cli/gql"
)

type Params struct {
	fx.In

	Fetcher   metadata.Fetcher
	GQLClient graphql.Client
}

type hasuraIngester struct {
	deps Params
}

func (h *hasuraIngester) Ingest(ctx context.Context, packageName string) ([]string, error) {
	pkg, err := h.deps.Fetcher.Fetch(ctx, packageName)
	if err != nil {
		return nil, err
	}

	gqlPkg, err := mapper.Map(pkg)
	if err != nil {
		return nil, err
	}

	res, err := gql.UpsertPackage(ctx, h.deps.GQLClient, gqlPkg, gql.PackageOnConflict)
	if err != nil {
		return nil, err
	}

	needToCheck := make(map[string]struct{})

	for _, rel := range res.Insert_package_one.Releases {
		for _, dep := range rel.Release_dependencies {
			if dep.Dependency_package == nil ||
				dep.Dependency_package.Fetched_time == nil ||
				// todo tune date
				dep.Dependency_package.Fetched_time.Before(time.Now().AddDate(0, 0, -7)) {
				needToCheck[dep.Dependency_package.Name] = struct{}{}
			}
		}
	}

	checkList := make([]string, 0, len(needToCheck))
	for pkgName, _ := range needToCheck {
		checkList = append(checkList, pkgName)
	}

	return checkList, nil
}

func NewHasuraIngester(p Params) (metadata.Ingester, error) {
	return &hasuraIngester{deps: p}, nil
}
