package npm

import (
	"database/sql"
	"errors"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/fetcher/npm"
	"github.com/rs/zerolog/log"
	"go.uber.org/fx"
)

const (
	allPackageIds        = `SELECT id FROM npm.revision GROUP BY id ORDER BY id ASC`
	queryPackageMetadata = `SELECT doc, deleted FROM npm.revision WHERE id = $1 ORDER BY seq DESC LIMIT 1`
	maxPackageStreamSize = 1000
)

type npmRegistryDeps struct {
	fx.In

	Fetcher metadata.Fetcher
	DB      *sql.DB
}

type npmRegistry struct {
	deps npmRegistryDeps
}

func (s *npmRegistry) PackageStream() (<-chan string, error) {
	packageStream := make(chan string, maxPackageStreamSize)

	rows, err := s.deps.DB.Query(allPackageIds)
	if err != nil {
		return nil, err
	}

	go func() {
		defer close(packageStream)

		for rows.Next() {
			var packageName string
			err = rows.Scan(&packageName)
			if err != nil {
				log.Error().
					Err(err).
					Msg("failed to read row from all packages query")
				return
			}
			packageStream <- packageName
		}
	}()

	return packageStream, nil
}

func (s *npmRegistry) GetPackageMetadata(packageName string) (*metadata.PackageMetadata, error) {
	var (
		doc     []byte
		deleted bool
	)

	row := s.deps.DB.QueryRow(queryPackageMetadata, packageName)

	// TODO (cthompson) if there is no row returned, try to resolve the package via the NPM fetcher
	err := row.Scan(&doc, &deleted)
	if err != nil {
		log.Error().
			Err(err).
			Str("package name", packageName).
			Msg("failed to query rows for package metadata")
		return nil, err
	}

	if deleted {
		err = errors.New("failed to get latest package metadata")
		log.Error().
			Str("package name", packageName).
			Msg("latest package information is marked as deleted")
		return nil, err
	}

	return npm.ParseRawPackageMetadata(doc)
}

func NewNPMRegistry(d npmRegistryDeps) metadata.NpmRegistry {
	return &npmRegistry{deps: d}
}
