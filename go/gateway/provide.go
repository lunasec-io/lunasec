package gateway

import (
	"log"

	"go.uber.org/config"
	"go.uber.org/zap"
)

type Gateways struct {
	KV DynamoKvGateway
	SM AwsSecretsManagerGateway
	S3 AwsS3Gateway
}

type gatewayConfig struct {
	Mock bool `yaml:"mock"`
}

func GetAwsGateways(logger *zap.Logger, provider config.Provider) (gateways Gateways) {
	var (
		awsGatewayConfig gatewayConfig
	)
	logger.Debug("loading AWS gateway config...")
	err := provider.Get("aws_gateway").Populate(&awsGatewayConfig)
	if err != nil {
		log.Println(err)
		panic(err)
	}

	if awsGatewayConfig.Mock {
		logger.Debug("loading mock AWS gateways")
		gateways.SM = NewAwsSecretsManagerGatewayMock(provider)
	} else {
		logger.Debug("loading secrets manager AWS gateway...")
		gateways.SM = NewAwsSecretsManagerGateway(logger, provider)
	}

	logger.Debug("loading dynamodb AWS gateway...")
	gateways.KV = NewDynamoKvGateway(logger, provider)

	logger.Debug("loading s3 AWS gateway...")
	gateways.S3, err = NewAwsS3Gateway(logger, provider)
	if err != nil {
		logger.Error("unable to create secrets manager", zap.Error(err))
		panic(err)
	}
	return
}
