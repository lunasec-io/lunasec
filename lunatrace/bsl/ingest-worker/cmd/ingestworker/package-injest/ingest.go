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
	"github.com/urfave/cli/v2"
	"go.uber.org/fx"

	"github.com/ajvpot/clifx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
)

type Params struct {
	fx.In

	Ingester metadata.Ingester
}

func NewCommand(p Params) clifx.CommandResult {
	return clifx.CommandResult{
		Command: &cli.Command{
			Name:  "package-ingest",
			Usage: "[packages...]",
			Action: func(ctx *cli.Context) error {
				packageName := ctx.Args().First()

				return p.Ingester.IngestPackageAndDependencies(ctx.Context, packageName)
			},
		},
	}
}
