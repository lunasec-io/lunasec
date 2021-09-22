package gateway

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/secretsmanager"
	"go.uber.org/config"
	"go.uber.org/zap"
)

type awsSecretsManagerGateway struct {
	logger *zap.Logger
	awsSecretsManagerGatewayConfig
	session *session.Session
}

type awsSecretsManagerGatewayConfig struct {
	AwsGatewayConfig
}

// AwsSecretsManagerGateway ...
type AwsSecretsManagerGateway interface {
	GetSecret(secretId string) ([]byte, error)
}

// NewAwsSecretsManagerGateway...
func NewAwsSecretsManagerGateway(logger *zap.Logger, provider config.Provider, sess *session.Session) AwsSecretsManagerGateway {
	var (
		gatewayConfig awsSecretsManagerGatewayConfig
	)

	err := provider.Get("aws_gateway").Populate(&gatewayConfig)
	if err != nil {
		panic(err)
	}

	return &awsSecretsManagerGateway{
		logger:                         logger,
		awsSecretsManagerGatewayConfig: gatewayConfig,
		session:                        sess,
	}
}

// TODO merge both functions
func (s *awsSecretsManagerGateway) GetSecret(secretId string) ([]byte, error) {
	svc := secretsmanager.New(s.session)

	secretValueInput := &secretsmanager.GetSecretValueInput{
		SecretId: aws.String(secretId),
	}

	resp, err := svc.GetSecretValue(secretValueInput)
	if err != nil {
		return nil, err
	}
	return resp.SecretBinary, nil
}
