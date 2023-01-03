// Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
package lunatracefx

import (
	"context"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/gql"
	"net/http"

	"github.com/Khan/genqlient/graphql"
	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/command"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/types"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/util"
)

func NewGraphQLClient(appConfig types.LunaTraceConfig) graphql.Client {
	return graphql.NewClient(appConfig.GraphqlServer.Url, &http.Client{
		Transport: &gql.HeadersTransport{Headers: map[string]string{
			"X-LunaTrace-Access-Token": appConfig.ProjectAccessToken,
		}},
	})
}

// Module contains fx modules that are common across all applications.
var Module = fx.Options(
	fx.Provide(
		types.NewLunaTraceGlobalFlags,
	),
	// todo instrument me
	fx.Supply(http.DefaultClient),
	// todo remove all global stuff
	fx.Invoke(command.EnableGlobalFlags),
	fx.Invoke(func(lc fx.Lifecycle) {
		lc.Append(fx.Hook{OnStop: func(_ context.Context) error {
			util.RemoveCleanupDirs()
			return nil
		}})
	}),
)
