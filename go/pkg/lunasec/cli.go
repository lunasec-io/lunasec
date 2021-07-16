package lunasec

import (
	"fmt"
	"github.com/refinery-labs/loq/gateway"
	"github.com/refinery-labs/loq/service/lunasec"
	"github.com/urfave/cli"
	"go.uber.org/config"
	"go.uber.org/zap"
	"log"
	"os"
)

var (
	configPaths = []string{
		"config.yaml",
		"config/lunasec/config.yaml",
	}
)

func findFirstExistingFile(filePaths []string) string {
	for _, file := range filePaths {
		if _, err := os.Stat(file); err == nil {
			return file
		}
	}
	return ""
}

type CliOptions struct {
}

func cliOptionsStruct(c *cli.Context) CliOptions {
	return CliOptions{}
}

func loadConfigFile(configFile string) (provider config.Provider, err error) {
	if configFile == "" {
		configFile = findFirstExistingFile(configPaths)
		if configFile == "" {
			err = fmt.Errorf("unable to local build config file, searched: %v", configPaths)
			log.Println(err)
			return
		}
	}

	return config.NewYAML(config.File(configFile))
}

func BuildCommand(c *cli.Context) (err error) {
	skipMirroring := c.Bool("skip-mirroring")
	localDev := c.Bool("local")

	configFile := c.GlobalString("config")
	provider, err := loadConfigFile(configFile)
	if err != nil {
		log.Println(err)
		return
	}

	buildDir := c.GlobalString("dir")
	if buildDir == "" {
		buildDir = lunasec.LunasecBuildDir
	}

	logger, err := zap.NewProduction()
	if err != nil {
		log.Println(err)
		return
	}

	sts := gateway.NewAwsStsGateway(logger, provider)

	builderConfig := lunasec.NewBuilderConfig(buildDir, localDev, skipMirroring, sts)

	buildConfig, err := lunasec.NewBuildConfig(provider)
	if err != nil {
		log.Print(err)
		return
	}

	builder := lunasec.NewBuilder(builderConfig, buildConfig)
	return builder.Build()
}

func DeployCommand(c *cli.Context) (err error) {
	buildBeforeDeploying := c.Bool("build")
	localDev := c.Bool("local")
	configOutput := c.String("config-output")
	if configOutput == "" {
		configOutput = "config/secureframe/"
	}
	configFile := c.GlobalString("config")
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

	buildDir := c.GlobalString("dir")
	if buildDir == "" {
		buildDir = lunasec.LunasecBuildDir
	}

	logger, err := zap.NewProduction()
	if err != nil {
		log.Println(err)
		return
	}

	sts := gateway.NewAwsStsGateway(logger, provider)

	deployerConfig := lunasec.NewDeployerConfig(localDev, buildDir, configOutput, sts)

	buildConfig, err := lunasec.NewBuildConfig(provider)
	if err != nil {
		log.Print(err)
		return
	}

	deployer := lunasec.NewDeployer(deployerConfig, buildConfig)
	return deployer.Deploy()
}
