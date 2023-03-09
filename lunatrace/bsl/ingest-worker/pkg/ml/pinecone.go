// Copyright by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Business Source License v1.1 
// (the "License"); you may not use this file except in compliance with the
// License. You may obtain a copy of the License at
//
// https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
//
// See the License for the specific language governing permissions and
// limitations under the License.
//
package ml

import (
	"github.com/samber/lo"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/pineconefx"
)

// used for inserting with pinecone
func newVulnRefVector(hashStr string, embedding []float64, refURL, vulnerabilityID string) *pineconefx.Vector {
	metadata := map[string]string{
		"source":           refURL,
		"vulnerability_id": vulnerabilityID,
	}
	return &pineconefx.Vector{
		ID: hashStr,

		Values: lo.Map(embedding, func(t float64, i int) float32 {
			return float32(t)
		}),
		Metadata: metadata,
	}
}
