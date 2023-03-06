package ingester

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/go-jet/jet/v2/postgres"
	"github.com/google/uuid"
	"github.com/rs/zerolog/log"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/fetcher/npm"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/util"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/package/model"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/package/table"
)

func (h *NPMPackageIngester) IngestPackageReference(ctx context.Context, packageName string) error {
	p := table.Package
	getPackage := postgres.SELECT(p.ID.AS("id"), p.Description.AS("description"), p.UpstreamData.AS("upstream_data")).
		FROM(p).
		WHERE(
			p.Name.EQ(postgres.String(packageName)).
				AND(p.PackageManager.EQ(postgres.NewEnumValue("npm"))),
		)

	var pack []struct {
		ID           uuid.UUID
		Description  string
		UpstreamData []byte
	}
	err := getPackage.QueryContext(ctx, h.deps.DB, &pack)
	if err != nil {
		log.Error().
			Err(err).
			Msg("failed to get latest package release")
		return err
	}

	if len(pack) == 0 {
		return fmt.Errorf("package %s not found", packageName)
	}

	// TODO (cthompson) sometimes the readme is in the release data
	var pkgMetaForDB npm.NpmPackageMetadata
	err = json.Unmarshal(pack[0].UpstreamData, &pkgMetaForDB)
	if err != nil {
		log.Error().
			Err(err).
			Msg("failed to unmarshal package metadata")
		return err
	}

	content := pack[0].Description + " " + pkgMetaForDB.Readme

	refContent := model.ReferenceContent{
		PackageID:           pack[0].ID,
		URL:                 fmt.Sprintf("https://npmjs.com/%s", packageName),
		Content:             content,
		NormalizedContent:   util.StandardizeSpaces(content),
		ContentType:         "text/plain",
		LastSuccessfulFetch: util.Ptr(time.Now()),
	}

	rc := table.ReferenceContent
	upsertReferenceContent := rc.INSERT(rc.PackageID, rc.URL, rc.Content, rc.NormalizedContent, rc.ContentType, rc.LastSuccessfulFetch).
		MODEL(refContent).
		ON_CONFLICT().
		ON_CONSTRAINT("reference_content_package_id_url_key").
		DO_UPDATE(
			postgres.SET(
				rc.Content.SET(rc.EXCLUDED.Content),
				rc.NormalizedContent.SET(rc.EXCLUDED.NormalizedContent),
				rc.ContentType.SET(rc.EXCLUDED.ContentType),
				rc.LastSuccessfulFetch.SET(rc.EXCLUDED.LastSuccessfulFetch),
			),
		)
	_, err = upsertReferenceContent.ExecContext(ctx, h.deps.DB)
	if err != nil {
		log.Error().
			Err(err).
			Msg("failed to upsert reference content")
		return err
	}
	return nil
}
