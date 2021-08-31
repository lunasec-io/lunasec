// +build cli

package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/refinery-labs/loq/pkg/lunasec"

	"github.com/urfave/cli/v2"
)

const (
	version = ""
	commit = ""
	date = ""
)

func main() {
	log.SetFlags(log.Lshortfile)

	cli.VersionPrinter = func(c *cli.Context) {
		fmt.Printf("version=%s revision=%s date=%s\n", c.App.Version, commit, date)
	}

	app := &cli.App{
		Name:  "lunasec",
		Version: version,
		Compiled: time.Now(),
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:  "config",
				Required: false,
				Usage: "Config file for building secure components.",
			},
			&cli.StringFlag{
				Name:  "dir",
				Required: false,
				Usage: "Build directory for built secure components.",
			},
		},
		Commands: []*cli.Command{
			{
				Name:    "build",
				Aliases: []string{"b"},
				Usage:   "Build secure Lunasec components",
				Flags: []cli.Flag{
					&cli.BoolFlag{
						Name:  "skip-mirroring",
						Usage: "Skip docker image mirroring.",
					},
					&cli.BoolFlag{
						Name:  "local",
						Usage: "Build LunaSec locally.",
					},
				},
				Action: lunasec.BuildCommand,
			},
			{
				Name:    "deploy",
				Aliases: []string{"d"},
				Usage:   "Deploy secure Lunasec components",
				Flags: []cli.Flag{
					&cli.BoolFlag{
						Name:  "build",
						Usage: "Build before deploying.",
					},
					&cli.BoolFlag{
						Name:  "local",
						Usage: "Deploy LunaSec locally.",
					},
					&cli.StringFlag{
						Name:  "config-output",
						Usage: "Path to where the resources config file will be written to.",
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
