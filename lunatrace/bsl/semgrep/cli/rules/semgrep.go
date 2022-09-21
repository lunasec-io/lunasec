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
//
package rules

import (
	"encoding/json"
	"github.com/lunasec-io/lunasec/lunadefend/go/service"
	"github.com/rs/zerolog/log"
)

func runSemgrepRule(rule, dir string) (*SemgrepResults, error) {
	args := []string{
		"--json", "-c", rule, dir,
	}

	executor := service.NewExecutor("semgrep", args, map[string]string{})

	result, err := executor.Execute()
	if err != nil {
		log.Error().
			Err(err).
			Str("stderr", result.Stderr).
			Int("code", result.ExitCode).
			Msg("failed to execute command")
		return nil, err
	}

	var semgrepResults SemgrepResults

	err = json.Unmarshal([]byte(result.Stdout), &semgrepResults)
	if err != nil {
		log.Error().
			Err(err).
			Msg("failed to unmarshal semgrep results")
		return nil, err
	}
	return &semgrepResults, nil
}
