// Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
package scan

import (
	"fmt"
	"github.com/Khan/genqlient/graphql"
	v5 "github.com/anchore/grype/grype/db/v5"
	"github.com/anchore/grype/grype/store"
	"github.com/lunasec-io/lunasec/lunatrace/cli/fx/grypefx/store/gqlstorefx"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/httputil"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/types"
	"net/http"
	"path"

	"github.com/adrg/xdg"
	"github.com/anchore/grype/grype"
	"github.com/anchore/grype/grype/db"
	"github.com/anchore/grype/grype/match"
	"github.com/anchore/grype/grype/matcher"
	"github.com/anchore/grype/grype/pkg"
	"github.com/anchore/grype/grype/presenter/models"
	"github.com/anchore/grype/grype/vulnerability"
	"github.com/anchore/stereoscope/pkg/image"
	"github.com/rs/zerolog/log"
	"github.com/spf13/viper"

	"github.com/lunasec-io/lunasec/lunatrace/cli/fx/grypefx/store/multistorefx"
)

type RegistryCredentials struct {
	Authority string `yaml:"authority" json:"authority" mapstructure:"authority"`
	// IMPORTANT: do not show the username in any YAML/JSON output (sensitive information)
	Username string `yaml:"-" json:"-" mapstructure:"username"`
	// IMPORTANT: do not show the password in any YAML/JSON output (sensitive information)
	Password string `yaml:"-" json:"-" mapstructure:"password"`
	// IMPORTANT: do not show the token in any YAML/JSON output (sensitive information)
	Token string `yaml:"-" json:"-" mapstructure:"token"`
}

type registry struct {
	InsecureSkipTLSVerify bool                  `yaml:"insecure-skip-tls-verify" json:"insecure-skip-tls-verify" mapstructure:"insecure-skip-tls-verify"`
	InsecureUseHTTP       bool                  `yaml:"insecure-use-http" json:"insecure-use-http" mapstructure:"insecure-use-http"`
	Auth                  []RegistryCredentials `yaml:"auth" json:"auth" mapstructure:"auth"`
}

func (cfg registry) loadDefaultValues(v *viper.Viper) {
	v.SetDefault("registry.insecure-skip-tls-verify", false)
	v.SetDefault("registry.insecure-use-http", false)
	v.SetDefault("registry.auth", []RegistryCredentials{})
}

func (cfg *registry) ToOptions() *image.RegistryOptions {
	var auth = make([]image.RegistryCredentials, len(cfg.Auth))
	for i, a := range cfg.Auth {
		auth[i] = image.RegistryCredentials{
			Authority: a.Authority,
			Username:  a.Username,
			Password:  a.Password,
			Token:     a.Token,
		}
	}
	return &image.RegistryOptions{
		InsecureSkipTLSVerify: cfg.InsecureSkipTLSVerify,
		InsecureUseHTTP:       cfg.InsecureUseHTTP,
		Credentials:           auth,
	}
}

type Application struct {
	ConfigPath         string                  `yaml:",omitempty" json:"configPath"`                                                         // the location where the application config was read from (either from -c or discovered while loading)
	Output             string                  `yaml:"output" json:"output" mapstructure:"output"`                                           // -o, the Presenter hint string to use for report formatting
	File               string                  `yaml:"file" json:"file" mapstructure:"file"`                                                 // --file, the file to write report output to
	OutputTemplateFile string                  `yaml:"output-template-file" json:"output-template-file" mapstructure:"output-template-file"` // -t, the template file to use for formatting the final report
	Quiet              bool                    `yaml:"quiet" json:"quiet" mapstructure:"quiet"`                                              // -q, indicates to not show any status output to stderr (ETUI or logging UI)
	CheckForAppUpdate  bool                    `yaml:"check-for-app-update" json:"check-for-app-update" mapstructure:"check-for-app-update"` // whether to check for an application update on start up or not
	OnlyFixed          bool                    `yaml:"only-fixed" json:"only-fixed" mapstructure:"only-fixed"`                               // only fail if detected vulns have a fix
	Ignore             []match.IgnoreRule      `yaml:"ignore" json:"ignore" mapstructure:"ignore"`
	Exclusions         []string                `yaml:"exclude" json:"exclude" mapstructure:"exclude"`
	DB                 database                `yaml:"db" json:"db" mapstructure:"db"`
	FailOn             string                  `yaml:"fail-on-severity" json:"fail-on-severity" mapstructure:"fail-on-severity"`
	FailOnSeverity     *vulnerability.Severity `yaml:"-" json:"-"`
	Registry           registry                `yaml:"registry" json:"registry" mapstructure:"registry"`
}

