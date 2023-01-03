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
	"archive/zip"
	"bytes"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/constants"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/types"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/util"
	"github.com/rs/zerolog/log"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

type Log4jVulnerableDependencyScanner interface {
	Scan(searchDirs []string) (findings []types.Finding)
	ScanFiles(files []string) (findings []types.Finding)
}

type Log4jDirectoryScanner struct {
	excludeDirs        []string
	onlyScanArchives   bool
	noFollowSymlinks   bool
	processArchiveFile types.ProcessArchiveFile
}

func NewLog4jDirectoryScanner(
	excludeDirs []string,
	onlyScanArchives bool,
	noFollowSymlinks bool,
	processArchiveFile types.ProcessArchiveFile,
) Log4jVulnerableDependencyScanner {
	return &Log4jDirectoryScanner{
		excludeDirs:        excludeDirs,
		onlyScanArchives:   onlyScanArchives,
		noFollowSymlinks:   noFollowSymlinks,
		processArchiveFile: processArchiveFile,
	}
}

func (s *Log4jDirectoryScanner) locatedFileCallback(reportFindings chan<- types.Finding) filepath.WalkFunc {
	return func(path string, info os.FileInfo, accessError error) (err error) {
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

		if !s.noFollowSymlinks && info.Mode()&os.ModeSymlink != 0 {
			// overwrite path and info with the resolved symlink file values
			path, info, err = util.ResolveSymlinkFilePathAndInfo(path)
			if err != nil {
				return nil
			}
		}

		fileExt := util.FileExt(path)
		switch fileExt {
		case constants.JarFileExt,
			constants.WarFileExt,
			constants.EarFileExt:
			log.Debug().
				Str("path", path).
				Msg("scanning archive")

			locatedFindings := s.scanLocatedArchive(path, info)
			for _, finding := range locatedFindings {
				reportFindings <- finding
			}
		}
		return
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
	reportFindings := make(chan types.Finding)
	callback := s.locatedFileCallback(reportFindings)

	go func() {
		util.SearchDirs(searchDirs, callback)
		close(reportFindings)
	}()

	for finding := range reportFindings {
		findings = append(findings, finding)
	}
	return
}

func (s *Log4jDirectoryScanner) ScanFiles(
	files []string,
) (findings []types.Finding) {
	reportFindings := make(chan types.Finding)
	callback := s.locatedFileCallback(reportFindings)

	go func() {
		defer close(reportFindings)

		for _, file := range files {
			if !strings.HasPrefix(file, "/") {
				continue
			}

			fileInfo, err := os.Stat(file)
			if err != nil {
				log.Warn().
					Str("file", file).
					Err(err).
					Msg("Unable to stat file")
				continue
			}

			err = callback(file, fileInfo, nil)
			if err != nil {
				log.Warn().
					Str("file", file).
					Err(err).
					Msg("Unable to scan file")
				continue
			}
		}
	}()

	for finding := range reportFindings {
		findings = append(findings, finding)
	}
	return findings
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
		finding := identifyPotentiallyVulnerableFile(nil, file, path, file.Name(), constants.KnownVulnerableArchiveFileHashes)
		if finding != nil {
			return []types.Finding{*finding}
		}
	}

	reader, offset, err := readerAtStartOfArchive(path, file)
	if err != nil {
		return
	}

	// Close the file if the reader has changed
	if file != reader {
		file.Close()
	}

	return s.scanArchiveForVulnerableFiles(path, reader, info.Size()-offset)
}

