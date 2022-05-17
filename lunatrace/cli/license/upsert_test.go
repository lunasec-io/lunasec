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
//
package license

import (
	"context"
	"testing"
	"time"

	"github.com/lunasec-io/lunasec/lunatrace/cli/gql"
)

var packageOnConflict = &gql.Package_on_conflict{
	Constraint: gql.Package_constraintPackagePackageManagerCustomRegistryNameIdx,
	Update_columns: []gql.Package_update_column{
		gql.Package_update_columnCustomRegistry,
		gql.Package_update_columnDescription,
		gql.Package_update_columnName,
		gql.Package_update_columnPackageManager,
	},
}

var releaseOnConflict = &gql.Package_release_on_conflict{
	Constraint: gql.Package_release_constraintReleasePackageIdVersionIdx,
	Update_columns: []gql.Package_release_update_column{
		gql.Package_release_update_columnBlobHash,
		gql.Package_release_update_columnMirroredBlobUrl,
		gql.Package_release_update_columnObservedTime,
		gql.Package_release_update_columnPublishingMaintainerId,
		gql.Package_release_update_columnReleaseTime,
		gql.Package_release_update_columnUpstreamBlobUrl,
		gql.Package_release_update_columnUpstreamData,
		gql.Package_release_update_columnVersion,
	},
}

var maintainerOnConflict = &gql.Package_maintainer_on_conflict{
	Constraint: gql.Package_maintainer_constraintMaintainerPackageManagerEmailIdx,
	Update_columns: []gql.Package_maintainer_update_column{
		gql.Package_maintainer_update_columnName,
		gql.Package_maintainer_update_columnEmail,
	},
}

var packageMaintainerOnConflict = &gql.Package_package_maintainer_on_conflict{
	Constraint: gql.Package_package_maintainer_constraintPackageMaintainerPackageIdMaintainerIdIdx,
	// don't upsert the join table
	Update_columns: []gql.Package_package_maintainer_update_column{},
}

var packageReleaseDependencyOnConflict = &gql.Package_release_dependency_on_conflict{
	Constraint: gql.Package_release_dependency_constraintReleaseDependencyReleaseIdPackageNamePackageVersionIdx,
	Update_columns: []gql.Package_release_dependency_update_column{
		//todo is this right?
		gql.Package_release_dependency_update_columnDependencyPackageId,
		gql.Package_release_dependency_update_columnDependencyReleaseId,
		gql.Package_release_dependency_update_columnPackageName,
		gql.Package_release_dependency_update_columnPackageVersionQuery,
		gql.Package_release_dependency_update_columnReleaseId,
	},
}

func TestUpsert(t *testing.T) {
	// upsert package metadata
	res, err := gql.UpsertPackage(context.Background(), gql.TODOClient, &gql.Package_insert_input{
		Custom_registry: "",
		Description:     "",
		Name:            "",
		Package_maintainers: &gql.Package_package_maintainer_arr_rel_insert_input{
			Data: []*gql.Package_package_maintainer_insert_input{
				{
					Maintainer: &gql.Package_maintainer_obj_rel_insert_input{
						Data: &gql.Package_maintainer_insert_input{
							Email:           "",
							Name:            "",
							Package_manager: gql.NPM,
						},
						On_conflict: maintainerOnConflict,
					},
				},
			},
			On_conflict: packageMaintainerOnConflict,
		},
		Package_manager: gql.NPM,
		Releases: &gql.Package_release_arr_rel_insert_input{
			Data: []*gql.Package_release_insert_input{
				{
					Publishing_maintainer: &gql.Package_maintainer_obj_rel_insert_input{
						Data: &gql.Package_maintainer_insert_input{
							Email:           "",
							Name:            "",
							Package_manager: gql.NPM,
						},
						On_conflict: maintainerOnConflict,
					},
					Release_dependencies: &gql.Package_release_dependency_arr_rel_insert_input{
						Data: []*gql.Package_release_dependency_insert_input{
							// array
							{
								Dependency_package:    nil,
								Dependency_package_id: uuid.UUID{},
								Dependency_release:    nil,
								Dependency_release_id: uuid.UUID{},
								Id:                    uuid.UUID{},
								Package_name:          "",
								Package_version_query: "",
								Release:               nil,
								Release_id:            uuid.UUID{},
							},
						},
						On_conflict: packageReleaseDependencyOnConflict,
					},
					Release_time: time.Time{},

					Blob_hash:         "",
					Mirrored_blob_url: "",
					Upstream_blob_url: "",

					Upstream_data: nil,

					Version: "",
				},
			},
			On_conflict: releaseOnConflict,
		},
	}, packageOnConflict)

}
