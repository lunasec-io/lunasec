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
package ingest

import (
	"bufio"
	"errors"
	"os"
	"sync"

	"github.com/ajvpot/clifx"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
)

type Params struct {
	fx.In

	Ingester      metadata.PackageIngester
	Replicator    metadata.Replicator
	APIReplicator metadata.APIReplicator
}

func NewCommand(p Params) clifx.CommandResult {
	return clifx.CommandResult{
		Command: &cli.Command{
			Name:  "package",
			Usage: "[packages...]",
			Subcommands: []*cli.Command{
				{
					Name: "ingest",
					Flags: []cli.Flag{
						&cli.StringFlag{
							Name:     "packages",
							Required: false,
							Usage:    "File with list of packages to ingest.",
						},
						&cli.BoolFlag{
							Name:     "registry",
							Required: false,
							Usage:    "Ingest all packages from replicated registry.",
						},
						&cli.BoolFlag{
							Name:     "ignore-errors",
							Required: false,
							Usage:    "If a package ingestion fails, continue without fatally failing.",
						},
						&cli.DurationFlag{
							Name:     "refetch-duration",
							Required: false,
							Usage:    "Duration to wait before refetching a package.",
						},
					},
					Action: func(ctx *cli.Context) error {
						packageName := ctx.Args().First()
						registry := ctx.Bool("registry")
						ignoreErrors := ctx.Bool("ignore-errors")
						packagesFile := ctx.String("packages")
						refetchDuration := ctx.Duration("refetch-duration")

						// import packages from a file
						if packagesFile != "" {
							return p.Ingester.IngestPackagesFromFile(ctx.Context, packagesFile, ignoreErrors, refetchDuration)
						}

						if registry {
							return p.Ingester.IngestAllPackagesFromRegistry(ctx.Context, ignoreErrors, refetchDuration)
						}

						if packageName == "" {
							err := errors.New("no package name provided")
							return err
						}

						return p.Ingester.IngestPackageAndDependencies(ctx.Context, packageName, ignoreErrors, refetchDuration)
					},
				},
				{
					Name: "replicate",
					Subcommands: []*cli.Command{
						{
							Name: "registry",
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
								&cli.BoolFlag{
									Name:     "resume",
									Required: false,
									Usage:    "Resume replication from last replicated item.",
								},
							},
							Action: func(ctx *cli.Context) error {
								var err error

								since := ctx.Int("since")
								init := ctx.Bool("init")
								resume := ctx.Bool("resume")

								if init {
									err = p.Replicator.InitialReplication(ctx.Context)
									if err != nil {
										return err
									}
								}

								if resume {
									since, err = p.Replicator.GetLastReplicatedOffset()
									if err != nil {
										return err
									}
								}

								return p.Replicator.ReplicateSince(ctx.Context, since)
							},
						},
						{
							Name: "downloads",
							Flags: []cli.Flag{
								&cli.BoolFlag{
									Name:     "ignore-errors",
									Required: false,
									Usage:    "If a package replication fails, continue without fatally failing.",
								},
								&cli.BoolFlag{
									Name:     "version-counts",
									Required: false,
									Usage:    "Replicate package version counts. This will greatly increase the number of requests made since it will make a request for every package.",
								},
								&cli.BoolFlag{
									Name:     "resolve-package",
									Required: false,
									Usage:    "While it is possible to resolve the package as the data is being collected, this can slow down ingestion.",
								},
								&cli.StringFlag{
									Name:     "packages",
									Required: false,
									Usage:    "Collect download information from packages in this file.",
								},
							},
							Action: func(ctx *cli.Context) error {
								ignoreErrors := ctx.Bool("ignore-errors")
								resolvePackage := ctx.Bool("resolve-package")
								versionCounts := ctx.Bool("version-counts")
								packagesFile := ctx.String("packages")

								if packagesFile != "" {
									fileHandle, err := os.Open(packagesFile)
									if err != nil {
										return err
									}

									defer fileHandle.Close()
									fileScanner := bufio.NewScanner(fileHandle)

									var packages []string
									for fileScanner.Scan() {
										packageName := fileScanner.Text()
										packages = append(packages, packageName)
									}

									packageStream := make(chan string)
									replicateWg := sync.WaitGroup{}

									go func() {
										defer replicateWg.Done()
										err = p.APIReplicator.ReplicateFromStreamWithBackoff(packageStream, versionCounts, ignoreErrors, resolvePackage)
										if err != nil {
											log.Error().
												Err(err).
												Msg("failed to replicate packages")
										}
									}()
									replicateWg.Add(1)

									for _, packageName := range packages {
										packageStream <- packageName
									}
									close(packageStream)

									replicateWg.Wait()

									return nil
								}
								return nil
							},
						},
					},
				},
			},
		},
	}
}
