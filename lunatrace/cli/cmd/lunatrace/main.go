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
	"lunasec/lunatrace/pkg/command"
	"lunasec/lunatrace/pkg/config"
	"lunasec/lunatrace/pkg/constants"
	"lunasec/lunatrace/pkg/util"
	"os"
)

func main() {
	globalBoolFlags := map[string]bool{
		"verbose":         false,
		"json":            false,
		"debug":           false,
		"ignore-warnings": false,
		"log-to-stderr":   false,
	}

	command.EnableGlobalFlags(globalBoolFlags)

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

	setGlobalBoolFlags := func(c *cli.Context) error {
		for flag := range globalBoolFlags {
			if c.IsSet(flag) {
				globalBoolFlags[flag] = true
			}
		}
		return nil
	}

	app := &cli.App{
		Name:  "lunatrace",
		Usage: "Collect a Software Bill of Materials (SBOM) from a build artifact for a project.",
		Authors: []*cli.Author{
			{
				Name:  "lunasec",
				Email: "contact@lunasec.io",
			},
		},
		Version:     constants.LunaTraceVersion,
		Description: ``,
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
			&cli.BoolFlag{
				Name:  "log-to-stderr",
				Usage: "Log all structured logs to stderr. This is useful if you are consuming some output via stdout and do not want to parse the logs.",
			},
		},
		Commands: []*cli.Command{
			{
				Name:    "inventory",
				Aliases: []string{"i"},
				Usage:   "Inventory dependencies as a Software Bill of Materials (SBOM) for project and upload the SBOM.",
				Before:  setGlobalBoolFlags,
				Subcommands: []*cli.Command{
					{
						Name:    "create",
						Aliases: []string{"c"},
						Usage:   "Create an inventory of dependencies as a SBOM for project and upload the SBOM.",
						Before:  setGlobalBoolFlags,
						Flags: []cli.Flag{
							&cli.StringFlag{
								Name:  "output",
								Usage: "File to write generated SBOM to.",
							},
							&cli.StringFlag{
								Name:  "config-output",
								Usage: "File to write generated LunaTrace Agent config.",
							},
							&cli.StringSliceFlag{
								Name:  "excluded",
								Usage: "Excluded dirs from scanning.",
							},
							&cli.BoolFlag{
								Name:  "skip-upload",
								Usage: "Skip uploading generated SBOM.",
							},
							&cli.StringFlag{
								Name:  "stdin-filename",
								Usage: "Read from stdin and use the provided filename as the source.",
							},
							&cli.BoolFlag{
								Name:  "stdout",
								Usage: "Print created SBOM to stdout.",
							},
							&cli.StringFlag{
								Name:  "git-branch",
								Usage: "Manually specify a branch, otherwise we will attempt to read from a local .git folder.",
							},
							&cli.StringFlag{
								Name:  "git-commit",
								Usage: "Manually specify a commit, otherwise we will attempt to read from a local .git folder.",
							},
							&cli.StringFlag{
								Name:  "git-remote",
								Usage: "Manually specify a remote, otherwise we will attempt to read from a local .git folder.",
							},
						},
						Action: func(c *cli.Context) error {
							return inventory.CreateCommand(c, globalBoolFlags, appConfig)
						},
					},
					{
						Name:    "scan",
						Aliases: []string{"s"},
						Usage:   "Scan a created SBOM for known risks.",
						Flags: []cli.Flag{
							&cli.BoolFlag{
								Name:  "stdin",
								Usage: "Read SBOM from stdin.",
							},
							&cli.BoolFlag{
								Name:  "stdout",
								Usage: "Print findings to stdout.",
							},
						},
						Action: func(c *cli.Context) error {
							return inventory.ScanCommand(c, globalBoolFlags, appConfig)
						},
					},
				},
			},
		},
	}

	err = app.Run(os.Args)
	if err != nil {
		log.Fatal().Err(err)
	}
}
