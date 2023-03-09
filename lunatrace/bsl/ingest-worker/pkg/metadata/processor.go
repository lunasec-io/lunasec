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
