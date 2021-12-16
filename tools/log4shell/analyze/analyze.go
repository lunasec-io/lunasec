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
	"github.com/blang/semver/v4"
	"github.com/lunasec-io/lunasec/tools/log4shell/constants"
	"github.com/lunasec-io/lunasec/tools/log4shell/types"
	"github.com/lunasec-io/lunasec/tools/log4shell/util"
	"github.com/rs/zerolog/log"
	"io"
	"path"
	"strings"
)

func isVersionALog4ShellVersion(semverVersion string) bool {
	version, _ := semver.Make(semverVersion)

	vulnerableRange, _ := semver.ParseRange(">=2.0.0-beta9 <=2.14.1")
	if vulnerableRange(version) {
		return true
	}
	return false
}

func isVersionACVE202145046Version(semverVersion string) bool {
	version, _ := semver.Make(semverVersion)

	vulnerableRange, _ := semver.ParseRange("=2.15.0")
	if vulnerableRange(version) {
		return true
	}
	return false
}

func isVersionACVE201917571Version(semverVersion string) bool {
	version, _ := semver.Make(semverVersion)

	vulnerableRange, _ := semver.ParseRange(">=1.2.0 <=1.2.17")
	if vulnerableRange(version) {
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

func ProcessArchiveFile(reader io.Reader, filePath, fileName string) (finding *types.Finding) {
	_, file := path.Split(filePath)
	version := strings.TrimSuffix(file, path.Ext(file))

	// small adjustments to the version so that it can be parsed as semver
	semverVersion := strings.Replace(version, "log4j-core-", "", -1)
	semverVersion = strings.Replace(semverVersion, "logging-log4j-", "", -1)
	semverVersion = strings.Replace(semverVersion, "jakarta-log4j-", "", -1)
	semverVersion = strings.Replace(semverVersion, "log4j-", "", -1)

	semverVersion = adjustMissingPatchVersion(semverVersion)

	versionCve := ""

	if isVersionALog4ShellVersion(semverVersion) {
		if !strings.Contains(fileName, "JndiLookup.class") {
			return
		}
		versionCve = constants.Log4ShellCve
	}

	if isVersionACVE202145046Version(semverVersion) {
		if !strings.Contains(fileName, "JndiManager$JndiManagerFactory.class") {
			return
		}
		versionCve = constants.CtxCve
	}

	if isVersionACVE201917571Version(semverVersion) {
		if !strings.Contains(fileName, "SocketNode.class") {
			return
		}
		versionCve = constants.Log4j1RceCve
	}

	if versionCve == "" {
		return
	}

	fileHash, err := util.HexEncodedSha256FromReader(reader)
	if err != nil {
		log.Warn().
			Str("fieName", fileName).
			Str("path", filePath).
			Err(err).
			Msg("unable to hash file")
		return
	}

	log.Log().
		Str("path", filePath).
		Str("fileName", fileName).
		Str("fileHash", fileHash).
		Msg("identified library version")

	if versionCve == "" {
		log.Debug().
			Str("hash", fileHash).
			Str("version", version).
			Msg("Skipping version as it is not vulnerable to any known CVE")
		return nil
	}

	finding = &types.Finding{
		Path:        filePath,
		FileName:    fileName,
		Hash:        fileHash,
		Version: semverVersion,
		CVE: versionCve,
	}
	return
}
