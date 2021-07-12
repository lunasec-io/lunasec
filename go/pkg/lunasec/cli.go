package lunasec

import (
	"errors"
	"fmt"
	"github.com/refinery-labs/loq/service/lunasec"
	"github.com/urfave/cli"
	"go.uber.org/config"
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
		if _, err := os.Stat(file); err != nil {
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

func BuildCommand(c *cli.Context) (err error) {
	buildDir := c.GlobalString("dir")
	configFile := c.GlobalString("config")
	if configFile == "" {
		configFile = findFirstExistingFile(configPaths)
		if configFile == "" {
			err = fmt.Errorf("unable to local build config file, searched: %v", configPaths)
			log.Println(err)
			return
		}
	}
	skipMirroring := c.Bool("skip-mirroring")
	localDev := c.Bool("local")

	if configFile == "" {
		err = errors.New("required parameter 'config' not provided")
		log.Println(err)
		return
	}

	provider, err := config.NewYAML(config.File(configFile))
	if err != nil {
		log.Println(err)
		return
	}

	lunasecDeployer, err := lunasec.NewLunasecDeployer(provider, buildDir, skipMirroring, localDev, "")
	if err != nil {
		log.Println(err)
		return
	}
	return lunasecDeployer.Build()
}

func DeployCommand(c *cli.Context) (err error) {
	buildBeforeDeploying := c.Bool("build")
	localDev := c.Bool("local")
	configOutput := c.String("config-output")
	if configOutput == "" {
		configOutput = "config/secureframe/"
	}

	if buildBeforeDeploying {
		log.Println("building secure lunasec components")
		err = BuildCommand(c)
		if err != nil {
			return err
		}
	}

	buildDir := c.GlobalString("dir")
	lunasecDeployer, _ := lunasec.NewLunasecDeployer(nil, buildDir, true, localDev, configOutput)
	return lunasecDeployer.Deploy()
}
