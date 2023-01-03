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
package scan

import (
	"github.com/blang/semver/v4"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/constants"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/types"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/util"
	"github.com/rs/zerolog/log"
	"io"
	"path/filepath"
	"strings"
)

func IdentifyPotentiallyVulnerableFiles(scanLog4j1 bool, archiveHashLookup types.VulnerableHashLookup) types.ProcessArchiveFile {
	hashLookup := FilterVulnerableHashLookup(archiveHashLookup, scanLog4j1)

	return func(resolveArchiveFile types.ResolveArchiveFile, reader io.Reader, path, fileName string) (finding *types.Finding) {
		return identifyPotentiallyVulnerableFile(resolveArchiveFile, reader, path, fileName, hashLookup)
	}
}

func isVulnerableIfContainsJndiLookup(versions []string) bool {
	for _, version := range versions {
		semverVersion, err := semver.Parse(version)
		if err != nil {
			continue
		}

		if constants.JndiLookupPatchFileVersions(semverVersion) {
			return true
		}
	}
	return false
}

func GetJndiLookupHash(
	resolveArchiveFile types.ResolveArchiveFile,
	filePath string,
) (fileHash string) {
	reader, err := resolveArchiveFile(constants.JndiLookupClasspath)
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

func identifyPotentiallyVulnerableFile(
	resolveArchiveFile types.ResolveArchiveFile,
	reader io.Reader,
	path, fileName string,
	hashLookup types.VulnerableHashLookup,
) (finding *types.Finding) {
	fileHash, err := util.HexEncodedSha256FromReader(reader)
	if err != nil {
		log.Warn().
			Str("fileName", fileName).
			Str("path", path).
			Err(err).
			Msg("Unable to hash file")
		return
	}

	if strings.HasSuffix(fileName, "JndiLookup.class") {
		log.Debug().
			Str("fileName", fileName).
			Str("fileHash", fileHash).
			Msg("Scanning a JndiLookup.class file")
	}

	if vulnerableFile, ok := hashLookup[fileHash]; ok {
		severity, ok := constants.CveSeverityLookup[vulnerableFile.CVE]
		if !ok {
			log.Warn().
				Str("CVE", vulnerableFile.CVE).
				Msg("No severity provided for CVE")
		}

		versions := strings.Split(vulnerableFile.Version, ", ")
		patchableVersion := isVulnerableIfContainsJndiLookup(versions)

		jndiLookupFileHash := GetJndiLookupHash(resolveArchiveFile, path)
		if jndiLookupFileHash != "" {
			if _, ok := vulnerableFile.VulnerableFileHashLookup[jndiLookupFileHash]; !ok {
				log.Warn().
					Str("path", path).
					Str("jndiLookupFileName", constants.JndiLookupClasspath).
					Str("jndiLookupHash", jndiLookupFileHash).
					Msg("Discovered JndiLookup.class file is not a known vulnerable file. Patching this file out might have some unintended side effects.")
			}
		} else {
			if patchableVersion {
				log.Warn().
					Str("path", path).
					Str("jndiLookupFileName", constants.JndiLookupClasspath).
					Str("jndiLookupHash", jndiLookupFileHash).
					Msg("Library has been patched of the Log4Shell vulnerability.")
				return
			}
		}

		log.Log().
			Str("severity", severity).
			Str("path", path).
			Str("versionIndicatorFileName", fileName).
			Str("versionIndicatorHash", fileHash).
			Str("jndiLookupFileName", constants.JndiLookupClasspath).
			Str("jndiLookupHash", jndiLookupFileHash).
			Str("versionInfo", vulnerableFile.Version).
			Str("cve", vulnerableFile.CVE).
			Msg("Identified vulnerable path")

		absolutePath, err := filepath.Abs(path)
		if err != nil {
			log.Warn().
				Str("fileName", fileName).
				Str("path", path).
				Err(err).
				Msg("Unable to resolve absolute path to file")
		}

		finding = &types.Finding{
			Path:               absolutePath,
			FileName:           fileName,
			Hash:               fileHash,
			JndiLookupFileName: constants.JndiLookupClasspath,
			JndiLookupHash:     jndiLookupFileHash,
			Version:            vulnerableFile.Version,
			CVE:                vulnerableFile.CVE,
			Severity:           severity,
		}
		return
	}
	return
}
