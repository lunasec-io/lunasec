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
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"

	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/command"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/types"
)

func JavaArchivePatchCommand(
	c *cli.Context,
	globalBoolFlags *types.LunaTraceGlobalFlags,
	log4jLibraryHashes []byte,
) error {
	command.EnableGlobalFlags(globalBoolFlags)

	findings, err := LoadOrScanForFindings(c, log4jLibraryHashes)
	if err != nil {
		return err
	}

	log.Info().
		Int("findingsCount", len(findings)).
		Msg("Patching found vulnerable Log4j libraries.")

	forcePatch := c.Bool("force-patch")
	dryRun := c.Bool("dry-run")
	backup := c.Bool("backup")

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
			shouldSkip, forcePatch = AskIfShouldSkipPatch(finding.Path)
			if !forcePatch && shouldSkip {
				log.Info().
					Str("findingPath", finding.Path).
					Msg("Skipping library for patching")
				continue
			}
		}

		err = ProcessJavaArchive(finding, dryRun, backup)
		if err != nil {
			log.Error().
				Str("path", finding.Path).
				Msg("Unable to patch library successfully.")
			continue
		}
		patchedLibraries = append(patchedLibraries, finding.Path)
	}

	log.Info().
		Strs("patchedLibraries", patchedLibraries).
		Msg("Completed patched libraries.")
	return nil
}
