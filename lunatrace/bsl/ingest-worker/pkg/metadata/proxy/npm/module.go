package npm

import (
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/proxy"
	"go.uber.org/fx"
)

var NPMModule = fx.Options(
	fx.Provide(
		proxy.NewConfig,
		NewProxy,
	),
)
