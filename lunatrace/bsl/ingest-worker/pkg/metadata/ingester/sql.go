package ingester

import (
	"database/sql"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/mapper"
	"github.com/rs/zerolog/log"
	"go.uber.org/fx"
	"time"
)

type PackageSqlIngesterParams struct {
	fx.In

	DB *sql.DB
}

type packageSqlIngester struct {
	deps PackageSqlIngesterParams
	preparedStmts
}

type preparedStmts struct {
	upsertPackage                      *sql.Stmt
	upsertReleaseStmt                  *sql.Stmt
	upsertReleaseDependencyPackageStmt *sql.Stmt
	upsertReleaseDependencyStmt        *sql.Stmt
	upsertPackageMaintainerStmt        *sql.Stmt
	upsertMaintainerStmt               *sql.Stmt
}

type PackageSqlIngester interface {
	UpsertPackage(tx *sql.Tx, p *metadata.PackageMetadata) (string, error)
}

func setupPreparedStmts(db *sql.DB) (stmts preparedStmts, err error) {
	upsertPackage, err := db.Prepare(
		`
INSERT INTO package.package(
	"name",
	package_manager,
	custom_registry,
	description,
	last_successful_fetch
) VALUES ($1, $2, $3, $4, $5)
ON CONFLICT
    ON CONSTRAINT package_package_manager_custom_registry_name_idx
    DO UPDATE
	  SET description = excluded.description,
	      last_successful_fetch = excluded.last_successful_fetch
RETURNING id
`)
	if err != nil {
		log.Error().Err(err).Msg("failed to build package stmt")
		return
	}

	upsertReleaseStmt, err := db.Prepare(
		`
INSERT INTO package.release(
	package_id,
	publishing_maintainer_id,
	release_time,
	blob_hash,
	upstream_blob_url,
	upstream_data,
	"version",
	fetched_time
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
ON CONFLICT
    ON CONSTRAINT release_package_id_version_idx 
    DO UPDATE
    SET publishing_maintainer_id = excluded.publishing_maintainer_id,
        release_time = excluded.release_time,
        blob_hash = excluded.blob_hash,
        upstream_blob_url = excluded.upstream_blob_url,
        upstream_data = excluded.upstream_data,
        "version" = excluded.version,
        fetched_time = excluded.fetched_time
RETURNING id
`)
	if err != nil {
		log.Error().Err(err).Msg("failed to build release stmt")
		return
	}

	upsertReleaseDependencyPackageStmt, err := db.Prepare(
		`
INSERT INTO package.package(
	"name",
	package_manager,
	custom_registry
) VALUES ($1, $2, $3)
ON CONFLICT
    ON CONSTRAINT package_package_manager_custom_registry_name_idx
    DO UPDATE 
			SET "name" = excluded.name
RETURNING id
`)
	if err != nil {
		log.Error().Err(err).Msg("failed to build release dependency package stmt")
		return
	}

	upsertReleaseDependencyStmt, err := db.Prepare(
		`
INSERT INTO package.release_dependency(
	release_id,
	dependency_package_id,
	package_name,
	package_version_query
) VALUES ($1, $2, $3, $4)
ON CONFLICT
    ON CONSTRAINT release_dependency_release_id_package_name_package_version__idx 
    DO UPDATE 
			SET release_id = excluded.release_id
RETURNING id
`)
	if err != nil {
		log.Error().Err(err).Msg("failed to build release dependency stmt")
		return
	}

	upsertPackageMaintainerStmt, err := db.Prepare(
		`INSERT INTO package.package_maintainer(
	package_id,
	maintainer_id
) VALUES ($1, $2)
ON CONFLICT
    ON CONSTRAINT package_maintainer_package_id_maintainer_id_idx 
    DO NOTHING
`)
	if err != nil {
		log.Error().Err(err).Msg("failed to build package maintainer stmt")
		return
	}

	upsertMaintainerStmt, err := db.Prepare(
		`INSERT INTO package.maintainer(
	"email",
	"name",
	"package_manager"
) VALUES ($1, $2, $3)
ON CONFLICT
    ON CONSTRAINT maintainer_package_manager_email_idx
    DO UPDATE
		SET "name" = excluded.name
RETURNING id`)
	if err != nil {
		log.Error().Err(err).Msg("failed to build maintainer stmt")
		return
	}

	stmts = preparedStmts{
		upsertPackage:                      upsertPackage,
		upsertReleaseStmt:                  upsertReleaseStmt,
		upsertReleaseDependencyPackageStmt: upsertReleaseDependencyPackageStmt,
		upsertReleaseDependencyStmt:        upsertReleaseDependencyStmt,
		upsertPackageMaintainerStmt:        upsertPackageMaintainerStmt,
		upsertMaintainerStmt:               upsertMaintainerStmt,
	}
	return
}

