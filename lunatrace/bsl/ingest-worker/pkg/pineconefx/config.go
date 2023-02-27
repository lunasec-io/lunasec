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
package pineconefx

import (
	"github.com/rs/zerolog/log"
	"go.uber.org/config"
)

type Config struct {
	Enabled     bool   `yaml:"enabled"`
	APIKey      string `yaml:"api_key"`
	Environment string `yaml:"environment"`
	Index       string `yaml:"index"`
	Project     string `yaml:"project"`
}

func NewConfig(provider config.Provider) (config Config, err error) {
	value := provider.Get("pinecone")

	err = value.Populate(&config)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable populate acron config")
		return
	}
	return
}
