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
//go:build cli

package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/refinery-labs/loq/pkg/lunasec"

	"github.com/urfave/cli/v2"
)

var (
	version = ""
	commit  = ""
	date    = ""
)

func main() {
	log.SetFlags(log.Lshortfile)

	cli.VersionPrinter = func(c *cli.Context) {
		fmt.Printf("version=%s revision=%s date=%s\n", c.App.Version, commit, date)
	}

	app := &cli.App{
		Name:        "lunasec",
		Version:     version,
		Compiled:    time.Now(),
		HideVersion: false,
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:     "config",
				Required: false,
				Usage:    "Config file for building secure components.",
			},
			&cli.StringFlag{
				Name:     "dir",
				Required: false,
				Usage:    "Build directory for built secure components.",
			},
		},
		Commands: []*cli.Command{
			{
				Name:    "deploy",
				Aliases: []string{"d"},
				Usage:   "Deploy secure Lunasec components",
				Flags: []cli.Flag{
					&cli.BoolFlag{
						Name:  "dry-run",
						Usage: "Perform a dry run of deployment which builds all resources that are to be deployed.",
					},
					&cli.BoolFlag{
						Name:  "local",
						Usage: "Deploy LunaSec locally.",
					},
					&cli.StringFlag{
						Name:  "output",
						Usage: "Path to where the resources output file will be written to.",
					},
				},
				Action: lunasec.DeployCommand,
			},
		},
	}

	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}
