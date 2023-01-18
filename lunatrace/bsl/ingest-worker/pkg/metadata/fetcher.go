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
package metadata

import (
	"context"
	"encoding/json"
	"time"
)

type PackageMetadata struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Registry    string

	Maintainers []Maintainer `json:"maintainers"`
	Releases    []Release    `json:"versions"`

	UpstreamData json.RawMessage
}

type Maintainer struct {
	Name  string
	Email string
}

type Release struct {
	Version string `json:"version"`

	PublishingMaintainer Maintainer `json:"_npmUser"`

	Dependencies []Dependency `json:"dependencies"`

	ReleaseTime  time.Time
	ObservedTime time.Time

	BlobHash        string
	UpstreamBlobUrl string

	UpstreamData json.RawMessage
}

type Dependency struct {
	Name    string
	Version string
	IsDev   bool
}

// Fetcher fetches packages from a package metadata source.
// Each metadata source must implement this interface.
// Each Fetcher should adapt the data from the metadata source into the intermediate type PackageMetadata.
type Fetcher interface {
	Fetch(ctx context.Context, pkgName string) (*PackageMetadata, error)
}
