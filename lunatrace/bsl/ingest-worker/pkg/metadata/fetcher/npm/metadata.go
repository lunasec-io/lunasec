package npm

import (
	"encoding/json"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
)

func ParseRawPackageMetadata(pkgMetaRaw []byte) (*metadata.PackageMetadata, error) {
	var pkgMeta NpmPackageMetadataWithRawVersions
	err := json.Unmarshal(pkgMetaRaw, &pkgMeta)
	if err != nil {
		return nil, err
	}

	var pkgMetaForDB NpmPackageMetadata
	err = json.Unmarshal(pkgMetaRaw, &pkgMetaForDB)
	if err != nil {
		return nil, err
	}
	pkgMetaForDBRaw, err := json.Marshal(&pkgMetaForDB)
	if err != nil {
		return nil, err
	}

	return adapt(&pkgMeta, pkgMetaForDBRaw)
}
