// +build cli

package main

import (
	"log"
	"os"

	"github.com/refinery-labs/loq/controller"
	"github.com/urfave/cli/v2"
)

func main() {
	log.SetFlags(log.Lshortfile)

	app := &cli.App{
		Name: "lunasec-cli",
		Commands: []*cli.Command{
			{
				Name:    "build",
				Aliases: []string{"b"},
				Usage:   "Build a secure resolver docker container.",
				Flags: []cli.Flag{
					&cli.StringFlag{
						Name:     "container-tar",
						Usage:    "Tar file of container to be modified",
						Required: true,
					},
					&cli.StringFlag{
						Name:     "config",
						Usage:    "Lunasec config file",
						Required: true,
					},
				},
				Action: func(c *cli.Context) error {
					containerTarFile := c.String("container-tar")
					configFile := c.String("config")
					containerModifierController := controller.NewContainerModifierController(nil)
					containerModifierController.HandleLocalInvoke(containerTarFile, configFile)
					return nil
				},
			},
		},
	}

	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}
