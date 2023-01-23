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
package packagejson

import (
	"encoding/json"
	"errors"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/scanner"
)

type packageJson struct {
	License string
}

type packageJsonScanner struct {
}

func (l *packageJsonScanner) Scan(f []byte) ([]string, error) {
	var pkgJson packageJson
	err := json.Unmarshal(f, &pkgJson)
	if err != nil {
		return nil, err
	}
	if pkgJson.License == "" {
		return nil, errors.New("No license specified")
	}
	return []string{pkgJson.License}, nil
}

func NewScanner() scanner.NewScannerResult {
	return scanner.NewScannerResult{Scanner: &packageJsonScanner{}}
}
