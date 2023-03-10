package discordfx

import (
	"github.com/bwmarrin/discordgo"
	"github.com/rs/zerolog/log"
	"go.uber.org/config"
	"go.uber.org/fx"
)

const ConfigurationKey = "discord"

type ConfigParams struct {
	fx.In
	Config config.Provider
}

type DiscordConfig struct {
	ApplicationID string           `yaml:"application_id"`
	Token         string           `yaml:"token"`
	Intent        discordgo.Intent `yaml:"intent"`
}

func NewConfig(p ConfigParams) (cfg DiscordConfig, err error) {
	err = p.Config.Get(ConfigurationKey).Populate(&cfg)
	if err != nil {
		log.Error().Err(err).Msg("failed loading config")
		return
	}
	return
}
