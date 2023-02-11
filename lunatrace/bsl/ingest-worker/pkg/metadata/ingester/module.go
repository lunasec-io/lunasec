package ingester

import (
	"go.uber.org/fx"
)

var Module = fx.Options(
	fx.Provide(
		NewConfig,
		NewNPMPackageIngester,
	),
)
