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
package queuehandler

import (
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/dbfx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/graphqlfx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/fetcher/npm"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/queuefx"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/constants"
	"github.com/rs/zerolog/log"
	"go.uber.org/config"
	"io/ioutil"
	"os"
	"path"
)

const configDir = "config/queuehandler/"

type Config struct {
	Queue   queuefx.Config   `yaml:"queue"`
	Graphql graphqlfx.Config `yaml:"graphql"`
	NPM     npm.Config       `yaml:"npm"`
	DB      dbfx.Config      `yaml:"db"`
}

func newDefaultConfig() Config {
	return Config{
		Queue: queuefx.Config{
			Name: "${QUEUE_NAME}",
		},
		Graphql: graphqlfx.Config{
			Url:    `${LUNATRACE_GRAPHQL_SERVER_URL}`,
			Secret: `${LUNATRACE_GRAPHQL_SERVER_SECRET}`,
		},
		NPM: npm.Config{
			RegistryUrl: `${LUNATRACE_NPM_REGISTRY_URL:"https://registry.npmjs.org"}`,
		},
		DB: dbfx.Config{
			DSN: `${LUNATRACE_DB_DSN}`,
		},
	}
}

func NewConfigProvider() (config.Provider, error) {
	opts := []config.YAMLOption{
		config.Permissive(),
		config.Expand(os.LookupEnv),
		config.Static(newDefaultConfig()),
	}

	files, err := ioutil.ReadDir(configDir)
	if err == nil {
		for _, file := range files {
			opts = append(opts, config.File(path.Join(configDir, file.Name())))
		}
	}
	if err != nil {
		log.Warn().Str("config directory", configDir).Msg("unable to locate config directory")
	}

	if f, ferr := os.Stat(constants.LunaTraceConfigFileName); ferr == nil {
		log.Info().
			Str("config file", constants.LunaTraceConfigFileName).
			Msg("using local config file")
		opts = append(opts, config.File(path.Join(f.Name())))
	}

	return config.NewYAML(opts...)
}
