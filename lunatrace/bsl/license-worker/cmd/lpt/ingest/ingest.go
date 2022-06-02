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
package ingest

import (
	"encoding/json"
	"os"

	"github.com/Khan/genqlient/graphql"
	"github.com/urfave/cli/v2"
	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/license-worker/internal/pkg/metadata/fetcher"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/license-worker/internal/pkg/metadata/mapper"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/license-worker/internal/pkg/clifx"
	"github.com/lunasec-io/lunasec/lunatrace/cli/gql"
)

type Params struct {
	fx.In

	Fetcher   fetcher.Fetcher
	GQLClient graphql.Client
}

func NewCommand(p Params) clifx.CommandResult {
	return clifx.CommandResult{
		Command: &cli.Command{
			Name:  "ingest",
			Usage: "[packages...]",
			Action: func(ctx *cli.Context) error {
				packageName := ctx.Args().First()

				pkg, err := p.Fetcher.Fetch(ctx.Context, packageName)
				if err != nil {
					return err
				}

				gqlPkg, err := mapper.Map(pkg)
				if err != nil {
					return err
				}

				res, err := gql.UpsertPackage(ctx.Context, p.GQLClient, gqlPkg, gql.PackageOnConflict)
				if err != nil {
					return err
				}

				return json.NewEncoder(os.Stdout).Encode(&res)
			},
		},
	}
}
