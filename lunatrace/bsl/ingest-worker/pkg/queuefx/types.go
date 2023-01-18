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
package queuefx

import (
	"context"
	"encoding/json"
	"go.uber.org/fx"
)

type Handler interface {
	GetHandlerKey() string
	HandleRecord(ctx context.Context, record json.RawMessage) error
}

type HandlerLookup map[string]Handler

type Message struct {
	MessageType string            `json:"type"`
	Records     []json.RawMessage `json:"records"`
}

type HandlerResult struct {
	fx.Out

	Handler `group:"queue_handlers"`
}
