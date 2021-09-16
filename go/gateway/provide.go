package gateway

import (
	"crypto/tls"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"go.uber.org/config"
	"go.uber.org/zap"
	"net/http"
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

func newAwsSessionOptions(logger *zap.Logger, provider config.Provider) (options session.Options, err error) {
	var (
		gatewayConfig GatewayConfig
		creds *credentials.Credentials
		endpointUrl *string
		httpClient *http.Client
	)

	gatewayConfig, err = NewGatewayConfig(logger, provider)
	if err != nil {
		logger.Error("unable to create gateway config", zap.Error(err))
		return
	}

	if gatewayConfig.S3Region == "" {
		gatewayConfig.S3Region = "us-west-2"
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

	if gatewayConfig.LocalstackURL != "" || gatewayConfig.LocalHTTPSProxy != "" {
		if gatewayConfig.LocalHTTPSProxy != "" {
			logger.Debug(
				"using configured localstack url (https proxy) for aws session",
				zap.String("localstackURL", gatewayConfig.LocalHTTPSProxy),
			)
			endpointUrl = aws.String(gatewayConfig.LocalHTTPSProxy)
			tr := &http.Transport{
				TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
			}
			httpClient = &http.Client{Transport: tr}
		} else {
			logger.Debug(
				"using configured localstack url for aws session",
				zap.String("localstackURL", gatewayConfig.LocalstackURL),
			)
			endpointUrl = aws.String(gatewayConfig.LocalstackURL)
		}
	}

	options = session.Options{
		SharedConfigState: sharedConfigEnable,
		Config: aws.Config{
			Credentials: creds,
			Region: aws.String(gatewayConfig.S3Region),
			Endpoint: endpointUrl,
			S3ForcePathStyle: aws.Bool(true),
			HTTPClient: httpClient,
		},
	}
	return
}

func NewAwsSession(logger *zap.Logger, provider config.Provider) (sess *session.Session, err error) {
	options, err := newAwsSessionOptions(logger, provider)
	if err != nil {
		return
	}

	sess = session.Must(session.NewSessionWithOptions(options))
	return
}

func GetAwsGateways(logger *zap.Logger, provider config.Provider) (gateways Gateways) {
	sess, err := NewAwsSession(logger, provider)
	if err != nil {
		panic(err)
	}

	logger.Debug("loading secrets manager AWS gateway...")
	gateways.SM = NewAwsSecretsManagerGateway(logger, provider, sess)

	logger.Debug("loading dynamodb AWS gateway...")
	gateways.KV = NewDynamoKvGateway(logger, provider, sess)

	logger.Debug("loading s3 AWS gateway...")
	gateways.S3 = NewAwsS3Gateway(logger, provider, sess)
	return
}
