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
// CREATE TABLE IF NOT EXISTS vulnerability.cisa_known_exploited (
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
      INSERT INTO vulnerability.cisa_known_exploited (
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
