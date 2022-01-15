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
	"lunasec/lunatrace/inventory"
	"lunasec/lunatrace/pkg/constants"
	"lunasec/lunatrace/pkg/util"
	"os"
)

func getInventoryCmd(
	setGlobalBoolFlags func(c *cli.Context) error,
	globalBoolFlags map[string]bool,
) *cli.Command {
	return &cli.Command{
		Name:    "inventory",
		Aliases: []string{"i"},
		Usage:   "Inventory dependencies as a Software Bill of Materials (SBOM) for project. An automatic alert will be when security vulnerabilities are detected to be present in this project.",
		Before:  setGlobalBoolFlags,
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:  "email",
				Usage: "Email to send dependency report results to.",
			},
			&cli.StringFlag{
				Name:  "application-id",
				Usage: "Identifier of the application to report the SBOM belonging to.",
			},
			&cli.StringFlag{
				Name:  "output",
				Usage: "File to write scan results to.",
			},
			&cli.StringSliceFlag{
				Name:  "excluded",
				Usage: "Excluded dirs from scanning.",
			},
			&cli.BoolFlag{
				Name:  "skip-upload",
				Usage: "Skip uploading collected dependencies.",
			},
			&cli.StringFlag{
				Name:  "upload-url",
				Usage: "Upload SBOMs to designated upload url. You can keep track of SBOMs locally by using the `inventory-server` command and setting the upload url to this local server.",
			},
		},
		Action: func(c *cli.Context) error {
			return inventory.InventoryCommand(c, globalBoolFlags)
		},
	}
}

func main() {
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix

	zerolog.SetGlobalLevel(zerolog.InfoLevel)

	util.RunOnProcessExit(func() {
		util.RemoveCleanupDirs()
	})

	globalBoolFlags := map[string]bool{
		"verbose":         false,
		"json":            false,
		"debug":           false,
		"ignore-warnings": false,
	}

	setGlobalBoolFlags := func(c *cli.Context) error {
		for flag := range globalBoolFlags {
			if c.IsSet(flag) {
				globalBoolFlags[flag] = true
			}
		}
		return nil
	}

	app := &cli.App{
		Name: "lunatrace",
		Usage: `
Use "files" to collect SBOMs from artifacts which are just files on the file system.
Use "container" to collect an SBOM from a built container.
`,
		Authors: []*cli.Author{
			{
				Name:  "lunasec",
				Email: "contact@lunasec.io",
			},
		},
		Version:     constants.LunaTraceVersion,
		Description: "Collect a Software Bill of Materials (SBOM) from build artifacts.",
		Before:      setGlobalBoolFlags,
		Flags: []cli.Flag{
			&cli.BoolFlag{
				Name:  "verbose",
				Usage: "Display verbose information when running commands.",
			},
			&cli.BoolFlag{
				Name:  "json",
				Usage: "Display findings in json format.",
			},
			&cli.BoolFlag{
				Name:  "debug",
				Usage: "Display helpful information while debugging the CLI.",
			},
		},
		Commands: []*cli.Command{
			{
				Name:    "files",
				Aliases: []string{"f"},
				Usage:   "",
				Before:  setGlobalBoolFlags,
				Flags:   []cli.Flag{},
				Subcommands: []*cli.Command{
					getInventoryCmd(setGlobalBoolFlags, globalBoolFlags),
				},
			},
			{
				Name:    "container",
				Aliases: []string{"c"},
				Usage:   "",
				Before:  setGlobalBoolFlags,
				Subcommands: []*cli.Command{
					getInventoryCmd(setGlobalBoolFlags, globalBoolFlags),
				},
			},
		},
	}

	err := app.Run(os.Args)
	if err != nil {
		log.Fatal().Err(err)
	}
}
