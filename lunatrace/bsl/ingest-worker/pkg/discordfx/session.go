package discordfx

import (
	"github.com/bwmarrin/discordgo"
	"github.com/rs/zerolog/log"
	"go.uber.org/fx"
)

type NewSessionParams struct {
	fx.In
	Config DiscordConfig
}

func NewDiscordSession(p NewSessionParams) (*discordgo.Session, error) {
	token := "Bot " + p.Config.Token

	s, err := discordgo.New(token)
	if err != nil {
		log.Error().Err(err).Msg("failed to create discord session")
		return nil, err
	}

	if p.Config.Intent > 0 {
		s.Identify.Intents = p.Config.Intent
	}

	if t, err := ParseToken(token); err != nil {
		log.Error().Err(err).Msg("failed to parse token")
	} else {
		log.Info().Str("url", GenerateOAuthURL(t)).Msg("OAuth URL")
	}

	return s, nil
}

func LogSessionEvents(s *discordgo.Session) {
	s.AddHandler(func(s *discordgo.Session, m *discordgo.MessageCreate) {
		log.Info().
			Interface("event", m).
			Msg("message create")
	})
	//d.session.AddHandler(func(s *discordgo.Session, r *discordgo.Ready) {
	//	log.Info().
	//		Str("username", s.State.User.Username).
	//		Str("discriminator", s.State.User.Discriminator).
	//		Msg("connected")
	//})
	//d.session.AddHandler(func(s *discordgo.Session, m *discordgo.MessageEdit) {
	//	log.Info().
	//		Interface("event", m).
	//		Msg("message edit")
	//})
	//d.session.AddHandler(func(s *discordgo.Session, m *discordgo.MessageDelete) {
	//	log.Info().
	//		Interface("event", m).
	//		Msg("message delete")
	//})
	//d.session.AddHandler(func(s *discordgo.Session, m *discordgo.PresenceUpdate) {
	//	log.Info().
	//		Interface("event", m).
	//		Msg("presence update")
	//})
}
