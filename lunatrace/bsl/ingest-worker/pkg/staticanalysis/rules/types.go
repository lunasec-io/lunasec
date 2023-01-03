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

import "encoding/json"

type SemgrepRuleOutput struct {
	Errors  []SemgrepError  `json:"errors"`
	Paths   Paths           `json:"paths"`
	Results []SemgrepResult `json:"results"`
	Version string          `json:"version"`
}

type SemgrepError struct {
	Code    int    `json:"code"`
	Level   string `json:"level"`
	Message string `json:"message"`
	Type    string `json:"type"`
}

type Paths struct {
	Comment string   `json:"_comment"`
	Scanned []string `json:"scanned"`
}

type SemgrepResult struct {
	CheckID string   `json:"check_id"`
	End     Location `json:"end"`
	Extra   Extra    `json:"extra"`
	Path    string   `json:"path"`
	Start   Location `json:"start"`
}

type Location struct {
	Col    int64 `json:"col"`
	Line   int64 `json:"line"`
	Offset int64 `json:"offset"`
}

type Extra struct {
	Fingerprint string                     `json:"fingerprint"`
	IsIgnored   bool                       `json:"is_ignored"`
	Lines       string                     `json:"lines"`
	Message     string                     `json:"message"`
	Metadata    map[string]json.RawMessage `json:"metadata"`
	Metavars    map[string]Metavar         `json:"metavars"`
	Severity    Severity                   `json:"severity"`
}

type Metavar struct {
	AbstractContent string   `json:"abstract_content"`
	End             Location `json:"end"`
	Start           Location `json:"start"`
}

type Severity string

const (
	Error Severity = "ERROR"
)
