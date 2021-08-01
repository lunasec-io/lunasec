package constants

import "github.com/refinery-labs/loq/types"

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
