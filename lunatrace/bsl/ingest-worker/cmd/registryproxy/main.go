package main

import (
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/config/registryproxy"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/dbfx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/proxy"
	"go.uber.org/fx"
)

func main() {
	app := fx.New(
		dbfx.Module,

		fx.Provide(
			registryproxy.NewConfigProvider,
		),

		proxy.NPMModule,

		fx.Invoke(func(proxy proxy.RegistryProxy) error {
			return proxy.Serve()
		}),
	)

	app.Run()
	<-app.Done()
}
