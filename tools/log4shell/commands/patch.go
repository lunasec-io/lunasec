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
	"archive/zip"
	"encoding/json"
	"github.com/lunasec-io/lunasec/tools/log4shell/types"
	"github.com/lunasec-io/lunasec/tools/log4shell/util"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
	"io/fs"
	"io/ioutil"
	"os"
)

func JavaArchivePatchCommand(c *cli.Context, globalBoolFlags map[string]bool) error {
	enableGlobalFlags(c, globalBoolFlags)

	findingsFile := c.String("findings")

	findingsContent, err := ioutil.ReadFile(findingsFile)
	if err != nil {
		log.Error().
			Err(err).
			Str("findings", findingsFile).
			Msg("Unable to open and read findings file")
		return err
	}

	var findings types.FindingsOutput
	err = json.Unmarshal(findingsContent, &findings)
	if err != nil {
		log.Error().
			Err(err).
			Str("findings", findingsFile).
			Msg("Unable to unmarshal findings file")
		return err
	}

	for _, finding := range findings.VulnerableLibraries {
		var file *os.File

		file, err = os.Open(finding.Path)
		if err != nil {
			log.Warn().
				Str("path", finding.Path).
				Err(err).
				Msg("Unable to open findings archive")
			return err
		}
		defer file.Close()

		info, _ := os.Stat(finding.Path)

		var zipReader *zip.Reader

		zipReader, err = zip.NewReader(file, info.Size())
		if err != nil {
			log.Warn().
				Str("path", finding.Path).
				Err(err).
				Msg("Unable to open archive for patching")
			return err
		}

		var zipFile fs.File

		if finding.JndiLookupFileName == "" {
			log.Warn().
				Str("path", finding.Path).
				Err(err).
				Msg("Finding does not have JndiLookup.class file to patch")
			continue
		}

		zipFile, err = zipReader.Open(finding.JndiLookupFileName)
		if err != nil {
			log.Warn().
				Str("path", finding.Path).
				Str("jndiLookupFileName", finding.JndiLookupFileName).
				Err(err).
				Msg("Unable to open file from zip")
			return err
		}

		var zipFileHash string

		zipFileHash, err = util.HexEncodedSha256FromReader(zipFile)
		if err != nil {
			log.Warn().
				Str("path", finding.Path).
				Err(err).
				Msg("Unable to hash zip file")
			return err
		}

		if zipFileHash != finding.JndiLookupHash {
			log.Warn().
				Str("path", finding.Path).
				Str("hash", finding.JndiLookupHash).
				Err(err).
				Msg("Hashes do not match, not deleting")
			return nil
		}
		log.Debug().
			Str("path", finding.Path).
			Str("zipFilePath", finding.JndiLookupFileName).
			Msg("Found file to remove")
	}

	return nil
}
