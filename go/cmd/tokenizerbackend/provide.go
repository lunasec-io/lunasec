package main

import (
	"github.com/lunasec-io/lunasec-monorepo/gateway"
	"github.com/lunasec-io/lunasec-monorepo/util"
	"go.uber.org/config"
	"go.uber.org/zap"
	"log"
)

func tokenizerBackendDependencies() (*zap.Logger, config.Provider, gateway.Gateways) {
	logger, err := util.GetLogger()
	if err != nil {
		log.Println(err)
		panic(err)
	}

	provider := util.GetConfigProviderFromDir("config/tokenizerbackend")

	gateways := gateway.GetAwsGateways(logger, provider)

	return logger, provider, gateways
}
