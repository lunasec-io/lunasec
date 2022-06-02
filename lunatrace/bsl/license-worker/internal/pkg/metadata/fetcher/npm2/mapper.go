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
package npm2

import (
	"encoding/json"
	"time"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/license-worker/internal/pkg/metadata/fetcher"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/license-worker/internal/pkg/metadata/fetcher/npm"
)

func adapt(n *npm.NpmPackageMetadataWithRawVersion, raw []byte) (*fetcher.PackageMetadata, error) {
	releases, err := mapReleases(n.VersionsRaw)
	if err != nil {
		return nil, err
	}
	r := &fetcher.PackageMetadata{
		Name:         n.Name,
		Description:  n.Description,
		Registry:     npm.NpmRegistry,
		Maintainers:  mapMaintainers(n.Maintainers),
		Releases:     releases,
		UpstreamData: raw,
	}

	return r, nil
}

func mapMaintainers(a []npm.Author) []fetcher.Maintainer {
	m := make([]fetcher.Maintainer, len(a))
	for i, mt := range a {
		m[i] = fetcher.Maintainer{
			Name:  mt.Name,
			Email: mt.Email,
		}

	}
	return m
}

func mapReleases(r map[string]json.RawMessage) ([]fetcher.Release, error) {
	m := make([]fetcher.Release, 0, len(r))
	for rv, rrl := range r {

		var rl npm.Version

		err := json.Unmarshal(rrl, &rl)
		if err != nil {
			return nil, err
		}

		m = append(m, fetcher.Release{
			Version: rv,

			PublishingMaintainer: fetcher.Maintainer{
				Name:  rl.NpmUser.Name,
				Email: rl.NpmUser.Email,
			},

			BlobHash:        rl.Dist.Shasum,
			UpstreamBlobUrl: rl.Dist.Tarball,

			Dependencies: mapDependencies(rl.Dependencies, rl.DevDependencies),

			UpstreamData: rrl,

			//todo
			ReleaseTime: time.Time{},
		})

	}
	return m, nil
}

func mapDependencies(deps, devdeps map[string]string) []fetcher.Dependency {
	m := make([]fetcher.Dependency, 0, len(deps)+len(devdeps))
	for dep, ver := range deps {
		m = append(m, fetcher.Dependency{
			Name:    dep,
			Version: ver,
			IsDev:   false,
		})
	}
	for dep, ver := range devdeps {
		m = append(m, fetcher.Dependency{
			Name:    dep,
			Version: ver,
			IsDev:   true,
		})
	}
	return m
}
