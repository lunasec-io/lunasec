package clifx

import (
	"context"
	"os"
	"time"

	"github.com/rs/zerolog/log"

	"github.com/urfave/cli/v2"
	"go.uber.org/fx"
)

func Main(opts ...fx.Option) {
	rootCtx, cancel := context.WithCancel(context.Background())
	var cliApp *cli.App

	app := fx.New(fx.Options(opts...), fx.Options(
		fx.Provide(
			NewApp,
		),
		fx.Populate(&cliApp),
	))
	// In a typical application, we could just use app.Run() here. Since this
	// is a CLI tool, we'll use the more-explicit Start and Stop.
	startCtx, cancel := context.WithTimeout(rootCtx, 15*time.Second)
	defer cancel()

	if err := app.Start(startCtx); err != nil {
		panic(err)
	}

	err := cliApp.RunContext(rootCtx, os.Args)
	if err != nil {
		log.Error().
			Err(err).
			Msg("failed to run")
		return
	}

	cancel()
	stopCtx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	if err := app.Stop(stopCtx); err != nil {
		panic(err)
	}
}