type database struct {
	Dir                   string `yaml:"cache-dir" json:"cache-dir" mapstructure:"cache-dir"`
	UpdateURL             string `yaml:"update-url" json:"update-url" mapstructure:"update-url"`
	CACert                string `yaml:"ca-cert" json:"ca-cert" mapstructure:"ca-cert"`
	AutoUpdate            bool   `yaml:"auto-update" json:"auto-update" mapstructure:"auto-update"`
	ValidateByHashOnStart bool   `yaml:"validate-by-hash-on-start" json:"validate-by-hash-on-start" mapstructure:"validate-by-hash-on-start"`
}

func (cfg database) ToCuratorConfig() db.Config {
	return db.Config{
		DBRootDir:           cfg.Dir,
		ListingURL:          cfg.UpdateURL,
		CACert:              cfg.CACert,
		ValidateByHashOnGet: cfg.ValidateByHashOnStart,
	}
}

var (
	appConfig *Application
)

func init() {
	appConfig = &Application{
		DB: database{
			Dir:                   path.Join(xdg.CacheHome, "grype", "db"),
			UpdateURL:             "https://toolbox-data.anchore.io/grype/databases/listing.json",
			CACert:                "",
			AutoUpdate:            true,
			ValidateByHashOnStart: false,
		},
	}
}

func validateDBLoad(loadErr error, status *db.Status) error {
	if loadErr != nil {
		return fmt.Errorf("failed to load vulnerability db: %w", loadErr)
	}
	if status == nil {
		return fmt.Errorf("unable to determine DB status")
	}
	if status.Err != nil {
		return fmt.Errorf("db could not be loaded: %w", status.Err)
	}
	return nil
}

type MockExclusionProvider struct{}

func (pr *MockExclusionProvider) GetRules(vulnerabilityID string) ([]match.IgnoreRule, error) {
	return []match.IgnoreRule{}, nil
}

func GrypeSbomScanFromFile(
	vulnerabilityProvider *db.VulnerabilityProvider,
	vulnerabilityMetadataProvider *db.VulnerabilityMetadataProvider,
	filename string,
) (document models.Document, err error) {
	log.Debug().Msg("gathering packages")

	providerConfig := pkg.ProviderConfig{}

	store := store.Store{
		Provider:          vulnerabilityProvider,
		MetadataProvider:  vulnerabilityMetadataProvider,
		ExclusionProvider: &MockExclusionProvider{},
	}
	packages, context, err := pkg.Provide("sbom:"+filename, providerConfig)
	if err != nil {
		log.Error().Err(err).Msg("unable to load sbom")
		return
	}
	log.Debug().Msg("finished gathering packages")

	log.Debug().Msg("finding vulnerabilities")
	matchers := matcher.NewDefaultMatchers(matcher.Config{})
	matches := grype.FindVulnerabilitiesForPackage(store, context.Distro, matchers, packages)
	log.Debug().Msg("done looking for vulnerabilities")

	document, err = models.NewDocument(packages, context, matches, nil, vulnerabilityMetadataProvider, appConfig, &db.Status{Location: "online"})
	if err != nil {
		log.Error().Err(err).Msg("unable to create sbom model")
		return
	}
	return
}

func GetVulnerabilityStore(appConfig types.LunaTraceConfig) (v5.StoreReader, error) {
	//log.Debug().Msg("loading grype store")
	//grypeStore, dbStatus, err := grypestorefx.LoadVulnerabilityDB(appConfig.DB.ToCuratorConfig(), appConfig.DB.AutoUpdate)
	//if err = validateDBLoad(err, dbStatus); err != nil {
	//	log.Error().Err(err).Msg("unable to load db")
	//	return nil, err
	//}
	//log.Debug().Msg("finished loading grype store")

	log.Debug().Msg("loading gql store")
	gqlStore, err := gqlstorefx.NewGraphQLStore(gqlstorefx.StoreDeps{
		GQLClient: graphql.NewClient(appConfig.GraphqlServer.Url, &http.Client{
			Transport: &httputil.HeadersTransport{Headers: map[string]string{
				"x-hasura-admin-secret": appConfig.GraphqlServer.Secret,
				"x-hasura-role":         "service",
			}},
		}),
	})

	if err != nil {
		log.Error().Err(err).Msg("unable to load gql store")
		return nil, err
	}
	log.Debug().Msg("loaded gql store")

	multiStore, err := multistorefx.NewMultiStore(gqlStore)
	if err != nil {
		log.Error().Err(err).Msg("unable to create multistore")
		return nil, err
	}
	return multiStore, nil
}
