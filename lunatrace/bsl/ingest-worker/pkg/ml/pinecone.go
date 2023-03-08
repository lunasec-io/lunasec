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
