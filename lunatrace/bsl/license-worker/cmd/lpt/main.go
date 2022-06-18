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
	"github.com/lunasec-io/lunasec/lunatrace/bsl/license-worker/cmd/lpt/vulnerability"
	"net/http"

	"github.com/Khan/genqlient/graphql"
	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/license-worker/cmd/lpt/ingest"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/license-worker/cmd/lpt/license"
	clifx2 "github.com/lunasec-io/lunasec/lunatrace/bsl/license-worker/pkg/clifx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/license-worker/pkg/license/scanner/licensecheck"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/license-worker/pkg/license/scanner/packagejson"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/license-worker/pkg/metadata/fetcher/npm"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/license-worker/pkg/metadata/ingester"
	vulnmanager "github.com/lunasec-io/lunasec/lunatrace/bsl/license-worker/pkg/vulnerability"
	"github.com/lunasec-io/lunasec/lunatrace/cli/fx/lunatracefx"
	"github.com/lunasec-io/lunasec/lunatrace/cli/gql"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/types"
)

func main() {
	clifx2.Main(
		lunatracefx.Module,
		// todo make a module
		fx.Provide(func(appConfig types.LunaTraceConfig, hc *http.Client) graphql.Client {
			lhc := hc
			lhc.Transport = &gql.HeadersTransport{Headers: map[string]string{
				"X-Hasura-Admin-Secret": "myadminsecretkey",
				"X-Hasura-Role":         "service",
			}}
			return graphql.NewClient("http://localhost:8080/v1/graphql", lhc)
		}),
		fx.Supply(&clifx2.AppConfig{
			Name:    "lpt",
			Usage:   "LunaTrace Package Tool",
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
