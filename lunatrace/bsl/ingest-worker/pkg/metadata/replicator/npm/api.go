package npm

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/cenkalti/backoff/v4"
	"github.com/go-jet/jet/v2/postgres"
	"github.com/google/uuid"
	"github.com/rs/zerolog/log"
	"github.com/samber/lo"
	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/npm/model"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/npm/table"
	packageModel "github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/package/model"
	packageSchema "github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/package/table"
)

/*
	Gets the downloads per day for a given period, for all packages or a specific package.

	GET https://api.npmjs.org/downloads/range/{period}[/{package}]

	https://github.com/npm/registry/blob/master/docs/download-counts.md#bulk-queries
	Bulk queries are limited to at most 128 packages at a time and at most 365 days of data.
	All other queries are limited to at most 18 months of data. The earliest date for which data will be returned is January 10, 2015.

	Download count for specific versions of a package are only available for the previous 7 days. They have a unique API end point
	GET https://api.npmjs.org/versions/{package}/last-week
*/

const (
	maxBulkPackageRequest       = 128
	maxBulkRangePeriodMonths    = 12
	bulkRangePeriodFormat       = "2006-01-02"
	bulkPackageDownloadCountURL = "https://api.npmjs.org/downloads/range/%s/%s"

	packageVersionDownloadCountURL = "https://api.npmjs.org/versions/%s/last-week"
)

type npmPopularityReplicatorDeps struct {
	fx.In
	DB          *sql.DB
	NPMRegistry metadata.NpmRegistry
	HTTPClient  *http.Client
}

type npmAPIReplicator struct {
	deps npmPopularityReplicatorDeps
}

//func (s *npmAPIReplicator) ReplicatePackageVersionDownloadCount() error {
//}

func (s *npmAPIReplicator) ReplicatePackages(packages []string, resolvePackage bool) error {
	if len(packages) > maxBulkPackageRequest {
		return fmt.Errorf("too many packages to replicate download count: %d", len(packages))
	}

	// TODO (cthompson) bulk downloader does not support namespaced packages, will need to think of fallback
	filteredPackages := lo.Filter(packages, func(p string, idx int) bool {
		return !strings.HasPrefix(p, "@")
	})

	if len(filteredPackages) == 0 {
		return nil
	}

	// if there is only one package, the API will give back a different schema. always make sure there is at least two packages for simplicity.
	if len(filteredPackages) == 1 {
		filteredPackages = append(filteredPackages, "lodash")
	}

	joinedPackages := strings.Join(filteredPackages, ",")

	rangeEnd := time.Now()
	rangeStart := rangeEnd.AddDate(-1, 0, 0)
	formattedRange := rangeStart.Format(bulkRangePeriodFormat) + ":" + rangeEnd.Format(bulkRangePeriodFormat)

	requestUrl := fmt.Sprintf(bulkPackageDownloadCountURL, formattedRange, joinedPackages)

	log.Info().
		Str("requestUrl", requestUrl).
		Msg("getting bulk package download counts")

	resp, err := s.deps.HTTPClient.Get(requestUrl)
	if err != nil {
		log.Error().
			Err(err).
			Strs("packages", filteredPackages).
			Msg("failed to collect package download counts")
		return err
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Error().
			Err(err).
			Strs("packages", filteredPackages).
			Msg("failed to read body for package download counts")
		return err
	}

	var bulkDownloadResponse BulkDownloadResponse
	err = json.Unmarshal(body, &bulkDownloadResponse)
	if err != nil {
		log.Error().
			Err(err).
			Str("body", string(body)).
			Msg("failed to unmarshal package download counts")
		return err
	}

	// insert collected packages into database
	for packageName, packageInfo := range bulkDownloadResponse {

		var packageId *uuid.UUID

		if resolvePackage {
			selectPackageId := packageSchema.Package.SELECT(
				packageSchema.Package.ID,
			).WHERE(
				postgres.AND(
					packageSchema.Package.Name.EQ(postgres.String(packageName)),
					packageSchema.Package.PackageManager.EQ(postgres.NewEnumValue("npm")),
				),
			)

			var selectedPackage packageModel.Package
			err = selectPackageId.Query(s.deps.DB, &selectedPackage)
			if err != nil {
				log.Warn().
					Str("package name", packageName).
					Err(err).
					Msg("unable to find associated package in database")
			} else {
				packageId = &selectedPackage.ID
			}
		}

		var packageDownloadCounts []model.PackageDownloadCount
		for _, downloadInfo := range packageInfo.Downloads {
			downloadDay, err := time.Parse(bulkRangePeriodFormat, downloadInfo.Day)
			if err != nil {
				log.Warn().
					Err(err).
					Str("package", packageName).
					Str("date", downloadInfo.Day).
					Msg("failed to parse package download count date")
				continue
			}

			packageDownloadCounts = append(packageDownloadCounts, model.PackageDownloadCount{
				Name:      packageName,
				Day:       downloadDay,
				Downloads: int32(downloadInfo.Downloads),
				PackageID: packageId,
			})
		}

		downloadCountInsert := table.PackageDownloadCount.INSERT(
			table.PackageDownloadCount.Name,
			table.PackageDownloadCount.Day,
			table.PackageDownloadCount.Downloads,
			table.PackageDownloadCount.PackageID,
		).MODELS(packageDownloadCounts).
			ON_CONFLICT(table.PackageDownloadCount.Name, table.PackageDownloadCount.Day).
			DO_UPDATE(
				postgres.SET(
					table.PackageDownloadCount.Downloads.SET(
						table.PackageDownloadCount.EXCLUDED.Downloads,
					),
					table.PackageDownloadCount.PackageID.SET(
						table.PackageDownloadCount.EXCLUDED.PackageID,
					),
				),
			)

		_, err = downloadCountInsert.Exec(s.deps.DB)
		if err != nil {
			log.Error().
				Err(err).
				Str("package", packageName).
				Msg("failed to insert download counts for package")
			continue
		}
	}
	return nil
}

