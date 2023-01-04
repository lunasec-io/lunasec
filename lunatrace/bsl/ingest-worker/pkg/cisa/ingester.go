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
package cisa

import (
  "context"
  "database/sql"
  "github.com/rs/zerolog/log"
  "go.uber.org/fx"
)

type CISAKnownVulnIngester interface {
  Ingest(ctx context.Context) error
}

type CISAKnownVulnIngesterParams struct {
  fx.In

  DB *sql.DB
}

type cisaKnownVulnIngester struct {
  deps CISAKnownVulnIngesterParams
}

// -- Table to hold the CISA Known Exploited vulnerabilities
// CREATE TABLE IF NOT EXISTS vulnerability.cisa_known_exploited_vulnerabilities (
//     cve TEXT PRIMARY KEY,
//     vendor_project text NOT NULL,
//     product text NOT NULL,
//     vulnerability_name text NOT NULL,
//     date_added date NOT NULL,
//     short_description text NOT NULL,
//     required_action text NOT NULL,
//     due_date date NOT NULL,
//     notes text NOT NULL,
//     CHECK (cve LIKE 'CVE-%')
// );

// GetKnownCves returns a list of all known CVEs from the database that exist in the CISA Known Exploited Vulnerabilities table
// Run this query *after* you have inserted all the new CISA Known Exploited Vulnerabilities
func GetKnownCves(tx *sql.Tx) (map[string]bool, error) {
  // Query for all the CVEs that are already in the database from the CISA Known Vulnerabilitie
  result, err := tx.Query(`
    SELECT cve.id FROM vulnerability.cisa_known_exploited_vulnerabilities cisa
    INNER JOIN vulnerability.vulnerability cve ON cve.source = 'nvd' AND cve.source_id = cisa.cve
  `)
  if err != nil {
    log.Error().
      Err(err).Msg("failed to query for known cves for CISA ingester")
    return nil, err
  }

  knownCves := make(map[string]bool)
  for result.Next() {
    var cve string
    err = result.Scan(&cve)
    if err != nil {
      log.Error().
        Err(err).Msg("failed to map cve for CISA ingester")
      return nil, err
    }
    knownCves[cve] = true
  }
  return knownCves, nil
}

func (s *cisaKnownVulnIngester) Ingest(ctx context.Context) error {

  cisaKnownVulns, err := FetchCisaKnownVulns()
  if err != nil {
    log.Error().
      Err(err)
    return err
  }

  log.Info().
    Int("count", len(cisaKnownVulns)).
    Msg("fetched cisa known exploited vulnerabilities")

  tx, err := s.deps.DB.BeginTx(ctx, &sql.TxOptions{
    Isolation: sql.LevelReadUncommitted,
  })
  if err != nil {
    return err
  }
  defer tx.Rollback()

  for _, cisaKnownVuln := range cisaKnownVulns {
    _, err = tx.ExecContext(ctx, `
      INSERT INTO vulnerability.cisa_known_exploited_vulnerabilities (
        cve,
        vendor_project,
        product,
        vulnerability_name,
        date_added,
        short_description,
        required_action,
        due_date,
        notes
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      ) ON CONFLICT (cve) DO UPDATE SET
        vendor_project = $2,
        product = $3,
        vulnerability_name = $4,
        date_added = $5,
        short_description = $6,
        required_action = $7,
        due_date = $8,
        notes = $9
      `,
      cisaKnownVuln.Cve,
      cisaKnownVuln.VendorProject,
      cisaKnownVuln.Product,
      cisaKnownVuln.VulnerabilityName,
      cisaKnownVuln.DateAdded,
      cisaKnownVuln.ShortDescription,
      cisaKnownVuln.RequiredAction,
      cisaKnownVuln.DueDate,
      cisaKnownVuln.Notes,
    )

    if err != nil {
      log.Error().
        Err(err).Msg("failed to insert CISA Known Vulnerability")
      return err
    }
  }

  knownCves, err := GetKnownCves(tx)

  if err != nil {
    log.Error().
      Err(err).Msg("failed to get known CVEs for CISA ingester")
    return err
  }

  log.Info().
    Int("knownCves", len(knownCves)).
    Msg("found known CVEs, setting the cisa_known_exploited_cve column")

  for _, cisaKnownVuln := range cisaKnownVulns {
    if _, ok := knownCves[cisaKnownVuln.Cve]; ok {
      continue
    }

    result, err := tx.QueryContext(ctx, `
      SELECT cveeq.* FROM vulnerability.vulnerability cve
        JOIN vulnerability.equivalent cveeq ON cveeq.a = cve.id OR cveeq.b = cve.id
        WHERE cve.source = 'nvd' AND cve.source_id = $1
    `, cisaKnownVuln.Cve)

    if err != nil {
      log.Error().
        Err(err).Msg("failed to query for equivalent CVE for CISA ingester")
      return err
    }

    // Generate a list of all vulnerabilities that need to be marked as being a CISA Known Exploited Vulnerability
    cveIds := make(map[string]bool)
    for result.Next() {
      var cveA string
      var cveB string
      err = result.Scan(&cveA, &cveB)
      if err != nil {
        log.Error().
          Err(err).Msg("failed to map equivalent CVE for CISA ingester")
        return err
      }

      // add the CVEs to the map to ensure no duplicates
      cveIds[cveA] = true
      cveIds[cveB] = true
    }

    // Sets the CISA Known Exploited Vulnerability column for CVEs in the vulnerability table
    for cveId := range cveIds {
      _, err = tx.ExecContext(ctx, `
        UPDATE vulnerability.vulnerability SET
          cisa_known_exploited_cve = $1
        WHERE id = $2
      `, cisaKnownVuln.Cve, cveId)

      if err != nil {
        log.Error().
          Err(err).Msg("failed to insert CISA Known Vulnerability")
        return err
      }
    }
  }

  log.Info().
    Msg("committing cisa known vulns")

  if err = tx.Commit(); err != nil {
    return err
  }

  return nil
}

func NewCISAKnownVulnIngester(params CISAKnownVulnIngesterParams) CISAKnownVulnIngester {
  return &cisaKnownVulnIngester{
    params,
  }
}
