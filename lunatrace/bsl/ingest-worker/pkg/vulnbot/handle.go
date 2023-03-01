package vulnbot

import (
	"context"
	"fmt"

	"github.com/anchore/grype/grype/presenter/models"
	"github.com/bwmarrin/discordgo"
	"github.com/go-jet/jet/v2/postgres"
	"github.com/rs/zerolog/log"

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
		getVulnStmt := t.SELECT(t.AllColumns).WHERE(t.SourceID.EQ(postgres.String(vulnID)))

		var vuln models.Vulnerability
		err := getVulnStmt.QueryContext(ctx, v.p.DB, &vuln)
		if err != nil {
			log.Error().Err(err).Msg("failed to get vulnerability")
			content = "failed to get vulnerability"
		} else {
			content = fmt.Sprintf("%v", vuln)
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

	if option, ok := optionMap[VulnerabilityIDOption]; ok {
		vulnID := option.StringValue()

		t := table.Vulnerability
		getVulnStmt := t.SELECT(t.AllColumns).WHERE(t.SourceID.EQ(postgres.String(vulnID)))

		var vuln models.Vulnerability
		err := getVulnStmt.QueryContext(ctx, v.p.DB, &vuln)
		if err != nil {
			log.Error().Err(err).Msg("failed to get vulnerability")
			content = "failed to get vulnerability"
		} else {
			content = fmt.Sprintf("%v", vuln)
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
