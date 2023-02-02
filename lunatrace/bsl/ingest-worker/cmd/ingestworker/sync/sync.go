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
package sync

import (
	"context"
	"time"

	"github.com/ajvpot/clifx"
	"github.com/go-co-op/gocron"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/cisa"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/cwe"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/epss"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/vulnerability"
)

type Params struct {
	fx.In

	Ingester     vulnerability.FileAdvisoryIngester
	CWEIngester  cwe.CWEIngester
	EPSSIngester epss.EPSSIngester
	CISAIngester cisa.CISAKnownVulnIngester
}

func NewCommand(p Params) clifx.CommandResult {
	return clifx.CommandResult{
		Command: &cli.Command{
			Name:        "sync",
			Description: "Syncs LunaTrace database with all data sources",
			Usage:       "[file or directory]",
			Flags: []cli.Flag{
				&cli.StringFlag{
					Name:     "source",
					Usage:    "Where the vulnerabilities have been sourced from.",
					Required: true,
				},
				&cli.StringFlag{
					Name:  "source-relative-path",
					Usage: "Relative path from within the source to where advisories are located.",
				},
				&cli.StringFlag{
					Name:  "cron",
					Usage: "Run vulnerability ingestion on a cron schedule.",
				},
			},
			Action: func(ctx *cli.Context) error {
				advisoryLocation := ctx.Args().First()

				source := ctx.String("source")
				sourceRelativePath := ctx.String("source-relative-path")
				cron := ctx.String("cron")

				runIngestion := func() error {
					log.Info().
						Msg("Updating CWEs")

					err := p.CWEIngester.Ingest(ctx.Context)

					if err != nil {
						log.Error().
							Err(err).
							Msg("failed to update CWEs")
						return err
					}

					log.Info().
						Msg("Updated CWEs")

					log.Info().
						Str("source", source).
						Str("cron", cron).
						Msg("starting vulnerability ingestion")
					err = p.Ingester.IngestVulnerabilitiesFromSource(advisoryLocation, source, sourceRelativePath)

					if err != nil {
						log.Error().
							Err(err).
							Str("source", source).
							Str("cron", cron).
							Msg("failed to ingest vulnerabilities")
						return err
					}

					log.Info().
						Str("source", source).
						Str("cron", cron).
						Msg("starting epss ingestion")

					epssContext := context.Background()
					err = p.EPSSIngester.Ingest(epssContext)

					if err != nil {
						log.Error().
							Err(err).
							Str("source", source).
							Str("cron", cron).
							Msg("failed to ingest epss")
						return err
					}

					log.Info().
						Msg("Updating CISA Known Vulnerabilities")
					err = p.CISAIngester.Ingest(ctx.Context)
					if err == nil {
						log.Info().
							Msg("Updated CISA Known Vulnerabilities")
						return err
					}

					return nil
				}

				if cron != "" {
					log.Info().
						Str("cron", cron).
						Msg("running vulnerability ingestion on cron")

					s := gocron.NewScheduler(time.UTC)
					_, err := s.Cron(cron).Do(runIngestion)
					if err != nil {
						return err
					}
					s.StartBlocking()
					return nil
				}
				return runIngestion()
			},
		},
	}
}
