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
package analyze

import (
	"archive/zip"
	"github.com/blang/semver/v4"
	"github.com/lunasec-io/lunasec/tools/log4shell/constants"
	"github.com/lunasec-io/lunasec/tools/log4shell/types"
	"github.com/lunasec-io/lunasec/tools/log4shell/util"
	"github.com/rs/zerolog/log"
	"io"
	"path"
	"regexp"
	"strings"
)

var alphaRegex = regexp.MustCompile("([a-z]+)")

func versionIsInRange(fileName string, semverVersion string, semverRange semver.Range) bool {
	version, err := semver.Make(semverVersion)
	if err != nil {
		log.Warn().
			Str("fileName", fileName).
			Str("semverVersion", semverVersion).
			Msg("Unable to parse semver version")
		return false
	}

	if semverRange(version) {
		return true
	}
	return false
}

func adjustMissingPatchVersion(semverVersion string) string {
	if len(semverVersion) == 3 {
		semverVersion += ".0"
	}
	if strings.HasPrefix(semverVersion, "2.0-") {
		semverVersion = strings.Replace(semverVersion, "2.0-", "2.0.0-", -1)
	}
	if strings.HasPrefix(semverVersion, "1.0-") {
		semverVersion = strings.Replace(semverVersion, "1.0-", "1.0.0-", -1)
	}
	return semverVersion
}

func fileNameToSemver(fileNameNoExt string) string {
	fileNameParts := strings.Split(fileNameNoExt, "-")

	var tag, semverVersion string
	for i := len(fileNameParts) - 1; i >= 0; i-- {
		fileNamePart := fileNameParts[i]
		if (
			strings.HasPrefix(fileNamePart, "1") ||
			strings.HasPrefix(fileNamePart, "2")) &&
			strings.Contains(fileNamePart, ".") {

			tagPart := alphaRegex.FindString(fileNamePart)
			if tagPart != "" {
				fileNamePart = strings.Replace(fileNamePart, tagPart, "", 1)
				if tag == "" {
					tag = tagPart
				} else {
					tag = tagPart + "-" + tag
				}
			}

			fileNamePart = adjustMissingPatchVersion(fileNamePart)

			if tag == "" {
				semverVersion = fileNamePart
				break
			}
			semverVersion = fileNamePart + "-" + tag
			break
		}
		if tag == "" {
			tag = fileNamePart
			continue
		}
		tag = fileNamePart + "-" + tag
	}
	return semverVersion
}

func GetJndiLookupHash(zipReader *zip.Reader, filePath string) (fileHash string) {
	reader, err := zipReader.Open(constants.JndiLookupClasspath)
	if err != nil {
		log.Debug().
			Str("fieName", constants.JndiLookupClasspath).
			Str("path", filePath).
			Err(err).
			Msg("cannot find file in zip")
		return
	}
	defer reader.Close()

	fileHash, err = util.HexEncodedSha256FromReader(reader)
	if err != nil {
		log.Debug().
			Str("fieName", constants.JndiLookupClasspath).
			Str("path", filePath).
			Err(err).
			Msg("unable to hash JndiLookup.class file")
		return
	}
	return
}

func ProcessArchiveFile(zipReader *zip.Reader, reader io.Reader, filePath, fileName string) (finding *types.Finding) {
	var (
		jndiLookupFileHash string
	)

	_, file := path.Split(filePath)
	fileNameNoExt := strings.TrimSuffix(file, path.Ext(file))

	// small adjustments to the version so that it can be parsed as semver
	semverVersion := fileNameToSemver(fileNameNoExt)

	versionCve := ""

	for _, fileVersionCheck := range constants.FileVersionChecks {
		if versionIsInRange(fileNameNoExt, semverVersion, fileVersionCheck.SemverRange) {
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

	if versionIsInRange(fileNameNoExt, semverVersion, constants.JndiLookupPatchFileVersions) {
		jndiLookupFileHash = GetJndiLookupHash(zipReader, filePath)
	}

	log.Log().
		Str("path", filePath).
		Str("fileName", fileName).
		Str("fileHash", fileHash).
		Str("jndiLookupFileName", constants.JndiLookupClasspath).
		Str("jndiLookupFileHash", jndiLookupFileHash).
		Msg("identified library version")

	finding = &types.Finding{
		Path:        filePath,
		FileName:    fileName,
		Hash:        fileHash,
		JndiLookupFileName:    constants.JndiLookupClasspath,
		JndiLookupHash:        jndiLookupFileHash,
		Version: semverVersion,
		CVE: versionCve,
		Severity: constants.CveSeverityLookup[versionCve],
	}
	return
}
