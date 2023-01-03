// Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
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
package constants

import "github.com/lunasec-io/lunasec/lunadefend/go/types"

type Runtime string

const (
	NodeJS10 Runtime = "nodejs10.x"
	Python36 Runtime = "python3.6"
	Docker   Runtime = "docker"
)

type RuntimeCommand string

const (
	NodeCommand   RuntimeCommand = "node"
	PythonCommand RuntimeCommand = "python"
)

type RuntimeModuleEnvVar string

const (
	NodeModuleEnvVar   RuntimeModuleEnvVar = "NODE_PATH"
	PythonModuleEnvVar RuntimeModuleEnvVar = "PYTHONPATH"
)

type RuntimeHandler string

const (
	NodeHandler   RuntimeHandler = "container_lambda_function.js"
	PythonHandler RuntimeHandler = "container_lambda_function.py"
)

type RuntimeConfig struct {
	Command      RuntimeCommand
	ModuleEnvVar RuntimeModuleEnvVar
	Handler      RuntimeHandler
}

var (
	RuntimeToRuntimeConfig = map[Runtime]RuntimeConfig{
		NodeJS10: {
			NodeCommand,
			NodeModuleEnvVar,
			NodeHandler,
		},
		Python36: {
			PythonCommand,
			PythonModuleEnvVar,
			PythonHandler,
		},
	}
)

var (
	// TODO (cthompson) will this change between different runtimes?
	SingleFunctionContainerConfig = types.FunctionConfig{
		ImportPath:   "refinery_main",
		FunctionName: "main",
		WorkDir:      "",
		Env:          map[string]string{},
	}
)
