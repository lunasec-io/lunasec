package registry

import (
	"context"
	"database/sql"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
	"go.uber.org/fx"
)

const (
	batchSize      = 100
	revisionUpsert = `
INSERT INTO npm.revision (seq, id, rev, doc, deleted)
VALUES %s
ON CONFLICT (seq)
DO UPDATE SET id = EXCLUDED.id, rev = EXCLUDED.rev, doc = EXCLUDED.doc, deleted = EXCLUDED.deleted
`
)

type npmRegistryDeps struct {
	fx.In
	DB *sql.DB
}

type npmRegistry struct {
	deps npmRegistryDeps
}

func (s *npmRegistry) PackageStream(ctx context.Context) (<-chan string, error) {
	return nil, nil
}

func (s *npmRegistry) GetPackageMetadata(ctx context.Context, name string) (*metadata.PackageMetadata, error) {
	return nil, nil
}

func NewNPMRegistry(d npmRegistryDeps) metadata.NpmRegistry {
	return &npmRegistry{deps: d}
}
