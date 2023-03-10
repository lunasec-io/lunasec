package ml

import (
	"database/sql"

	"github.com/PullRequestInc/go-gpt3"
	"go.uber.org/fx"
)

type Service interface {
	AnswerQuestionFromContent(prompt, question string, content []string) (string, error)
	SearchForReferences(vulnID, search, question string) (string, error)
	GenerateEmbeddingForRef(
		ref *ReferenceContent,
		refEmbeddingExists RefEmbeddingExistsFunc,
		insertRefEmbedding InsertRefEmbeddingFunc,
	) error
}

type deps struct {
	fx.In

	DB           *sql.DB
	OpenAIClient gpt3.Client
}

type service struct {
	deps
}

func NewService(deps deps) Service {
	return &service{
		deps: deps,
	}
}
