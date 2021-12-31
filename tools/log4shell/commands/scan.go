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
package commands

import (
	"github.com/lunasec-io/lunasec/tools/log4shell/findings"
	"github.com/lunasec-io/lunasec/tools/log4shell/scan"
	"github.com/lunasec-io/lunasec/tools/log4shell/types"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
)

func scanDirectoriesForVulnerableLibraries(
	c *cli.Context,
	searchDirs []string,
	log4jLibraryHashes []byte,
) (scannerFindings []types.Finding, err error) {
	log.Debug().
		Strs("directories", searchDirs).
		Msg("scanning directories")

	scanLog4j1 := c.Bool("include-log4j1")
	onlyScanArchives := c.Bool("archives")
	excludeDirs := c.StringSlice("exclude")
	versionHashes := c.String("version-hashes")
	noFollowSymlinks := c.Bool("no-follow-symlinks")

	hashLookup, err := scan.LoadHashLookup(log4jLibraryHashes, versionHashes, onlyScanArchives)
	if err != nil {
		return
	}

	processArchiveFile := scan.IdentifyPotentiallyVulnerableFiles(scanLog4j1, hashLookup)

	scanner := scan.NewLog4jDirectoryScanner(
		excludeDirs, onlyScanArchives, noFollowSymlinks, processArchiveFile)

	log.Info().
		Strs("searchDirs", searchDirs).
		Strs("excludeDirs", excludeDirs).
		Msg("Scanning directories for vulnerable Log4j libraries.")

	scannerFindings = scanner.Scan(searchDirs)
	return
}

func ScanCommand(c *cli.Context, globalBoolFlags map[string]bool, log4jLibraryHashes []byte) (err error) {
	enableGlobalFlags(c, globalBoolFlags)

	searchDirs := c.Args().Slice()
	scannerFindings, err := scanDirectoriesForVulnerableLibraries(c, searchDirs, log4jLibraryHashes)
	if err != nil {
		return
	}

	output := c.String("output")
	if output != "" {
		return findings.SerializeToFile(output, scannerFindings)
	}
	return nil
}

