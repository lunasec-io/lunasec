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
	v3 "github.com/anchore/grype/grype/db/v3"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/license-worker/pkg/vulnerability/advisory"
	"github.com/lunasec-io/lunasec/lunatrace/cli/gql/types"

	"github.com/lunasec-io/lunasec/lunatrace/cli/gql"
)

// map grype namespace to packagemanager
func mapNamespace(namespace string) types.PackageManager {
	return advisory.MapStringToPackageManager(namespace)
}

// map packagemanager to grype namespace
func mapPackageManager(pm types.PackageManager) string {
	return string(pm)
}

func mapVulns(ovs []*gql.GetVulnerabilityVulnerability) ([]v3.Vulnerability, error) {
	out := make([]v3.Vulnerability, 0)
	for _, ov := range ovs {
		for _, ova := range ov.Affected {
			if ova.Version_constraint == nil {
				continue
			}

			out = append(out, v3.Vulnerability{
				ID:          ov.Id.String(),
				PackageName: ova.Package.Name,
				Namespace:   mapPackageManager(ova.Package.Package_manager),
				// CVE-2019-17542,ffmpeg,nvd,"< 2.8.16 || >= 3.2, < 3.2.15 || >= 3.4, < 3.4.7 || >= 4.0, < 4.0.5 || >= 4.1, < 4.1.5"
				VersionConstraint: *ova.Version_constraint,
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
