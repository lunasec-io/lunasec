package lunasec

import (
	"github.com/refinery-labs/loq/service"
	"github.com/urfave/cli"
	"log"
)

type CliOptions struct {
}

func cliOptionsStruct(c *cli.Context) CliOptions {
	return CliOptions{}
}

func BuildCommand(c *cli.Context) (err error) {
	buildDir := c.String("dir")
	lunasecDeployer := service.NewLunasecDeployer(buildDir, true)
	return lunasecDeployer.Build()
}

func DeployCommand(c *cli.Context) (err error) {
	skipMirroring := c.Bool("skip-mirroring")
	buildBeforeDeploying := c.Bool("build")

	if buildBeforeDeploying {
		log.Println("building secure lunasec components")
		err = BuildCommand(c)
		if err != nil {
			return err
		}
	}

	buildDir := c.String("dir")
	lunasecDeployer := service.NewLunasecDeployer(buildDir, skipMirroring)
	return lunasecDeployer.Deploy()
}
