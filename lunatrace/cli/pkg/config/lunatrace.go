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
package config

import (
	"net/http"
	"os"

	"github.com/Khan/genqlient/graphql"
	"github.com/rs/zerolog/log"
	"go.uber.org/config"

	"github.com/lunasec-io/lunasec/lunatrace/cli/gql"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/constants"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/httputil"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/types"
)

func defaultLunaSecConfig() types.LunaTraceConfigFile {
	return types.LunaTraceConfigFile{
		Namespace: types.LunaTraceConfig{
			LunaTraceApp: types.LunaTraceApp{
				Stage: constants.ProductionEnv,
			},
			ProjectAccessToken: "${LUNATRACE_PROJECT_SECRET:\"\"}",
			LunaTraceGateway:   defaultLunaTraceGatewayConfig(),
		},
	}
}

func NewConfigProvider() (config.Provider, error) {
	log.Info().Msg("config generator called")
	configFiles := []string{constants.LunaTraceConfigFileName}

	_, err := os.Stat(constants.LunaTraceConfigFileName)
	if err != nil {
		configFiles = []string{}

		log.Info().
			Err(err).
			Str("configFileName", constants.LunaTraceConfigFileName).
			Msg("using default config, unable to locate lunatrace config file")
	}
	provider, err := GetConfigProviderFromFiles(configFiles, config.Static(defaultLunaSecConfig()))
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to load config provider")
		return nil, err
	}
	return provider, nil
}

func NewLunaTraceConfig(provider config.Provider) (appConfig types.LunaTraceConfig, err error) {
	value := provider.Get(constants.LunaTraceProviderName)

	err = value.Populate(&appConfig)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable populate application config")
		return
	}

	// todo remove me
	gql.TODOClient = graphql.NewClient(appConfig.GraphqlServer.Url, &http.Client{
		Transport: &httputil.HeadersTransport{Headers: map[string]string{
			"X-LunaTrace-Access-Token": appConfig.ProjectAccessToken,
		}},
	})

	return
}
