// Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
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
package gqlstorefx

import (
	"fmt"
	"sort"
	"strings"

	v3 "github.com/anchore/grype/grype/db/v3"
	"github.com/blang/semver/v4"

	"github.com/lunasec-io/lunasec/lunatrace/cli/gql"
	"github.com/lunasec-io/lunasec/lunatrace/cli/gql/types"
)

// map grype namespace to packagemanager
func mapNamespace(namespace string) types.PackageManager {
	//TODO implement me
	panic("implement me")
}

// map packagemanager to grype namespace
func mapPackageManager(pm types.PackageManager) string {
	//TODO implement me
	return string(pm)
}

type versionEvent struct {
	Event   string
	Version semver.Version
}

// sort events by semver
// find all ranges which are vulnerable
func eventsToRanges(gqlevts []*gql.GetVulnerabilityVulnerabilityAffectedVulnerability_affectedAffected_range_eventsVulnerability_affected_range_event) []string {
	// build introducedEvent struct
	evts := make([]versionEvent, len(gqlevts))
	for i, gqlevt := range gqlevts {
		ver, err := semver.ParseTolerant(gqlevt.Version)
		if err != nil {
			fmt.Println("todo change me to a log statement failed to parse a version")
			continue
		}
		evts[i] = versionEvent{
			Event:   gqlevt.Event,
			Version: ver,
		}
	}

	// sort evts
	sort.Slice(evts, func(i, j int) bool {
		return evts[i].Version.LT(evts[j].Version)
	})

	ranges := make([]string, 0)

	// for each introduced
introduced:
	for evti, introducedEvent := range evts {
		if introducedEvent.Event != "introduced" {
			continue
		}
		// loop over next
		for _, fixedEvent := range evts[evti:] {
			// find fixed
			if fixedEvent.Event == "fixed" {
				// emit a range
				ranges = append(ranges, fmt.Sprintf(">= %s <= %s", introducedEvent.Version.String(), fixedEvent.Version.String()))
				continue introduced
			}
		}
	}
	return ranges
}

func mapVulns(ovs []*gql.GetVulnerabilityVulnerability) ([]v3.Vulnerability, error) {
	out := make([]v3.Vulnerability, 0)
	for _, ov := range ovs {
		for _, ova := range ov.Affected {
			constraints := make([]string, 0)
			for _, av := range ova.Affected_versions {
				constraints = append(constraints, fmt.Sprintf("= %s", av.Version))
			}

			constraints = append(constraints, eventsToRanges(ova.Affected_range_events)...)

			out = append(out, v3.Vulnerability{
				ID:          ov.Id.String(),
				PackageName: ova.Package.Name,
				Namespace:   mapPackageManager(ova.Package.Package_manager),
				// CVE-2019-17542,ffmpeg,nvd,"< 2.8.16 || >= 3.2, < 3.2.15 || >= 3.4, < 3.4.7 || >= 4.0, < 4.0.5 || >= 4.1, < 4.1.5"
				VersionConstraint: strings.Join(constraints, " || "),
				VersionFormat:     "semver",
				// todo do we need to provide cpes no unless we WANT bad matching
				CPEs: nil,
				// todo is this required?
				RelatedVulnerabilities: nil,
			})
		}
	}
	return out, nil
}

func mapURLs(urls []*gql.GetVulnerabilityMetadataVulnerability_by_pkVulnerabilityReferencesVulnerability_reference) []string {
	out := make([]string, len(urls))
	for i, ou := range urls {
		out[i] = ou.Url
	}
	return out
}
