package lunasec

import (
	"errors"
	"github.com/refinery-labs/loq/service"
	"github.com/urfave/cli"
	"go.uber.org/config"
	"log"
)

type CliOptions struct {
}

func cliOptionsStruct(c *cli.Context) CliOptions {
	return CliOptions{}
}

func BuildCommand(c *cli.Context) (err error) {
	buildDir := c.GlobalString("dir")
	configFile := c.GlobalString("config")
	skipMirroring := c.Bool("skip-mirroring")

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

	lunasecDeployer, err := service.NewLunasecDeployer(provider, buildDir, skipMirroring)
	if err != nil {
		log.Println(err)
		return
	}
	return lunasecDeployer.Build()
}

func DeployCommand(c *cli.Context) (err error) {
	buildBeforeDeploying := c.Bool("build")

	if buildBeforeDeploying {
		log.Println("building secure lunasec components")
		err = BuildCommand(c)
		if err != nil {
			return err
		}
	}

	buildDir := c.GlobalString("dir")
	lunasecDeployer, _ := service.NewLunasecDeployer(nil, buildDir, true)
	return lunasecDeployer.Deploy()
}
