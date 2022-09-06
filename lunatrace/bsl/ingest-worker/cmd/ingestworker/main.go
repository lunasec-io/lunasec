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
	ingest "github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/cmd/ingestworker/package-injest"
	"github.com/rs/zerolog/log"
	"net/http"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/cmd/ingestworker/vulnerability"

	"github.com/Khan/genqlient/graphql"
	"go.uber.org/fx"

	clifx2 "github.com/ajvpot/clifx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/cmd/ingestworker/license"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/license/scanner/licensecheck"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/license/scanner/packagejson"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/fetcher/npm"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/ingester"
	vulnmanager "github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/vulnerability"
	"github.com/lunasec-io/lunasec/lunatrace/cli/fx/lunatracefx"
	"github.com/lunasec-io/lunasec/lunatrace/cli/gql"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/types"
)

func main() {
	clifx2.Main(
		lunatracefx.Module,
		// todo make a module
		fx.Provide(func(appConfig types.LunaTraceConfig, hc *http.Client) graphql.Client {
			if appConfig.GraphqlServer.Url == "" {
				log.Error().Msg("graphql server url is not defined")
				return nil
			}

			if appConfig.GraphqlServer.Secret == "" {
				log.Error().Msg("graphql server secret is not defined")
				return nil
			}

			lhc := hc
			lhc.Transport = &gql.HeadersTransport{Headers: map[string]string{
				"X-Hasura-Admin-Secret": appConfig.GraphqlServer.Secret,
				"X-Hasura-Role":         "service",
			}}
			return graphql.NewClient(appConfig.GraphqlServer.Url, lhc)
		}),
		fx.Supply(&clifx2.AppConfig{
			Name:    "ingestworker",
			Usage:   "LunaTrace Ingest Worker",
			Version: "0.0.1",
		}),
		fx.Provide(
			licensecheck.NewScanner,
			packagejson.NewScanner,
			license.NewCommand,
			vulnmanager.NewFileIngester,
		),
		fx.Provide(
			npm.NewNPMFetcher,
			ingester.NewHasuraIngester,
			ingest.NewCommand,
			vulnerability.NewCommand,
		),
	)
}
