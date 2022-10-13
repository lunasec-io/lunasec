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
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
	"go.uber.org/fx"
	"time"

	"github.com/ajvpot/clifx"

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
							Name:     "offset",
							Required: false,
							Usage:    "Offset of where to start replicating from.",
						},
						&cli.IntFlag{
							Name:     "limit",
							Required: false,
							Usage:    "Limit to .",
						},
					},
					Action: func(ctx *cli.Context) error {
						offset := ctx.Int("offset")
						limit := ctx.Int("limit")

						for {
							log.Info().
								Int("offset", offset).
								Msg("starting to replicate registry")

							err := p.Replicator.Replicate(ctx.Context, offset, limit)
							if err != nil {
								log.Warn().
									Err(err).
									Msg("error while replicating")
							}
							time.Sleep(time.Minute)
						}
					},
				},
			},
		},
	}
}
