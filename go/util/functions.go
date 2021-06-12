package util

import (
	"encoding/json"
	"fmt"
	"github.com/refinery-labs/loq/model"
	"io/ioutil"
	"os"
)

func loadFunctionLookup(functionsPath string) (functionLookup model.FunctionLookup, err error) {
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
func GetFunctionConfig(functionsPath string, functionName string) (funcConfig model.RefineryFunction, err error) {
	var (
		ok bool
		functionLookup model.FunctionLookup
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
