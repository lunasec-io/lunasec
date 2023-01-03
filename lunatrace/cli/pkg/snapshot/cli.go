// Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
package snapshot

import (
	"github.com/anchore/syft/syft"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/command"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/types"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/util"
	"github.com/urfave/cli/v2"
)

func CreateCommandForAssetType(
	appConfig types.LunaTraceConfig,
	globalFlags *types.LunaTraceGlobalFlags,
	cmdConfig types.CliAssetCmdConfig,
) *cli.Command {
	return &cli.Command{
		Name:   string(cmdConfig.AssetType),
		Usage:  cmdConfig.Usage,
		Before: util.SetGlobalBoolFlags(globalFlags),
		Flags:  cmdConfig.Flags,
		Action: func(c *cli.Context) error {
			syft.SetLogger(&types.ZerologLogger{})
			command.EnableGlobalFlags(globalFlags)
			return cmdConfig.AssetHandler(c, appConfig)
		},
	}
}
