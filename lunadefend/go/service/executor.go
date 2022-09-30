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
package service

import (
	"bytes"
	"fmt"
	"io"
	"os"
	"os/exec"
	"strings"
)

type Executor interface {
	Execute() (ExecutorResult, error)
}

type executor struct {
	Command string
	Args    []string
	Shell   bool
	Env     map[string]string
	Cwd     string

	// Stdin connect a reader to stdin for the command
	// being executed.
	Stdin io.Reader

	// StreamStdio prints stdout and stderr directly to os.Stdout/err as
	// the command runs.
	StreamStdio bool
}

type ExecutorResult struct {
	Stdout   string
	Stderr   string
	ExitCode int
}

func NewExecutorWithoutStreaming(
	command string,
	args []string,
	env map[string]string,
	cwd string,
	stdin io.Reader,
) Executor {
	return &executor{
		Command: command,
		Args:    args,
		Env:     env,
		Cwd:     cwd,
		Stdin:   stdin,

		Shell:       false,
		StreamStdio: false,
	}
}

func NewExecutor(command string, args []string, env map[string]string, stdin io.Reader) Executor {
	cwd, err := os.Getwd()
	if err != nil {
		panic(err)
	}
	return &executor{
		Command: command,
		Args:    args,
		Env:     env,
		Cwd:     cwd,
		Stdin:   stdin,

		Shell:       false,
		StreamStdio: false,
	}
}

func (e *executor) Execute() (ExecutorResult, error) {
	var cmd *exec.Cmd

	if strings.Index(e.Command, " ") > 0 {
		parts := strings.Split(e.Command, " ")
		command := parts[0]
		args := parts[1:]
		cmd = exec.Command(command, args...)
	} else {
		cmd = exec.Command(e.Command, e.Args...)
	}

	cmd.Dir = e.Cwd
	if e.Cwd == "" {
		workDir, err := os.Getwd()
		if err != nil {
			return ExecutorResult{}, err
		}

		cmd.Dir = workDir
	}

	cmd.Env = os.Environ()
	if len(e.Env) > 0 {
		overrides := map[string]bool{}
		for k, v := range e.Env {
			overrides[k] = true
			cmd.Env = append(cmd.Env, fmt.Sprintf("%s=%s", k, v))
		}

		for _, env := range os.Environ() {
			key := strings.Split(env, "=")[0]

			if _, ok := overrides[key]; !ok {
				cmd.Env = append(cmd.Env, env)
			}
		}
	}

	if e.Stdin != nil {
		cmd.Stdin = e.Stdin
	}

	stdoutBuff := bytes.Buffer{}
	stderrBuff := bytes.Buffer{}

	var stdoutWriters io.Writer
	var stderrWriters io.Writer

	if e.StreamStdio {
		stdoutWriters = io.MultiWriter(os.Stdout, &stdoutBuff)
		stderrWriters = io.MultiWriter(os.Stderr, &stderrBuff)
	} else {
		stdoutWriters = &stdoutBuff
		stderrWriters = &stderrBuff
	}

	cmd.Stdout = stdoutWriters
	cmd.Stderr = stderrWriters

	startErr := cmd.Start()

	if startErr != nil {
		return ExecutorResult{}, startErr
	}

	exitCode := 0
	execErr := cmd.Wait()
	if execErr != nil {
		if exitError, ok := execErr.(*exec.ExitError); ok {

			exitCode = exitError.ExitCode()
		}
	}

	return ExecutorResult{
		Stdout:   stdoutBuff.String(),
		Stderr:   stderrBuff.String(),
		ExitCode: exitCode,
	}, nil
}
