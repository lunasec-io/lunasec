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

	"github.com/lunasec-io/lunasec/lunatrace/cli/gql"
	"github.com/lunasec-io/lunasec/lunatrace/cli/gql/types"
)

func mapNamespace(namespace string) types.PackageManager {
	//TODO implement me
	panic("implement me")
}

func mapVulns(ov []*gql.GetVulnerabilityVulnerability) ([]v3.Vulnerability, error) {
	//TODO implement me
	panic("implement me")
}

// n2z converts nil pointers to the zero value of their type.
func n2z[T any](test *T) T {
	var result T
	if test == nil {
		return result
	}
	return *test
}

func mapURLs(urls []*gql.GetVulnerabilityMetadataVulnerability_by_pkVulnerabilityReferencesVulnerability_reference) []string {
	out := make([]string, len(urls))
	for i, ou := range urls {
		out[i] = ou.Url
	}
	return out
}
