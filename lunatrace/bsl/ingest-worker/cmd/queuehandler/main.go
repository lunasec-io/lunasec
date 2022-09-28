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
//
package main

import (
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/graphql"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/fetcher/npm"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/ingester"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/queue"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/staticanalysis"
	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/cli/fx/lunatracefx"
)

type QueueHandlerProps struct {
	fx.In

	Handlers []queue.Handler `group:"queue_handlers"`
}

func main() {
	app := fx.New(
		lunatracefx.Module,
		fx.Provide(
			graphql.NewGraphqlClient,
			npm.NewNPMFetcher,
			ingester.NewHasuraIngester,

			staticanalysis.NewStaticAnalysisQueueHandler,
			fx.Provide(func(props QueueHandlerProps) queue.HandlerLookup {
				handlers := queue.HandlerLookup{}
				for _, handler := range props.Handlers {
					handlers[handler.GetHandlerKey()] = handler
				}
				return handlers
			}),

			queue.NewQueueRunner,
		),
	)

	app.Run()
	<-app.Done()
}
