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
	"fmt"
	"github.com/blang/semver/v4"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/analyze"
	"github.com/rs/zerolog"
	"path"
	"strings"
	"testing"
)

func createNewScanner() (scanner Log4jVulnerableDependencyScanner, err error) {
	zerolog.SetGlobalLevel(zerolog.WarnLevel)

	onlyScanArchives := false

	hashLookup, err := LoadHashLookup([]byte{}, "../log4j-library-hashes.json", onlyScanArchives)
	if err != nil {
		return
	}

	processArchiveFile := IdentifyPotentiallyVulnerableFiles(true, hashLookup)

	scanner = NewLog4jDirectoryScanner([]string{}, onlyScanArchives, false, processArchiveFile)
	return
}

func BenchmarkScanningForVulnerablePackages(b *testing.B) {
	return
	b.ReportAllocs()

	scanner, err := createNewScanner()
	if err != nil {
		b.Error(err)
		return
	}

	findings := scanner.Scan([]string{"../test/vulnerable-log4j2-versions"})

	fmt.Printf("Number of findings: %d\n", len(findings))
}

func BenchmarkScanningForLargeArchives(b *testing.B) {
	b.ReportAllocs()

	scanner, err := createNewScanner()
	if err != nil {
		b.Error(err)
		return
	}

	for i := 0; i < 10; i++ {
		findings := scanner.Scan([]string{"../test/large-archives"})

		fmt.Printf("Number of findings: %d\n", len(findings))
	}
}

func TestForFalsePositiveLibraryFindings(t *testing.T) {

	scanner, err := createNewScanner()
	if err != nil {
		t.Fail()
	}

	findings := scanner.Scan([]string{"../test/vulnerable-log4j2-versions"})

	for _, finding := range findings {
		_, archiveName := path.Split(finding.Path)

		// small adjustments to the version so that it can be parsed as semver
		archiveVersionStr := analyze.ArchiveNameToSemverVersion(archiveName)
		archiveVersion := semver.MustParse(archiveVersionStr)

		versions := strings.Split(finding.Version, ", ")
		found := false
		for _, version := range versions {
			semverVersion := semver.MustParse(version)

			if semverVersion.Equals(archiveVersion) {
				found = true
			}
		}
		if !found {
			t.Fatalf("False positive detected: finding library version %s does not appear in expected versions: %+v", archiveVersionStr, finding.Version)
		}
	}
}
