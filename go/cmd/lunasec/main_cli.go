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
				Name:    "deploy",
				Aliases: []string{"d"},
				Usage:   "Deploy secure Lunasec components",
				Flags: []cli.Flag{
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
