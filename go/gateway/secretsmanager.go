package gateway

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/secretsmanager"
	"github.com/refinery-labs/loq/util"
	"go.uber.org/config"
	"go.uber.org/zap"
)

type awsSecretsManagerGateway struct {
	logger *zap.Logger
	awsSecretsManagerGatewayConfig
	session *session.Session
}

type awsSecretsManagerGatewayConfig struct {
	S3Region string `yaml:"region"`
}

// AwsSecretsManagerGateway ...
type AwsSecretsManagerGateway interface {
	GetSecret(secretId string) ([]byte, error)
}

// NewAwsSecretsManagerGateway...
func NewAwsSecretsManagerGateway(logger *zap.Logger, provider config.Provider) AwsSecretsManagerGateway {
	var (
		gatewayConfig awsSecretsManagerGatewayConfig
	)

	err := provider.Get("aws_gateway").Populate(&gatewayConfig)
	if err != nil {
		panic(err)
	}

	sess, err := session.NewSession(
		&aws.Config{
			Region: &gatewayConfig.S3Region,
		},
	)

	if err != nil {
		util.Panicf("Failed to instantiate Secrets Manager session %s", err)
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
