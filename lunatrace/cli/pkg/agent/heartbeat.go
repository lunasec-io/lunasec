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
//
package agent

import (
	"github.com/rs/zerolog/log"
	"lunasec/lunatrace/pkg/graphql"
	"lunasec/lunatrace/pkg/types"
	"lunasec/lunatrace/pkg/util"
)

func PerformAgentHeartbeat(appConfig types.LunaTraceAgentConfig) (err error) {
	var identifyResponse types.IdentifyResponse

	headers := map[string]string{
		"X-LunaTrace-Agent-Access-Token": appConfig.AgentAccessToken,
	}

	err = graphql.PerformGraphqlRequest(
		appConfig.GraphqlServer,
		headers,
		graphql.NewIdentifyRequest(appConfig.InstanceId, appConfig.AgentAccessToken),
		&identifyResponse,
	)
	if err = util.GetGraphqlError(err, identifyResponse.GraphqlErrors); err != nil {
		log.Error().
			Err(err).
			Msg("identified instance as online")
		return
	}

	log.Info().
		Str("heartbeat", identifyResponse.Data.Method.LastHeartbeat).
		Msg("Identified instance as online")
	return
}
