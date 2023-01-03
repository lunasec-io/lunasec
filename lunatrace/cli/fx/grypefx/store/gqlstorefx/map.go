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
package gqlstorefx

import (
	"fmt"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/gql"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/gql/types"
	"net/url"
	"sort"
	"strings"

	v3 "github.com/anchore/grype/grype/db/v3"
	"github.com/blang/semver/v4"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/vulnerability/advisory"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/util"
)

const LunaTracePackageScheme = "lunatrace-package"

// map grype namespace to packagemanager
func mapNamespace(namespace string) (types.PackageManager, error) {
	// TODO (cthompson) how do we want to handle mappings of grype namespaces to package managers?
	// for internal packages, how do we handle this relationship?

	// for java, we assume that maven is the package manager that is being used
	if namespace == "java" {
		namespace = "maven"
	}
	return advisory.MapStringToPackageManager(namespace)
}

// map packagemanager to grype namespace
func mapPackageManager(pm types.PackageManager) string {
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
			// TODO (cthompson) there are so many invalid semver versions, we can't do anything about this for now
			//log.Error().
			//	Err(err).
			//	Str("version", *gqlevt.Version).
			//	Msg("unable to parse affected range semver version")
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
				ranges = append(ranges, fmt.Sprintf(">= %s, < %s", introducedEvent.Version.String(), fixedEvent.Version.String()))
				continue introduced
			}
		}
		// we didn't find a fixed event, emit an unmatched upper range
		ranges = append(ranges, fmt.Sprintf(">= %s", introducedEvent.Version.String()))
	}
	return ranges
}

func mapVersionConstraint(
	affectedVersions []*gql.GetVulnerabilityVulnerabilityAffectedVulnerability_affectedAffected_versionsVulnerability_affected_version,
	rangeEvents []*gql.GetVulnerabilityVulnerabilityAffectedVulnerability_affectedAffected_range_eventsVulnerability_affected_range_event,
) string {
	constraints := make([]string, 0)
	for _, av := range affectedVersions {
		constraints = append(constraints, fmt.Sprintf("= %s", av.Version))
	}

	if rangeEvents != nil {
		constraints = append(constraints, eventsToRanges(rangeEvents)...)
	}

	return strings.Join(constraints, " || ")
}

func mapVulns(ovs []*gql.GetVulnerabilityVulnerability) ([]v3.Vulnerability, error) {
	out := make([]v3.Vulnerability, 0)
	for _, ov := range ovs {
		for _, ova := range ov.Affected {
			out = append(out, v3.Vulnerability{
				ID:          ov.Id.String(),
				PackageName: ova.Package.Name,
				Namespace:   mapPackageManager(ova.Package.Package_manager),
				// CVE-2019-17542,ffmpeg,nvd,"< 2.8.16 || >= 3.2, < 3.2.15 || >= 3.4, < 3.4.7 || >= 4.0, < 4.0.5 || >= 4.1, < 4.1.5"
				VersionConstraint: mapVersionConstraint(ova.Affected_versions, ova.Affected_range_events),
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

func mapURLs(v *gql.GetVulnerabilityMetadataVulnerability_by_pkVulnerability) []string {
	return append(
		util.Map(v.References,
			func(ou *gql.GetVulnerabilityMetadataVulnerability_by_pkVulnerabilityReferencesVulnerability_reference) string {
				return ou.Url
			},
		),
		util.Dedup(
			util.Map(v.Affected,
				func(a *gql.GetVulnerabilityMetadataVulnerability_by_pkVulnerabilityAffectedVulnerability_affected) string {
					return (&url.URL{Scheme: LunaTracePackageScheme, Host: a.Package.Id.String()}).String()
				},
			),
		)...,
	)
}