// Map converts a fetcher.PackageMetadata into the struct required by GraphQL codegen.
func (s *packageSqlIngester) UpsertPackage(tx *sql.Tx, p *metadata.PackageMetadata) (string, error) {
	var packageId string

	err := tx.Stmt(s.upsertPackage).QueryRow(
		p.Name, mapper.NpmV, p.Registry, p.Description, time.Now(),
	).Scan(&packageId)
	if err != nil {
		log.Error().Err(err).Msg("failed to upsert package")
		return "", err
	}

	_, err = s.mapMaintainers(tx, packageId, p.Maintainers)
	if err != nil {
		return "", err
	}

	_, err = s.mapReleases(tx, packageId, p.Releases)
	if err != nil {
		return "", err
	}

	return packageId, nil
}

func (s *packageSqlIngester) mapReleases(tx *sql.Tx, packageId string, r []metadata.Release) ([]string, error) {
	var (
		releaseIds []string
	)

	for _, rl := range r {
		var (
			releaseId string
		)
		maintainerId, err := s.mapMaintainer(tx, rl.PublishingMaintainer)
		if err != nil {
			return []string{}, err
		}

		err = tx.Stmt(s.upsertReleaseStmt).QueryRow(
			packageId, maintainerId, rl.ReleaseTime, rl.BlobHash, rl.UpstreamBlobUrl, rl.UpstreamData, rl.Version, time.Now(),
		).Scan(&releaseId)
		if err != nil {
			log.Error().Err(err).Msg("failed to upsert release")
			return []string{}, err
		}

		_, err = s.mapReleaseDependencies(tx, releaseId, rl.Dependencies)
		if err != nil {
			return []string{}, err
		}
		releaseIds = append(releaseIds, releaseId)
	}
	return releaseIds, nil
}

func (s *packageSqlIngester) mapReleaseDependencies(tx *sql.Tx, releaseId string, ds []metadata.Dependency) ([]string, error) {
	var releaseDependencyIds []string
	for _, dep := range ds {
		var (
			dependencyPackageId string
			releaseDependencyId string
		)

		err := tx.Stmt(s.upsertReleaseDependencyPackageStmt).QueryRow(
			dep.Name, mapper.NpmV, "",
		).Scan(&dependencyPackageId)
		if err != nil {
			log.Error().
				Err(err).
				Str("name", dep.Name).
				Str("package manager", string(mapper.NpmV)).
				Msg("failed to upsert release dependency package")
			return []string{}, err
		}

		err = tx.Stmt(s.upsertReleaseDependencyStmt).QueryRow(
			releaseId, dependencyPackageId, dep.Name, dep.Version,
		).Scan(&releaseDependencyId)
		if err != nil {
			log.Error().Err(err).Msg("failed to upsert release dependency")
			return []string{}, err
		}
		releaseDependencyIds = append(releaseDependencyIds, releaseDependencyId)
	}
	return releaseDependencyIds, nil
}

func (s *packageSqlIngester) mapMaintainers(tx *sql.Tx, packageId string, p []metadata.Maintainer) ([]string, error) {
	var maintainerIds []string
	for _, pm := range p {
		insertedId, err := s.mapMaintainer(tx, pm)
		if err != nil {
			return maintainerIds, err
		}

		_, err = tx.Stmt(s.upsertPackageMaintainerStmt).Exec(
			packageId, insertedId,
		)
		if err != nil {
			log.Error().Err(err).Msg("failed to upsert package maintainer")
			return []string{}, err
		}

		maintainerIds = append(maintainerIds, insertedId)
	}
	return maintainerIds, nil
}

func (s *packageSqlIngester) mapMaintainer(tx *sql.Tx, pm metadata.Maintainer) (string, error) {
	var id string

	err := tx.Stmt(s.upsertMaintainerStmt).QueryRow(
		pm.Email, pm.Name, mapper.NpmV,
	).Scan(&id)
	if err != nil {
		log.Error().Err(err).Msg("failed to upsert maintainer")
		return "", err
	}
	return id, nil
}

func NewPackageSqlIngester(deps PackageSqlIngesterParams) (PackageSqlIngester, error) {
	stmts, err := setupPreparedStmts(deps.DB)
	if err != nil {
		return nil, err
	}

	return &packageSqlIngester{
		deps:          deps,
		preparedStmts: stmts,
	}, nil
}
