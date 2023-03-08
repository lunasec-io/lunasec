package ml

import (
	"time"

	"github.com/google/uuid"
)

type RefEmbeddingExistsFunc func(contentHash string) (string, bool)
type InsertRefEmbeddingFunc func(id uuid.UUID, contentHash, content, embedding string) error

type ReferenceContent struct {
	ID                  uuid.UUID
	URL                 string
	Content             string
	NormalizedContent   string
	ContentType         string
	LastSuccessfulFetch *time.Time
}
