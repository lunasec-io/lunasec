package proxy

import (
	"github.com/rs/zerolog/log"
	"go.uber.org/config"
)

type Config struct {
	Port  string `yaml:"port"`
	Stage string `yaml:"stage"`
}

func NewConfig(provider config.Provider) (config Config, err error) {
	value := provider.Get("proxy")

	err = value.Populate(&config)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable populate queue config")
		return
	}
	return
}
