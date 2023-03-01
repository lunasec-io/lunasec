package discordfx

import (
	"go.uber.org/fx"
)

var Module = fx.Options(fx.Provide(NewConfig, NewDiscordSession))