func (s *Log4jDirectoryScanner) getFilesToScan(
	path string,
	size int64,
	zipReader *zip.Reader,
) (filesToScan []types.FileToScan, cleanup func(), err error) {
	if size > 1024*1024*1024 {
		var (
			tmpPath   string
			filenames []string
		)

		_, name := filepath.Split(path)
		tmpPath, err = os.MkdirTemp(os.TempDir(), name)
		if err != nil {
			log.Warn().
				Str("path", path).
				Err(err).
				Msg("unable to create temporary path")
			return
		}
		util.EnsureDirIsCleanedUp(tmpPath)
		cleanup = func() {
			os.RemoveAll(tmpPath)
			util.RemoveDirFromCleanup(tmpPath)
		}

		filenames, err = util.Unzip(zipReader, tmpPath)
		if err != nil {
			log.Warn().
				Str("path", path).
				Err(err).
				Msg("unable to unzip file")
			return
		}

		for _, file := range filenames {
			dir, extractedFilename := filepath.Split(file)

			fileToScan := &types.DiskFileToScan{
				Filename: extractedFilename,
				Path:     dir,
			}
			filesToScan = append(filesToScan, fileToScan)
		}
		return
	}

	for _, zipFile := range zipReader.File {
		fileToScan := &types.ZipFileToScan{
			File: zipFile,
		}
		filesToScan = append(filesToScan, fileToScan)
	}
	return
}

func (s *Log4jDirectoryScanner) scanArchiveForVulnerableFiles(
	path string,
	reader types.ReaderAtCloser,
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

	filesToScan, cleanup, err := s.getFilesToScan(path, size, zipReader)
	if err != nil {
		return
	}

	resolveArchiveFile := util.ResolveZipFile(zipReader)

	// if cleanup is specified, then we are reading files from disk
	// and should close the current zip reader to free up space,
	// set our archive reader to read files from disk, and defer
	// a call to cleanup to remove all temporary extracted files
	if cleanup != nil {
		reader.Close()
		resolveArchiveFile = util.ResolveDiskFile
		defer cleanup()
	}

	for _, fileToScan := range filesToScan {
		locatedFindings := s.scanFile(resolveArchiveFile, path, fileToScan)
		findings = append(findings, locatedFindings...)
	}
	return
}

func (s *Log4jDirectoryScanner) scanFile(
	resolveArchiveFile types.ResolveArchiveFile,
	path string,
	file types.FileToScan,
) (findings []types.Finding) {
	//log.Debug().
	//	Str("path", path).
	//	Str("file", file.Name).
	//	Msg("Scanning archive file")

	fileExt := util.FileExt(file.Name())
	switch fileExt {
	case constants.ClassFileExt:
		if s.onlyScanArchives {
			return
		}

		finding := s.scanArchiveFile(resolveArchiveFile, path, file)
		if finding != nil {
			findings = []types.Finding{*finding}
		}
		return
	case constants.JarFileExt,
		constants.WarFileExt,
		constants.ZipFileExt,
		constants.EarFileExt:
		if s.onlyScanArchives {
			finding := s.scanArchiveFile(resolveArchiveFile, path, file)
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
	resolveArchiveFile types.ResolveArchiveFile,
	path string,
	file types.FileToScan,
) (finding *types.Finding) {
	reader, err := file.Reader()
	if err != nil {
		log.Warn().
			Str("classFile", file.Name()).
			Str("path", path).
			Err(err).
			Msg("unable to open class file")
		return
	}
	defer reader.Close()

	return s.processArchiveFile(resolveArchiveFile, reader, path, file.Name())
}

func (s *Log4jDirectoryScanner) scanEmbeddedArchive(
	path string,
	file types.FileToScan,
) (findings []types.Finding) {
	reader, err := file.Reader()
	if err != nil {
		log.Warn().
			Str("classFile", file.Name()).
			Str("path", path).
			Err(err).
			Msg("unable to open embedded archive")
		return
	}
	defer reader.Close()

	buffer, err := ioutil.ReadAll(reader)
	if err != nil {
		log.Warn().
			Str("classFile", file.Name()).
			Str("path", path).
			Err(err).
			Msg("unable to read embedded archive")
		return
	}
	reader.Close()

	newPath := path + "::" + file.Name()
	archiveReader := types.NopReaderAtCloser(bytes.NewReader(buffer))
	archiveSize := int64(len(buffer))

	return s.scanArchiveForVulnerableFiles(newPath, archiveReader, archiveSize)
}
