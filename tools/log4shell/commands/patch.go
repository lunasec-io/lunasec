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
package commands

import (
	"archive/zip"
	"encoding/json"
	"fmt"
	"github.com/lunasec-io/lunasec/tools/log4shell/scan"
	"github.com/lunasec-io/lunasec/tools/log4shell/types"
	"github.com/lunasec-io/lunasec/tools/log4shell/util"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
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

	hashLookup, err = loadHashLookup(log4jLibraryHashes, "", false)
	if err != nil {
		return
	}

	processArchiveFile := scan.IdentifyPotentiallyVulnerableFiles(false, hashLookup)

	scanner := scan.NewLog4jDirectoryScanner(
		excludeDirs, false, noFollowSymlinks, processArchiveFile)

	findings = scanner.Scan(searchDirs)
	return
}

func loadOrScanForFindings(
	c *cli.Context,
	log4jLibraryHashes []byte,
) (findings []types.Finding, err error) {
	findingsFile := c.String("findings")
	if findingsFile != "" {
		var (
			findingsContent []byte
			findingsOutput types.FindingsOutput
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

func askIfShouldSkipPatch(msg string) (shouldSkip, forcePatch bool) {
	var (
		patchPromptResp string
	)

	for {
		fmt.Printf("Are you sure you want to patch: %s? (y)es/(n)o/(a)ll: ", msg)
		_, err := fmt.Scan(&patchPromptResp)
		if err != nil {
			log.Error().
				Err(err).
				Msg("Unable to process response.")
			return true, false
		}
		fmt.Println()

		switch patchPromptResp {
		case "y":
			shouldSkip = false
		case "n":
			shouldSkip = true
		case "a":
			forcePatch = true
		default:
			fmt.Printf("Option %s is not valid, please enter 'y', 'n', or 'a'.\n", patchPromptResp)
			continue
		}
		break
	}
	return
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

func filterOutJndiLookupFromZip(
	finding types.Finding,
	zipReader *zip.Reader,
	writer *zip.Writer,
) error {
	for _, member := range zipReader.File {
		if member.Name == finding.JndiLookupFileName {
			shouldSkip := false

			log.Debug().
				Str("path", finding.Path).
				Str("zipFilePath", finding.JndiLookupFileName).
				Msg("Found file to remove in order to patch log4j library.")

			hash := getHashOfZipMember(member)
			if hash != finding.JndiLookupHash {
				shouldSkip, _ = askIfShouldSkipPatch(
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
			fmt.Println(member.Name, member.FileInfo().IsDir())
			fmt.Printf("%+v\n", member.FileHeader)
		}


		if err := writer.Copy(member); err != nil {
			log.Error().
				Err(err).
				Msg("Error while copying zip file.")
			return err
		}
	}
	return nil
}

func patchJavaArchive(finding types.Finding, dryRun bool) (err error) {
	var (
		libraryFile *os.File
		zipReader   *zip.Reader
	)

	zipPaths := strings.Split(finding.Path, "::")
	var zipReaders []*zip.Reader

	libraryFile, err = os.Open(zipPaths[0])
	if err != nil {
		log.Error().
			Str("path", finding.Path).
			Err(err).
			Msg("Unable to open findings archive")
		return
	}
	defer libraryFile.Close()

	info, _ := os.Stat(finding.Path)
	zipSize := info.Size()

	for _, zipPath := range zipPaths {
		nestedZip, err := zipReader.Open(zipPath)

		nestedZip.

		zipReader, err = zip.NewReader(libraryFile, zipSize)
		if err != nil {
			log.Error().
				Str("path", finding.Path).
				Str("zipPath", zipPath).
				Err(err).
				Msg("Unable to open archive for patching")
			return
		}
		zipReaders = append(zipReaders, zipReader)
	}

	outZip, err := ioutil.TempFile(os.TempDir(), "*.zip")
	if err != nil {
		log.Error().
			Str("tmpDir", os.TempDir()).
			Err(err).
			Msg("Unable to create temporary libraryFile")
		return
	}
	defer os.Remove(outZip.Name())

	writer := zip.NewWriter(outZip)
	defer writer.Close()

	err = filterOutJndiLookupFromZip(finding, zipReader, writer)
	if err != nil {
		return
	}

	writer.Close()

	if err = libraryFile.Close(); err != nil {
		log.Error().
			Str("outZipName", outZip.Name()).
			Str("libraryFileName", finding.Path).
			Err(err).
			Msg("Unable to close library file.")
		return
	}

	if err = outZip.Close(); err != nil {
		log.Error().
			Str("outZipName", outZip.Name()).
			Str("libraryFileName", finding.Path).
			Err(err).
			Msg("Unable to close output zip.")
		return
	}

	if dryRun {
		log.Info().
			Str("library", finding.Path).
			Msg("[Dry Run] Not completing patch process of overwriting existing library.")
		return
	}

	_, err = util.CopyFile(outZip.Name(), finding.Path)
	if err != nil {
		log.Error().
			Str("outZipName", outZip.Name()).
			Str("libraryFileName", finding.Path).
			Err(err).
			Msg("Unable to replace library file with patched library file.")
		return
	}
	return
}

func JavaArchivePatchCommand(
	c *cli.Context,
	globalBoolFlags map[string]bool,
	log4jLibraryHashes []byte,
) error {
	enableGlobalFlags(c, globalBoolFlags)

	findings, err := loadOrScanForFindings(c, log4jLibraryHashes)
	if err != nil {
		return err
	}

	log.Info().
		Int("findingsCount", len(findings)).
		Msg("Patching found vulnerable Log4j libraries.")

	forcePatch := c.Bool("force-patch")
	dryRun := c.Bool("dry-run")

	var patchedLibraries []string

	for _, finding := range findings {
		var (
			shouldSkip bool
		)

		if finding.JndiLookupFileName == "" {
			log.Warn().
				Str("path", finding.Path).
				Err(err).
				Msg("Finding does not have JndiLookup.class file to patch")
			continue
		}

		if !forcePatch {
			shouldSkip, forcePatch = askIfShouldSkipPatch(finding.Path)
			if !forcePatch && shouldSkip {
				log.Info().
					Str("findingPath", finding.Path).
					Msg("Skipping library for patching")
				continue
			}
		}

		err = patchJavaArchive(finding, dryRun)
		if err != nil {
			continue
		}
		patchedLibraries = append(patchedLibraries, finding.Path)
	}

	log.Info().
		Strs("patchedLibraries", patchedLibraries).
		Msg("Successfully patched libraries.")
	return nil
}
