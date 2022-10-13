package registryproxy

import (
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/dbfx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/proxy"
	"github.com/rs/zerolog/log"
	"go.uber.org/config"
	"io/ioutil"
	"os"
	"path"
)

const configDir = "config/registryproxy/"

type Config struct {
	DB    dbfx.Config  `yaml:"db"`
	Proxy proxy.Config `yaml:"proxy"`
}

func newDefaultConfig() Config {
	return Config{
		DB: dbfx.Config{
			DSN: `${LUNATRACE_DB_DSN}`,
		},
		Proxy: proxy.Config{
			Port:  `${LUNATRACE_PROXY_PORT}`,
			Stage: `${LUNATRACE_PROXY_STAGE}`,
		},
	}
}

func NewConfigProvider() (config.Provider, error) {
	opts := []config.YAMLOption{
		config.Permissive(),
		config.Expand(os.LookupEnv),
		config.Static(newDefaultConfig()),
	}

	files, err := ioutil.ReadDir(configDir)
	if err == nil {
		for _, file := range files {
			opts = append(opts, config.File(path.Join(configDir, file.Name())))
		}
	}
	if err != nil {
		log.Warn().Str("config directory", configDir).Msg("unable to locate config directory")
	}

	return config.NewYAML(opts...)
}
