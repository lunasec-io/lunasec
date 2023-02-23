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
	"bufio"
	"context"
	"database/sql"
	"os"
	"time"

	"github.com/go-jet/jet/v2/postgres"
	"github.com/go-jet/jet/v2/qrm"
	"github.com/rs/zerolog/log"
	"github.com/samber/lo"
	"github.com/schollz/progressbar/v3"

	"github.com/lunasec-io/lunasec/lunatrace/gogen/gql/types"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/package/model"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/package/table"

	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
)

// todo tune date
const refetchDays = 1

type Params struct {
	fx.In

	DB                 *sql.DB
	PackageSQLIngester PackageSqlIngester
	NPMRegistry        metadata.NpmRegistry
	Config             Config
}

type NPMPackageIngester struct {
	deps Params
}

var npmV types.PackageManager = types.NPM

func (h *NPMPackageIngester) IngestAllPackagesFromRegistry(ctx context.Context, ignoreErrors bool, duration time.Duration) error {
	log.Info().
		Msg("collecting packages from npm registry")

	packageStream, err := h.deps.NPMRegistry.PackageStream()
	if err != nil {
		log.Error().
			Err(err).
			Msg("failed to get package stream from registry")
		return err
	}

	ingestedPackages := 0
	for packageName := range packageStream {
		log.Info().
			Str("package name", packageName).
			Msg("ingesting package")

		_, err = h.IngestWithoutRefetch(ctx, packageName, duration)
		if err != nil {
			log.Error().
				Err(err).
				Msg("failed to ingest package")

			if ignoreErrors {
				continue
			}
			return err
		}
		ingestedPackages += 1
	}

	log.Info().
		Int("ingested packages", ingestedPackages).
		Msg("collecting packages from npm registry")
	return nil
}

func (h *NPMPackageIngester) hasPackageRecentlyBeenFetched(ctx context.Context, packageName string, duration time.Duration) (bool, error) {
	packageFetchTime := table.Package.SELECT(
		table.Package.LastSuccessfulFetch,
	).WHERE(
		postgres.AND(
			table.Package.Name.EQ(postgres.String(packageName)),
			table.Package.PackageManager.EQ(postgres.NewEnumValue(string(npmV))),
			table.Package.LastSuccessfulFetch.IS_NOT_NULL(),
		),
	).LIMIT(1)

	var p model.Package
	err := packageFetchTime.QueryContext(ctx, h.deps.DB, &p)
	if err != nil {
		if err == qrm.ErrNoRows {
			log.Info().
				Str("package name", packageName).
				Msg("package has never been fetched")
			return false, nil
		}
		return false, err
	}

	// TODO (cthompson) make sure this isn't too restrictive
	// check if we've already fetched this package
	log.Info().
		Str("package name", packageName).
		Time("now", time.Now()).
		Time("last successful fetch", *p.LastSuccessfulFetch).
		Msg("last package fetch")
	recentlyFetched := p.LastSuccessfulFetch != nil && time.Now().Sub(*p.LastSuccessfulFetch) < duration
	return recentlyFetched, nil
}

// IngestWithoutRefetch queries to see if the package has been ingested within duration and will not refetch package unless duration has expired.
func (h *NPMPackageIngester) IngestWithoutRefetch(ctx context.Context, packageName string, duration time.Duration) ([]string, error) {
	recentlyFetched, err := h.hasPackageRecentlyBeenFetched(ctx, packageName, duration)
	if err != nil {
		log.Error().
			Err(err).
			Str("package name", packageName).
			Msg("failed to check if package has been recently fetched")
		return []string{}, err
	}

	if recentlyFetched {
		log.Info().
			Str("package", packageName).
			Dur("refetch days", refetchDays).
			Msg("package has already been ingested")
		return []string{}, nil
	}
	return h.Ingest(ctx, packageName)
}

func (h *NPMPackageIngester) Ingest(ctx context.Context, packageName string) ([]string, error) {
	log.Info().
		Str("package", packageName).
		Msg("collecting package metadata from registry")

	pkgMetadata, err := h.deps.NPMRegistry.GetPackageMetadata(packageName)
	if err != nil {
		log.Error().
			Err(err).
			Str("package", packageName).
			Msg("failed to get package metadata")
		return nil, err
	}

	if pkgMetadata == nil {
		log.Error().
			Str("package name", packageName).
			Msg("package metadata is null")
		return nil, err
	}

	log.Info().
		Str("package", packageName).
		Msg("upserting package data into db")

	_, err = h.deps.PackageSQLIngester.Ingest(ctx, pkgMetadata)
	if err != nil {
		log.Error().
			Err(err).
			Str("package name", packageName).
			Msg("failed to upsert package")
		return nil, err
	}

	var checkList []string
	for _, release := range pkgMetadata.Releases {
		for _, releaseDependency := range release.Dependencies {
			if !lo.Contains(checkList, releaseDependency.Name) {
				checkList = append(checkList, releaseDependency.Name)
			}
		}
	}
	return checkList, nil
}

func (h *NPMPackageIngester) IngestPackageAndDependencies(
	ctx context.Context,
	packageName string,
	ignoreErrors bool,
	duration time.Duration,
) error {
	var ingestedPkgs []string
	pkgs := []string{packageName}

	for len(pkgs) > 0 {
		packageToIngest := pkgs[0]
		pkgs = pkgs[1:]

		log.Info().
			Str("package", packageToIngest).
			Msg("ingesting package")

		newPkgs, err := h.IngestWithoutRefetch(ctx, packageToIngest, duration)
		if err != nil {
			log.Error().
				Err(err).
				Msg("failed to ingest packages")

			if !ignoreErrors {
				return err
			}
		}
		ingestedPkgs = append(ingestedPkgs, packageToIngest)

		for _, newPkg := range newPkgs {
			// If the package to be scanned is already flagged to be ingested
			// or the package has already been ingested, then skip flagging this package
			if lo.Contains(pkgs, newPkg) || lo.Contains(ingestedPkgs, newPkg) {
				continue
			}
			pkgs = append(pkgs, newPkg)
		}

		log.Info().
			Str("package", packageToIngest).
			Int("packages to ingest", len(pkgs)).
			Msg("successfully ingested package")
	}
	return nil
}

func (h *NPMPackageIngester) IngestPackagesFromFile(
	ctx context.Context,
	packagesFile string,
	ignoreErrors bool,
	refetchDuration time.Duration,
) error {
	fileHandle, err := os.Open(packagesFile)
	if err != nil {
		return err
	}

	defer fileHandle.Close()
	fileScanner := bufio.NewScanner(fileHandle)

	var packages []string
	for fileScanner.Scan() {
		packageName := fileScanner.Text()
		packages = append(packages, packageName)
	}

	bar := progressbar.Default(int64(len(packages)))

	for _, packageName := range packages {
		err = h.IngestPackageAndDependencies(ctx, packageName, ignoreErrors, refetchDuration)
		if err != nil {
			log.Error().
				Err(err).
				Str("package name", packageName).
				Msg("failed to import")
			return err
		}
		bar.Add(1)
	}

	log.Info().
		Msg("finished ingesting packages")
	return nil
}

func NewNPMPackageIngester(p Params) metadata.PackageIngester {
	return &NPMPackageIngester{deps: p}
}
