package dbfx

import "go.uber.org/fx"

var Module = fx.Options(
	fx.Provide(
		NewConfig,
		NewDB,
	),
)
