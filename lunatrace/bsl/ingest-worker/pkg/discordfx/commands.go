package discordfx

import (
	"context"
	"time"

	"github.com/bwmarrin/discordgo"
	"github.com/rs/zerolog/log"
	"go.uber.org/fx"
)

type HandlerFunc func(ctx context.Context, s *discordgo.Session, i *discordgo.InteractionCreate)

// ApplicationCommandWithHandler is a top level Command with a Handler function.
// Subcommands are TODO
// todo: define our own handler func? want to use channels to post back messages.
type ApplicationCommandWithHandler struct {
	Command discordgo.ApplicationCommand
	Handler HandlerFunc
	GuildID string
}

type RegisterCommandsParams struct {
	fx.In
	Config    DiscordConfig
	Session   *discordgo.Session
	Commands  []*ApplicationCommandWithHandler `group:"command"`
	Lifecycle fx.Lifecycle
}

type interactionHelper struct {
	i *discordgo.InteractionCreate
}

type InteractionHelper interface {
	GetInteraction() *discordgo.InteractionCreate
	Respond() (<-chan *discordgo.WebhookEdit, error)
	RespondWebhook() (<-chan *discordgo.WebhookEdit, error)
}

func NewInteractionHelper(i *discordgo.InteractionCreate) InteractionHelper {
	//return &interactionHelper{i: i}
	return nil
}

func RegisterCommands(p RegisterCommandsParams) error {
	handlerMap := make(map[string]HandlerFunc)
	registeredCommands := make([]*discordgo.ApplicationCommand, 0, len(p.Commands))

	ctx, _ := context.WithCancel(context.Background())

	// Set up command
	for _, commandHandler := range p.Commands {
		handlerMap[commandHandler.Command.Name] = commandHandler.Handler
	}

	p.Session.AddHandler(func(s *discordgo.Session, i *discordgo.InteractionCreate) {
		ctx, cancel := context.WithTimeout(ctx, time.Second*15)
		defer cancel()

		log.Info().
			Str("handlerName", i.ApplicationCommandData().Name).
			Msg("invoking command handler")
		if h, ok := handlerMap[i.ApplicationCommandData().Name]; ok {
			h(ctx, s, i)
		}
	})

	p.Lifecycle.Append(fx.Hook{OnStart: func(ctx context.Context) error {
		for _, v := range p.Commands {
			ccmd, err := p.Session.ApplicationCommandCreate(p.Config.ApplicationID, v.GuildID, &v.Command)
			if err != nil {
				log.Error().Err(err).Msg("failed to register command")
				return err
			}
			log.Info().
				Str("name", ccmd.Name).
				Str("id", ccmd.ID).
				Msg("registered command")

			registeredCommands = append(registeredCommands, ccmd)
		}
		return nil
	},
		//OnStop: func(ctx context.Context) error {
		//	cancel()
		//	registeredCommands, err := p.Session.ApplicationCommands(p.Config.ApplicationID, "")
		//	if err != nil {
		//		log.Error().
		//			Err(err).
		//			Msg("could not fetch registered commands")
		//		return err
		//	}
		//	for _, v := range registeredCommands {
		//		err := p.Session.ApplicationCommandDelete(p.Config.ApplicationID, v.GuildID, v.ID)
		//		if err != nil {
		//			log.Error().Err(err).Msg("failed to delete command")
		//			return err
		//		}
		//		log.Debug().
		//			Str("handlerName", v.Name).
		//			Str("id", v.ID).
		//			Msg("deleted command")
		//	}
		//	return nil
		//}
	})
	return nil
}
