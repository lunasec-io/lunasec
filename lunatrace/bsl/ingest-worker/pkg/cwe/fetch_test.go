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
package cwe

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestFetchCWEsFromMitre(t *testing.T) {
	cwes, err := FetchCWEsFromMitre()
	assert.Nil(t, err, "error should not be defined when downloading cwes")
	assert.Greater(t, len(cwes.Weaknesses), 0, "there should be more than zero cwes in list")
}
