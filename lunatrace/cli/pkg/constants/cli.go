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
package constants

import (
	"github.com/urfave/cli/v2"
)

var RootCliFlags = []cli.Flag{
	&cli.BoolFlag{
		Name:  "verbose",
		Usage: "Display verbose information when running commands.",
	},
	&cli.BoolFlag{
		Name:  "json",
		Usage: "Display findings in json format.",
	},
	&cli.BoolFlag{
		Name:  "debug",
		Usage: "Display helpful information while debugging the CLI.",
	},
	&cli.BoolFlag{
		Name:  "log-to-stderr",
		Usage: "Log all structured logs to stderr. This is useful if you are consuming some output via stdout and do not want to parse the logs.",
	},
}

var ScanCliFlags = []cli.Flag{
	&cli.BoolFlag{
		Name:  "stdin",
		Usage: "Read SBOM from stdin.",
	},
	&cli.BoolFlag{
		Name:  "stdout",
		Usage: "Print findings to stdout.",
	},
}

var SnapshotCliFlags = []cli.Flag{
	&cli.StringSliceFlag{
		Name:  "exclude",
		Usage: "Excluded dirs from scanning.",
	},
	&cli.BoolFlag{
		Name:  "skip-upload",
		Usage: "Skip uploading generated SBOM.",
	},
	&cli.StringFlag{
		Name:  "output",
		Usage: "File to write generated SBOM to.",
	},
	&cli.StringFlag{
		Name:  "agent-output",
		Usage: "File to write generated LunaTrace Agent config.",
	},
	&cli.BoolFlag{
		Name:  "stdout",
		Usage: "Print created SBOM to stdout.",
	},
	&cli.StringFlag{
		Name:  "git-branch",
		Usage: "Manually specify a git branch.",
	},
	&cli.StringFlag{
		Name:  "git-commit",
		Usage: "Manually specify a git commit.",
	},
	&cli.StringFlag{
		Name:  "git-remote",
		Usage: "Manually specify a git remote.",
	},
	&cli.StringFlag{
		Name:  "workspace",
		Usage: "Perform all actions within a provided workspace directory. If provided, cleanup of this directory will be deferred to the caller.",
	},
}

var SnapshotRepositoryCliFlags []cli.Flag

var SnapshotFileFlags = []cli.Flag{
	&cli.BoolFlag{
		Name:  "stdin",
		Usage: "Read from stdin and use the provided manifest filename as the source.",
	},
}

var SnapshotContainerFlags = []cli.Flag{
	&cli.BoolFlag{
		Name:  "archive",
		Usage: "Load the container as an exported archive.",
	},
}
