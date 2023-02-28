package discordfx

import (
	"context"

	"github.com/bwmarrin/discordgo"
	"github.com/rs/zerolog/log"
	"go.uber.org/config"
	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/vulnerability/scrape"
)

const ConfigurationKey = "discord"

type NewSessionParams struct {
	fx.In
	Config    config.Provider
	Lifecycle fx.Lifecycle
	Scraper   scrape.Scraper
}

type BotConfig struct {
	Token  string
	Intent discordgo.Intent
}

type Session interface {
	Start() error
}

type discordSession struct {
	params  NewSessionParams
	session *discordgo.Session
}

func NewDiscordSession(p NewSessionParams) (Session, error) {
	cfg := BotConfig{}

	err := p.Config.Get(ConfigurationKey).Populate(&cfg)
	if err != nil {
		log.Error().Err(err).Msg("failed loading config")
		return nil, err
	}

	token := "Bot " + cfg.Token

	s, err := discordgo.New(token)
	if err != nil {
		log.Error().Err(err).Msg("failed to create discord session")
		return nil, err
	}

	if cfg.Intent > 0 {
		s.Identify.Intents = cfg.Intent
	}

	if t, err := ParseToken(token); err != nil {
		log.Error().Err(err).Msg("failed to parse token")
	} else {
		log.Info().Str("url", GenerateOAuthURL(t)).Msg("OAuth URL")
	}

	p.Lifecycle.Append(fx.Hook{
		OnStop: func(ctx context.Context) error {
			log.Info().Msg("disconnecting")
			return s.Close()
		}})

	d := &discordSession{
		params:  p,
		session: s,
	}

	return d, nil
}

func (d *discordSession) Start() error {
	d.instrumentSession()
	return d.session.Open()
}

func (d *discordSession) instrumentSession() {
	d.session.AddHandler(func(s *discordgo.Session, m *discordgo.MessageCreate) {
		log.Info().
			Interface("event", m).
			Msg("message create")
		d.handleMessageCreate(m)
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
