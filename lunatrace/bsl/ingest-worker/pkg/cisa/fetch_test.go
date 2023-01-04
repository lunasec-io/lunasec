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
package cisa

import (
  "github.com/stretchr/testify/assert"
  "testing"
)

func TestFetchEpssScores(t *testing.T) {
  cisaKnownVulns, err := FetchCisaKnownVulns()
  assert.Nil(t, err, "error should not be defined when downloading cisa scores")
  assert.Greater(t, len(cisaKnownVulns), 0, "there should be more than zero cisaKnownVulns in list")

  // Check that the first cisa score is valid and begins with "CVE-"
  assert.Greater(t, len(cisaKnownVulns[0].Cve), 10, "cve should be at least 10 characters long")
  assert.Equal(t, "CVE-", cisaKnownVulns[0].Cve[0:4], "cve should begin with CVE-*")

  assert.Greater(t, len(cisaKnownVulns[0].VendorProject), 0, "vendor project should be at least 1 characters long")
  assert.Greater(t, len(cisaKnownVulns[0].Product), 0, "product should be at least 1 characters long")
  assert.Greater(t, len(cisaKnownVulns[0].VulnerabilityName), 0, "vulnerability name should be at least 1 characters long")
  assert.Equal(t, len(cisaKnownVulns[0].DateAdded), 10, "date added should be 10 characters long")
  assert.Greater(t, len(cisaKnownVulns[0].ShortDescription), 0, "short description should be at least 1 characters long")
  assert.GreaterOrEqual(t, len(cisaKnownVulns[0].RequiredAction), 0, "required action should be at least 0 characters long")
  assert.Equal(t, len(cisaKnownVulns[0].DueDate), 10, "due date should be 10 characters long")
  assert.GreaterOrEqual(t, len(cisaKnownVulns[0].Notes), 0, "notes should be at least 0 characters long")

}
