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
package license

import (
	"context"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/gql"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/gql/types"
	"testing"
	"time"

	"github.com/rs/zerolog"
	"github.com/stretchr/testify/assert"

	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/command"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/config"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/constants"
	lunatypes "github.com/lunasec-io/lunasec/lunatrace/cli/pkg/types"
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
	},
}

func TestUpsert(t *testing.T) {
	// upsert package metadata

	globalFlags := lunatypes.NewLunaTraceGlobalFlags()

	command.EnableGlobalFlags(globalFlags)

	configProvider, err := config.NewConfigProvider()
	assert.NoError(t, err)

	appConfig, err := config.NewLunaTraceConfig(configProvider)
	assert.NoError(t, err)

	if appConfig.Stage == constants.DevelopmentEnv {
		zerolog.SetGlobalLevel(zerolog.DebugLevel)
	}

	const packageName = "test_package"
	const dependencyName = "test_dependency"

	res, err := gql.UpsertPackage(context.Background(), gql.LocalClient, &gql.Package_insert_input{
		Custom_registry: "",
		Description:     "",
		Name:            packageName,
		Package_maintainers: &gql.Package_package_maintainer_arr_rel_insert_input{
			Data: []*gql.Package_package_maintainer_insert_input{
				// slice of join table
				{
					Maintainer: &gql.Package_maintainer_obj_rel_insert_input{
						Data: &gql.Package_maintainer_insert_input{
							Email:           "",
							Name:            "",
							Package_manager: types.NPM,
						},
						On_conflict: maintainerOnConflict,
					},
				},
			},
			On_conflict: packageMaintainerOnConflict,
		},
		Package_manager: types.NPM,
		Releases: &gql.Package_release_arr_rel_insert_input{
			Data: []*gql.Package_release_insert_input{
				// slice of release
				{
					Publishing_maintainer: &gql.Package_maintainer_obj_rel_insert_input{
						Data: &gql.Package_maintainer_insert_input{
							Email:           "",
							Name:            "",
							Package_manager: types.NPM,
						},
						On_conflict: maintainerOnConflict,
					},
					Release_dependencies: &gql.Package_release_dependency_arr_rel_insert_input{
						Data: []*gql.Package_release_dependency_insert_input{
							// slice of deps
							{
								// create a stub entry for packages which are not yet analyzed.
								Dependency_package: &gql.Package_obj_rel_insert_input{
									Data: &gql.Package_insert_input{
										Name:            dependencyName,
										Package_manager: types.NPM,
									},
									On_conflict: packageOnConflict,
								},
								// todo we dont have resolved versions maybe so idk
								Dependency_release:    nil,
								Package_name:          dependencyName,
								Package_version_query: "",
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

	assert.NoError(t, err)
	assert.NotNil(t, res)
	t.Log(res)

}
