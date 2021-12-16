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
	"encoding/json"
	"github.com/lunasec-io/lunasec/tools/log4shell/constants"
	"github.com/lunasec-io/lunasec/tools/log4shell/findings"
	"github.com/lunasec-io/lunasec/tools/log4shell/scan"
	"github.com/lunasec-io/lunasec/tools/log4shell/types"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
	"io/ioutil"
	"path"
	"strings"
)

func isVersionALog4ShellVersion() {

}

func LoadVersionHashes(versionHashes string) (hashLookup types.VulnerableHashLookup, err error) {
	content, err := ioutil.ReadFile(versionHashes)
	if err != nil {
		log.Error().
			Err(err).
			Str("versionHashes", versionHashes).
			Msg("Unable to read version hashes file")
		return
	}

	var findingsOutput types.FindingsOutput
	err = json.Unmarshal(content, &findingsOutput)
	if err != nil {
		log.Error().
			Err(err).
			Str("versionHashes", versionHashes).
			Msg("Unable to read version hashes file")
		return
	}

	hashLookup = types.VulnerableHashLookup{}
	for _, vulnerableLibrary := range findingsOutput.VulnerableLibraries {
		dir, file := path.Split(vulnerableLibrary.Path)
		version := strings.TrimSuffix(file, path.Ext(file))

		log.Debug().
			Str("hash", vulnerableLibrary.Hash).
			Str("version", version).
			Msg("Storing hash for library")

		hashLookup[vulnerableLibrary.Hash] = types.VulnerableHash{
			Name: dir + "::" + vulnerableLibrary.FileName,
			Version: version,
			CVE: "",
		}
	}
	log.Debug().
		Int("versionHashes", len(versionHashes)).
		Msg("Loaded version hashes")

	return
}

func ScanCommand(c *cli.Context) (err error) {
	enableGlobalFlags(c)

	searchDirs := c.Args().Slice()
	log.Debug().
		Strs("directories", searchDirs).
		Msg("scanning directories")

	scanLog4j1 := c.Bool("scan-log4j1")
	onlyScanArchives := c.Bool("archives")
	excludeDirs := c.StringSlice("exclude")
	versionHashes := c.String("version-hashes")

	hashLookup := constants.KnownVulnerableClassFileHashes
	if versionHashes != "" {
		hashLookup, err = LoadVersionHashes(versionHashes)
		if err != nil {
			return err
		}
	}

	if onlyScanArchives {
		hashLookup = constants.KnownVulnerableArchiveFileHashes
	}
	processArchiveFile := scan.IdentifyPotentiallyVulnerableFiles(scanLog4j1, hashLookup)

	scanner := scan.NewLog4jDirectoryScanner(excludeDirs, onlyScanArchives, processArchiveFile)

	scannerFindings := scanner.Scan(searchDirs)

	output := c.String("output")
	if output != "" {
		return findings.SerializeToFile(output, scannerFindings)
	}
	return nil
}

