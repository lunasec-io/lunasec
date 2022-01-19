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
package main

import (
	"bytes"
	"encoding/json"
	"github.com/google/uuid"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"lunasec/lunatrace/pkg/config"
	"lunasec/lunatrace/pkg/constants"
	"lunasec/lunatrace/pkg/types"
	"lunasec/lunatrace/pkg/util"
	"net/http"
	"net/url"
	"os"
)

func main() {
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix

	zerolog.SetGlobalLevel(zerolog.InfoLevel)

	appConfig, err := config.LoadLunaTraceAgentConfig()
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to load config")
		return
	}

	controlServer := url.URL{
		Scheme: "http",
		Host:   appConfig.Server.Host,
		Path:   "/v1/graphql",
	}

	identifyUrl := controlServer.String()

	accessToken := os.Getenv("LUNATRACE_AGENT_ACCESS_TOKEN")

	instanceId := uuid.New()

	identifyRequest := types.IdentifyRequest{
		Query: constants.UpsertInstanceQuery,
		Variables: map[string]string{
			"instance_id":  instanceId.String(),
			"access_token": accessToken,
		},
		OperationName: "UpsertInstance",
	}

	body, err := json.Marshal(identifyRequest)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to marshal identify request")
		return
	}

	headers := map[string]string{
		"X-LunaTrace-Agent-Access-Token": accessToken,
	}

	data, err := util.HttpRequest(http.MethodPost, identifyUrl, headers, bytes.NewBuffer(body))
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to marshal identify request")
		return
	}

	var identifyResponse types.IdentifyResponse

	err = json.Unmarshal(data, &identifyResponse)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to unmarshal identify response")
		return
	}
}
