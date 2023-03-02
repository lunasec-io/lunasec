package vulnbot

import (
	"context"
	"fmt"
	"strings"

	"github.com/bwmarrin/discordgo"
	"github.com/go-jet/jet/v2/postgres"
	"github.com/rs/zerolog/log"

	pacmodel "github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/package/model"
	pactable "github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/package/table"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/vulnerability/model"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/vulnerability/table"
)

func (v *vulnbot) vulnSelectCommand(ctx context.Context, s *discordgo.Session, i *discordgo.InteractionCreate) {
	vulnID := i.MessageComponentData().Values[0]
	v.respondToVulnCommand(ctx, s, i, vulnID, "")
}

func (v *vulnbot) respondToVulnCommand(ctx context.Context, s *discordgo.Session, i *discordgo.InteractionCreate, vulnID, question string) {
	search := "What are the details of the vulnerability?"

	err := s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseDeferredChannelMessageWithSource,
	})
	if err != nil {
		log.Error().Err(err).Msg("failed to acknowledge vuln command")
	}

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

	err = getVulnStmt.QueryContext(ctx, v.p.DB, &vuln)

	var content string
	if err != nil {
		log.Error().Err(err).Msg("failed to get vulnerability")
		content = "failed to get vulnerability"
	} else {
		content = "ID: " + vuln.SourceID + "\n"
		content += "Question:" + question + "\n"
		content += "Summary:" + *vuln.Summary + "\n"
		content += "Details:\n" + strings.ReplaceAll(*vuln.Details, "\n\n", "\n") + "\n"
		content += "References:\n"

		log.Info().Str("vulnID", vuln.SourceID).Msg("getting summary")
		summary, err := v.p.ML.SearchForReferences(vuln.SourceID, search, question)
		if err != nil {
			log.Warn().Err(err).Msg("failed to get summary")
			for _, r := range vuln.References {
				content += fmt.Sprintf("- <%s>\n", r.URL)
			}
		}
		content += summary + "\n"
	}
	_, err = s.InteractionResponseEdit(i.Interaction, &discordgo.WebhookEdit{
		Content: &content,
	})
	if err != nil {
		log.Error().Err(err).Msg("failed to respond to vuln command")
	}
}

func (v *vulnbot) vulnCommand(ctx context.Context, s *discordgo.Session, i *discordgo.InteractionCreate) {
	options := i.ApplicationCommandData().Options

	// Or convert the slice into a map
	optionMap := make(map[string]*discordgo.ApplicationCommandInteractionDataOption, len(options))
	for _, opt := range options {
		optionMap[opt.Name] = opt
	}

	question := ""
	if option, ok := optionMap[QuestionOption]; ok {
		question = option.StringValue()
	}

	if option, ok := optionMap[VulnerabilityIDOption]; ok {
		vulnID := option.StringValue()
		v.respondToVulnCommand(ctx, s, i, vulnID, question)
		return
	}
	_ = s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{Content: "Vulnerability ID option not provided"},
	})
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

	var messageComponents []discordgo.MessageComponent

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
			content = "Package:"
			content += fmt.Sprintf("[%s] %s\n", p.PackageManager, p.Name)
			content += "Vulnerabilities:\n"
			var selectMenuOptions []discordgo.SelectMenuOption
			for _, a := range p.Affected {
				for _, affectedVuln := range a.Vulnerabilities {
					content += fmt.Sprintf("%s - %s\n", affectedVuln.SourceID, *affectedVuln.Summary)
					selectMenuOptions = append(selectMenuOptions, discordgo.SelectMenuOption{
						Label:       affectedVuln.SourceID,
						Value:       affectedVuln.SourceID,
						Description: *affectedVuln.Summary,
					})
				}
			}
			messageComponents = append(messageComponents, discordgo.SelectMenu{
				CustomID:    "vuln-select",
				Options:     selectMenuOptions,
				Placeholder: "Select a vulnerability to look at.",
			})
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
			Components: []discordgo.MessageComponent{
				// ActionRow is a container of all messageComponents within the same row.
				discordgo.ActionsRow{
					Components: messageComponents,
				},
			},
		},
	})
	if err != nil {
		log.Error().Err(err).Msg("failed to respond to package command")
	}
}