func (s *npmAPIReplicator) ReplicateVersionDownloadCounts(packageName string) error {
	requestUrl := fmt.Sprintf(packageVersionDownloadCountURL, url.QueryEscape(packageName))

	log.Info().
		Str("requestUrl", requestUrl).
		Msg("getting package version download counts")

	resp, err := s.deps.HTTPClient.Get(requestUrl)
	if err != nil {
		log.Error().
			Err(err).
			Str("package", packageName).
			Msg("failed to collect package version download counts")
		return err
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Error().
			Err(err).
			Str("package", packageName).
			Msg("failed to read body for package version download counts")
		return err
	}

	var packageVersionResponse PackageVersionDownloadResponse
	err = json.Unmarshal(body, &packageVersionResponse)
	if err != nil {
		log.Error().
			Err(err).
			Str("body", string(body)).
			Msg("failed to unmarshal package download counts")
		return err
	}

	// truncate the day so that it matches up with the day inserted from the bulk insert of download counts
	dateFetched := time.Now()
	day := dateFetched.Format(bulkRangePeriodFormat)
	truncatedDay, err := time.Parse(bulkRangePeriodFormat, day)
	if err != nil {
		return err
	}

	var models []model.PackageVersionDownloadCount
	for version, count := range packageVersionResponse.Downloads {

		var releaseId *uuid.UUID

		if resolvePackage {
			selectReleaseId := packageSchema.Release.
				LEFT_JOIN(packageSchema.Package, packageSchema.Package.ID.EQ(packageSchema.Release.PackageID)).
				SELECT(
					packageSchema.Release.ID,
				).WHERE(
				postgres.AND(
					packageSchema.Package.Name.EQ(postgres.String(packageName)),
					packageSchema.Release.Version.EQ(postgres.String("version")),
				),
			)

			var selectedRelease packageModel.Release
			err = selectReleaseId.Query(s.deps.DB, &selectedRelease)
			if err == nil {
				releaseId = &selectedRelease.ID
			}
		}

		models = append(models, model.PackageVersionDownloadCount{
			Name:      packageName,
			ReleaseID: releaseId,
			Version:   version,
			Downloads: int32(count),
			Day:       truncatedDay,
		})
	}

	upsertPackageVersionDownloadCount := table.PackageVersionDownloadCount.INSERT(
		table.PackageVersionDownloadCount.Name,
		table.PackageVersionDownloadCount.Version,
		table.PackageVersionDownloadCount.Downloads,
		table.PackageVersionDownloadCount.Day,
	).MODELS(models).
		ON_CONFLICT(
			table.PackageVersionDownloadCount.Name,
			table.PackageVersionDownloadCount.Version,
			table.PackageVersionDownloadCount.Day,
		).
		DO_UPDATE(
			postgres.SET(
				table.PackageVersionDownloadCount.Downloads.SET(
					table.PackageVersionDownloadCount.EXCLUDED.Downloads,
				),
				table.PackageVersionDownloadCount.ReleaseID.SET(
					table.PackageVersionDownloadCount.EXCLUDED.ReleaseID,
				),
			),
		)
	_, err = upsertPackageVersionDownloadCount.Exec(s.deps.DB)
	if err != nil {
		log.Error().
			Str("package name", packageName).
			Err(err).
			Msg("failed to upsert package version download counts")
		return err
	}

	return nil
}

