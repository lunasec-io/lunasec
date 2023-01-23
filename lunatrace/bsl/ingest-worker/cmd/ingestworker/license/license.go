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
package license

import (
	"fmt"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/scanner"
	"io/ioutil"

	"github.com/urfave/cli/v2"
	"go.uber.org/fx"

	"github.com/ajvpot/clifx"
)

type Params struct {
	fx.In

	Scanner []scanner.Scanner `group:"license_scanners"`
}

func NewCommand(p Params) clifx.CommandResult {
	return clifx.CommandResult{
		Command: &cli.Command{
			Name:  "license",
			Usage: "[file]",
			Action: func(ctx *cli.Context) error {
				b, err := ioutil.ReadFile(ctx.Args().First())
				if err != nil {
					return err
				}
				for _, scan := range p.Scanner {
					licenses, err := scan.Scan(b)
					if err != nil {
						return err
					}
					fmt.Println(licenses)
				}
				return nil
			},
		},
	}
}
