package discord

import (
	"os"
	"os/signal"

	"github.com/ajvpot/clifx"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/vulnbot"
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
