package main

import (
	"net/http"
	"os"
	"os/signal"

	"github.com/ajvpot/clifx"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/config/ingestworker"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/dbfx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/discordfx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/graphqlfx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/openaifx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/pineconefx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/vulnbot"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/vulnerability/scrape"
)

type Params struct {
	fx.In

	VulnBot vulnbot.VulnBot
}

func NewCommand(p Params) clifx.CommandResult {
	return clifx.CommandResult{
		Command: &cli.Command{
			Name:  "discord",
			Usage: "",
			Flags: []cli.Flag{},
			Action: func(ctx *cli.Context) error {
				log.Info().Msg("Starting Discord Bot")
				err := p.VulnBot.Start()
				if err != nil {
					return err
				}

				stop := make(chan os.Signal, 1)
				signal.Notify(stop, os.Interrupt)
				<-stop
				return nil
			},
		},
	}
}

func main() {
	// TODO (cthompson) this should be configured with an fx module
	logLevel := zerolog.InfoLevel
	if os.Getenv("LOG_LEVEL") == "debug" {
		logLevel = zerolog.DebugLevel
	}
	log.Logger = zerolog.New(os.Stderr).With().Timestamp().Logger().Level(logLevel)

	clifx.Main(
		// TODO (cthompson) move this into an fx module
		fx.Supply(http.DefaultClient),

		graphqlfx.Module,
		dbfx.Module,
		pineconefx.Module,
		openaifx.Module,
		scrape.Module,
		discordfx.Module,

		fx.Invoke(discordfx.RegisterCommands),

		fx.Provide(
			// TODO (cthompson) make a vulnbot config provider
			ingestworker.NewConfigProvider,
			NewCommand,
			vulnbot.NewVulnBot,
		),

		fx.Supply(&clifx.AppConfig{
			Name:    "vulnbot",
			Usage:   "LunaTrace Vulnerability Bot",
			Version: "0.0.1",
		}),
	)
}
