package gateway

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"go.uber.org/config"
	"go.uber.org/zap"
)

type Gateways struct {
	KV DynamoKvGateway
	SM AwsSecretsManagerGateway
	S3 AwsS3Gateway
}

type GatewayConfig struct {
	S3Region string `yaml:"region"`
	AccessKeyID string `yaml:"access_key_id"`
	SecretAccessKey string `yaml:"secret_access_key"`
	LocalstackURL string `yaml:"localstack_url"`
	LocalHTTPSProxy string `yaml:"local_https_proxy"`
}

func NewGatewayConfig(logger *zap.Logger, provider config.Provider) (gatewayConfig GatewayConfig, err error) {
	err = provider.Get("aws_gateway").Populate(&gatewayConfig)
	if err != nil {
		logger.Error("unable to load aws gateway config", zap.Error(err))
		return
	}
	return
}

func newAwsSessionOptions(logger *zap.Logger, provider config.Provider) (options session.Options, gatewayConfig GatewayConfig, err error) {
	var (
		creds *credentials.Credentials
		endpointUrl *string
	)

	gatewayConfig, err = NewGatewayConfig(logger, provider)
	if err != nil {
		logger.Error("unable to create gateway config", zap.Error(err))
		return
	}

	sharedConfigEnable := session.SharedConfigEnable
	if gatewayConfig.AccessKeyID != "" && gatewayConfig.SecretAccessKey != "" {
		logger.Debug(
			"using configured credentials for aws session",
			zap.String("accessKeyID", gatewayConfig.AccessKeyID),
			zap.String("secretAccessKey", gatewayConfig.SecretAccessKey),
		)
		creds = credentials.NewStaticCredentials(gatewayConfig.AccessKeyID, gatewayConfig.SecretAccessKey, "")
		sharedConfigEnable = session.SharedConfigDisable
	}

	if gatewayConfig.LocalstackURL != "" {
		logger.Debug(
			"using configured localstack url for aws session",
			zap.String("localstackURL", gatewayConfig.LocalstackURL),
		)
		endpointUrl = aws.String(gatewayConfig.LocalstackURL)
	}

	options = session.Options{
		SharedConfigState: sharedConfigEnable,
		Config: aws.Config{
			Credentials: creds,
			Region: aws.String(gatewayConfig.S3Region),
			Endpoint: endpointUrl,
			S3ForcePathStyle: aws.Bool(true),
		},
	}
	return
}

func NewAwsSession(logger *zap.Logger, provider config.Provider) (sess *session.Session, err error) {
	options, _, err := newAwsSessionOptions(logger, provider)
	if err != nil {
		return
	}

	sess = session.Must(session.NewSessionWithOptions(options))
	return
}

// NewAwsSessionForExternalService creates a new session for a service that will be accessed directly by the user.
// For example, S3 presigned URLs are accessed by the user on the frontend.
func NewAwsSessionForExternalService(logger *zap.Logger, provider config.Provider) (sess *session.Session, err error) {
	options, gatewayConfig, err := newAwsSessionOptions(logger, provider)
	if err != nil {
		return
	}

	if gatewayConfig.LocalHTTPSProxy != "" {
		options.Config.Endpoint = aws.String(gatewayConfig.LocalHTTPSProxy)
	}

	sess = session.Must(session.NewSessionWithOptions(options))
	return
}

func GetAwsGateways(logger *zap.Logger, provider config.Provider) (gateways Gateways) {
	sess, err := NewAwsSession(logger, provider)
	if err != nil {
		panic(err)
	}

	extSess, err := NewAwsSessionForExternalService(logger, provider)
	if err != nil {
		panic(err)
	}

	logger.Debug("loading secrets manager AWS gateway...")
	gateways.SM = NewAwsSecretsManagerGateway(logger, provider, sess)

	logger.Debug("loading dynamodb AWS gateway...")
	gateways.KV = NewDynamoKvGateway(logger, provider, sess)

	logger.Debug("loading s3 AWS gateway...")
	gateways.S3 = NewAwsS3Gateway(logger, provider, extSess)
	return
}
