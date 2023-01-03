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
package patch

import (
	"archive/zip"
	"encoding/json"
	"fmt"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/scan"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/types"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/util"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
	"io"
	"io/ioutil"
	"os"
	"strings"
)

func scanForFindings(
	log4jLibraryHashes []byte,
	searchDirs []string,
	excludeDirs []string,
	noFollowSymlinks bool,
) (findings []types.Finding, err error) {
	var (
		hashLookup types.VulnerableHashLookup
	)

	hashLookup, err = scan.LoadHashLookup(log4jLibraryHashes, "", false)
	if err != nil {
		return
	}

	processArchiveFile := scan.IdentifyPotentiallyVulnerableFiles(false, hashLookup)

	scanner := scan.NewLog4jDirectoryScanner(
		excludeDirs, false, noFollowSymlinks, processArchiveFile)

	findings = scanner.Scan(searchDirs)
	return
}

func LoadOrScanForFindings(
	c *cli.Context,
	log4jLibraryHashes []byte,
) (findings []types.Finding, err error) {
	findingsFile := c.String("findings")
	if findingsFile != "" {
		var (
			findingsContent []byte
			findingsOutput  types.FindingsOutput
		)

		findingsContent, err = ioutil.ReadFile(findingsFile)
		if err != nil {
			log.Error().
				Err(err).
				Str("findings", findingsFile).
				Msg("Unable to open and read findings file")
			return
		}

		err = json.Unmarshal(findingsContent, &findingsOutput)
		if err != nil {
			log.Error().
				Err(err).
				Str("findings", findingsFile).
				Msg("Unable to unmarshal findings file")
			return
		}
		findings = findingsOutput.VulnerableLibraries
		return
	}

	searchDirs := c.Args().Slice()

	excludeDirs := c.StringSlice("exclude")
	noFollowSymlinks := c.Bool("no-follow-symlinks")

	log.Info().
		Strs("searchDirs", searchDirs).
		Strs("excludeDirs", excludeDirs).
		Msg("Scanning directories for vulnerable Log4j libraries.")

	return scanForFindings(log4jLibraryHashes, searchDirs, excludeDirs, noFollowSymlinks)
}

func getHashOfZipMember(member *zip.File) (hash string) {
	memberReader, err := member.Open()
	if err != nil {
		log.Warn().
			Err(err).
			Str("name", member.Name).
			Msg("Unable to open zip member")
		return
	}
	defer memberReader.Close()

	hash, err = util.HexEncodedSha256FromReader(memberReader)
	if err != nil {
		log.Warn().
			Err(err).
			Str("name", member.Name).
			Msg("Unable to hash zip member")
		return
	}
	return
}

func getNestedZipReader(zipReader *zip.Reader, zipPath string) (nestedZipReader *zip.Reader, err error) {
	if zipPath == "" {
		nestedZipReader = zipReader
		return
	}

	nestedZip, err := zipReader.Open(zipPath)
	if err != nil {
		log.Error().Err(err).Str("zipPath", zipPath).Msg("Unable to open nested zip path")
		return
	}
	defer nestedZip.Close()

	info, err := nestedZip.Stat()
	if err != nil {
		log.Error().Err(err).Str("zipPath", zipPath).Msg("Unable to stat nested zip")
		return
	}

	nestedZipReader, err = util.NewZipFromReader(nestedZip, info.Size())
	if err != nil {
		log.Error().Err(err).Str("zipPath", zipPath).Msg("Unable to create new zip reader")
		return
	}
	return
}

func head(s []string) string {
	if len(s) > 0 {
		return s[0]
	}
	return ""
}

func tail(s []string) []string {
	if len(s) > 1 {
		return s[1:]
	}
	return []string{}
}

func addFileToZip(zipWriter *zip.Writer, existingHeader zip.FileHeader, filename string) (err error) {
	defer zipWriter.Flush()

	fileToZip, err := os.Open(filename)
	if err != nil {
		log.Error().
			Err(err).
			Str("filename", filename).
			Msg("Unable to open file")
		return
	}
	defer fileToZip.Close()

	// Get the file information
	info, err := fileToZip.Stat()
	if err != nil {
		log.Error().
			Err(err).
			Str("filename", filename).
			Msg("Unable to stat file")
		return
	}

	existingHeader.UncompressedSize64 = uint64(info.Size())

	writer, err := zipWriter.CreateHeader(&existingHeader)
	if err != nil {
		log.Error().
			Err(err).
			Str("filename", filename).
			Msg("Unable to create zip header")
		return
	}

	_, err = io.Copy(writer, fileToZip)
	if err != nil {
		log.Error().
			Err(err).
			Str("filename", filename).
			Msg("Unable to copy file contents to zip writer")
		return
	}
	return
}

