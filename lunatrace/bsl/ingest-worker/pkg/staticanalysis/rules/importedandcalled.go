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
	"os"
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

func TemplateImportedAndCalledRuleToFile(ruleFile *os.File, dependency string) (err error) {
	semgrepRuleTemplate, err := template.ParseFS(tpl.RuleTemplates, "importedandcalled.yaml.tpl")
	if err != nil {
		log.Error().Err(err).Msg("failed to parse semgrep rule")
		return
	}

	templateVariables := ImportedAndCalledSemgrepRuleVariables{
		PackageName: dependency,
	}

	err = semgrepRuleTemplate.Execute(ruleFile, templateVariables)
	if err != nil {
		log.Error().Err(err).Msg("failed to execute template and write rule to fd")
		return
	}
	return nil
}

func AnalyzeCodeForImportingAndCallingPackage(codeDir, dependency string) (results *SemgrepRuleOutput, err error) {
	ruleFile, err := os.CreateTemp("", "*.yaml")
	if err != nil {
		log.Error().Err(err).Msg("failed to create temporary semgrep rule")
		return
	}
	defer os.Remove(ruleFile.Name())

	if err = TemplateImportedAndCalledRuleToFile(ruleFile, dependency); err != nil {
		return
	}

	return runSemgrepRule(ruleFile.Name(), codeDir)
}
