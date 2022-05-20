// Copyright by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Business Source License v1.1 
// (the "License"); you may not use this file except in compliance with the
// License. You may obtain a copy of the License at
//
// https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
//
// See the License for the specific language governing permissions and
// limitations under the License.
//
package clifx

import (
	"github.com/urfave/cli/v2"
	"go.uber.org/fx"
)

const (
	RootCommandGroup = "cli_root_commands"
	RootFlagGroup    = "cli_root_flags"
)

type AppIn struct {
	fx.In
	AppConfig *AppConfig `optional:"true"`
	AppDeps   AppDeps
}

type AppConfig struct {
	// The name of the program. Defaults to path.Base(os.Args[0])
	Name string
	// Full name of command for help, defaults to Name
	HelpName string
	// Description of the program.
	Usage string
	// Text to override the USAGE section of help
	UsageText string
	// Description of the program argument format.
	ArgsUsage string
	// Version of the program
	Version string
	// Description of the program
	Description string
	// An action to execute before any subcommands are run, but after the context is ready
	// If a non-nil error is returned, no subcommands are run
	Before cli.BeforeFunc
	// An action to execute after any subcommands are run, but after the subcommand has finished
	// It is run even if Action() panics
	After cli.AfterFunc
	// The action to execute when no subcommands are specified
	Action cli.ActionFunc
	// Execute this function if the proper command cannot be found
	CommandNotFound cli.CommandNotFoundFunc
	// Execute this function if a usage error occurs
	OnUsageError cli.OnUsageErrorFunc
}

type AppDeps struct {
	fx.In
	// List of commands to execute
	Commands []*cli.Command `group:"cli_root_commands"`
	// List of flags to parse
	Flags []cli.Flag `group:"cli_root_flags"`
}

func NewApp(in AppIn) *cli.App {
	a := cli.NewApp()
	// The name of the program. Defaults to path.Base(os.Args[0])
	if in.AppConfig != nil {
		a.Name = in.AppConfig.Name
		a.HelpName = in.AppConfig.HelpName
		a.Usage = in.AppConfig.Usage
		a.UsageText = in.AppConfig.UsageText
		a.ArgsUsage = in.AppConfig.ArgsUsage
		a.Version = in.AppConfig.Version
		a.Description = in.AppConfig.Description
		a.Before = in.AppConfig.Before
		a.After = in.AppConfig.After
		a.Action = in.AppConfig.Action
		a.CommandNotFound = in.AppConfig.CommandNotFound
		a.OnUsageError = in.AppConfig.OnUsageError
	}

	a.Commands = in.AppDeps.Commands
	a.Flags = in.AppDeps.Flags

	return a
}

var Module = fx.Options(fx.Provide(NewApp))

func RootCommand(c *cli.Command) interface{} {
	return fx.Annotated{
		Group:  RootCommandGroup,
		Target: c,
	}
}
func RootFlag(c *cli.Flag) interface{} {
	return fx.Annotated{
		Group:  RootCommandGroup,
		Target: c,
	}
}
