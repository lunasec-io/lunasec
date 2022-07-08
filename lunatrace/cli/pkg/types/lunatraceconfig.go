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
package types

type LunaTraceGraphqlServer struct {
	Url    string `yaml:"url"`
	Secret string `yaml:"secret"`
}

type LunaTraceExpressServer struct {
	Url string `yaml:"url"`
}

type LunaTraceGateway struct {
	GraphqlServer LunaTraceGraphqlServer `yaml:"graphql_server"`
}

type LunaTraceApp struct {
	Stage string `yaml:"stage"`
}

type LunaTraceConfig struct {
	LunaTraceApp       `yaml:"app"`
	LunaTraceGateway   `yaml:"gateway"`
	ProjectAccessToken string `yaml:"project_access_token"`
}

type LunaTraceAgentConfig struct {
	LunaTraceApp      `yaml:"app"`
	LunaTraceGateway  `yaml:"gateway"`
	AgentAccessToken  string `yaml:"agent_access_token"`
	InstanceId        string `yaml:"instance_id"`
	HeartbeatDuration string `yaml:"heartbeat_duration"`
}

type LunaTraceConfigFile struct {
	Namespace LunaTraceConfig `yaml:"lunatrace"`
}

type LunaTraceAgentConfigFile struct {
	Namespace LunaTraceAgentConfig `yaml:"lunatrace"`
}
