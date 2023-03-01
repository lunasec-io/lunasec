package vulnbot

import (
	"context"
	"fmt"

	"github.com/bwmarrin/discordgo"
	"github.com/go-jet/jet/v2/postgres"
	"github.com/rs/zerolog/log"

	pacmodel "github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/package/model"
	pactable "github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/package/table"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/vulnerability/model"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/vulnerability/table"
)

func (v *vulnbot) vulnCommand(ctx context.Context, s *discordgo.Session, i *discordgo.InteractionCreate) {
	options := i.ApplicationCommandData().Options

	// Or convert the slice into a map
	optionMap := make(map[string]*discordgo.ApplicationCommandInteractionDataOption, len(options))
	for _, opt := range options {
		optionMap[opt.Name] = opt
	}

	content := ""

	if option, ok := optionMap[VulnerabilityIDOption]; ok {
		vulnID := option.StringValue()

		t := table.Vulnerability
		ref := table.Reference
		refContent := table.ReferenceContent
		getVulnStmt := t.SELECT(t.AllColumns, ref.AllColumns, refContent.AllColumns).
			FROM(
				t.INNER_JOIN(ref, ref.VulnerabilityID.EQ(t.ID)).
					INNER_JOIN(refContent, refContent.ReferenceID.EQ(ref.ID)),
			).
			WHERE(t.SourceID.EQ(postgres.String(vulnID)))

		var vuln struct {
			References []struct {
				model.Reference
				Content []model.ReferenceContent
			}
			model.Vulnerability
		}
		err := getVulnStmt.QueryContext(ctx, v.p.DB, &vuln)
		if err != nil {
			log.Error().Err(err).Msg("failed to get vulnerability")
			content = "failed to get vulnerability"
		} else {
			content = "ID: " + vuln.SourceID + "\n"
			content += "Summary:\n" + *vuln.Summary + "\n"
			content += "Details:\n" + *vuln.Details + "\n"
			content += "References:\n"
			for _, vulnRef := range vuln.References {
				content += fmt.Sprintf("- %s\n", vulnRef.URL)
			}
		}
	}

	err := s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		// Ignore type for now, they will be discussed in "responses"
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Content: content,
		},
	})
	if err != nil {
		log.Error().Err(err).Msg("failed to respond to interaction")
	}
}

func (v *vulnbot) packageCommand(ctx context.Context, s *discordgo.Session, i *discordgo.InteractionCreate) {
	options := i.ApplicationCommandData().Options

	// Or convert the slice into a map
	optionMap := make(map[string]*discordgo.ApplicationCommandInteractionDataOption, len(options))
	for _, opt := range options {
		optionMap[opt.Name] = opt
	}

	content := ""

	var (
		packageManager string
		packageName    string
	)

	if option, ok := optionMap[PackageManagerNameOption]; ok {
		packageManager = option.StringValue()
	}

	if option, ok := optionMap[PackageNameOption]; ok {
		packageName = option.StringValue()
	}

	if packageManager != "" && packageName != "" {
		t := pactable.Package
		affected := table.Affected
		affectedVer := table.AffectedVersion
		vuln := table.Vulnerability

		getVulnStmt := t.SELECT(t.AllColumns, affected.AllColumns, affectedVer.AllColumns, vuln.AllColumns).
			FROM(
				t.LEFT_JOIN(affected, affected.PackageID.EQ(t.ID)).
					LEFT_JOIN(affectedVer, affectedVer.AffectedID.EQ(affected.ID)).
					LEFT_JOIN(vuln, vuln.ID.EQ(affected.VulnerabilityID)),
			).
			WHERE(
				t.Name.EQ(postgres.String(packageName)).
					AND(
						t.PackageManager.EQ(postgres.NewEnumValue(packageManager)),
					))

		var p struct {
			pacmodel.Package
			Affected []struct {
				model.Affected
				AffectedVersions []model.AffectedVersion
				Vulnerabilities  []model.Vulnerability
			}
		}
		err := getVulnStmt.QueryContext(ctx, v.p.DB, &p)
		if err != nil {
			log.Error().Err(err).Msg("failed to get package")
			content = "failed to get package"
		} else {
			content = "Package:\n"
			content += fmt.Sprintf("%s - %s\n", p.PackageManager, p.Name)
			content += "Vulnerabilities:\n"
			for _, a := range p.Affected {
				for _, affectedVuln := range a.Vulnerabilities {
					content += fmt.Sprintf("%s - %s\n", affectedVuln.SourceID, *affectedVuln.Summary)
				}
			}
		}
	}

	if content == "" {
		content = "I got nothin' for ya"
	}

	err := s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		// Ignore type for now, they will be discussed in "responses"
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Content: content,
		},
	})
	if err != nil {
		log.Error().Err(err).Msg("failed to respond to interaction")
	}
}
