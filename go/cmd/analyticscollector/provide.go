package main

import (
	"github.com/lunasec-io/lunasec-monorepo/gateway"
	"github.com/lunasec-io/lunasec-monorepo/util"
	"go.uber.org/config"
	"go.uber.org/zap"
	"log"
)

func analyticsCollectorDependencies() (*zap.Logger, config.Provider, gateway.Gateways) {
	logger, err := util.GetLogger()
	if err != nil {
		log.Println(err)
		panic(err)
	}

	provider := util.GetConfigProviderFromDir("config/analyticscollector")

	gateways := gateway.GetAwsGateways(logger, provider)

	return logger, provider, gateways
}
