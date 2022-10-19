package npm

import (
	"github.com/rs/zerolog/log"
	"go.uber.org/config"
)

type Config struct {
	RegistryUrl string `yaml:"registry_url"`
}

func NewConfig(provider config.Provider) (config Config) {
	value := provider.Get("npm")

	err := value.Populate(&config)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable populate npm fetcher config")
		return
	}
	return
}
