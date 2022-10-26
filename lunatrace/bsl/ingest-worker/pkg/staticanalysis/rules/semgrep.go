// Copyright by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Business Source License v1.1
// (the "License"); you may not use this file except in compliance with the
// License. You may obtain a copy of the License at
//
// https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
//
// See the License for the specific language governing permissions and
// limitations under the License.
package rules

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/rs/zerolog/log"

	"github.com/lunasec-io/lunasec/lunadefend/go/service"
)

func runSemgrepRule(ruleFile, dir string) (*SemgrepRuleOutput, error) {
	args := []string{
		"--json", "-c", ruleFile, dir,
	}

	executor := service.NewExecutor("semgrep", args, map[string]string{}, nil)

	result, err := executor.Execute()
	if err != nil {
		log.Error().
			Err(err).
			Str("stderr", result.Stderr).
			Int("code", result.ExitCode).
			Msg("failed to execute command")
		return nil, err
	}

	var semgrepResults SemgrepRuleOutput

	err = json.Unmarshal([]byte(result.Stdout), &semgrepResults)
	if err != nil {
		log.Error().
			Err(err).
			Msg("failed to unmarshal semgrep results")
		return nil, err
	}

	if len(semgrepResults.Errors) > 0 {
		loggerCtx := log.With()
		for i, semgrepError := range semgrepResults.Errors {
			loggerCtx = loggerCtx.Interface(fmt.Sprintf("error %d", i), semgrepError)
		}
		logger := loggerCtx.Logger()

		logger.Error().
			Msg("semgrep rule returned errors")
		return nil, errors.New("failed to run semgrep rule")
	}

	return &semgrepResults, nil
}
