// Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
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
package syftmodel

import (
	"encoding/json"
)

type IDLikes []string

type LinuxRelease struct {
	PrettyName       string  `json:"prettyName,omitempty"`
	Name             string  `json:"name,omitempty"`
	ID               string  `json:"id,omitempty"`
	IDLike           IDLikes `json:"idLike,omitempty"`
	Version          string  `json:"version,omitempty"`
	VersionID        string  `json:"versionID,omitempty"`
	Variant          string  `json:"variant,omitempty"`
	VariantID        string  `json:"variantID,omitempty"`
	HomeURL          string  `json:"homeURL,omitempty"`
	SupportURL       string  `json:"supportURL,omitempty"`
	BugReportURL     string  `json:"bugReportURL,omitempty"`
	PrivacyPolicyURL string  `json:"privacyPolicyURL,omitempty"`
	CPEName          string  `json:"cpeName,omitempty"`
}

func (s *IDLikes) UnmarshalJSON(data []byte) error {
	var str string
	var strSlice []string

	// we support unmarshalling from a single value to support syft json schema v2
	if err := json.Unmarshal(data, &str); err == nil {
		*s = []string{str}
	} else if err := json.Unmarshal(data, &strSlice); err == nil {
		*s = strSlice
	} else {
		return err
	}
	return nil
}
