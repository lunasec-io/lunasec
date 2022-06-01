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
	"context"
	"encoding/json"
	"io"
	"io/ioutil"
	"net/http"

	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/license-worker/internal/pkg/metadata/fetcher"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/license-worker/internal/pkg/metadata/fetcher/npm"
)

type npmFetcherDeps struct {
	fx.In
	Client *http.Client
}

type npmFetcher struct {
	deps npmFetcherDeps
}

func (n *npmFetcher) Fetch(ctx context.Context, pkgName string) (*fetcher.PackageMetadata, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, npm.NpmRegistry+"/"+pkgName, nil)
	if err != nil {
		return nil, err
	}
	res, err := n.deps.Client.Do(req)
	if err != nil {
		return nil, err
	}

	pkgMetaRaw, err := ioutil.ReadAll(&io.LimitedReader{
		N: 1024 * 1024 * 5,
		R: res.Body,
	})
	if err != nil {
		return nil, err
	}

	var pkgMeta npm.NpmPackageMetadataWithRawVersion
	err = json.Unmarshal(pkgMetaRaw, &pkgMeta)
	if err != nil {
		return nil, err
	}

	return adapt(&pkgMeta, pkgMetaRaw)
}

func NewNPMFetcher(d npmFetcherDeps) fetcher.Fetcher {
	return &npmFetcher{deps: d}
}
