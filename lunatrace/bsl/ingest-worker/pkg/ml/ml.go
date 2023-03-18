package ml

import (
	"database/sql"

	"github.com/PullRequestInc/go-gpt3"
	"go.uber.org/fx"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

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

	LangChain gen.LangChainClient
	Service
}

type service struct {
	deps
}

func NewService(deps deps) (Result, error) {
	conn, err := grpc.Dial("localhost:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return Result{}, err
	}

	langChain := gen.NewLangChainClient(conn)
	return Result{
		LangChain: langChain,
		Service: &service{
			deps: deps,
		},
	}, nil
}
