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
	"github.com/lunasec-io/lunasec/tools/log4shell/constants"
	"github.com/lunasec-io/lunasec/tools/log4shell/scan"
	"github.com/lunasec-io/lunasec/tools/log4shell/types"
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

	json := c.Bool("json")
	if !json {
		// pretty print output to the console if we are not interested in parsable output
		log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})
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

func main() {
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix

	zerolog.SetGlobalLevel(zerolog.InfoLevel)

	app := &cli.App{
		Name:        "log4shell",
		Version:     constants.Version,
		Description: "Identify code dependencies that are vulnerable to the log4shell vulnerability. Read more at log4shell.com.",
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
				},
				Action: scanCommand,
			},
		},
	}
	err := app.Run(os.Args)
	if err != nil {
		log.Fatal().Err(err)
	}
}
