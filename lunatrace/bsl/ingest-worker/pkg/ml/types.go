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
