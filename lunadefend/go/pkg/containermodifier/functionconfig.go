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
package containermodifier

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"path"
	"path/filepath"
	"strings"

	v1 "github.com/google/go-containerregistry/pkg/v1"
	"github.com/google/go-containerregistry/pkg/v1/tarball"
	"github.com/lunasec-io/lunasec/lunadefend/go/constants"
	"github.com/lunasec-io/lunasec/lunadefend/go/types"
	"github.com/lunasec-io/lunasec/lunadefend/go/util"
)

func LoadFunctionConfig(functionsConfigFile string) (configFile types.FunctionConfigFile, err error) {
	data, err := ioutil.ReadFile(functionsConfigFile)
	if err != nil {
		log.Println(err)
		return
	}

	err = json.Unmarshal(data, &configFile)
	if err != nil {
		log.Println(err)
		return
	}
	return
}

func buildFunctionLookup(runtimeConfig constants.RuntimeConfig, workDir, handlerPath string, configuredFunctions []types.FunctionConfig) ([]byte, error) {
	functionLookup := types.FunctionLookup{}
	for _, f := range configuredFunctions {
		// override workdir if explicitly set by the function config
		if f.WorkDir != "" {
			workDir = f.WorkDir
		}
		// TODO (cthompson) hardcoded for testing, most of the logic for building the function config is in python
		// we should move the logic into this code since it makes more sense to have it here for testing locally.
		refineryFunction := types.RefineryFunction{
			Command:      "node",
			Handler:      handlerPath,
			ImportPath:   f.ImportPath,
			FunctionName: f.FunctionName,
			WorkDir:      workDir,
			// TODO (cthompson) we need to get env variables into this function from the user
			Env: map[string]string{
				string(runtimeConfig.ModuleEnvVar): workDir,
			},
		}
		// TODO (cthompson) make utility functions for getting and setting a function config since
		// we might run into collisions
		functionLookup[f.FunctionName] = refineryFunction
	}

	return json.Marshal(functionLookup)
}

func CreateFunctionConfigLayer(workDir, runtime string, functions []types.FunctionConfig) (layer v1.Layer, err error) {
	runtimeConfig, ok := constants.RuntimeToRuntimeConfig[constants.Runtime(runtime)]
	if !ok {
		err = fmt.Errorf("unsupported runtime: %s", runtime)
		return
	}

	handlerName := string(runtimeConfig.Handler)
	handlerPath := path.Join(constants.RuntimePath, handlerName)

	if len(functions) == 0 {
		functions = append(functions, constants.SingleFunctionContainerConfig)
	}

	functionData, err := buildFunctionLookup(runtimeConfig, workDir, handlerPath, functions)
	if err != nil {
		log.Println(err)
		return
	}

	handlerContent, err := util.LoadRuntimeHandler(handlerName)
	if err != nil {
		log.Println(err)
		return
	}

	files := []util.InMemoryFile{
		{Name: constants.FunctionsPath, Body: string(functionData)},
		{Name: handlerPath, Body: handlerContent},
	}

	tarData, err := util.BuildInMemoryTarFile(files)
	if err != nil {
		log.Println(err)
		return
	}
	return tarball.LayerFromReader(&tarData)
}

func GetNewContainerNames(containerTarFile string) (newTag, newFilename string) {
	basename := path.Base(containerTarFile)
	basenameExt := filepath.Ext(basename)
	tag := strings.TrimSuffix(basename, basenameExt)

	newTag = fmt.Sprintf("lunasec-%s", tag)
	newFilename = newTag + basenameExt
	return
}
