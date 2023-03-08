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
	"time"
)

// PackageIngester ingests and upserts a single package from a datasource.
// It may return a list of suggestions for further packages to fetch.
type PackageIngester interface {
	Ingest(ctx context.Context, packageName string) ([]string, error)
	IngestPackageReference(ctx context.Context, packageName string) error
	IngestWithDownloadCounts(ctx context.Context, packageName string) error
	IngestWithoutRefetch(ctx context.Context, packageName string, duration time.Duration) ([]string, error)
	IngestPackageAndDependencies(ctx context.Context, packageName string, ignoreErrors bool, duration time.Duration) error
	IngestAllPackagesFromRegistry(ctx context.Context, ignoreErrors bool, duration time.Duration) error
	IngestPackagesFromFile(ctx context.Context, packagesFile string, references bool) error
}
