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
	packageCommand "github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/cmd/ingestworker/package"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/cmd/ingestworker/vulnerability"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/config/ingestworker"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/dbfx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/graphqlfx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/fetcher"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/replicator"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/scanner/licensecheck"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/scanner/packagejson"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/util"

	"go.uber.org/fx"

	clifx2 "github.com/ajvpot/clifx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/cmd/ingestworker/license"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/ingester"
	vulnmanager "github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/vulnerability"
	"github.com/lunasec-io/lunasec/lunatrace/cli/fx/lunatracefx"
)

func main() {
	clifx2.Main(
		lunatracefx.Module,
		graphqlfx.Module,
		dbfx.Module,
		fetcher.NPMModule,

		fx.Invoke(func() {
			util.RunOnProcessExit(func() {
				util.RemoveCleanupDirs()
			})
		}),

		// todo make a module
		fx.Supply(&clifx2.AppConfig{
			Name:    "ingestworker",
			Usage:   "LunaTrace Ingest Worker",
			Version: "0.0.1",
		}),
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
			ingester.NewHasuraIngester,
			vulnerability.NewCommand,
		),
		fx.Provide(
			replicator.NewNPMReplicator,
			packageCommand.NewCommand,
		),
	)
}
