package analyticscollector

import (
	"github.com/lunasec-io/lunasec-monorepo/gateway"
	"github.com/lunasec-io/lunasec-monorepo/util"
	"go.uber.org/config"
	"go.uber.org/zap"
	"log"
)

func analyticsCollectorDependencies() (*zap.Logger, config.Provider, gateway.AwsCloudwatchGateway) {
	logger, err := util.GetLogger()
	if err != nil {
		log.Println(err)
		panic(err)
	}

	provider := util.GetConfigProviderFromDir("config/analyticscollector")

	sess, err := gateway.NewAwsSession(logger, provider)
	if err != nil {
		panic(err)
	}

	cloudwatch := gateway.NewAwsCloudwatchGateway(logger, provider, sess)

	return logger, provider, cloudwatch
}
