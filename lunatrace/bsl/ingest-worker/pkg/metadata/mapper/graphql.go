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
	"github.com/lunasec-io/lunasec/lunatrace/cli/gql/types"
	"time"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
	"github.com/lunasec-io/lunasec/lunatrace/cli/gql"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/util"
)

var npmV types.PackageManager = types.NPM

// Map converts a fetcher.PackageMetadata into the struct required by GraphQL codegen.
func Map(p *metadata.PackageMetadata) (*gql.Package_insert_input, error) {
	r := &gql.Package_insert_input{
		Custom_registry: util.Ptr(""),
		Description:     util.Ptr(p.Description),
		Name:            util.Ptr(p.Name),
		Fetched_time:    util.Ptr(time.Now()),
		Package_maintainers: &gql.Package_package_maintainer_arr_rel_insert_input{
			Data:        mapMaintainers(p.Maintainers),
			On_conflict: gql.PackageMaintainerOnConflict,
		},
		Package_manager: &npmV,
		Releases: &gql.Package_release_arr_rel_insert_input{
			Data:        mapReleases(p.Releases),
			On_conflict: gql.ReleaseOnConflict,
		},
	}
	return r, nil
}

func mapReleases(r []metadata.Release) []*gql.Package_release_insert_input {
	m := make([]*gql.Package_release_insert_input, len(r))
	for i, rl := range r {
		m[i] = &gql.Package_release_insert_input{
			Publishing_maintainer: mapMaintainer(rl.PublishingMaintainer),

			Release_time:      util.Ptr(rl.ReleaseTime),
			Blob_hash:         util.Ptr(rl.BlobHash),
			Upstream_blob_url: util.Ptr(rl.UpstreamBlobUrl),
			Upstream_data:     util.Ptr(rl.UpstreamData),
			Version:           util.Ptr(rl.Version),

			Fetched_time: util.Ptr(time.Now()),

			Release_dependencies: &gql.Package_release_dependency_arr_rel_insert_input{
				Data:        mapDependencies(rl.Dependencies),
				On_conflict: gql.PackageReleaseDependencyOnConflict,
			},
		}

	}

	return m
}

func mapDependencies(ds []metadata.Dependency) []*gql.Package_release_dependency_insert_input {
	m := make([]*gql.Package_release_dependency_insert_input, len(ds))
	for i, dep := range ds {
		m[i] = &gql.Package_release_dependency_insert_input{
			// create a stub entry for packages which are not yet analyzed.
			Dependency_package: &gql.Package_obj_rel_insert_input{
				Data: &gql.Package_insert_input{
					Name:            util.Ptr(dep.Name),
					Package_manager: &npmV,
				},
				On_conflict: gql.PackageOnConflict,
			},
			Package_name:          util.Ptr(dep.Name),
			Package_version_query: util.Ptr(dep.Version),
		}
	}
	return m
}

func mapMaintainers(p []metadata.Maintainer) []*gql.Package_package_maintainer_insert_input {
	m := make([]*gql.Package_package_maintainer_insert_input, len(p))
	for i, pm := range p {
		m[i] = &gql.Package_package_maintainer_insert_input{
			Maintainer: mapMaintainer(pm),
		}

	}
	return m
}

func mapMaintainer(pm metadata.Maintainer) *gql.Package_maintainer_obj_rel_insert_input {
	return &gql.Package_maintainer_obj_rel_insert_input{
		Data: &gql.Package_maintainer_insert_input{
			Email:           util.Ptr(pm.Email),
			Name:            util.Ptr(pm.Name),
			Package_manager: &npmV,
		},
		On_conflict: gql.MaintainerOnConflict,
	}
}
