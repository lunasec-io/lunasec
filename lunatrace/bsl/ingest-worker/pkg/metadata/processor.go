package metadata

import (
	"context"
	"database/sql"

	"github.com/go-jet/jet/v2/postgres"
	"github.com/google/uuid"
	"github.com/rs/zerolog/log"
	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/ml"
	pacmodel "github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/package/model"
	pactable "github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/package/table"
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
	rc := pactable.ReferenceContent

	getReferenceContentStmt := rc.SELECT(rc.AllColumns)

	rows, err := getReferenceContentStmt.Rows(context.Background(), p.deps.DB)
	if err != nil {
		log.Error().Err(err).Msg("failed to get reference content")
		return err
	}

	for rows.Next() {
		var ref pacmodel.ReferenceContent
		err = rows.Scan(&ref)
		if err != nil {
			log.Error().Err(err).Msg("failed to scan reference content")
			return err
		}

		log.Info().Str("url", ref.URL).Msg("generating embedding for reference content")

		normalizedRef := ml.ReferenceContent{
			ID:                  ref.ID,
			URL:                 ref.URL,
			Content:             ref.Content,
			NormalizedContent:   ref.NormalizedContent,
			ContentType:         ref.ContentType,
			LastSuccessfulFetch: ref.LastSuccessfulFetch,
		}

		var re = pactable.ContentEmbedding
		insertRefEmbedding := func(id uuid.UUID, contentHash, content, embedding string) error {
			newRefEmb := pacmodel.ContentEmbedding{
				ReferenceContentID: id,
				ContentHash:        contentHash,
				Content:            contentHash,
				Embedding:          embedding,
			}

			insertStmt := re.INSERT(
				re.ReferenceContentID, re.ContentHash, re.Content, re.Embedding,
			).MODEL(newRefEmb)

			_, err = insertStmt.Exec(p.deps.DB)
			return err
		}

		refEmbeddingExists := func(contentHash string) (string, bool) {
			getExistingRefEmb := re.SELECT(
				re.Embedding,
			).WHERE(re.ContentHash.EQ(postgres.String(contentHash)))

			var refEmb pacmodel.ContentEmbedding
			err := getExistingRefEmb.Query(p.deps.DB, &refEmb)
			return refEmb.Embedding, err == nil
		}

		err = p.deps.ML.GenerateEmbeddingForRef(&normalizedRef, refEmbeddingExists, insertRefEmbedding)
		if err != nil {
			log.Error().
				Err(err).
				Str("url", ref.URL).
				Msg("failed to generate embedding for reference")
			return err
		}
	}
	return nil
}

func NewProcessor(deps Params) Processor {
	return &processor{
		deps: deps,
	}
}
