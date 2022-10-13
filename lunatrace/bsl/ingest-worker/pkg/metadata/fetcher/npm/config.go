package npm

import (
	"go.uber.org/config"
)

type Config struct {
	RegistryUrl string `yaml:"registry_url"`
}

func NewConfig(provider config.Provider) (config Config) {
	value := provider.Get("npm")

	err := value.Populate(&config)
	if err != nil {
		config.RegistryUrl = NpmRegistry
		return
	}
	return
}
