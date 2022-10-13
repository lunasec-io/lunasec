package main

import (
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/config/registryproxy"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/dbfx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/proxy"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/proxy/npm"
	"go.uber.org/fx"
)

func main() {
	app := fx.New(
		dbfx.Module,

		fx.Provide(
			registryproxy.NewConfigProvider,
		),

		npm.NPMModule,

		fx.Invoke(func(proxy proxy.RegistryProxy) error {
			return proxy.Serve()
		}),
	)

	app.Run()
	<-app.Done()
}
