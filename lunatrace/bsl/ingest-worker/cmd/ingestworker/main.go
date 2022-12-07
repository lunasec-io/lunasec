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
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/cmd/ingestworker/cwe"
	packageCommand "github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/cmd/ingestworker/package"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/cmd/ingestworker/vulnerability"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/config/ingestworker"
	cwe2 "github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/cwe"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/dbfx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/graphqlfx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/registry"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/replicator"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/scanner/licensecheck"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/scanner/packagejson"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"net/http"
	"os"

	"go.uber.org/fx"

	clifx2 "github.com/ajvpot/clifx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/cmd/ingestworker/license"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/ingester"
	vulnmanager "github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/vulnerability"
)

func main() {
	// TODO (cthompson) this should be configured with an fx module
	log.Logger = zerolog.New(os.Stderr).With().Timestamp().Logger()

	clifx2.Main(
		fx.Supply(http.DefaultClient),

		graphqlfx.Module,
		dbfx.Module,
		registry.NPMModule,

		fx.Provide(
			cwe2.NewCWEIngester,
		),

		// todo make a module
		fx.Supply(&clifx2.AppConfig{
			Name:    "ingestworker",
			Usage:   "LunaTrace Ingest Worker",
			Version: "0.0.1",
		}),
		fx.Provide(
			ingester.NewPackageSqlIngester,
			ingester.NewNPMPackageIngester,
			replicator.NewNPMReplicator,
		),
		fx.Provide(
			ingestworker.NewConfigProvider,
		),
		fx.Provide(
			licensecheck.NewScanner,
			packagejson.NewScanner,
			license.NewCommand,
			vulnmanager.NewFileIngester,
		),
		fx.Provide(
			vulnerability.NewCommand,
			cwe.NewCommand,
		),
		fx.Provide(
			packageCommand.NewCommand,
		),
	)
}
