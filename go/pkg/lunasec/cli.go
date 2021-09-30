// Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
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
package lunasec

import (
	"errors"
	"fmt"
	"github.com/refinery-labs/loq/constants"
	"github.com/refinery-labs/loq/gateway"
	"github.com/refinery-labs/loq/gateway/metrics"
	"github.com/refinery-labs/loq/service/lunasec"
	"github.com/refinery-labs/loq/util"
	"github.com/urfave/cli/v2"
	"go.uber.org/config"
	"go.uber.org/zap"
	"log"
)

var (
	configPaths = []string{
		"config.yaml",
		"config/lunasec/config.yaml",
		"config/lunasec/dev.yaml",
	}
)

type CliOptions struct {
}

func cliOptionsStruct(c *cli.Context) CliOptions {
	return CliOptions{}
}

func loadConfigFile(configFile string) (provider config.Provider, err error) {
	if configFile == "" {
		configFile = util.FindFirstExistingFile(configPaths)
		if configFile == "" {
			err = fmt.Errorf("unable to local build config file, searched: %v", configPaths)
			log.Println(err)
			return
		}
	}

	configFiles := []string{
		configFile,
	}
	provider = util.GetConfigProviderFromFiles(configFiles)
	return
}

func BuildCommand(c *cli.Context) (err error) {
	skipMirroring := c.Bool("skip-mirroring")
	localDev := c.Bool("local")

	configFile := c.String("config")
	provider, err := loadConfigFile(configFile)
	if err != nil {
		log.Println(err)
		return
	}

	buildDir := c.String("dir")
	if buildDir == "" {
		buildDir = constants.LunasecBuildDir
	}

	logger, err := util.GetLogger()
	if err != nil {
		log.Println(err)
		return
	}

	sess, err := gateway.NewAwsSession(logger, provider)
	if err != nil {
		log.Println(err)
		return
	}

	env, err := lunasec.NewDeploymentEnvironment(sess)
	if err != nil {
		log.Println(err)
		return
	}

	npmGateway := gateway.NewNpmGateway(logger, provider)

	builderConfig := lunasec.NewBuilderConfig(buildDir, localDev, skipMirroring, env)

	buildConfig, err := lunasec.NewBuildConfig(provider)
	if err != nil {
		log.Print(err)
		return
	}

	metricsConfig, err := metrics.NewMetricsConfig(provider)

	builder := lunasec.NewBuilder(builderConfig, buildConfig, npmGateway, metricsConfig)
	return builder.Build()
}

func DeployCommand(c *cli.Context) (err error) {
	buildBeforeDeploying := c.Bool("build")
	localDev := c.Bool("local")
	configOutput := c.String("config-output")
	if configOutput == "" {
		err = errors.New("no config output file provided")
		log.Println(err)
		return
	}
	configFile := c.String("config")
	provider, err := loadConfigFile(configFile)
	if err != nil {
		log.Println(err)
		return
	}

	if buildBeforeDeploying {
		log.Println("building secure lunasec components")
		err = BuildCommand(c)
		if err != nil {
			return err
		}
	}

	buildDir := c.String("dir")
	if buildDir == "" {
		buildDir = constants.LunasecBuildDir
	}

	logger, err := zap.NewProduction()
	if err != nil {
		log.Println(err)
		return
	}

	sess, err := gateway.NewAwsSession(logger, provider)
	if err != nil {
		log.Println(err)
		return
	}

	env, err := lunasec.NewDeploymentEnvironment(sess)
	if err != nil {
		log.Println(err)
		return
	}

	deployerConfig := lunasec.NewDeployerConfig(localDev, buildDir, configOutput, env)

	buildConfig, err := lunasec.NewBuildConfig(provider)
	if err != nil {
		log.Print(err)
		return
	}

	deployer := lunasec.NewDeployer(deployerConfig, buildConfig)
	return deployer.Deploy()
}
