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
package scan

import (
	"encoding/json"
	"fmt"
	"github.com/lunasec-io/lunasec/tools/log4shell/types"
	"github.com/rs/zerolog/log"
	"io/ioutil"
	"strings"
)

func LoadVersionHashesFromFile(versionHashes string) (hashLookup types.VulnerableHashLookup, err error) {
	content, err := ioutil.ReadFile(versionHashes)
	if err != nil {
		log.Error().
			Err(err).
			Str("versionHashes", versionHashes).
			Msg("Unable to read version hashes file")
		return
	}
	return LoadVersionHashesFromBytes(content)
}

func versionAlreadyExist(version string, versions []string) bool {
	for _, existingVersion := range versions {
		if version == existingVersion {
			return true
		}
	}
	return false
}

func LoadVersionHashesFromBytes(versionHashesContent []byte) (hashLookup types.VulnerableHashLookup, err error) {
	var findingsOutput types.FindingsOutput
	err = json.Unmarshal(versionHashesContent, &findingsOutput)
	if err != nil {
		log.Error().
			Err(err).
			Msg("Unable to read version hashes file")
		return
	}

	hashLookup = types.VulnerableHashLookup{}
	for _, vulnerableLibrary := range findingsOutput.VulnerableLibraries {
		log.Debug().
			Str("hash", vulnerableLibrary.Hash).
			Str("version", vulnerableLibrary.Version).
			Msg("Storing hash for library")

		if existingLookup, ok := hashLookup[vulnerableLibrary.Hash]; ok {
			if existingLookup.CVE != vulnerableLibrary.CVE {
				log.Error().
					Str("existingVersion", existingLookup.Version).
					Str("otherVersion", vulnerableLibrary.Version).
					Str("existingCve", existingLookup.CVE).
					Str("otherCve", vulnerableLibrary.CVE).
					Str("fileHash", vulnerableLibrary.Hash).
					Msg("Lookup file hash collision detected. Two different CVEs cannot have same file hash indicator.")
				panic(fmt.Errorf("invalid hash lookup attempted to be loaded"))
			}

			versions := strings.Split(existingLookup.Version, ", ")

			newVersion := existingLookup.Version
			if !versionAlreadyExist(vulnerableLibrary.Version, versions) {
				newVersion += ", " + vulnerableLibrary.Version
			}

			hashLookup[vulnerableLibrary.Hash] = types.VulnerableHash{
				Name: vulnerableLibrary.Path + "::" + vulnerableLibrary.FileName,
				Version: newVersion,
				CVE: vulnerableLibrary.CVE,
			}
		} else {
			hashLookup[vulnerableLibrary.Hash] = types.VulnerableHash{
				Name: vulnerableLibrary.Path + "::" + vulnerableLibrary.FileName,
				Version: vulnerableLibrary.Version,
				CVE: vulnerableLibrary.CVE,
			}
		}
	}
	log.Debug().
		Int("versionHashes", len(hashLookup)).
		Msg("Loaded version hashes")

	return
}

