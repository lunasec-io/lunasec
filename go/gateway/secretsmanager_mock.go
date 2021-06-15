package gateway

import (
	"encoding/base64"
	"fmt"

	"go.uber.org/config"
)

type awsSecretsManagerGatewayMock struct {
	awsSecretsManagerGatewayMockConfig
}

type awsSecretsManagerGatewayMockConfig struct {
	Secrets map[string]string `yaml:"secrets"`
}

// NewAwsSecretsManagerGatewayMock...
func NewAwsSecretsManagerGatewayMock(provider config.Provider) AwsSecretsManagerGateway {
	var (
		gatewayConfig awsSecretsManagerGatewayMockConfig
	)

	err := provider.Get("secrets_manager_mock").Populate(&gatewayConfig)
	if err != nil {
		panic(err)
	}

	return &awsSecretsManagerGatewayMock{
		awsSecretsManagerGatewayMockConfig: gatewayConfig,
	}
}

func (s *awsSecretsManagerGatewayMock) GetSecret(secretId string) ([]byte, error) {
	encodedSecret, ok := s.Secrets[secretId]
	if !ok {
		return nil, fmt.Errorf("unable to find secret for given secret id: %s", secretId)
	}
	return base64.StdEncoding.DecodeString(encodedSecret)
}
