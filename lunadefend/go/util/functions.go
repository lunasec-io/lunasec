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
package util

import (
	"encoding/json"
	"fmt"
	"github.com/lunasec-io/lunasec/lunadefend/go/types"
	"io/ioutil"
	"os"
)

func loadFunctionLookup(functionsPath string) (functionLookup types.FunctionLookup, err error) {
	var data []byte

	data, err = ioutil.ReadFile(functionsPath)
	if err != nil {
		fmt.Println("File reading error", err)
		return
	}

	err = json.Unmarshal(data, &functionLookup)
	if err != nil {
		fmt.Println("Error parsing rpc function lookup", err)
		return
	}
	return functionLookup, err
}

// GetFunctionConfig loads the function configuration for a given function name or a function name defined
// in an environment variable.
func GetFunctionConfig(functionsPath string, functionName string) (funcConfig types.RefineryFunction, err error) {
	var (
		ok             bool
		functionLookup types.FunctionLookup
	)

	functionLookup, err = loadFunctionLookup(functionsPath)
	if err != nil {
		return
	}

	if functionName == "" {
		functionName = os.Getenv("REFINERY_FUNCTION_NAME")
	}

	funcConfig, ok = functionLookup[functionName]
	if !ok {
		err = fmt.Errorf("unable to find function with name: %s", functionName)
	}
	return
}
