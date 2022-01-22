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
	"github.com/google/uuid"
	"github.com/rs/zerolog/log"
	"go.uber.org/config"
	"lunasec/lunatrace/pkg/constants"
	"lunasec/lunatrace/pkg/types"
	"os"
)

func defaultLunaSecAgentConfig() types.LunaTraceAgentConfigFile {
	return types.LunaTraceAgentConfigFile{
		Namespace: types.LunaTraceAgentConfig{
			AgentAccessToken:  "${LUNATRACE_AGENT_ACCESS_TOKEN}",
			InstanceId:        "${LUNATRACE_INSTANCE_ID}",
			LunaTraceGateways: defaultLunaTraceGatewayConfig(),
		},
	}
}

func LoadLunaTraceAgentConfig() (appConfig types.LunaTraceAgentConfig, err error) {
	defaultOps := config.Static(defaultLunaSecAgentConfig())

	configFiles := []string{constants.LunaTraceConfigFileName}

	_, err = os.Stat(constants.LunaTraceConfigFileName)
	if err != nil {
		configFiles = []string{}

		log.Warn().
			Err(err).
			Str("configFileName", constants.LunaTraceConfigFileName).
			Msg("using default config, unable to locate lunatrace config file")
	}

	provider, err := GetConfigProviderFromFiles(configFiles, defaultOps)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to load config provider")
		return
	}

	value := provider.Get(constants.LunaTraceProviderName)

	err = value.Populate(&appConfig)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable populate application config")
		return
	}

	if appConfig.InstanceId == "" {
		appConfig.InstanceId = uuid.New().String()
	}
	return
}
