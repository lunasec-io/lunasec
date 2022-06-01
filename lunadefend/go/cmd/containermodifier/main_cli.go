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
  "log"
  "os"

  "github.com/lunasec-io/lunasec/lunadefend/go/controller"
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
