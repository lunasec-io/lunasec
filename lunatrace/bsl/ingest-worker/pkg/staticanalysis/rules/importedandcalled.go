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
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/staticanalysis/rules/tpl"
	"io"
	"text/template"

	"github.com/rs/zerolog/log"
)

const (
	// NOTE bump this version every time importedandcalled.yaml.tmpl is modified
	// NOTE also need to bump the version in lunatrace/bsl/backend/src/analysis/static-analysis.ts
	ImportedAndCalledRuleVersion = 2
)

type ImportedAndCalledSemgrepRuleVariables struct {
	PackageName string
}

func DependencyIsImportedAndCalledInCode(dependency, codeDir string) (bool, error) {
	semgrepRuleTemplate, err := template.ParseFS(tpl.RuleTemplates, "importedandcalled.yaml.tpl")
	if err != nil {
		log.Error().Err(err).Msg("failed to parse semgrep rule")
		return false, err
	}

	templateVariables := ImportedAndCalledSemgrepRuleVariables{
		PackageName: dependency,
	}

	ruleReader, ruleWriter := io.Pipe()

	go func() {
		err = semgrepRuleTemplate.Execute(ruleWriter, templateVariables)
		if err != nil {
			log.Error().Err(err).Msg("failed to execute template and write rule to fd")
			_ = ruleWriter.CloseWithError(err)
			return
		}
		err = ruleWriter.Close()
		if err != nil {
			log.Error().Err(err).Msg("failed to close semgrep stdin")
			return
		}
	}()

	results, err := runSemgrepRule(ruleReader, codeDir)
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
