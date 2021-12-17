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
	"github.com/lunasec-io/lunasec/tools/log4shell/commands"
	"github.com/lunasec-io/lunasec/tools/log4shell/constants"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
	"os"
)

func main() {
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix

	zerolog.SetGlobalLevel(zerolog.InfoLevel)

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
		Name:  "log4shell",
		Usage: "Identify and mitigate the impact of the log4shell (CVE-2021-44228) vulnerability.",
		Authors: []*cli.Author{
			{
				Name:  "lunasec",
				Email: "contact@lunasec.io",
			},
		},
		Version:     constants.Version,
		Description: "Identify code dependencies that are vulnerable to the log4shell vulnerability. Read more at https://log4shell.com.",
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
				Name:   "analyze",
				Usage:  "Scan known vulnerable Log4j dependencies and create a mapping of JndiLookup.class hash to version.",
				Before: setGlobalBoolFlags,
				Flags: []cli.Flag{
					&cli.StringFlag{
						Name:  "output",
						Usage: "File path for where to output findings in JSON format.",
					},
				},
				Action: func(c *cli.Context) error {
					return commands.AnalyzeCommand(c, globalBoolFlags)
				},
			},
			{
				Name:    "scan",
				Aliases: []string{"s"},
				Usage:   "Scan directories, passed as arguments, for archives (.jar, .war) which contain class files that are vulnerable to the log4shell vulnerability.",
				Before:  setGlobalBoolFlags,
				Flags: []cli.Flag{
					&cli.StringSliceFlag{
						Name:  "exclude",
						Usage: "Exclude subdirectories from scanning. This can be helpful if there are directories which your user does not have access to when starting a scan from `/`.",
					},
					&cli.BoolFlag{
						Name:        "include-log4j1",
						Usage:       "Use to also include scanning for Log4j 1.x vulnerabilities.",
						DefaultText: "false",
					},
					&cli.BoolFlag{
						Name:  "archives",
						Usage: "Only scan for known vulnerable archives. By default the CLI will scan for class files which are known to be vulnerable which will result in higher signal findings. If you are specifically looking for vulnerable Java archive hashes, use this option.",
					},
					&cli.StringFlag{
						Name:  "version-hashes",
						Usage: "File path of a version hashes file.",
					},
					&cli.StringFlag{
						Name:  "output",
						Usage: "File path for where to output findings in JSON format.",
					},
					&cli.BoolFlag{
						Name:  "verbose",
						Usage: "Display verbose information when running commands.",
					},
					&cli.BoolFlag{
						Name:  "ignore-warnings",
						Usage: "Do not display warnings, only show findings.",
					},
					&cli.BoolFlag{
						Name:  "no-follow-symlinks",
						Usage: "Disable the resolution of symlinks while scanning. Note: symlinks might resolve to files outside of the included directories and so this option might be useful if you strictly want to search in said directories.",
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
				Action: func(c *cli.Context) error {
					return commands.ScanCommand(c, globalBoolFlags, log4jLibraryHashes)
				},
			},
			{
				Name:    "livepatch",
				Aliases: []string{"s"},
				Usage:   "Perform a live patch of a system by exploiting the log4shell vulnerability for immediate mitigation. The payload executed patches the running process to prevent further payloads from being able to be executed.",
				Before:  setGlobalBoolFlags,
				Flags: []cli.Flag{
					&cli.StringFlag{
						Name:  "payload-url",
						Usage: "The URL that the LDAP server will tell the target to fetch the payload from. This must be an accessible route FROM any targeted host TO this patch server. (ex. https://hotpatch.lunasec.com)",
					},
					&cli.StringFlag{
						Name:  "ldap-host",
						Usage: "The hostname for the Log4Shell LDAP server.",
					},
					&cli.IntFlag{
						Name:  "ldap-port",
						Usage: "The port for the Log4Shell LDAP server.",
					},
				},
				Action: func(c *cli.Context) error {
					return commands.LivePatchCommand(c, globalBoolFlags, hotpatchFiles)
				},
			},
		},
	}
	err := app.Run(os.Args)
	if err != nil {
		log.Fatal().Err(err)
	}
}
