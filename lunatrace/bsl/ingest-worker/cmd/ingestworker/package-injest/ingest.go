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

	"github.com/ajvpot/clifx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
)

type Params struct {
	fx.In

	Ingester metadata.Ingester
}

func sliceContainsPackage(packageSlice []string, packageName string) bool {
	for _, p := range packageSlice {
		if packageName == p {
			return true
		}
	}
	return false
}

func NewCommand(p Params) clifx.CommandResult {
	return clifx.CommandResult{
		Command: &cli.Command{
			Name:  "package-ingest",
			Usage: "[packages...]",
			Action: func(ctx *cli.Context) error {
				packageName := ctx.Args().First()

				var ingestedPkgs []string
				pkgs := []string{packageName}

				for len(pkgs) > 0 {
					packageToIngest := pkgs[0]
					pkgs = pkgs[1:]

					log.Info().
						Str("package", packageToIngest).
						Msg("ingesting package")

					newPkgs, err := p.Ingester.Ingest(ctx.Context, packageToIngest)
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
			},
		},
	}
}
