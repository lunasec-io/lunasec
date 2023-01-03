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
	"runtime"

	"github.com/prometheus/procfs"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"

	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/command"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/findings"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/types"
)

func scanSystemProcesses(scanner Log4jVulnerableDependencyScanner) (scannerFindings []types.Finding, err error) {
	os := runtime.GOOS
	switch os {
	case "linux":
		break
	default:
		log.Error().Msg("unsupported OS for system process scanning")
		return
	}

	fs, err := procfs.NewFS("/proc")
	if err != nil {
		log.Error().
			Err(err).
			Msg("Unable to setup procfs")
		return
	}

	procs, err := fs.AllProcs()
	if err != nil {
		log.Error().
			Err(err).
			Msg("Unable to get all processes")
		return
	}

	for _, proc := range procs {
		var targets []string

		targets, err = proc.FileDescriptorTargets()
		if err != nil {
			log.Debug().
				Int("proc", proc.PID).
				Err(err).
				Msg("Unable to process file descriptor targets")
			continue
		}

		processFindings := scanner.ScanFiles(targets)
		if len(processFindings) > 0 {
			log.Debug().
				Int("proc", proc.PID).
				Strs("targets", targets).
				Msg("Findings present in process file targets")
		}

		scannerFindings = append(scannerFindings, processFindings...)
	}
	return
}

func scanDirectoriesForVulnerableLibraries(
	c *cli.Context,
	searchDirs []string,
	log4jLibraryHashes []byte,
) (scannerFindings []types.Finding, err error) {
	log.Debug().
		Strs("directories", searchDirs).
		Msg("scanning directories")

	scanLog4j1 := c.Bool("include-log4j1")
	onlyScanArchives := c.Bool("archives")
	excludeDirs := c.StringSlice("exclude")
	versionHashes := c.String("version-hashes")
	noFollowSymlinks := c.Bool("no-follow-symlinks")
	scanProcesses := c.Bool("processes")

	hashLookup, err := LoadHashLookup(log4jLibraryHashes, versionHashes, onlyScanArchives)
	if err != nil {
		return
	}

	processArchiveFile := IdentifyPotentiallyVulnerableFiles(scanLog4j1, hashLookup)

	scanner := NewLog4jDirectoryScanner(
		excludeDirs, onlyScanArchives, noFollowSymlinks, processArchiveFile)

	if scanProcesses {
		return scanSystemProcesses(scanner)
	}

	log.Info().
		Strs("searchDirs", searchDirs).
		Strs("excludeDirs", excludeDirs).
		Msg("Scanning directories for vulnerable Log4j libraries.")

	scannerFindings = scanner.Scan(searchDirs)
	return
}

func ScanCommand(c *cli.Context, globalBoolFlags *types.LunaTraceGlobalFlags, log4jLibraryHashes []byte) (err error) {
	command.EnableGlobalFlags(globalBoolFlags)

	searchDirs := c.Args().Slice()
	scannerFindings, err := scanDirectoriesForVulnerableLibraries(c, searchDirs, log4jLibraryHashes)
	if err != nil {
		return
	}

	output := c.String("output")
	if output != "" {
		return findings.SerializeToFile(output, scannerFindings)
	}
	return nil
}
