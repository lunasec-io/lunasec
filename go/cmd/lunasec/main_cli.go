// +build cli

package main

import (
	"log"
	"os"

	"github.com/refinery-labs/loq/pkg/lunasec"

	"github.com/urfave/cli"
)

func main() {
	log.SetFlags(log.Lshortfile)

	app := &cli.App{
		Name:  "lunasec",
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
		Commands: []cli.Command{
			{
				Name:    "build",
				Aliases: []string{"b"},
				Usage:   "Build secure Lunasec components",
				Flags: []cli.Flag{
					&cli.BoolFlag{
						Name:  "skip-mirroring",
						Usage: "Skip docker image mirroring.",
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
