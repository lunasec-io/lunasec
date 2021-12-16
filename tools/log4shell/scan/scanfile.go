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
	"fmt"
	"github.com/lunasec-io/lunasec/tools/log4shell/constants"
	"github.com/lunasec-io/lunasec/tools/log4shell/types"
	"github.com/lunasec-io/lunasec/tools/log4shell/util"
	"github.com/rs/zerolog/log"
	"io"
	"strings"
)

func IdentifyPotentiallyVulnerableFiles(scanLog4j1 bool, archiveHashLookup types.VulnerableHashLookup) types.ProcessArchiveFile {
	hashLookup := FilterVulnerableHashLookup(archiveHashLookup, scanLog4j1)

	return func(reader io.Reader, path, fileName string) (finding *types.Finding) {
		return identifyPotentiallyVulnerableFile(reader, path, fileName, hashLookup)
	}
}

func identifyPotentiallyVulnerableFile(reader io.Reader, path, fileName string, hashLookup types.VulnerableHashLookup) (finding *types.Finding) {
	fileHash, err := util.HexEncodedSha256FromReader(reader)
	if err != nil {
		log.Warn().
			Str("fileName", fileName).
			Str("path", path).
			Err(err).
			Msg("unable to hash file")
		return
	}

	if strings.Contains(fileName, "JndiLookup.class") {
		fmt.Println(fileName, fileHash, len(hashLookup))
	}

	if vulnerableFile, ok := hashLookup[fileHash]; ok {
		severity, ok := constants.CveSeverityLookup[vulnerableFile.CVE]
		if !ok {
			log.Warn().
				Str("CVE", vulnerableFile.CVE).
				Msg("no severity provided for CVE")
		}

		log.Log().
			Str("severity", severity).
			Str("path", path).
			Str("fileName", fileName).
			Str("versionInfo", vulnerableFile.Version).
			Str("cve", vulnerableFile.CVE).
			Msg("identified vulnerable path")

		finding = &types.Finding{
			Path:        path,
			FileName:    fileName,
			Hash:        fileHash,
			VersionInfo: vulnerableFile.Name,
			CVE:         vulnerableFile.CVE,
		}
		return
	}
	return
}
