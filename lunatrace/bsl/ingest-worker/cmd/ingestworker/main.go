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
	"net/http"
	"os"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/cmd/ingestworker/cisa"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/cmd/ingestworker/cwe"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/cmd/ingestworker/epss"
	packageCommand "github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/cmd/ingestworker/package"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/cmd/ingestworker/sync"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/cmd/ingestworker/vulnerability"
	cisa2 "github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/cisa"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/clifx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/config/ingestworker"
	cwe2 "github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/cwe"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/dbfx"
	epss2 "github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/epss"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/graphqlfx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/registry"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/replicator"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/replicator/npm"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/scanner/licensecheck"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/scanner/packagejson"

	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/cmd/ingestworker/license"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/ingester"
	vulnmanager "github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/vulnerability"
)

func main() {
	// TODO (cthompson) this should be configured with an fx module
	log.Logger = zerolog.New(os.Stderr).With().Timestamp().Logger()

	clifx.Main(
		// TODO (cthompson) move this into an fx module
		fx.Supply(http.DefaultClient),

		graphqlfx.Module,
		dbfx.Module,
		registry.NPMModule,

		fx.Provide(
			cwe2.NewCWEIngester,
			epss2.NewEPSSIngester,
			cisa2.NewCISAKnownVulnIngester,
		),

		// todo make a module
		fx.Supply(&clifx.AppConfig{
			Name:    "ingestworker",
			Usage:   "LunaTrace Ingest Worker",
			Version: "0.0.1",
		}),
		fx.Provide(
			ingester.NewPackageSqlIngester,
			ingester.NewNPMPackageIngester,
			replicator.NewNPMReplicator,
			npm.NewNpmAPIReplicator,
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
			sync.NewCommand,
			vulnerability.NewCommand,
			cwe.NewCommand,
			epss.NewCommand,
			cisa.NewCommand,
		),
		fx.Provide(
			packageCommand.NewCommand,
		),
	)
}
