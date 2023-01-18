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
	"context"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/awsfx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/config/queuehandler"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/dbfx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/graphqlfx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/ingester"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/registry"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/queuefx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/staticanalysis"
	"go.uber.org/fx"
	"net/http"
)

type QueueHandlerProps struct {
	fx.In

	Handlers []queuefx.Handler `group:"queue_handlers"`
}

func main() {
	app := fx.New(
		queuefx.Module,
		graphqlfx.Module,
		awsfx.Module,
		registry.NPMModule,
		dbfx.Module,

		fx.Supply(http.DefaultClient),
		fx.Provide(
			queuehandler.NewConfigProvider,

			ingester.NewPackageSqlIngester,
			ingester.NewNPMPackageIngester,

			staticanalysis.NewStaticAnalysisQueueHandler,

			func(props QueueHandlerProps) queuefx.HandlerLookup {
				handlerLookup := queuefx.HandlerLookup{}
				for _, handler := range props.Handlers {
					handlerLookup[handler.GetHandlerKey()] = handler
				}
				return handlerLookup
			},
		),

		fx.Invoke(func(queueSub *queuefx.Subscriber) error {
			ctx := context.Background()
			return queueSub.Run(ctx)
		}),
	)

	app.Run()
	<-app.Done()
}
