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
package scanner

import (
	"go.uber.org/fx"
)

type Scanner interface {
	// Scan scans the byte slice F for licenses and returns them as a list of strings.
	Scan(f []byte) ([]string, error)
}

type NewScannerResult struct {
	fx.Out

	Scanner Scanner `group:"license_scanners"`
}
