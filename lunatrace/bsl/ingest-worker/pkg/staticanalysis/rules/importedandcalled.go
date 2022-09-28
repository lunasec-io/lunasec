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
	"github.com/rs/zerolog/log"
	"os"
	"text/template"
)

const ImportedAndCalledSemgrepRule = `
rules:
  - id: imported-and-called
    options:
      symbolic_propagation: true
    patterns:
      - pattern-either:
          - pattern-inside: |
              $IMPORT = require("{{ .PackageName }}")
              ...
          - pattern-inside: |
              import $IMPORT from "{{ .PackageName }}"
              ...
          - pattern-inside: |
              import * as $IMPORT from "{{ .PackageName }}"
              ...
          - pattern-inside: |
              import { ..., $IMPORT,... } from "{{ .PackageName }}"
              ...
          - pattern-inside: |
              import { ..., $X as $IMPORT,... } from "{{ .PackageName }}"
              ...
      - pattern-either:
        - pattern-inside: $IMPORT.$FUNC()
        - pattern-inside: $IMPORT()
    message: A vulnerable package was imported and called.
    languages:
      - javascript
      - typescript
    severity: ERROR
`

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

	semgrepRuleTemplate, err := template.New("imported-and-called-semgrep-rule").Parse(ImportedAndCalledSemgrepRule)
	if err != nil {
		log.Error().Err(err).Msg("failed to parse semgrep rule")
		return false, err
	}

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
