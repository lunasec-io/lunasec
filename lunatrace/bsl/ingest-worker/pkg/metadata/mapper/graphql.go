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
package mapper

import (
	gql2 "github.com/lunasec-io/lunasec/lunatrace/gen/gql"
	"github.com/lunasec-io/lunasec/lunatrace/gen/gql/types"
	"time"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/util"
)

var npmV types.PackageManager = types.NPM

// Map converts a fetcher.PackageMetadata into the struct required by GraphQL codegen.
func Map(p *metadata.PackageMetadata) (*gql2.Package_insert_input, error) {
	r := &gql2.Package_insert_input{
		Custom_registry:       util.Ptr(""),
		Description:           util.Ptr(p.Description),
		Name:                  util.Ptr(p.Name),
		Last_successful_fetch: util.Ptr(time.Now()),
		Package_maintainers:   mapMaintainers(p.Maintainers),
		Package_manager:       &npmV,
		Releases:              mapReleases(p.Releases),
	}
	return r, nil
}

func mapReleases(r []metadata.Release) *gql2.Package_release_arr_rel_insert_input {
	m := make([]*gql2.Package_release_insert_input, len(r))
	for i, rl := range r {
		m[i] = &gql2.Package_release_insert_input{
			Publishing_maintainer: mapMaintainer(rl.PublishingMaintainer),

			Release_time:      util.Ptr(rl.ReleaseTime),
			Blob_hash:         util.Ptr(rl.BlobHash),
			Upstream_blob_url: util.Ptr(rl.UpstreamBlobUrl),
			Upstream_data:     util.Ptr(rl.UpstreamData),
			Version:           util.Ptr(rl.Version),

			Fetched_time: util.Ptr(time.Now()),

			Release_dependencies: mapDependencies(rl.Dependencies),
		}

	}

	if len(m) == 0 {
		return nil
	}

	return &gql2.Package_release_arr_rel_insert_input{
		Data:        m,
		On_conflict: gql2.ReleaseOnConflict,
	}
}

func mapDependencies(ds []metadata.Dependency) *gql2.Package_release_dependency_arr_rel_insert_input {
	m := make([]*gql2.Package_release_dependency_insert_input, len(ds))
	for i, dep := range ds {
		m[i] = &gql2.Package_release_dependency_insert_input{
			// create a stub entry for packages which are not yet analyzed.
			Dependency_package: &gql2.Package_obj_rel_insert_input{
				Data: &gql2.Package_insert_input{
					Name:            util.Ptr(dep.Name),
					Package_manager: &npmV,
				},
				On_conflict: gql2.PackageOnConflict,
			},
			Package_name:          util.Ptr(dep.Name),
			Package_version_query: util.Ptr(dep.Version),
		}
	}

	if len(m) == 0 {
		return nil
	}

	return &gql2.Package_release_dependency_arr_rel_insert_input{
		Data:        m,
		On_conflict: gql2.PackageReleaseDependencyOnConflict,
	}
}

func mapMaintainers(p []metadata.Maintainer) *gql2.Package_package_maintainer_arr_rel_insert_input {
	m := make([]*gql2.Package_package_maintainer_insert_input, len(p))
	for i, pm := range p {
		m[i] = &gql2.Package_package_maintainer_insert_input{
			Maintainer: mapMaintainer(pm),
		}

	}

	if len(m) == 0 {
		return nil
	}

	return &gql2.Package_package_maintainer_arr_rel_insert_input{
		Data:        m,
		On_conflict: gql2.PackageMaintainerOnConflict,
	}
}

func mapMaintainer(pm metadata.Maintainer) *gql2.Package_maintainer_obj_rel_insert_input {
	return &gql2.Package_maintainer_obj_rel_insert_input{
		Data: &gql2.Package_maintainer_insert_input{
			Email:           util.Ptr(pm.Email),
			Name:            util.Ptr(pm.Name),
			Package_manager: &npmV,
		},
		On_conflict: gql2.MaintainerOnConflict,
	}
}
