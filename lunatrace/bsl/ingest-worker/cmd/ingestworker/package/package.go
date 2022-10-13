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
	"github.com/ajvpot/clifx"
	"github.com/urfave/cli/v2"
	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
)

type Params struct {
	fx.In

	Ingester   metadata.Ingester
	Replicator metadata.Replicator
}

func NewCommand(p Params) clifx.CommandResult {
	return clifx.CommandResult{
		Command: &cli.Command{
			Name:  "package",
			Usage: "[packages...]",
			Subcommands: []*cli.Command{
				{
					Name: "ingest",
					Action: func(ctx *cli.Context) error {
						packageName := ctx.Args().First()

						return p.Ingester.IngestPackageAndDependencies(ctx.Context, packageName)
					},
				},
				{
					Name: "replicate",
					Flags: []cli.Flag{
						&cli.IntFlag{
							Name:     "since",
							Required: false,
							Usage:    "Offset of where to start replicating from.",
						},
						&cli.BoolFlag{
							Name:     "init",
							Required: false,
							Usage:    "Initial replication to quickly catchup.",
						},
					},
					Action: func(ctx *cli.Context) error {
						since := ctx.Int("since")
						init := ctx.Bool("init")

						if init {
							err := p.Replicator.InitialReplication(ctx.Context)
							if err != nil {
								return err
							}
						}
						return p.Replicator.ReplicateSince(ctx.Context, since)
					},
				},
			},
		},
	}
}
