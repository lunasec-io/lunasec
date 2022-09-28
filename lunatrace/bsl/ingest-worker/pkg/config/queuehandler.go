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
package config

import (
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/queuefx"
	"go.uber.org/config"
	"os"
)

type QueueHandlerConfig struct {
	Queue queuefx.Config `yaml:"queue"`
}

func newDefaultQueueHandlerConfig() QueueHandlerConfig {
	return QueueHandlerConfig{
		Queue: queuefx.Config{
			Name: "${QUEUE_NAME}",
		},
	}
}

func NewQueueHandlerConfigProvider() (config.Provider, error) {
	opts := []config.YAMLOption{
		config.Permissive(),
		config.Expand(os.LookupEnv),
		config.Static(newDefaultQueueHandlerConfig()),
	}
	return config.NewYAML(opts...)
}
