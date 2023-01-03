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
package main

import (
	"github.com/cenkalti/backoff/v4"
	"github.com/rs/zerolog/log"

	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/agent"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/command"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/config"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/constants"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/types"

	"time"
)

func main() {
	command.EnableGlobalFlags(&types.LunaTraceGlobalFlags{
		Json:  true,
		Debug: false,
	})

	appConfig, err := config.LoadLunaTraceAgentConfig()
	if err != nil {
		return
	}

	if appConfig.LunaTraceApp.Stage == constants.DevelopmentEnv {
		command.EnableGlobalFlags(&types.LunaTraceGlobalFlags{
			Json:  true,
			Debug: true,
		})
	}

	heartbeat := func() error {
		return agent.PerformAgentHeartbeat(appConfig)
	}

	heartbeatDuration, err := time.ParseDuration(appConfig.HeartbeatDuration)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to parse heartbeat duration")
		return
	}

	ticker := time.NewTicker(heartbeatDuration)
	defer ticker.Stop()
	for ; true; <-ticker.C {
		err = backoff.Retry(heartbeat, backoff.NewExponentialBackOff())
		if err != nil {
			log.Error().
				Err(err).
				Msg("unable to perform heartbeat")
		}
	}
}
