package ml

import (
	"database/sql"
	"net/http"

	"github.com/PullRequestInc/go-gpt3"
	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/gogen/proto/gen"
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

type Result struct {
	fx.Out

	LangChain gen.LangChain
	Service
}

type service struct {
	deps
}

func NewService(deps deps) Result {
	langChain := gen.NewLangChainJSONClient("http://localhost:3000", http.DefaultClient)
	return Result{
		LangChain: langChain,
		Service: &service{
			deps: deps,
		},
	}
}
