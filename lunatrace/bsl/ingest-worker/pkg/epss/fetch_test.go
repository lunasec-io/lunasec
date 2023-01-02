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
package epss

import (
  "github.com/stretchr/testify/assert"
  "testing"
)

func TestFetchEpssScores(t *testing.T) {
  epssScores, err := FetchEpssScores()
  assert.Nil(t, err, "error should not be defined when downloading epss scores")
  assert.Greater(t, len(epssScores), 0, "there should be more than zero epssScores in list")

  // Check that the first epss score is valid and begins with "CVE-"
  assert.Greater(t, len(epssScores[0].Cve), 10, "cve should be at least 10 characters long")
  assert.Equal(t, "CVE-", epssScores[0].Cve[0:4], "cve should begin with CVE-*")

  // Check that the first epss score is valid and greater than 0 but less than 1.0
  assert.Greater(t, epssScores[0].Epss, 0.0, "epss score should be greater than 0")
  assert.Less(t, epssScores[0].Epss, 1.0, "epss score should be less than 1.0")

  // Check that the first epss percentile is valid and greater than 0 but less than 1.0
  assert.Greater(t, epssScores[0].Percentile, 0.0, "epss percentile should be greater than 0")
  assert.Less(t, epssScores[0].Percentile, 1.0, "epss percentile should be less than 1.0")

}