func filterOutJndiLookupFromZip(
	finding types.Finding,
	zipReader *zip.Reader,
	nestedPaths []string,
	zipWriter *zip.Writer,
	existingHeader zip.FileHeader,
) (filename string, err error) {
	validOutputFile := false

	outZip, err := ioutil.TempFile(os.TempDir(), "*.zip")
	if err != nil {
		log.Error().
			Str("tmpDir", os.TempDir()).
			Err(err).
			Msg("Unable to create temporary libraryFile")
		return
	}
	defer func() {
		outZip.Close()
		if !validOutputFile {
			os.Remove(outZip.Name())
		}
	}()

	nestedZipWriter := zip.NewWriter(outZip)
	defer nestedZipWriter.Close()

	err = copyAndFilterFilesFromZip(finding, zipReader, nestedZipWriter, nestedPaths)
	if err != nil {
		return
	}

	if zipWriter == nil {
		filename = outZip.Name()
		validOutputFile = true
		return
	}

	nestedZipWriter.Close()
	outZip.Close()

	err = addFileToZip(zipWriter, existingHeader, outZip.Name())
	if err != nil {
		return
	}
	return
}

func copyAndFilterFilesFromZip(
	finding types.Finding,
	zipReader *zip.Reader,
	writer *zip.Writer,
	nestedPaths []string,
) (err error) {
	defer writer.Flush()

	nestedPath := head(nestedPaths)
	for _, member := range zipReader.File {
		if member.Name == nestedPath {
			var nestedZipReader *zip.Reader

			nestedZipReader, err = getNestedZipReader(zipReader, nestedPath)
			if err != nil {
				return
			}

			_, err = filterOutJndiLookupFromZip(finding, nestedZipReader, tail(nestedPaths), writer, member.FileHeader)
			if err != nil {
				return
			}
			continue
		}

		if len(nestedPaths) == 0 && member.Name == finding.JndiLookupFileName {
			shouldSkip := false

			log.Debug().
				Str("path", finding.Path).
				Str("zipFilePath", finding.JndiLookupFileName).
				Msg("Found file to remove in order to patch log4j library.")

			hash := getHashOfZipMember(member)
			if hash != finding.JndiLookupHash {
				shouldSkip, _ = AskIfShouldSkipPatch(
					fmt.Sprintf(
						"located JndiLookup.class file hash does not match expected finding hash: \"%s\" != \"%s\" . Patching might result in unintended side effects.",
						hash, finding.JndiLookupHash,
					),
				)
			}

			if !shouldSkip {
				continue
			}

			log.Info().
				Str("findingPath", finding.Path).
				Msg("Skipping library for patching")
		}

		if member.FileInfo().IsDir() {
			_, err = writer.Create(member.Name)
			if err != nil {
				log.Error().
					Err(err).
					Str("memberName", member.Name).
					Str("member", fmt.Sprintf("%+v", member.FileHeader)).
					Msg("Error while copying zip dir.")
				return
			}
			continue
		}

		err = writer.Copy(member)
		if err != nil {
			log.Error().
				Err(err).
				Str("memberName", member.Name).
				Str("member", fmt.Sprintf("%+v", member.FileHeader)).
				Msg("Error while copying zip file.")
			return
		}
	}
	return
}

func ProcessJavaArchive(finding types.Finding, dryRun, backup bool) (err error) {
	var (
		libraryFile *os.File
		zipReader   *zip.Reader
	)

	zipPaths := strings.Split(finding.Path, "::")

	fsFile := head(zipPaths)

	libraryFile, err = os.Open(fsFile)
	if err != nil {
		log.Error().
			Str("path", finding.Path).
			Err(err).
			Msg("Unable to open findings archive")
		return
	}
	defer libraryFile.Close()

	info, err := os.Stat(fsFile)
	if err != nil {
		log.Error().
			Str("path", finding.Path).
			Err(err).
			Msg("Cannot stat file.")
		return
	}

	zipReader, err = zip.NewReader(libraryFile, info.Size())
	if err != nil {
		log.Error().
			Str("path", finding.Path).
			Err(err).
			Msg("Cannot create new zip reader for file.")
		return
	}

	filteredLibrary, err := filterOutJndiLookupFromZip(finding, zipReader, tail(zipPaths), nil, zip.FileHeader{})
	if err != nil {
		return
	}

	if dryRun {
		log.Info().
			Str("libraryFileName", fsFile).
			Str("fullPathToLibrary", finding.Path).
			Msg("[Dry Run] Not completing patch process of overwriting existing library.")
		return
	}

	if backup {
		backupFilePath := fsFile + ".bak"
		log.Info().
			Str("libraryFileName", fsFile).
			Str("backupFileName", backupFilePath).
			Msg("Backing up library file before overwritting.")
		_, err = util.CopyFile(fsFile, backupFilePath)
		if err != nil {
			log.Error().
				Str("libraryFileName", fsFile).
				Str("backupFileName", backupFilePath).
				Err(err).
				Msg("Unable to backup library file.")
			return
		}
	}

	_, err = util.CopyFile(filteredLibrary, fsFile)
	if err != nil {
		log.Error().
			Str("outZipName", filteredLibrary).
			Str("libraryFileName", fsFile).
			Str("fullPathToLibrary", finding.Path).
			Err(err).
			Msg("Unable to replace library file with patched library file.")
		return
	}
	return
}
