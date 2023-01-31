package npm

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"

	"github.com/cenkalti/backoff/v4"
	"github.com/rs/zerolog/log"
	"github.com/samber/lo"
	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/npm/model"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/npm/table"
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
	bulkRangePeriodFormat       = "2022-10-28"
	bulkPackageDownloadCountURL = "https://api.npmjs.org/downloads/range/%s/%s"
)

type npmPopularityReplicatorDeps struct {
	fx.In
	DB          *sql.DB
	NPMRegistry metadata.NpmRegistry
}

type npmAPIReplicator struct {
	deps npmPopularityReplicatorDeps
}

//func (s *npmAPIReplicator) ReplicatePackageVersionDownloadCount() error {
//}

func (s *npmAPIReplicator) ReplicateDownloadCountsForPackages(packages []string) error {
	if len(packages) > maxBulkPackageRequest {
		return fmt.Errorf("too many packages to replicate download count: %d", len(packages))
	}

	// TODO (cthompson) bulk downloader does not support namespaced packages, will need to think of fallback
	filteredPackages := lo.Filter(packages, func(p string, idx int) bool {
		return strings.HasPrefix(p, "@")
	})

	joinedPackages := strings.Join(filteredPackages, ",")

	rangeStart := time.Now()
	rangeEnd := rangeStart.AddDate(0, -maxBulkRangePeriodMonths, 0)
	formattedRange := rangeStart.Format(bulkRangePeriodFormat) + ":" + rangeEnd.Format(bulkRangePeriodFormat)

	requestUrl := fmt.Sprintf(bulkPackageDownloadCountURL, formattedRange, joinedPackages)

	resp, err := http.Get(requestUrl)
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
			Strs("packages", filteredPackages).
			Msg("failed to unmarshal package download counts")
		return err
	}

	// insert collected packages into database
	for packageName, packageInfo := range bulkDownloadResponse {
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
			})
		}
		downloadCountInsert := table.PackageDownloadCount.INSERT(
			table.PackageDownloadCount.Name,
			table.PackageDownloadCount.Day,
			table.PackageDownloadCount.Downloads,
		).VALUES(packageDownloadCounts)

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

func (s *npmAPIReplicator) ReplicateAllPackageDownloadCountsFromRegistry(ignoreErrors bool) error {
	log.Info().
		Msg("collecting packages from npm registry")

	packageStream, err := s.deps.NPMRegistry.PackageStream()
	if err != nil {
		log.Error().
			Err(err).
			Msg("failed to get package stream from registry")
		return err
	}

	replicatedPackages := 0
	var batch []string
	for packageName := range packageStream {
		batch = append(batch, packageName)
		if len(batch) < maxBulkPackageRequest {
			continue
		}

		log.Info().
			Strs("batch", batch).
			Msg("replicating package download counts")

		expBackoff := backoff.NewExponentialBackOff()

		// This process takes a long time, make sure we have enough time in between errors
		expBackoff.MaxElapsedTime = time.Hour * 24

		replicate := func() error {
			err = s.ReplicateDownloadCountsForPackages(batch)
			if err != nil {
				log.Error().
					Err(err).
					Msg("failed to replicate package download count")

				if !ignoreErrors {
					return err
				}
			}
			return nil
		}

		// TODO (cthompson) tweak this value so we don't hit rate limiting
		time.Sleep(time.Second)

		err = backoff.Retry(replicate, expBackoff)
		if err != nil {
			log.Error().
				Err(err).
				Msg("failed to replicate batch, with retry")
			continue
		}
		replicatedPackages += len(batch)
	}

	log.Info().
		Int("replicated packages", replicatedPackages).
		Msg("replicated package download counts from npm api")
	return nil
}

func NewNpmAPIReplicator(deps npmPopularityReplicatorDeps) metadata.APIReplicator {
	return &npmAPIReplicator{deps: deps}
}
