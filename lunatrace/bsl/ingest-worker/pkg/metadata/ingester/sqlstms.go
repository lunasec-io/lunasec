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

	"github.com/go-jet/jet/v2/postgres"
	"github.com/google/uuid"

	"github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/package/model"
	. "github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/package/table"
)

func upsertPackage(ctx context.Context, db *sql.DB, p model.Package) (id uuid.UUID, err error) {
	selectReleaseDependencyPackage := Package.SELECT(
		Package.Name,
		Package.PackageManager,
		Package.CustomRegistry,
		Package.Description,
	).WHERE(
		Package.Name.EQ(postgres.String(p.Name)).
			AND(Package.PackageManager.EQ(postgres.NewEnumValue(string(p.PackageManager)))).
			AND(Package.CustomRegistry.EQ(postgres.String(p.CustomRegistry))),
	)

	var releaseDependencyPackage model.Package
	err = selectReleaseDependencyPackage.QueryContext(ctx, db, &releaseDependencyPackage)
	if err == nil {
		// If the release dependency package already exists, we don't need to do anything
		if releaseDependencyPackage.Description == p.Description {
			return releaseDependencyPackage.ID, nil
		}
	}

	packageInsert := Package.INSERT(
		Package.Name,
		Package.PackageManager,
		Package.CustomRegistry,
		Package.Description,
		Package.LastSuccessfulFetch,
	).MODEL(p).
		ON_CONFLICT().
		ON_CONSTRAINT("package_package_manager_custom_registry_name_idx").
		DO_UPDATE(
			postgres.SET(
				Package.Description.SET(Package.EXCLUDED.Description),
				Package.LastSuccessfulFetch.SET(Package.EXCLUDED.LastSuccessfulFetch),
			),
		).
		RETURNING(Package.ID)

	var insertedPackage model.Package
	err = packageInsert.QueryContext(ctx, db, &insertedPackage)
	if err != nil {
		return uuid.UUID{}, err
	}
	return insertedPackage.ID, nil
}

func upsertRelease(ctx context.Context, db *sql.DB, r model.Release) (id uuid.UUID, err error) {
	selectRelease := Release.SELECT(
		Release.AllColumns,
	).WHERE(
		Release.PackageID.EQ(postgres.UUID(r.PackageID)).
			AND(Release.Version.EQ(postgres.String(r.Version))),
	)

	var release model.Release
	err = selectRelease.QueryContext(ctx, db, &release)
	if err == nil {
		// TODO (cthompson) not easy to compare jsonb, so we're skipping this for now
		// release.UpstreamData == r.UpstreamData &&

		// If the release already exists, we don't need to do anything
		if release.PublishingMaintainerID == r.PublishingMaintainerID &&
			release.ReleaseTime == r.ReleaseTime &&
			release.BlobHash == r.BlobHash &&
			release.UpstreamBlobURL == r.UpstreamBlobURL {

			// TODO (cthompson) update FetchedTime

			return release.ID, nil
		}
	}

	releaseInsert := Release.INSERT(
		Release.PackageID,
		Release.PublishingMaintainerID,
		Release.ReleaseTime,
		Release.BlobHash,
		Release.UpstreamBlobURL,
		Release.UpstreamData,
		Release.Version,
		Release.FetchedTime,
	).MODEL(r).
		ON_CONFLICT().
		ON_CONSTRAINT("release_package_id_version_idx").
		DO_UPDATE(
			postgres.SET(
				Release.PublishingMaintainerID.SET(Release.EXCLUDED.PublishingMaintainerID),
				Release.ReleaseTime.SET(Release.EXCLUDED.ReleaseTime),
				Release.BlobHash.SET(Release.EXCLUDED.BlobHash),
				Release.UpstreamBlobURL.SET(Release.EXCLUDED.UpstreamBlobURL),
				Release.UpstreamData.SET(Release.EXCLUDED.UpstreamData),
				Release.Version.SET(Release.EXCLUDED.Version),
				Release.FetchedTime.SET(Release.EXCLUDED.FetchedTime),
			),
		).
		RETURNING(Release.ID)

	var insertedRelease model.Release
	err = releaseInsert.QueryContext(ctx, db, &insertedRelease)
	if err != nil {
		return uuid.UUID{}, err
	}
	return insertedRelease.ID, nil
}

func upsertReleaseDependencyPackage(ctx context.Context, db *sql.DB, p model.Package) (id uuid.UUID, err error) {
	selectReleaseDependencyPackage := Package.SELECT(
		Package.Name,
		Package.PackageManager,
		Package.CustomRegistry,
	).WHERE(
		Package.Name.EQ(postgres.String(p.Name)).
			AND(Package.PackageManager.EQ(postgres.NewEnumValue(string(p.PackageManager)))).
			AND(Package.CustomRegistry.EQ(postgres.String(p.CustomRegistry))),
	)

	var releaseDependencyPackage model.Package
	err = selectReleaseDependencyPackage.QueryContext(ctx, db, &releaseDependencyPackage)
	if err == nil {
		// If the release dependency package already exists, we don't need to do anything
		return releaseDependencyPackage.ID, nil
	}

	insertPackage := Package.INSERT(
		Package.Name,
		Package.PackageManager,
		Package.CustomRegistry,
	).MODEL(p).
		ON_CONFLICT().
		ON_CONSTRAINT("package_package_manager_custom_registry_name_idx").
		DO_UPDATE(
			postgres.SET(
				Package.Name.SET(Package.EXCLUDED.Name),
			),
		).
		RETURNING(Package.ID)

	var insertedPackage model.Package
	err = insertPackage.QueryContext(ctx, db, &insertedPackage)
	if err != nil {
		return uuid.UUID{}, err
	}
	return insertedPackage.ID, nil
}

