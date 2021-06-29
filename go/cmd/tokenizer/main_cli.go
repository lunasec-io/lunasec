// +build cli

package main

import (
  "log"
  "os"

  "github.com/refinery-labs/loq/pkg/tokenizer"
  "github.com/urfave/cli"
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
        Name:     "customer-private-key",
        Usage:    "Customer Private Key",
        Required: true,
      },
    },
    Commands: []cli.Command{
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
        Subcommands: []cli.Command{
          cli.Command{
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

          cli.Command{
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
