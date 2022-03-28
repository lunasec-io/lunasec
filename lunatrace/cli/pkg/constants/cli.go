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
package constants

import "github.com/urfave/cli/v2"

var InventoryCliFlags = []cli.Flag{
	&cli.StringSliceFlag{
		Name:  "excluded",
		Usage: "Excluded dirs from scanning.",
	},
	&cli.BoolFlag{
		Name:  "skip-upload",
		Usage: "Skip uploading generated SBOM.",
	},
	&cli.StringFlag{
		Name:  "output-file",
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
}

var InventoryRepositoryCliFlags []cli.Flag

var InventoryManifestCliFlags = []cli.Flag{
	&cli.BoolFlag{
		Name:  "stdin",
		Usage: "Read from stdin and use the provided manifest filename as the source.",
	},
}