func upsertReleaseDependency(ctx context.Context, db *sql.DB, r model.ReleaseDependency) (id uuid.UUID, err error) {
	selectReleaseDependency := ReleaseDependency.SELECT(
		ReleaseDependency.ID,
		ReleaseDependency.ReleaseID,
		ReleaseDependency.IsDev,
	).WHERE(
		ReleaseDependency.ReleaseID.EQ(postgres.UUID(r.ReleaseID)).
			AND(ReleaseDependency.PackageName.EQ(postgres.String(r.PackageName))).
			AND(ReleaseDependency.PackageVersionQuery.EQ(postgres.String(r.PackageVersionQuery))),
	)

	var releaseDependency model.ReleaseDependency
	err = selectReleaseDependency.QueryContext(ctx, db, &releaseDependency)
	if err == nil {
		// If the release dependency already exists, we don't need to do anything
		if releaseDependency.ReleaseID == r.ReleaseID &&
			releaseDependency.IsDev == r.IsDev {
			return releaseDependency.ID, nil
		}
	}

	insertReleaseDependency := ReleaseDependency.INSERT(
		ReleaseDependency.ReleaseID,
		ReleaseDependency.DependencyPackageID,
		ReleaseDependency.PackageName,
		ReleaseDependency.PackageVersionQuery,
		ReleaseDependency.IsDev,
	).MODEL(r).
		ON_CONFLICT().
		ON_CONSTRAINT("release_dependency_release_id_package_name_package_version__idx").
		DO_UPDATE(
			postgres.SET(
				ReleaseDependency.ReleaseID.SET(ReleaseDependency.EXCLUDED.ReleaseID),
				ReleaseDependency.IsDev.SET(ReleaseDependency.EXCLUDED.IsDev),
			),
		).
		RETURNING(ReleaseDependency.ID)

	var insertedReleaseDependency model.ReleaseDependency
	err = insertReleaseDependency.QueryContext(ctx, db, &insertedReleaseDependency)
	if err != nil {
		return uuid.UUID{}, err
	}
	return insertedReleaseDependency.ID, nil
}

func upsertPackageMaintainer(ctx context.Context, db *sql.DB, p model.PackageMaintainer) error {
	selectPackageMaintainer := PackageMaintainer.SELECT(
		PackageMaintainer.AllColumns,
	).WHERE(
		PackageMaintainer.PackageID.EQ(postgres.UUID(p.PackageID)).
			AND(PackageMaintainer.MaintainerID.EQ(postgres.UUID(p.MaintainerID))),
	)

	var packageMaintainer model.PackageMaintainer
	err := selectPackageMaintainer.QueryContext(ctx, db, &packageMaintainer)
	if err == nil {
		// If the package maintainer already exists, we don't need to do anything
		if packageMaintainer.PackageID == p.PackageID &&
			packageMaintainer.MaintainerID == p.MaintainerID {
			return nil
		}
	}

	insertPackageMaintainer := PackageMaintainer.INSERT(
		PackageMaintainer.PackageID,
		PackageMaintainer.MaintainerID,
	).MODEL(p).
		ON_CONFLICT().
		ON_CONSTRAINT("package_maintainer_package_id_maintainer_id_idx").
		DO_NOTHING()
	_, err = insertPackageMaintainer.ExecContext(ctx, db)
	return err
}

func upsertMaintainer(ctx context.Context, db *sql.DB, m model.Maintainer) (id uuid.UUID, err error) {
	selectMaintainer := Maintainer.SELECT(
		Maintainer.AllColumns,
	).WHERE(
		Maintainer.Email.EQ(postgres.String(m.Email)),
	)

	var maintainer model.Maintainer
	err = selectMaintainer.QueryContext(ctx, db, &maintainer)
	if err == nil {
		// If the maintainer already exists, we don't need to do anything
		if maintainer.Email == m.Email &&
			maintainer.Name == m.Name &&
			maintainer.PackageManager == m.PackageManager {
			return maintainer.ID, nil
		}
	}

	insertMaintainer := Maintainer.INSERT(
		Maintainer.Email,
		Maintainer.Name,
		Maintainer.PackageManager,
	).MODEL(m).
		ON_CONFLICT().
		ON_CONSTRAINT("maintainer_package_manager_email_idx").
		DO_UPDATE(
			postgres.SET(
				Maintainer.Name.SET(Maintainer.EXCLUDED.Name),
			),
		).
		RETURNING(Maintainer.ID)

	var insertedMaintainer model.Maintainer
	err = insertMaintainer.QueryContext(ctx, db, &insertedMaintainer)
	if err != nil {
		return uuid.UUID{}, err
	}
	return insertedMaintainer.ID, nil
}
