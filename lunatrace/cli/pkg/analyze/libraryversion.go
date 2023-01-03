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
	"github.com/blang/semver/v4"
	"github.com/rs/zerolog/log"
	"path"
	"regexp"
	"strings"
)

var alphaRegex = regexp.MustCompile("([a-z]+)")

func VersionIsInRange(fileName string, semverVersion string, semverRange semver.Range) bool {
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

func ArchiveNameToSemverVersion(filename string) string {
	fileNameNoExt := strings.TrimSuffix(filename, path.Ext(filename))
	fileNameParts := strings.Split(fileNameNoExt, "-")

	var tag, semverVersion string
	for i := len(fileNameParts) - 1; i >= 0; i-- {
		fileNamePart := fileNameParts[i]
		if (strings.HasPrefix(fileNamePart, "1") ||
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
