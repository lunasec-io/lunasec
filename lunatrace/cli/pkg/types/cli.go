// Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
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
package types

import "github.com/urfave/cli/v2"

type InventoryOptions struct {
	Excluded      []string `cli:"excluded"`
	SkipOutput    bool     `cli:"skip-output"`
	OutputFile    string   `cli:"output-file"`
	AgentOutput   string   `cli:"agent-output"`
	PrintToStdout bool     `cli:"stdout"`
	GitBranch     string   `cli:"git-branch"`
	GitCommit     string   `cli:"git-commit"`
	GitRemote     string   `cli:"git-remote"`
}

func NewInventoryOptionsFromCli(c *cli.Context) InventoryOptions {
	return InventoryOptions{
		Excluded:      c.StringSlice("excluded"),
		SkipOutput:    c.Bool("skip-output"),
		OutputFile:    c.String("output-file"),
		AgentOutput:   c.String("agent-output"),
		PrintToStdout: c.Bool("stdout"),
		GitBranch:     c.String("git-branch"),
		GitCommit:     c.String("git-commit"),
		GitRemote:     c.String("git-remote"),
	}
}

type InventoryManifestOptions struct {
	UseStdin bool
	Filename string
}
