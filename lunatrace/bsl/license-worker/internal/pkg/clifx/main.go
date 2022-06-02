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
package clifx

import (
	"context"
	"os"
	"time"

	"github.com/urfave/cli/v2"
	"go.uber.org/fx"
)

func Main(opts ...fx.Option) {
	rootCtx, cancel := context.WithCancel(context.Background())
	var cliApp *cli.App

	app := fx.New(fx.Options(opts...), fx.Options(
		fx.Provide(
			NewApp,
		),
		fx.Populate(&cliApp),
		// todo figure out logger situation
		fx.NopLogger,
	))
	// In a typical application, we could just use app.Run() here. Since this
	// is a CLI tool, we'll use the more-explicit Start and Stop.
	startCtx, cancel := context.WithTimeout(rootCtx, 15*time.Second)
	defer cancel()

	if err := app.Start(startCtx); err != nil {
		panic(err)
	}

	err := cliApp.RunContext(rootCtx, os.Args)
	if err != nil {
		panic(err)
	}

	cancel()
	stopCtx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	if err := app.Stop(stopCtx); err != nil {
		panic(err)
	}

}
