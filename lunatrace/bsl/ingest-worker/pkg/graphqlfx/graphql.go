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
package graphqlfx

import (
	"github.com/Khan/genqlient/graphql"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/gql"
	"github.com/rs/zerolog/log"
	"net/http"
)

func NewGraphqlClient(config Config, hc *http.Client) graphql.Client {
	if config.Url == "" {
		log.Error().Msg("graphql server url is not defined")
		return nil
	}

	if config.Secret == "" {
		log.Error().Msg("graphql server secret is not defined")
		return nil
	}

	lhc := hc
	lhc.Transport = &gql.HeadersTransport{Headers: map[string]string{
		"X-Hasura-Admin-Secret": config.Secret,
		"X-Hasura-Role":         "service",
	}}
	return graphql.NewClient(config.Url, lhc)
}
