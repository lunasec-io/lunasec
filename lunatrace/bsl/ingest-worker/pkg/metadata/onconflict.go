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
package metadata

import . "github.com/lunasec-io/lunasec/lunatrace/gogen/gql"

var PackageOnConflict = &Package_on_conflict{
	Constraint: Package_constraintPackagePackageManagerCustomRegistryNameIdx,
	Update_columns: []Package_update_column{
		Package_update_columnCustomRegistry,
		Package_update_columnDescription,
		Package_update_columnName,
		Package_update_columnPackageManager,
		Package_update_columnLastSuccessfulFetch,
	},
}

var ReleaseOnConflict = &Package_release_on_conflict{
	Constraint: Package_release_constraintReleasePackageIdVersionIdx,
	Update_columns: []Package_release_update_column{
		Package_release_update_columnBlobHash,
		Package_release_update_columnMirroredBlobUrl,
		Package_release_update_columnObservedTime,
		Package_release_update_columnPublishingMaintainerId,
		Package_release_update_columnReleaseTime,
		Package_release_update_columnUpstreamBlobUrl,
		Package_release_update_columnUpstreamData,
		Package_release_update_columnVersion,
		Package_release_update_columnFetchedTime,
	},
}

var MaintainerOnConflict = &Package_maintainer_on_conflict{
	Constraint: Package_maintainer_constraintMaintainerPackageManagerEmailIdx,
	Update_columns: []Package_maintainer_update_column{
		Package_maintainer_update_columnName,
		Package_maintainer_update_columnEmail,
	},
}

var PackageMaintainerOnConflict = &Package_package_maintainer_on_conflict{
	Constraint: Package_package_maintainer_constraintPackageMaintainerPackageIdMaintainerIdIdx,
	// don't upsert the join table
	Update_columns: []Package_package_maintainer_update_column{},
}

var PackageReleaseDependencyOnConflict = &Package_release_dependency_on_conflict{
	Constraint: Package_release_dependency_constraintReleaseDependencyReleaseIdPackageNamePackageVersionIdx,
	Update_columns: []Package_release_dependency_update_column{
		Package_release_dependency_update_columnDependencyPackageId,
		Package_release_dependency_update_columnPackageName,
		Package_release_dependency_update_columnPackageVersionQuery,
	},
}
