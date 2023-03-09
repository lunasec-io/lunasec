package metadata

import (
	"database/sql"

	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/ml"
)

type Processor interface {
	GenerateEmbeddingsForReferences() error
}

type Params struct {
	fx.In

	DB *sql.DB
	ML ml.Service
}

type processor struct {
	deps Params
}

func (p *processor) GenerateEmbeddingsForReferences() error {
	return nil
}

func NewProcessor(deps Params) Processor {
	return &processor{
		deps: deps,
	}
}
