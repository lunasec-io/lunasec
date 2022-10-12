package proxy

import (
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/proxy/npm"
	"go.uber.org/fx"
)

var NPMModule = fx.Options(
	fx.Provide(
		NewConfig,
		npm.NewProxy,
	),
)
