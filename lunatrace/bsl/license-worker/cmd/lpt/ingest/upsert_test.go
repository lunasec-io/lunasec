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
package ingest

import (
	"context"
	"testing"
	"time"

	"github.com/rs/zerolog"
	"github.com/stretchr/testify/assert"

	"github.com/lunasec-io/lunasec/lunatrace/cli/gql"
	"github.com/lunasec-io/lunasec/lunatrace/cli/gql/types"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/command"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/config"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/constants"
	lunatypes "github.com/lunasec-io/lunasec/lunatrace/cli/pkg/types"
)

func TestUpsert(t *testing.T) {
	// upsert package metadata

	globalFlags := lunatypes.NewLunaTraceGlobalFlags()

	command.EnableGlobalFlags(globalFlags)

	appConfig, err := config.LoadLunaTraceConfig()
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
						On_conflict: gql.MaintainerOnConflict,
					},
				},
			},
			On_conflict: gql.PackageMaintainerOnConflict,
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
						On_conflict: gql.MaintainerOnConflict,
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
									On_conflict: gql.PackageOnConflict,
								},
								// todo we dont have resolved versions maybe so idk
								Dependency_release:    nil,
								Package_name:          dependencyName,
								Package_version_query: "",
							},
						},
						On_conflict: gql.PackageReleaseDependencyOnConflict,
					},

					Release_time: time.Time{},

					Blob_hash:         "",
					Mirrored_blob_url: "",
					Upstream_blob_url: "",

					Upstream_data: nil,

					Version: "",
				},
			},
			On_conflict: gql.ReleaseOnConflict,
		},
	}, gql.PackageOnConflict)

	assert.NoError(t, err)
	assert.NotNil(t, res)
	t.Log(res)

}
