// Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
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
//
package main

import (
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
	"lunasec/lunatrace/pkg/command"
	"lunasec/lunatrace/pkg/config"
	"lunasec/lunatrace/pkg/constants"
	"lunasec/lunatrace/pkg/types"
	"lunasec/lunatrace/pkg/util"
	"lunasec/lunatrace/snapshot"
	"os"
)

func main() {
	globalFlags := types.NewLunaTraceGlobalFlags()

	command.EnableGlobalFlags(globalFlags)

	appConfig, err := config.LoadLunaTraceConfig()
	if err != nil {
		return
	}

	if appConfig.Stage == constants.DevelopmentEnv {
		zerolog.SetGlobalLevel(zerolog.DebugLevel)
	}

	util.RunOnProcessExit(func() {
		util.RemoveCleanupDirs()
	})

	enabledLunaTraceAsset := []types.CliAssetCmdConfig{
		{
			Usage:        "Collect a snapshot for a remote repository.",
			AssetType:    types.RepositoryAsset,
			AssetHandler: snapshot.RepositoryCommand,
		},
		{
			Usage:        "Collect a snapshot for a container.",
			Flags:        constants.SnapshotContainerFlags,
			AssetType:    types.ContainerAsset,
			AssetHandler: snapshot.ContainerCommand,
		},
		{
			Usage:        "Collect a snapshot for files in a directory.",
			AssetType:    types.DirectoryAsset,
			AssetHandler: snapshot.DirectoryCommand,
		},
		{
			Usage:        "Collect a snapshot for a file.",
			Flags:        constants.SnapshotFileFlags,
			AssetType:    types.FileAsset,
			AssetHandler: snapshot.FileCommand,
		},
	}

	var assetSnapshotCmds []*cli.Command
	for _, enabledCmd := range enabledLunaTraceAsset {
		cmd := snapshot.CreateCommandForAssetType(appConfig, globalFlags, enabledCmd)
		assetSnapshotCmds = append(assetSnapshotCmds, cmd)
	}

	app := &cli.App{
		Name:  "lunatrace",
		Usage: "Create and scan snapshots of assets.",
		Authors: []*cli.Author{
			{
				Name:  "lunasec",
				Email: "contact@lunasec.io",
			},
		},
		Version:     constants.LunaTraceVersion,
		Description: `Snapshots are a point in time collection of observations made about an asset. An example of what is collected by a snapshot is a Software Bill of Materials (SBOM).`,
		Before:      util.SetGlobalBoolFlags(globalFlags),
		Flags:       constants.RootCliFlags,
		Commands: []*cli.Command{
			{
				Name:        "snapshot",
				Usage:       "Create a snapshot of an asset for a project.",
				Flags:       constants.InventoryCliFlags,
				Subcommands: assetSnapshotCmds,
			},
			{
				Name:   "scan",
				Usage:  "Scan a created SBOM for known risks.",
				Flags:  constants.ScanCliFlags,
				Before: util.SetGlobalBoolFlags(globalFlags),
				Action: func(c *cli.Context) error {
					command.EnableGlobalFlags(globalFlags)
					return snapshot.ScanCommand(c, appConfig)
				},
			},
		},
	}

	err = app.Run(os.Args)
	if err != nil {
		log.Fatal().Err(err)
	}
}
