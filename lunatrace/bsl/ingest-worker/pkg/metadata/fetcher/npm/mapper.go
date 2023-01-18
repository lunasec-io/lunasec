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
package npm

import (
	"encoding/json"
	"github.com/rs/zerolog/log"
	"time"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
)

func adapt(n *NpmPackageMetadataWithRawVersions, packageRaw []byte) (*metadata.PackageMetadata, error) {
	releases, err := mapReleases(n.Name, n.VersionsRaw)
	if err != nil {
		return nil, err
	}
	r := &metadata.PackageMetadata{
		Name:         n.Name,
		Description:  n.Description,
		Registry:     "",
		Maintainers:  mapMaintainers(n.Maintainers),
		Releases:     releases,
		UpstreamData: packageRaw,
	}

	return r, nil
}

func mapMaintainers(a []Author) []metadata.Maintainer {
	m := make([]metadata.Maintainer, len(a))
	for i, mt := range a {
		m[i] = metadata.Maintainer{
			Name:  mt.Name,
			Email: mt.Email,
		}

	}
	return m
}

func mapReleases(packageName string, r map[string]json.RawMessage) ([]metadata.Release, error) {
	m := make([]metadata.Release, 0, len(r))
	for rv, rrl := range r {

		var rl Version

		err := json.Unmarshal(rrl, &rl)
		if err != nil {
			log.Error().
				Err(err).
				Str("package name", packageName).
				Str("version", rv).
				Msg("release failed to unmarshal, dropping error")
			continue
		}

		m = append(m, metadata.Release{
			Version: rv,

			PublishingMaintainer: metadata.Maintainer{
				Name:  rl.NpmUser.Name,
				Email: rl.NpmUser.Email,
			},

			BlobHash:        rl.Dist.Shasum,
			UpstreamBlobUrl: rl.Dist.Tarball,

			Dependencies: mapDependencies(rl.Dependencies, rl.DevDependencies),

			UpstreamData: rrl,

			//todo make releasetime nullable
			ReleaseTime: time.Time{},
		})
	}
	return m, nil
}

func mapDependencies(deps, devdeps map[string]string) []metadata.Dependency {
	m := make([]metadata.Dependency, 0, len(deps)+len(devdeps))
	for dep, ver := range deps {
		m = append(m, metadata.Dependency{
			Name:    dep,
			Version: ver,
			IsDev:   false,
		})
	}
	for dep, ver := range devdeps {
		m = append(m, metadata.Dependency{
			Name:    dep,
			Version: ver,
			IsDev:   true,
		})
	}
	return m
}
