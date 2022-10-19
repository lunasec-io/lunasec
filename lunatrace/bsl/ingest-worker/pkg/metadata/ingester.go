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
package metadata

import (
	"context"
)

// Ingester ingests and upserts a single package from a datasource.
// It may return a list of suggestions for further packages to fetch.
type Ingester interface {
	Ingest(ctx context.Context, packageName string) ([]string, error)
	IngestPackageAndDependencies(ctx context.Context, packageName string) error
	IngestAllPackagesFromRegistry(ctx context.Context) error
}