// TODO (cthompson) these should really be options...
func (s *npmAPIReplicator) ReplicateFromStreamWithBackoff(packages <-chan string, versionCounts, ignoreErrors bool) error {
	replicatedPackages := 0
	var packageBatch []string

	replicatePackages := func(batch []string) error {
		log.Info().
			Strs("batch", batch).
			Msg("replicating package download counts")

		expBackoff := backoff.NewExponentialBackOff()

		// This process takes a long time, make sure we have enough time in between errors
		expBackoff.MaxElapsedTime = time.Hour * 2

		replicate := func() error {
			// TODO (cthompson) for scoped packages, we will have to make individual request. They are not supported by the bulk query request.
			err := s.ReplicatePackages(batch, resolvePackage)
			if err != nil {
				log.Error().
					Err(err).
					Msg("failed to replicate package download count")

				if !ignoreErrors {
					return err
				}
			}

			if versionCounts {
				// TODO (cthompson) ew, nesting
				for _, packageName := range batch {
					err = s.ReplicateVersionDownloadCounts(packageName, resolvePackage)
					if err != nil {
						log.Error().
							Err(err).
							Msg("failed to replicate package version download count")

						if !ignoreErrors {
							return err
						}
					}
				}
			}
			return nil
		}

		// TODO (cthompson) tweak this value so we don't hit rate limiting
		time.Sleep(time.Second)

		err := backoff.Retry(replicate, expBackoff)
		if err != nil {
			log.Error().
				Err(err).
				Msg("failed to replicate batch, with retry")
			return err
		}
		return nil
	}

	for packageName := range packages {
		packageBatch = append(packageBatch, packageName)
		if len(packageBatch) < maxBulkPackageRequest {
			continue
		}

		err := replicatePackages(packageBatch)
		if err != nil {
			return err
		}

		packageBatch = []string{}
		replicatedPackages += len(packageBatch)
	}

	if len(packageBatch) != 0 {
		err := replicatePackages(packageBatch)
		if err != nil {
			return err
		}
		replicatedPackages += len(packageBatch)
	}

	log.Info().
		Int("replicated packages", replicatedPackages).
		Msg("replicated package download counts from npm api")
	return nil
}

func NewNpmAPIReplicator(deps npmPopularityReplicatorDeps) metadata.APIReplicator {
	return &npmAPIReplicator{deps: deps}
}
