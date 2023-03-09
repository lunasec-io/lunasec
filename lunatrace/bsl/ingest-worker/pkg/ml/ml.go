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
	"database/sql"

	"github.com/PullRequestInc/go-gpt3"
	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/pineconefx"
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
