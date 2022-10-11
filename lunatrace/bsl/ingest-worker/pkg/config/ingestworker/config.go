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
//
package ingestworker

import (
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/graphqlfx"
	"go.uber.org/config"
	"os"
)

type Config struct {
	Graphql graphqlfx.Config `yaml:"graphql"`
}

func newDefaultConfig() Config {
	return Config{
		Graphql: graphqlfx.Config{
			Url:    `${LUNATRACE_GRAPHQL_SERVER_URL}`,
			Secret: `${LUNATRACE_GRAPHQL_SERVER_SECRET}`,
		},
	}
}

func NewConfigProvider() (config.Provider, error) {
	opts := []config.YAMLOption{
		config.Permissive(),
		config.Expand(os.LookupEnv),
		config.Static(newDefaultConfig()),
	}
	return config.NewYAML(opts...)
}
