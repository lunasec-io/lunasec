// Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
package scan

import (
	"github.com/lunasec-io/lunasec/tools/log4shell/constants"
	"github.com/lunasec-io/lunasec/tools/log4shell/types"
	"strings"
)

func FilterVulnerableHashLookup(fullHashLookup types.VulnerableHashLookup, scanLog4j1 bool) types.VulnerableHashLookup {
	filteredHashLookup := types.VulnerableHashLookup{}

	for hash, vulnInfo := range fullHashLookup {
		shouldAddLog4j1Vuln := scanLog4j1 && strings.HasPrefix(vulnInfo.Version, constants.Log4j1x)
		shouldAddLog4j2Vuln := strings.HasPrefix(vulnInfo.Version, constants.Log4j2x)
		if shouldAddLog4j1Vuln || shouldAddLog4j2Vuln {
			filteredHashLookup[hash] = vulnInfo
		}
	}
	return filteredHashLookup
}
