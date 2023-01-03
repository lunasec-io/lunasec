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
package main

func main() {
	/*
		appfx := fx.New(
			lunatracefx.Module,
			fx.Provide(
				NewLogger,
				NewHandler,
				NewMux,
			),
			fx.Invoke(Register),
		)

		// In a typical application, we could just use app.Run() here. Since we
		// don't want this example to run forever, we'll use the more-explicit Start
		// and Stop.
		startCtx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
		defer cancel()
		if err := appfx.Start(startCtx); err != nil {
			log.Fatal(err)
		}

		// Normally, we'd block here with <-app.Done(). Instead, we'll make an HTTP
		// request to demonstrate that our server is running.
		if _, err := http.Get("http://localhost:8080/"); err != nil {
			log.Fatal(err)
		}

		stopCtx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
		defer cancel()
		if err := appfx.Stop(stopCtx); err != nil {
			log.Fatal(err)
		}

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
	*/
	return
}
