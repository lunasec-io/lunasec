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
	"archive/zip"
	"bytes"
	"github.com/lunasec-io/lunasec/tools/log4shell/constants"
	"github.com/lunasec-io/lunasec/tools/log4shell/types"
	"github.com/lunasec-io/lunasec/tools/log4shell/util"
	"github.com/rs/zerolog/log"
	"io"
	"io/ioutil"
	"os"
)

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

	if vulnerableHash, ok := hashLookup[fileHash]; ok {
		log.Info().
			Str("severity", vulnerableHash.Severity).
			Str("path", path).
			Str("fileName", fileName).
			Str("versionInfo", vulnerableHash.Name).
			Str("cve", vulnerableHash.CVE).
			Msg("identified vulnerable path")

		finding = &types.Finding{
			Path:        path,
			FileName:    fileName,
			Hash:        fileHash,
			VersionInfo: vulnerableHash.Name,
			CVE:         vulnerableHash.CVE,
		}
		return
	}
	return
}

func scanArchiveFile(path string, file *zip.File) (finding *types.Finding) {
	reader, err := file.Open()
	if err != nil {
		log.Warn().
			Str("classFile", file.Name).
			Str("path", path).
			Err(err).
			Msg("unable to open class file")
		return
	}
	return identifyPotentiallyVulnerableFile(reader, path, file.Name, constants.KnownVulnerableClassFileHashes)
}

func scanArchive(path string, file *zip.File, onlyScanArchives bool) (findings []types.Finding) {
	reader, err := file.Open()
	if err != nil {
		log.Warn().
			Str("classFile", file.Name).
			Str("path", path).
			Err(err).
			Msg("unable to open archive")
		return
	}
	defer reader.Close()

	buffer, err := ioutil.ReadAll(reader)
	if err != nil {
		log.Warn().
			Str("classFile", file.Name).
			Str("path", path).
			Err(err).
			Msg("unable to read archive")
		return
	}

	newPath := path + "::" + file.Name
	archiveReader := bytes.NewReader(buffer)
	archiveSize := int64(len(buffer))

	return scanArchiveForVulnerableFiles(newPath, archiveReader, archiveSize, onlyScanArchives)
}

func scanFile(path string, file *zip.File, onlyScanArchives bool) (findings []types.Finding) {
	fileExt := util.FileExt(file.Name)
	switch fileExt {
	case constants.ClassFileExt:
		if onlyScanArchives {
			return
		}

		finding := scanArchiveFile(path, file)
		if finding != nil {
			findings = []types.Finding{*finding}
		}
		return
	case constants.JarFileExt, constants.WarFileExt:
		if onlyScanArchives {
			finding := scanArchiveFile(path, file)
			if finding != nil {
				findings = []types.Finding{*finding}
			}
			return
		}
		return scanArchive(path, file, onlyScanArchives)
	}
	return
}

func scanArchiveForVulnerableFiles(path string, reader io.ReaderAt, size int64, onlyScanArchives bool) (findings []types.Finding) {
	zipReader, err := zip.NewReader(reader, size)
	if err != nil {
		log.Warn().
			Str("path", path).
			Err(err).
			Msg("unable to open archive")
		return
	}

	for _, zipFile := range zipReader.File {
		log.Debug().
			Str("path", path).
			Str("file", zipFile.Name).
			Msg("scanning nested archive")
		locatedFindings := scanFile(path, zipFile, onlyScanArchives)
		findings = append(findings, locatedFindings...)
	}
	return
}

func scanLocatedArchive(path string, info os.FileInfo, onlyScanArchives bool) (findings []types.Finding) {
	file, err := os.Open(path)
	if err != nil {
		log.Warn().
			Str("path", path).
			Err(err).
			Msg("unable to open archive")
		return
	}
	defer file.Close()

	finding := identifyPotentiallyVulnerableFile(file, path, file.Name(), constants.KnownVulnerableArchiveFileHashes)
	if finding != nil {
		return []types.Finding{*finding}
	}

	return scanArchiveForVulnerableFiles(path, file, info.Size(), onlyScanArchives)
}

// SearchDirsForVulnerableClassFiles walks each search dir looking for .class files in archives which have a hash
// matching a known vulnerable file hash. The search will also recursively crawl nested archives while searching.
// This function by default will scan class files, but can also be configured to only scan and match for vulnerable
// java archives.
func SearchDirsForVulnerableClassFiles(searchDirs []string, onlyScanArchives bool) (findings []types.Finding) {
	locatedFileCallback := func(path string, info os.FileInfo, accessError error) (err error) {
		if accessError != nil {
			log.Warn().
				Str("path", path).
				Err(accessError).
				Msg("unable to access file")
			return
		}

		if info.IsDir() {
			return
		}

		fileExt := util.FileExt(path)
		switch fileExt {
		case constants.JarFileExt, constants.WarFileExt:
			log.Debug().
				Str("path", path).
				Msg("scanning archive")

			locatedFindings := scanLocatedArchive(path, info, onlyScanArchives)
			findings = append(findings, locatedFindings...)
		}
		return
	}

	util.SearchDirs(searchDirs, locatedFileCallback)
	return
}
