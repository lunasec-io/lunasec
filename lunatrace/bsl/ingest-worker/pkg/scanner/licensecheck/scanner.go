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
package licensecheck

import (
	"github.com/google/licensecheck"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/scanner"
)

type licenseCheckScanner struct {
}

func (l *licenseCheckScanner) Scan(f []byte) ([]string, error) {
	cov := licensecheck.Scan(f)

	licenses := make([]string, 0)

matches:
	for _, ci := range cov.Match {
		for _, knownLicense := range licenses {
			if ci.ID == knownLicense {
				continue matches
			}
		}
		licenses = append(licenses, ci.ID)
	}
	return licenses, nil
}

func NewScanner() scanner.NewScannerResult {
	return scanner.NewScannerResult{Scanner: &licenseCheckScanner{}}
}
