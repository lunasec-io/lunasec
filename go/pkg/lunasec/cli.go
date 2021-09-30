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
	"fmt"
	"github.com/lunasec-io/lunasec-monorepo/constants"
	"github.com/lunasec-io/lunasec-monorepo/gateway"
	"github.com/lunasec-io/lunasec-monorepo/service/lunasec"
	"github.com/lunasec-io/lunasec-monorepo/util"
	"github.com/urfave/cli/v2"
	"go.uber.org/config"
	"go.uber.org/zap"
	"io/fs"
	"io/ioutil"
	"log"
	"os"
	"path"
	"sort"
	"time"
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

func getBuildDirectory() (string, error) {
	t := time.Now()
	formattedTime := fmt.Sprintf("build_%d-%02d-%02dT%02d:%02d:%02d",
        t.Year(), t.Month(), t.Day(),
        t.Hour(), t.Minute(), t.Second())
	relativeBuildDir := path.Join(constants.LunasecBuildDir, formattedTime)
	return util.GetHomeDirectory(relativeBuildDir)
}

func filterDirs(files []fs.FileInfo) (folders []fs.FileInfo) {
	for _, file := range files {
		if file.IsDir() {
			folders = append(folders, file)
		}
	}
	return
}

func cleanupPreviousBuilds() (err error) {
	var (
		files []fs.FileInfo
	)

	buildDir, err := util.GetHomeDirectory(constants.LunasecBuildDir)
	if err != nil {
		return err
	}

	files, err = ioutil.ReadDir(buildDir)

	folders := filterDirs(files)

	sort.Slice(folders, func(i, j int) bool{
		return folders[i].ModTime().Before(folders[j].ModTime())
	})

	listLen := len(folders)

	// only keep the last 10 builds
	for listLen > 10 {
		folder := folders[listLen-1]
		folderPath := path.Join(buildDir, folder.Name())

		err = os.RemoveAll(folderPath)
		if err != nil {
			return err
		}
		listLen -= 1
	}
	return
}

func BuildCommand(localDev bool, provider config.Provider, buildDir string) (err error) {
	err = cleanupPreviousBuilds()
	if err != nil {
		log.Println(err)
		return
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

	builderConfig := lunasec.NewBuilderConfig(buildDir, localDev, env)

	buildConfig, err := lunasec.NewBuildConfig(provider)
	if err != nil {
		log.Print(err)
		return
	}

	builder := lunasec.NewBuilder(builderConfig, buildConfig, npmGateway)
	return builder.Build()
}

func DeployCommand(c *cli.Context) (err error) {
	dryRun := c.Bool("dry-run")
	localDev := c.Bool("local")
	configOutput := c.String("output")
	if configOutput == "" {
		configOutput = constants.DeployedAwsResourcesConfig
	}

	configFile := c.String("config")
	provider, err := loadConfigFile(configFile)
	if err != nil {
		log.Println(err)
		return
	}

	buildDir := c.String("dir")
	if buildDir == "" {
		buildDir, err = getBuildDirectory()
		if err != nil {
			log.Println(err)
			return err
		}
	}

	log.Println("building secure lunasec components")
	err = BuildCommand(localDev, provider, buildDir)
	if err != nil {
		log.Println(err)
		return err
	}

	if dryRun {
		return
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
	err = deployer.Deploy()
	if err != nil {
		log.Print(err)
		return
	}

	err = deployer.WriteConfig()
	if err != nil {
		log.Print(err)
		return
	}
	return
}
