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
	"path/filepath"
)

func GetConfigProviderFromFiles(filenames []string) (provider config.Provider, err error) {
	opts := []config.YAMLOption{
		config.Permissive(),
		config.Expand(os.LookupEnv),
	}

	for _, name := range filenames {
		log.Debug().
			Str("name", name).
			Msg("loading config file")
		opts = append(opts, config.File(name))
	}
	return config.NewYAML(opts...)
}

func GetConfigProviderFromDir(configDir string) (provider config.Provider, err error) {
	var (
		filenames      []string
		baseConfigFile string
	)

	err = filepath.Walk(configDir,
		func(filepath string, info os.FileInfo, err error) error {
			if err != nil {
				return err
			}

			if !info.IsDir() {
				if info.Name() == constants.BaseConfigFileName {
					baseConfigFile = filepath
					return nil
				}
				filenames = append(filenames, filepath)
			}
			return nil
		})

	if err != nil {
		return
	}

	if baseConfigFile != "" {
		filenames = append([]string{baseConfigFile}, filenames...)
	}

	return GetConfigProviderFromFiles(filenames)
}

func LoadLunaTraceConfig() (appConfig types.LunaTraceConfig, err error) {
	_, err = os.Stat(constants.LunaTraceConfigFileName)
	if err != nil {
		log.Error().
			Err(err).
			Str("configFileName", constants.LunaTraceConfigFileName).
			Msg("unable to locate lunatrace config file")
		return
	}

	provider, err := GetConfigProviderFromFiles([]string{constants.LunaTraceConfigFileName})
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
