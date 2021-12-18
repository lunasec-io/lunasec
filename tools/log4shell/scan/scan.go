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
	"path/filepath"
)


type Log4jVulnerableDependencyScanner interface {
	Scan(searchDirs []string) (findings []types.Finding)
}

type Log4jDirectoryScanner struct {
	excludeDirs []string
	onlyScanArchives bool
	noFollowSymlinks bool
	processArchiveFile types.ProcessArchiveFile
}

func NewLog4jDirectoryScanner(
	excludeDirs []string,
	onlyScanArchives bool,
	noFollowSymlinks bool,
	processArchiveFile types.ProcessArchiveFile,
) Log4jVulnerableDependencyScanner {
	return &Log4jDirectoryScanner{
		excludeDirs: excludeDirs,
		onlyScanArchives: onlyScanArchives,
		noFollowSymlinks: noFollowSymlinks,
		processArchiveFile: processArchiveFile,
	}
}

func (s *Log4jDirectoryScanner) shouldSkipPath(path string) bool {
	for _, excludeDir := range s.excludeDirs {
		if path == excludeDir {
			return true
		}
	}
	return false
}

// Scan walks each search dir looking for .class files in archives which have a hash
// matching a known vulnerable file hash. The search will also recursively crawl nested archives while searching.
// This function by default will scan class files, but can also be configured to only scan and match for vulnerable
// java archives.
func (s *Log4jDirectoryScanner) Scan(
	searchDirs []string,
) (findings []types.Finding) {
	locatedFileCallback := func(path string, info os.FileInfo, accessError error) (err error) {
		if s.shouldSkipPath(path) {
			return filepath.SkipDir
		}

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

		if !s.noFollowSymlinks && info.Mode() & os.ModeSymlink != 0 {
			// overwrite path and info with the resolved symlink file values
			path, info, err = util.ResolveSymlinkFilePathAndInfo(path)
			if err != nil {
				return nil
			}
		}

		fileExt := util.FileExt(path)
		switch fileExt {
		case constants.JarFileExt, constants.WarFileExt:
			log.Debug().
				Str("path", path).
				Msg("scanning archive")

			locatedFindings := s.scanLocatedArchive(path, info)
			findings = append(findings, locatedFindings...)
		}
		return
	}

	util.SearchDirs(searchDirs, locatedFileCallback)
	return
}

func (s *Log4jDirectoryScanner) scanLocatedArchive(
	path string,
	info os.FileInfo,
) (findings []types.Finding) {
	file, err := os.Open(path)
	if err != nil {
		log.Warn().
			Str("path", path).
			Err(err).
			Msg("unable to open located archive")
		return
	}
	defer file.Close()

	if s.onlyScanArchives {
		finding := identifyPotentiallyVulnerableFile(file, path, file.Name(), constants.KnownVulnerableArchiveFileHashes)
		if finding != nil {
			return []types.Finding{*finding}
		}
	}

	return s.scanArchiveForVulnerableFiles(path, file, info.Size())
}

func (s *Log4jDirectoryScanner) scanArchiveForVulnerableFiles(
	path string,
	reader io.ReaderAt,
	size int64,
) (findings []types.Finding) {
	zipReader, err := zip.NewReader(reader, size)
	if err != nil {
		log.Warn().
			Str("path", path).
			Err(err).
			Msg("unable to open archive for scanning")
		return
	}

	for _, zipFile := range zipReader.File {
		//log.Debug().
		//	Str("path", path).
		//	Str("file", zipFile.Name).
		//	Msg("scanning nested archive")
		locatedFindings := s.scanFile(path, zipFile)
		findings = append(findings, locatedFindings...)
	}
	return
}

func (s *Log4jDirectoryScanner) scanFile(
	path string,
	file *zip.File,
) (findings []types.Finding) {
	fileExt := util.FileExt(file.Name)
	switch fileExt {
	case constants.ClassFileExt:
		if s.onlyScanArchives {
			return
		}

		finding := s.scanArchiveFile(path, file)
		if finding != nil {
			findings = []types.Finding{*finding}
		}
		return
	case constants.JarFileExt, constants.WarFileExt, constants.ZipFileExt, constants.EarFileExt:
		if s.onlyScanArchives {
			finding := s.scanArchiveFile(path, file)
			if finding != nil {
				findings = []types.Finding{*finding}
			}
			return
		}
		return s.scanEmbeddedArchive(path, file)
	}
	return
}


func (s *Log4jDirectoryScanner) scanArchiveFile(
	path string,
	file *zip.File,
) (finding *types.Finding) {
	reader, err := file.Open()
	if err != nil {
		log.Warn().
			Str("classFile", file.Name).
			Str("path", path).
			Err(err).
			Msg("unable to open class file")
		return
	}
	return s.processArchiveFile(reader, path, file.Name)
}

func (s *Log4jDirectoryScanner) scanEmbeddedArchive(
	path string,
	file *zip.File,
) (findings []types.Finding) {
	reader, err := file.Open()
	if err != nil {
		log.Warn().
			Str("classFile", file.Name).
			Str("path", path).
			Err(err).
			Msg("unable to open embedded archive")
		return
	}
	defer reader.Close()

	buffer, err := ioutil.ReadAll(reader)
	if err != nil {
		log.Warn().
			Str("classFile", file.Name).
			Str("path", path).
			Err(err).
			Msg("unable to read embedded archive")
		return
	}

	newPath := path + "::" + file.Name
	archiveReader := bytes.NewReader(buffer)
	archiveSize := int64(len(buffer))

	return s.scanArchiveForVulnerableFiles(newPath, archiveReader, archiveSize)
}
