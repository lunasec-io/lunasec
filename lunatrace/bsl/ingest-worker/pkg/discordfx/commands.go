package discordfx

import (
	"context"
	"fmt"
	"strings"
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
	// TODO (cthompson) a bit of a hack right now, these should probably be their own type
	MessageComponent bool
	GuildID          string
}

type MessageInfo struct {
	IsBotCommand bool
}

type MessageHandlerFunc func(ctx context.Context, info MessageInfo, s *discordgo.Session, m *discordgo.MessageCreate)

type MessageHandler struct {
	Handler MessageHandlerFunc
}

type RegisterCommandsParams struct {
	fx.In
	Config    DiscordConfig
	Session   *discordgo.Session
	Commands  []*ApplicationCommandWithHandler `group:"command"`
	Handlers  []*MessageHandler                `group:"handler"`
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

	p.Session.AddHandler(func(s *discordgo.Session, m *discordgo.MessageCreate) {
		ctx, cancel := context.WithTimeout(ctx, time.Second*30)
		defer cancel()

		cmdStr := fmt.Sprintf("<@%s>", p.Config.ApplicationID)

		info := MessageInfo{
			IsBotCommand: strings.Contains(m.Content, cmdStr),
		}

		if info.IsBotCommand {
			m.Content = strings.Replace(m.Content, cmdStr, "", 1)
		}

		for _, h := range p.Handlers {
			h.Handler(ctx, info, s, m)
		}
	})

	p.Session.AddHandler(func(s *discordgo.Session, i *discordgo.InteractionCreate) {
		ctx, cancel := context.WithTimeout(ctx, time.Second*15)
		defer cancel()

		switch i.Type {
		case discordgo.InteractionApplicationCommand:
			log.Info().
				Str("handlerName", i.ApplicationCommandData().Name).
				Msg("invoking command handler")
			if h, ok := handlerMap[i.ApplicationCommandData().Name]; ok {
				h(ctx, s, i)
			}
		case discordgo.InteractionMessageComponent:
			customID := i.MessageComponentData().CustomID
			log.Info().
				Str("customID", customID).
				Msg("invoking message component handler")
			if h, ok := handlerMap[customID]; ok {
				h(ctx, s, i)
			}
		}
	})

	p.Lifecycle.Append(fx.Hook{OnStart: func(ctx context.Context) error {
		for _, v := range p.Commands {
			if v.MessageComponent {
				continue
			}

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
