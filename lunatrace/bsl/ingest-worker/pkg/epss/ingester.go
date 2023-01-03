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
package epss

import (
  "context"
  "database/sql"
  "fmt"
  "github.com/rs/zerolog/log"
  "go.uber.org/fx"
  "regexp"
  "strings"
)

type EPSSIngester interface {
  Ingest(ctx context.Context) error
}

type EPSSIngesterParams struct {
  fx.In

  DB *sql.DB
}

type epssIngester struct {
  deps EPSSIngesterParams
}

// createEpssScoreLookup Create lookup of EPSS scores by CVE
func createEpssScoreLookup(epssScores []EpssVulnerability) map[string]EpssVulnerability {
  lookup := make(map[string]EpssVulnerability)
  for _, epssScore := range epssScores {
    lookup[epssScore.Cve] = epssScore
  }
  return lookup
}

// getEpssScore Get the EPSS score for a given CVE
func getEpssScore(cve string, epssScoreLookup map[string]EpssVulnerability) (EpssVulnerability, error) {
  epssScore, ok := epssScoreLookup[cve]
  if !ok {
    return EpssVulnerability{}, fmt.Errorf("could not find epss score for cve %s", cve)
  }
  return epssScore, nil
}

func (s *epssIngester) Ingest(ctx context.Context) error {
  // Contains the CVE (id), EPSS (score), and Percentile (ranking) for each vulnerability
  epssScores, err := FetchEpssScores()
  if err != nil {
    log.Error().
      Err(err)
    return err
  }

  epssScoreLookup := createEpssScoreLookup(epssScores)

  tx, err := s.deps.DB.BeginTx(ctx, &sql.TxOptions{
    Isolation: sql.LevelReadUncommitted,
  })
  if err != nil {
    return err
  }
  defer tx.Rollback()

  // Get all CVEs and GHSAs from the database
  cvePairs, err := tx.QueryContext(ctx, `
    SELECT v1.source_id, v2.source_id FROM vulnerability.equivalent e
        INNER JOIN vulnerability.vulnerability v1 ON e.a = v1.id AND v1.source = 'nvd'
        INNER JOIN vulnerability.vulnerability v2 ON e.b = v2.id;`)
  if err != nil {
    return err
  }

  // Regex to verify that cvePair.Cve is a valid CVE
  r, err := regexp.Compile(`^CVE-\d{4}-\d+$`)

  if err != nil {
    return err
  }

  queries := []string{}

  // For every CVE, get the EPSS score and percentile to update the database with
  for cvePairs.Next() {
    cvePair := struct {
      Cve  string
      Ghsa string
    }{}

    err = cvePairs.Scan(&cvePair.Cve, &cvePair.Ghsa)
    if err != nil {
      return err
    }

    epssScore, err := getEpssScore(cvePair.Cve, epssScoreLookup)

    // Not every CVE has an EPSS score, so we can skip it
    if err != nil {
      continue
    }

    // Validates that the CVE is not a SQL injection payload :)
    if !r.MatchString(cvePair.Cve) {
      return fmt.Errorf("invalid cve %s", cvePair.Cve)
    }

    // Update the database with the EPSS score and percentile for both the NVD and GHSA rows
    queries = append(queries, fmt.Sprintf(`
      UPDATE vulnerability.vulnerability SET epss_score = '%f', epss_percentile = '%f' WHERE source_id = '%s';
    `, epssScore.Epss, epssScore.Percentile, cvePair.Cve))

    queries = append(queries, fmt.Sprintf(`
      UPDATE vulnerability.vulnerability SET epss_score = '%f', epss_percentile = '%f' WHERE source_id = '%s';
    `, epssScore.Epss, epssScore.Percentile, cvePair.Ghsa))
  }

  log.Info().
    Int("num_queries", len(queries)).
    Msg("updating epss scores")

  // Execute in batches of 1000
  for i := 0; i < len(queries); i += 2000 {
    log.Info().
      Int("start", i).
      Int("end", i+2000).
      Int("total", len(queries)).
      Msg("executing epss update batch")

    end := i + 2000
    if end > len(queries) {
      end = len(queries)
    }

    query := strings.Join(queries[i:end], " ")

    _, err := tx.ExecContext(ctx, query)
    if err != nil {
      return err
    }
  }

  log.Info().
    Msg("committing epss scores")

  if err = tx.Commit(); err != nil {
    return err
  }
  return nil
}

func NewEPSSIngester(params EPSSIngesterParams) EPSSIngester {
  return &epssIngester{
    params,
  }
}
