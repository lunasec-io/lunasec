// Copyright by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Business Source License v1.1
// (the "License"); you may not use this file except in compliance with the
// License. You may obtain a copy of the License at
//
// https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
//
// See the License for the specific language governing permissions and
// limitations under the License.
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
