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
package invoker

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/lunasec-io/lunasec/lunadefend/go/constants"
	"github.com/lunasec-io/lunasec/lunadefend/go/service"
	"github.com/lunasec-io/lunasec/lunadefend/go/types"
	"github.com/lunasec-io/lunasec/lunadefend/go/types/event"
	"github.com/lunasec-io/lunasec/lunadefend/go/util"
	"go.uber.org/zap"
	"regexp"
	"strings"
)

var (
	outputRegex = regexp.MustCompile(constants.OutputRegexStr)
)

type FunctionRuntimeInvoker struct {
	logger       *zap.Logger
	functionName string
	blockInput   *json.RawMessage
	backpack     *json.RawMessage
}

func NewLambdaRuntime(
	logger *zap.Logger,
	functionName string,
	blockInput *json.RawMessage,
	backpack *json.RawMessage,
) types.RuntimeInvoker {
	return &FunctionRuntimeInvoker{
		logger:       logger,
		functionName: functionName,
		blockInput:   blockInput,
		backpack:     backpack,
	}
}

func (r *FunctionRuntimeInvoker) Initialize() error {
	return nil
}

func (r *FunctionRuntimeInvoker) Run() (
	result *json.RawMessage,
	outBackpack *json.RawMessage,
	err error,
) {
	var (
		funcConfig       types.RefineryFunction
		functionExecutor service.Executor
		handlerResponse  event.InvokeHandlerResponse
	)

	r.logger.Debug(
		"handling request",
		zap.String("functionName", r.functionName),
	)

	funcConfig, err = util.GetFunctionConfig(constants.FunctionsPath, r.functionName)
	if err != nil {
		r.logger.Error(
			"unable to get function config",
			zap.Error(err),
		)
		return
	}

	functionExecutor, err = r.getFunctionExecutor(funcConfig)
	if err != nil {
		return
	}

	handlerResponse, err = r.runFunctionExecutor(functionExecutor)
	if err != nil {
		return
	}

	r.logger.Debug(
		"handler response",
		zap.String(
			"handlerResponse",
			fmt.Sprintf("%v", handlerResponse),
		),
	)

	if handlerResponse.Error != "" {
		err = errors.New(handlerResponse.Error)
		r.logger.Error("handler error", zap.Error(err))
		return
	}

	result = handlerResponse.Result
	outBackpack = handlerResponse.Backpack
	return
}

func parseStdout(stdout string) (responseData event.InvokeHandlerResponse, err error) {
	output := outputRegex.FindStringSubmatch(stdout)
	if len(output) == 0 {
		err = fmt.Errorf("unable to find output from handler")
		return
	}
	returnedData := output[1]
	err = json.Unmarshal([]byte(returnedData), &responseData)
	return
}

func (r *FunctionRuntimeInvoker) getFunctionExecutor(funcConfig types.RefineryFunction) (e service.Executor, err error) {
	var (
		functionInput []byte
	)

	funcReq := event.InvokeHandlerRequest{
		BlockInput:   r.blockInput,
		Backpack:     r.backpack,
		ImportPath:   funcConfig.ImportPath,
		FunctionName: funcConfig.FunctionName,
	}

	functionInput, err = json.Marshal(funcReq)
	if err != nil {
		r.logger.Error(
			"unable to marshal function request",
			zap.Error(err),
		)
		return
	}

	envVars := util.EnvMapToArray(funcConfig.Env)

	handlerStdin := strings.NewReader(string(functionInput))

	args := []string{
		funcConfig.Handler,
	}

	r.logger.Debug(
		"created executor",
		zap.String("command", funcConfig.Command),
		zap.Strings("args", args),
		zap.Strings("envVars", envVars),
		zap.String("workdir", funcConfig.WorkDir),
		zap.ByteString("functionInput", functionInput),
	)

	return service.NewExecutorWithoutStreaming(
		funcConfig.Command,
		args,
		funcConfig.Env,
		funcConfig.WorkDir,
		handlerStdin,
	), nil

}

func (r *FunctionRuntimeInvoker) runFunctionExecutor(functionExecutor service.Executor) (handlerResponse event.InvokeHandlerResponse, err error) {
	var (
		res service.ExecutorResult
	)

	res, err = functionExecutor.Execute()
	if err != nil {
		r.logger.Error(
			"error when executing handler command",
			zap.Error(err),
		)
		return
	}

	r.logger.Debug("handler stdout", zap.String("stdout", res.Stdout))
	r.logger.Debug("handler stderr", zap.String("stderr", res.Stderr))

	/*
		TODO should we use protobuf to communicate between the processes?
	*/
	handlerResponse, err = parseStdout(res.Stdout)
	if err != nil {
		r.logger.Error("error while parsing stdout from handler", zap.Error(err))
		return
	}
	return
}
