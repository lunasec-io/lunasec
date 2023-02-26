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
package openaifx

import (
	"github.com/PullRequestInc/go-gpt3"
	"go.uber.org/fx"
	_ "gocloud.dev/pubsub/awssnssqs"
)

var Module = fx.Options(
	fx.Provide(
		NewConfig,
		NewOpenAIClient,
	),
)

type Params struct {
	fx.In

	Config
}

type OpenAIClient struct {
	p Params
}

func NewOpenAIClient(p Params) gpt3.Client {
	return gpt3.NewClient(p.APIKey)
}
