package registry

import (
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/fetcher"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/registry/npm"
	"go.uber.org/fx"
)

var NPMModule = fx.Options(
	fetcher.NPMModule,
	fx.Provide(
		npm.NewNPMRegistry,
	),
)
