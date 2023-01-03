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
package types

import (
	"errors"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
)

type SnapshotOptions struct {
	Excluded      []string `cli:"exclude"`
	SkipOutput    bool     `cli:"skip-output"`
	OutputFile    string   `cli:"output"`
	AgentOutput   string   `cli:"agent-output"`
	PrintToStdout bool     `cli:"stdout"`
	GitBranch     string   `cli:"git-branch"`
	GitCommit     string   `cli:"git-commit"`
	GitRemote     string   `cli:"git-remote"`
	Workspace     string   `cli:"workspace"`
}

func NewSnapshotOptions(c *cli.Context) SnapshotOptions {
	return SnapshotOptions{
		Excluded:      c.StringSlice("exclude"),
		SkipOutput:    c.Bool("skip-output"),
		OutputFile:    c.String("output"),
		AgentOutput:   c.String("agent-output"),
		PrintToStdout: c.Bool("stdout"),
		GitBranch:     c.String("git-branch"),
		GitCommit:     c.String("git-commit"),
		GitRemote:     c.String("git-remote"),
		Workspace:     c.String("workspace"),
	}
}

type SnapshotFileOptions struct {
	UseStdin bool
	Filename string
}

func getSnapshotFilename(c *cli.Context) (filename string, err error) {
	filenames := c.Args().Slice()
	if len(filenames) == 0 {
		err = errors.New("no filenames provided")
		log.Error().
			Msg("No filename provided. Please provide one filename as an argument to this command.")
		return
	}

	if len(filenames) > 1 {
		err = errors.New("too many filenames provided")
		log.Error().
			Msg("Please provide only one filename as an argument to this command.")
		return
	}

	filename = filenames[0]
	return
}

func NewSnapshotFileOptions(c *cli.Context) (options SnapshotFileOptions, err error) {
	useStdin := c.Bool("stdin")

	filename, err := getSnapshotFilename(c)
	if err != nil {
		return
	}

	options = SnapshotFileOptions{
		UseStdin: useStdin,
		Filename: filename,
	}
	return
}

type SnapshotContainerOptions struct {
	Archive bool
}

func NewShapshotContainerOptions(c *cli.Context) (options SnapshotContainerOptions) {
	options = SnapshotContainerOptions{
		Archive: c.Bool("archive"),
	}
	return
}
