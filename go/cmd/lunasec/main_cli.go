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
		Flags: []cli.Flag{},
		Commands: []cli.Command{
			{
				Name:    "build",
				Aliases: []string{"b"},
				Usage:   "Build secure Lunasec components",
				Flags: []cli.Flag{
					&cli.StringFlag{
						Name:  "dir",
						Required: false,
						Usage: "Build directory for built secure components.",
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
						Required: false,
						Usage: "Build secure components before deploying.",
					},
					&cli.StringFlag{
						Name:  "dir",
						Required: false,
						Usage: "Build directory for built secure components.",
					},
					&cli.BoolFlag{
						Name:  "skip-mirroring",
						Usage: "Skip docker image mirroring",
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
