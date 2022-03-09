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
//
package scan

import (
	"fmt"
	"github.com/anchore/grype/grype"
	"github.com/anchore/grype/grype/db"
	"github.com/anchore/grype/grype/match"
	"github.com/anchore/grype/grype/pkg"
	"github.com/anchore/grype/grype/vulnerability"
	"github.com/anchore/stereoscope/pkg/image"
	"github.com/rs/zerolog/log"
	"github.com/spf13/viper"
	"sync"
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

func GrypeSbomScanFromFile(filename string) (err error) {
	var (
		provider                   vulnerability.Provider
		metadataProvider           vulnerability.MetadataProvider
		dbStatus                   *db.Status
		packages                   []pkg.Package
		context                    pkg.Context
		wg                         = &sync.WaitGroup{}
		loadedDB, gatheredPackages bool
	)

	errs := make(chan error)

	wg.Add(2)

	go func() {
		defer wg.Done()
		log.Debug().Msg("loading DB")
		provider, metadataProvider, dbStatus, err = grype.LoadVulnerabilityDB(appConfig.DB.ToCuratorConfig(), appConfig.DB.AutoUpdate)
		if err = validateDBLoad(err, dbStatus); err != nil {
			errs <- err
			return
		}
		loadedDB = true
	}()

	go func() {
		defer wg.Done()
		log.Debug().Msg("gathering packages")
		providerConfig := pkg.ProviderConfig{
			RegistryOptions: appConfig.Registry.ToOptions(),
			Exclusions:      appConfig.Exclusions,
		}
		packages, context, err = pkg.Provide("sbom:"+filename, providerConfig)
		if err != nil {
			errs <- fmt.Errorf("failed to catalog: %w", err)
			return
		}
		gatheredPackages = true
	}()

	wg.Wait()
	if !loadedDB || !gatheredPackages {
		return
	}

	allMatches := grype.FindVulnerabilitiesForPackage(provider, context.Distro, packages...)

	println(allMatches.Count())
	return
}
