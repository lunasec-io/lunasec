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
package main

import (
	"errors"
	"os"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/visualizer"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/staticanalysis/rules"
)

func main() {
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})

	app := &cli.App{
		Name: "lunatrace-analysis",
		Commands: []*cli.Command{
			{
				Name:  "code-calls-dependency",
				Usage: "Determine if a dependency is imported and called.",
				Flags: []cli.Flag{
					&cli.StringFlag{
						Name:     "dependency",
						Usage:    "The dependency to verify if it is imported and called.",
						Required: true,
					},
					&cli.BoolFlag{
						Name:     "debug",
						Usage:    "Write rule to a file in the current directory.",
						Required: true,
					},
				},
				Action: func(c *cli.Context) error {
					codeDir := c.Args().First()
					dependency := c.String("dependency")
					debug := c.Bool("debug")

					if debug {
						var f *os.File

						f, err := os.Create("importedandcalled.yaml")
						if err != nil {
							return err
						}
						err = rules.TemplateImportedAndCalledRuleToFile(f, dependency)
					}

					results, err := rules.AnalyzeCodeForImportingAndCallingPackage(codeDir, dependency)
					if err != nil {
						return err
					}

					if len(results.Results) > 0 {
						for _, result := range results.Results {
							log.Info().
								Str("path", result.Path).
								Msg("dependency imported and called at path")
						}
					} else {
						log.Info().Msg("dependency was not imported and called")
					}
					return err
				},
			},
			{
				Name:  "visualize-package",
				Usage: "Generate a visualize of a package.",
				Action: func(c *cli.Context) error {
					args := c.Args().Slice()

					if len(args) != 2 {
						return errors.New("<package name> <package version>")
					}

					visualizer.VisualizePackage(args[0], args[1])
					return nil
				},
			},
		},
	}

	err := app.Run(os.Args)
	if err != nil {
		log.Error().Err(err).Msg("failed to run cli")
	}
}
