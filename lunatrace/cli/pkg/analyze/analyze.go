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
package analyze

import (
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/constants"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/scan"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/types"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/util"
	"github.com/rs/zerolog/log"
	"io"
	"path"
	"strings"
)

func ProcessArchiveFile(
	resolveArchiveFile types.ResolveArchiveFile,
	reader io.Reader,
	filePath, fileName string,
) (finding *types.Finding) {
	var (
		jndiLookupFileHash string
	)

	_, archiveName := path.Split(filePath)

	// small adjustments to the version so that it can be parsed as semver
	semverVersion := ArchiveNameToSemverVersion(archiveName)

	versionCve := ""

	for _, fileVersionCheck := range constants.FileVersionChecks {
		if VersionIsInRange(archiveName, semverVersion, fileVersionCheck.SemverRange) {
			if !strings.Contains(fileName, fileVersionCheck.LibraryFile) {
				return
			}
			versionCve = fileVersionCheck.Cve
		}
	}

	if versionCve == "" {
		return
	}

	fileHash, err := util.HexEncodedSha256FromReader(reader)
	if err != nil {
		log.Warn().
			Str("fileName", fileName).
			Str("path", filePath).
			Err(err).
			Msg("unable to hash file")
		return
	}

	if versionCve == "" {
		log.Debug().
			Str("hash", fileHash).
			Str("version", semverVersion).
			Msg("Skipping version as it is not vulnerable to any known CVE")
		return
	}

	if VersionIsInRange(archiveName, semverVersion, constants.JndiLookupPatchFileVersions) {
		jndiLookupFileHash = scan.GetJndiLookupHash(resolveArchiveFile, filePath)
	}

	log.Log().
		Str("path", filePath).
		Str("cve", versionCve).
		Str("fileName", fileName).
		Str("fileHash", fileHash).
		Str("jndiLookupFileName", constants.JndiLookupClasspath).
		Str("jndiLookupFileHash", jndiLookupFileHash).
		Msg("identified library version")

	finding = &types.Finding{
		Path:               filePath,
		FileName:           fileName,
		Hash:               fileHash,
		JndiLookupFileName: constants.JndiLookupClasspath,
		JndiLookupHash:     jndiLookupFileHash,
		Version:            semverVersion,
		CVE:                versionCve,
		Severity:           constants.CveSeverityLookup[versionCve],
	}
	return
}
