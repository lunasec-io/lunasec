package lunasec

import (
	"github.com/refinery-labs/loq/service"
	"github.com/urfave/cli"
)

type CliOptions struct {
}

func cliOptionsStruct(c *cli.Context) CliOptions {
	return CliOptions{}
}

func DeployCommand(c *cli.Context) (err error) {
	skipMirroring := c.Bool("skip-mirroring")
	lunasecDeployer := service.NewLunasecDeployer(skipMirroring)
	return lunasecDeployer.Deploy()
}
