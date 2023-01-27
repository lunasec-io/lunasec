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
	"time"

	"github.com/google/uuid"
	"github.com/rs/zerolog/log"
	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/mapper"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/util"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/package/model"
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

func (s *packageSqlIngester) upsertPackage(ctx context.Context, p *metadata.PackageMetadata) (string, error) {
	packageId, err := upsertPackage(ctx, s.deps.DB, model.Package{
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

	_, err = s.mapMaintainers(ctx, packageId, p.Maintainers)
	if err != nil {
		return "", err
	}

	_, err = s.mapReleases(ctx, packageId, p.Releases)
	if err != nil {
		return "", err
	}

	return packageId.String(), nil
}

func (s *packageSqlIngester) mapReleases(ctx context.Context, packageId uuid.UUID, r []metadata.Release) ([]uuid.UUID, error) {
	var (
		releaseIds []uuid.UUID
	)

	log.Debug().
		Int("count", len(r)).
		Str("package id", packageId.String()).
		Msg("inserting releases")
	for _, rl := range r {
		maintainerId, err := s.mapMaintainer(ctx, rl.PublishingMaintainer)
		if err != nil {
			return []uuid.UUID{}, err
		}

		releaseId, err := upsertRelease(ctx, s.deps.DB, model.Release{
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

		_, err = s.mapReleaseDependencies(ctx, releaseId, rl.Dependencies)
		if err != nil {
			return []uuid.UUID{}, err
		}
		releaseIds = append(releaseIds, releaseId)
	}
	return releaseIds, nil
}

func (s *packageSqlIngester) mapReleaseDependencies(
	ctx context.Context,
	releaseId uuid.UUID,
	ds []metadata.Dependency,
) ([]uuid.UUID, error) {
	var releaseDependencyIds []uuid.UUID
	for _, dep := range ds {
		dependencyPackageId, err := upsertReleaseDependencyPackage(ctx, s.deps.DB, model.Package{
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

		releaseDependencyId, err := upsertReleaseDependency(ctx, s.deps.DB, model.ReleaseDependency{
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

func (s *packageSqlIngester) mapMaintainers(ctx context.Context, packageId uuid.UUID, p []metadata.Maintainer) ([]uuid.UUID, error) {
	var maintainerIds []uuid.UUID
	for _, pm := range p {
		insertedId, err := s.mapMaintainer(ctx, pm)
		if err != nil {
			return maintainerIds, err
		}

		err = upsertPackageMaintainer(ctx, s.deps.DB, model.PackageMaintainer{
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

func (s *packageSqlIngester) mapMaintainer(ctx context.Context, pm metadata.Maintainer) (uuid.UUID, error) {
	return upsertMaintainer(ctx, s.deps.DB, model.Maintainer{
		PackageManager: mapper.NpmV,
		Email:          pm.Email,
		Name:           util.Ptr(pm.Name),
	})
}

func (s *packageSqlIngester) Ingest(ctx context.Context, pkg *metadata.PackageMetadata) (string, error) {
	packageId, err := s.upsertPackage(ctx, pkg)
	if err != nil {
		log.Error().
			Err(err).
			Msg("failed to upsert package")
		return "", err
	}
	return packageId, nil
}

func NewPackageSqlIngester(deps PackageSqlIngesterParams) PackageSqlIngester {
	return &packageSqlIngester{
		deps: deps,
	}
}
