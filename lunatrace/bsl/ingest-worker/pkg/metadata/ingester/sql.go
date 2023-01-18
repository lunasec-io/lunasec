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
package ingester

import (
	"context"
	"database/sql"
	"github.com/google/uuid"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/mapper"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/util"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/package/model"
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
}

type PackageSqlIngester interface {
	Ingest(ctx context.Context, p *metadata.PackageMetadata) (string, error)
}

func (s *packageSqlIngester) upsertPackage(ctx context.Context, tx *sql.Tx, p *metadata.PackageMetadata) (string, error) {
	packageId, err := upsertPackage(ctx, tx, model.Package{
		PackageManager:      mapper.NpmV,
		CustomRegistry:      p.Registry,
		Name:                p.Name,
		Description:         util.Ptr(p.Description),
		LastSuccessfulFetch: util.Ptr(time.Now()),
	})
	if err != nil {
		log.Error().Err(err).Msg("failed to upsert package")
		return "", err
	}

	_, err = s.mapMaintainers(ctx, tx, packageId, p.Maintainers)
	if err != nil {
		return "", err
	}

	_, err = s.mapReleases(ctx, tx, packageId, p.Releases)
	if err != nil {
		return "", err
	}

	return packageId.String(), nil
}

func (s *packageSqlIngester) mapReleases(ctx context.Context, tx *sql.Tx, packageId uuid.UUID, r []metadata.Release) ([]uuid.UUID, error) {
	var (
		releaseIds []uuid.UUID
	)

	for _, rl := range r {
		maintainerId, err := s.mapMaintainer(ctx, tx, rl.PublishingMaintainer)
		if err != nil {
			return []uuid.UUID{}, err
		}

		releaseId, err := upsertRelease(ctx, tx, model.Release{
			PackageID:              packageId,
			Version:                rl.Version,
			PublishingMaintainerID: util.Ptr(maintainerId),
			ReleaseTime:            util.Ptr(rl.ReleaseTime),
			BlobHash:               util.Ptr(rl.BlobHash),
			UpstreamBlobURL:        util.Ptr(rl.UpstreamBlobUrl),
			UpstreamData:           util.Ptr(string(rl.UpstreamData)),
			FetchedTime:            util.Ptr(time.Now()),
		})
		if err != nil {
			log.Error().Err(err).Msg("failed to upsert release")
			return []uuid.UUID{}, err
		}

		_, err = s.mapReleaseDependencies(ctx, tx, releaseId, rl.Dependencies)
		if err != nil {
			return []uuid.UUID{}, err
		}
		releaseIds = append(releaseIds, releaseId)
	}
	return releaseIds, nil
}

func (s *packageSqlIngester) mapReleaseDependencies(
	ctx context.Context,
	tx *sql.Tx,
	releaseId uuid.UUID,
	ds []metadata.Dependency,
) ([]uuid.UUID, error) {
	var releaseDependencyIds []uuid.UUID
	for _, dep := range ds {
		dependencyPackageId, err := upsertReleaseDependencyPackage(ctx, tx, model.Package{
			Name:           dep.Name,
			PackageManager: mapper.NpmV,
			CustomRegistry: "",
		})
		if err != nil {
			log.Error().
				Err(err).
				Str("name", dep.Name).
				Msg("failed to upsert release dependency package")
			return []uuid.UUID{}, err
		}

		releaseDependencyId, err := upsertReleaseDependency(ctx, tx, model.ReleaseDependency{
			ReleaseID:           releaseId,
			DependencyPackageID: util.Ptr(dependencyPackageId),
			PackageName:         dep.Name,
			PackageVersionQuery: dep.Version,
		})
		if err != nil {
			log.Error().Err(err).Msg("failed to upsert release dependency")
			return []uuid.UUID{}, err
		}
		releaseDependencyIds = append(releaseDependencyIds, releaseDependencyId)
	}
	return releaseDependencyIds, nil
}

func (s *packageSqlIngester) mapMaintainers(ctx context.Context, tx *sql.Tx, packageId uuid.UUID, p []metadata.Maintainer) ([]uuid.UUID, error) {
	var maintainerIds []uuid.UUID
	for _, pm := range p {
		insertedId, err := s.mapMaintainer(ctx, tx, pm)
		if err != nil {
			return maintainerIds, err
		}

		err = upsertPackageMaintainer(ctx, tx, model.PackageMaintainer{
			PackageID:    util.Ptr(packageId),
			MaintainerID: util.Ptr(insertedId),
		})
		if err != nil {
			log.Error().Err(err).Msg("failed to upsert package maintainer")
			return []uuid.UUID{}, err
		}

		maintainerIds = append(maintainerIds, insertedId)
	}
	return maintainerIds, nil
}

func (s *packageSqlIngester) mapMaintainer(ctx context.Context, tx *sql.Tx, pm metadata.Maintainer) (uuid.UUID, error) {
	return upsertMaintainer(ctx, tx, model.Maintainer{
		PackageManager: mapper.NpmV,
		Email:          pm.Email,
		Name:           util.Ptr(pm.Name),
	})
}

func (s *packageSqlIngester) Ingest(ctx context.Context, pkg *metadata.PackageMetadata) (string, error) {
	tx, err := s.deps.DB.BeginTx(ctx, &sql.TxOptions{
		Isolation: sql.LevelReadUncommitted,
	})
	if err != nil {
		return "", err
	}
	defer tx.Rollback()

	packageId, err := s.upsertPackage(ctx, tx, pkg)
	if err != nil {
		log.Error().
			Err(err).
			Msg("failed to upsert package")
		return "", err
	}

	if err = tx.Commit(); err != nil {
		return "", err
	}
	return packageId, nil
}

func NewPackageSqlIngester(deps PackageSqlIngesterParams) PackageSqlIngester {
	return &packageSqlIngester{
		deps: deps,
	}
}
