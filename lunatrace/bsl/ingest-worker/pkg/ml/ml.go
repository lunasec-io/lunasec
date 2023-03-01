package ml

import (
	"database/sql"

	"github.com/PullRequestInc/go-gpt3"
	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/pineconefx"
)

type Service interface {
	SearchForReferences(search string) (string, error)
	GenerateEmbeddingsForVulnRefs(vulnID string, insertWithPinecone bool) error
}

type deps struct {
	fx.In

	DB             *sql.DB
	OpenAIClient   gpt3.Client
	PineconeClient pineconefx.PineconeClient
}

type service struct {
	deps
}

func NewService(deps deps) Service {
	return &service{
		deps: deps,
	}
}