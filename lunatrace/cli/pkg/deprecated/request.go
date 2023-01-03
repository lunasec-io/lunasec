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
package deprecated

import (
	"bytes"
	"encoding/json"
	"net/http"

	"github.com/rs/zerolog/log"

	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/httputil"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/types"
)

func PerformGraphqlRequest(
	graphqlServer types.LunaTraceGraphqlServer,
	headers map[string]string,
	request GraphqlRequest,
	response interface{},
) (err error) {
	graphqlUrl := graphqlServer.Url

	body, err := json.Marshal(request)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to marshal identify request")
		return
	}

	data, err := httputil.HttpRequest(http.MethodPost, graphqlUrl, headers, bytes.NewBuffer(body))
	if err != nil {
		log.Error().
			Err(err).
			Str("graphqlUrl", graphqlUrl).
			Msg("unable to perform graphql request")
		return
	}

	if response == nil {
		return
	}

	err = json.Unmarshal(data, &response)
	if err != nil {
		log.Error().
			Err(err).
			Str("graphqlUrl", graphqlUrl).
			Msg("unable to unmarshal graphql response")
		return
	}
	return
}
