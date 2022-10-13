package fetcher

import (
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/fetcher/npm"
	"go.uber.org/fx"
)

var NPMModule = fx.Options(
	fx.Provide(
		npm.NewConfig,
		npm.NewNPMFetcher,
	),
)
