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
	"os"
	"text/template"

	"github.com/rs/zerolog/log"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/semgrep/cli/rules/tpl"
)

type ImportedAndCalledSemgrepRuleVariables struct {
	PackageName string
}

func CallsitesOfDependencyInCode(dependency, codeDir string) (bool, error) {
	f, err := os.CreateTemp("", "lunatrace-semgrep-rule-")
	if err != nil {
		log.Error().Err(err).Msg("failed to create temporary file")
		return false, err
	}

	defer f.Close()
	defer os.Remove(f.Name())

	semgrepRuleTemplate, err := template.New("imported-and-called-semgrep-rule").ParseFS(tpl.RuleTemplates, "importedandcalled.yaml.tpl")

	templateVariables := ImportedAndCalledSemgrepRuleVariables{
		PackageName: dependency,
	}

	err = semgrepRuleTemplate.Execute(f, templateVariables)
	if err != nil {
		log.Error().Err(err).Msg("failed to execute template and write rule to file")
		return false, err
	}

	results, err := runSemgrepRule(f.Name(), codeDir)
	if err != nil {
		log.Error().Err(err).Msg("failed to run semgrep rule")
		return false, err
	}

	for _, result := range results.Results {
		log.Info().
			Int64("line", result.Start.Line).
			Str("path", result.Path).
			Msg("dependency called in code")
	}
	return len(results.Results) > 0, nil
}
