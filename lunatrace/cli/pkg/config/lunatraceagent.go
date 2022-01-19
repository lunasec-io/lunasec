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
	"github.com/rs/zerolog/log"
	"go.uber.org/config"
	"lunasec/lunatrace/pkg/constants"
	"lunasec/lunatrace/pkg/types"
	"os"
)

func defaultLunaSecAgentConfig() types.LunaTraceAgentConfig {
	return types.LunaTraceAgentConfig{
		AccessToken: "${LUNATRACE_AGENT_ACCESS_TOKEN}",
	}
}

func LoadLunaTraceAgentConfig() (appConfig types.LunaTraceAgentConfig, err error) {
	_, err = os.Stat(constants.LunaTraceConfigFileName)
	if err != nil {
		log.Error().
			Err(err).
			Str("configFileName", constants.LunaTraceConfigFileName).
			Msg("unable to locate lunatrace config file")
		return
	}

	defaultOps := config.Static(defaultLunaSecAgentConfig())

	provider, err := GetConfigProviderFromFiles([]string{constants.LunaTraceConfigFileName}, defaultOps)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to load config provider")
		return
	}

	value := provider.Get(constants.LunaTraceProviderName)

	err = value.Populate(appConfig)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable populate application config")
		return
	}
	return
}
