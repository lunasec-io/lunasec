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

  "github.com/lunasec-io/lunasec/lunadefend/go/pkg/tokenizer"
  "github.com/urfave/cli/v2"
)

func main() {
  log.SetFlags(log.Lshortfile)

  app := &cli.App{
    Name: "tokenizer-cli",
    Flags: []cli.Flag{
      &cli.StringFlag{
        Name:     "url",
        Usage:    "Tokenizer URL",
        Required: true,
      },
      &cli.StringFlag{
        Name:     "auth-private-key",
        Usage:    "Auth Private Key",
        Required: true,
      },
    },
    Commands: []*cli.Command{
      {
        Name:        "auth",
        Description: "Manage tokenizer authentication",
        Subcommands: []*cli.Command{
          {
            Name:        "create",
            Description: "Create a valid auth token for the tokenizer.",
            Category:    "auth",
            Action:      tokenizer.CreateJwtAuthCommand,
          },
        },
      },
      {
        Name:    "tokenize",
        Aliases: []string{"t"},
        Usage:   "Tokenize a secret value",
        Flags: []cli.Flag{
          &cli.StringFlag{
            Name:  "plaintext",
            Usage: "Plaintext value to tokenize",
          },
          &cli.StringFlag{
            Name:  "input",
            Usage: "Input file",
          },
        },
        Action: tokenizer.TokenizeCommand,
      },
      {
        Name:    "detokenize",
        Aliases: []string{"d"},
        Usage:   "Detokenize a secret value",
        Flags: []cli.Flag{
          &cli.StringFlag{
            Name:     "token",
            Usage:    "Tokenizer token",
            Required: true,
          },
          &cli.StringFlag{
            Name:  "output",
            Usage: "Output file",
          },
        },
        Action: tokenizer.DetokenizeCommand,
      },
      {
        Name: "metadata",
        Subcommands: []*cli.Command{
          {
            Name:     "set",
            Category: "metadata",
            Usage:    "Set metadata for a token",
            Flags: []cli.Flag{
              &cli.StringFlag{
                Name:     "token",
                Usage:    "Tokenizer Token",
                Required: true,
              },
              &cli.StringFlag{
                Name:     "metadata",
                Usage:    "Token metadata to set",
                Required: true,
              },
            },
            Action: tokenizer.SetMetadataCommand,
          },
          {
            Name:     "get",
            Category: "metadata",
            Usage:    "Get metadata for a token",
            Flags: []cli.Flag{
              &cli.StringFlag{
                Name:     "token",
                Usage:    "Tokenizer Token",
                Required: true,
              },
            },
            Action: tokenizer.GetMetadataCommand,
          },
        },
      },
    },
  }

  err := app.Run(os.Args)
  if err != nil {
    log.Fatal(err)
  }
}
