package vulnbot

import (
	"context"
	"database/sql"

	"github.com/bwmarrin/discordgo"
	"github.com/rs/zerolog/log"
	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/discordfx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/ml"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/proto/gen"
)

type VulnBot interface {
	Start() error
}

type Params struct {
	fx.In

	Lifecycle fx.Lifecycle
	ML        ml.Service
	Session   *discordgo.Session
	DB        *sql.DB
	LangChain gen.LangChainClient
}

type Result struct {
	fx.Out

	Commands []*discordfx.ApplicationCommandWithHandler `group:"command,flatten"`
	Handlers []*discordfx.MessageHandler                `group:"handler,flatten"`
	VulnBot
}

type vulnbot struct {
	p Params
}

const (
	VulnerabilityIDOption    = "vulnerability-id"
	QuestionOption           = "question"
	PackageNameOption        = "package"
	PackageManagerNameOption = "package-manager"
)

func (v *vulnbot) Start() error {
	v.p.Lifecycle.Append(fx.Hook{
		OnStop: func(ctx context.Context) error {
			log.Info().Msg("disconnecting")
			return v.p.Session.Close()
		}})

	discordfx.LogSessionEvents(v.p.Session)

	return v.p.Session.Open()
}

func NewVulnBot(p Params) Result {
	v := &vulnbot{
		p: p,
	}
	return Result{
		VulnBot:  v,
		Commands: v.commands(),
		Handlers: v.handlers(),
	}
}

func (v *vulnbot) messageHandler(ctx context.Context, info discordfx.MessageInfo, s *discordgo.Session, m *discordgo.MessageCreate) {
	log.Info().Str("message", m.Content).Msg("message received")
	if info.IsBotCommand {
		resp, err := v.p.LangChain.Chat(ctx, &gen.ChatRequest{
			Message: m.Content,
		})
		if err != nil {
			log.Error().Err(err).Msg("error processing message")
			return
		}
		_, err = s.ChannelMessageSend(m.ChannelID, resp.Response)
		if err != nil {
			log.Error().Err(err).Msg("error sending message")
			return
		}
	}
}

func (v *vulnbot) handlers() []*discordfx.MessageHandler {
	return []*discordfx.MessageHandler{{
		Handler: v.messageHandler,
	}}
}

func (v *vulnbot) commands() []*discordfx.ApplicationCommandWithHandler {
	return []*discordfx.ApplicationCommandWithHandler{{
		Command: discordgo.ApplicationCommand{
			Name:        "vuln",
			Description: "Ask for information about a vulnerability.",
			Options: []*discordgo.ApplicationCommandOption{
				{
					Type:        discordgo.ApplicationCommandOptionString,
					Name:        VulnerabilityIDOption,
					Description: "Vulnerability ID",
					Required:    true,
				},
				{
					Type:        discordgo.ApplicationCommandOptionString,
					Name:        QuestionOption,
					Description: "Question",
					Required:    false,
				},
			},
		},
		GuildID: "",
		Handler: v.vulnCommand,
	},
		{
			Command: discordgo.ApplicationCommand{
				Name: "vuln-select",
			},
			MessageComponent: true,
			GuildID:          "",
			Handler:          v.vulnSelectCommand,
		},
		{
			Command: discordgo.ApplicationCommand{
				Name:        "package",
				Description: "Ask for information about a package.",
				Options: []*discordgo.ApplicationCommandOption{
					{
						Type:        discordgo.ApplicationCommandOptionString,
						Name:        PackageManagerNameOption,
						Description: "Package Manager",
						Required:    true,
					},
					{
						Type:        discordgo.ApplicationCommandOptionString,
						Name:        PackageNameOption,
						Description: "Package Name",
						Required:    true,
					},
				},
			},
			GuildID: "",
			Handler: v.packageCommand,
		},
	}
}
