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
	"encoding/json"
	"fmt"
	"github.com/lunasec-io/lunasec/tools/log4shell/constants"
	"github.com/lunasec-io/lunasec/tools/log4shell/patch"
	"github.com/lunasec-io/lunasec/tools/log4shell/scan"
	"github.com/lunasec-io/lunasec/tools/log4shell/types"
	"github.com/lunasec-io/lunasec/tools/log4shell/util"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
	"io/ioutil"
	"os"
)

func enableGlobalFlags(c *cli.Context) {
	verbose := c.Bool("verbose")
	debug := c.Bool("debug")

	if verbose || debug {
		zerolog.SetGlobalLevel(zerolog.DebugLevel)
	}

	if debug {
		// include file and line number when logging
		log.Logger = log.With().Caller().Logger()
	}

	jsonFlag := c.Bool("json")
	if !jsonFlag {
		// pretty print output to the console if we are not interested in parsable output
		consoleOutput := zerolog.ConsoleWriter{Out: os.Stderr}
		consoleOutput.FormatFieldName = func(i interface{}) string {
			return fmt.Sprintf("\n\t%s: ", util.Colorize(constants.ColorBlue, i))
		}
		log.Logger = log.Output(consoleOutput)

	}
}

func scanCommand(c *cli.Context) error {
	enableGlobalFlags(c)

	searchDirs := c.Args().Slice()
	log.Debug().Strs("directories", searchDirs).Msg("scanning directories")

	onlyScanArchives := c.Bool("archives")
	output := c.String("output")

	findings := scan.SearchDirsForVulnerableClassFiles(searchDirs, onlyScanArchives)

	if output != "" {
		findingsOutput := types.FindingsOutput{
			VulnerableLibraries: findings,
		}
		serializedOutput, err := json.Marshal(findingsOutput)
		if err != nil {
			log.Error().Err(err).Msg("unable to marshall findings output")
			return err
		}

		err = ioutil.WriteFile(output, serializedOutput, 0644)
		if err != nil {
			log.Error().Err(err).Msg("unable to write findings to output file")
			return err
		}
	}
	return nil
}

func hotpatchCommand(c *cli.Context) error {
	enableGlobalFlags(c)

	ip := c.String("ip")

	if ip == "" {
		log.Info().Msg("Public IP not provided. Binding to the local network interface.")
		ip = "localhost"
	}

	hotpatchServer := patch.NewHotpatchLDAPServer(ip)
	hotpatchPayloadServer := patch.NewHotpatchPayloadServer(hotpatchFiles)

	log.Info().
		Msg("Starting Log4Shell hotpatch LDAP and payload servers")
	log.Info().Msgf("Once both servers have started, use payload string: '${jndi:ldap://%s:1389/a}' to hotpatch", ip)
	hotpatchServer.Start()
	hotpatchPayloadServer.Start()

	util.WaitForProcessExit(func() {
		hotpatchServer.Stop()
	})

	return nil
}

func main() {
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix

	zerolog.SetGlobalLevel(zerolog.InfoLevel)

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
				Name:    "scan",
				Aliases: []string{"s"},
				Usage:   "Scan directories, passed as arguments, for archives (.jar, .war) which contain class files that are vulnerable to the log4shell vulnerability.",
				Flags: []cli.Flag{
					&cli.BoolFlag{
						Name:  "archives",
						Usage: "Only scan for known vulnerable archives. By default the CLI will scan for class files which are known to be vulnerable which will result in higher signal findings. If you are specifically looking for vulnerable Java archive hashes, use this option.",
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
						Name:  "json",
						Usage: "Display findings in json format.",
					},
					&cli.BoolFlag{
						Name:  "debug",
						Usage: "Display helpful information while debugging the CLI.",
					},
				},
				Action: scanCommand,
			},
			{
				Name:    "hotpatch",
				Aliases: []string{"s"},
				Usage:   "Perform a live hotpatch of a system by exploiting the log4shell vulnerability for immediate mitigation. The payload executed patches the running process to prevent further payloads from being able to be executed.",
				Flags: []cli.Flag{
					&cli.StringFlag{
						Name:  "ip",
						Usage: "If testing locally, set this to a local network interface (view available interfaces with ifconfig/ipconfig). If using on a remote server, set this value to the publicly accessible IP address of the server.",
					},
				},
				Action: hotpatchCommand,
			},
		},
	}
	err := app.Run(os.Args)
	if err != nil {
		log.Fatal().Err(err)
	}
}
