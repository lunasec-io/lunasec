// Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
package gateway

import (
	"crypto/tls"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/lunasec-io/lunasec/lunadefend/go/gateway/configs"
	"github.com/lunasec-io/lunasec/lunadefend/go/gateway/metrics"
	"github.com/lunasec-io/lunasec/lunadefend/go/util"
	"go.uber.org/config"
	"go.uber.org/zap"
	"net/http"
)

type Gateways struct {
	KV AwsDynamoGateway
	SM AwsSecretsManagerGateway
	S3 AwsS3Gateway
	CW metrics.AwsCloudwatchGateway
}

func NewGatewayConfig(logger *zap.Logger, provider config.Provider) (gatewayConfig configs.AwsGatewayConfig, err error) {
	err = provider.Get("aws_gateway").Populate(&gatewayConfig)
	if err != nil {
		logger.Error("unable to load aws gateway config", zap.Error(err))
		return
	}
	return
}

func newAwsSessionOptions(logger *zap.Logger, provider config.Provider) (options session.Options, err error) {
	var (
		gatewayConfig    configs.AwsGatewayConfig
		creds            *credentials.Credentials
		endpointUrl      *string
		httpClient       *http.Client
		s3ForcePathStyle bool
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
	if !util.IsRunningInLambda() && gatewayConfig.AccessKeyID != "" && gatewayConfig.SecretAccessKey != "" {
		logger.Debug(
			"using configured credentials for aws session",
			zap.String("accessKeyID", gatewayConfig.AccessKeyID),
			zap.String("secretAccessKey", gatewayConfig.SecretAccessKey),
		)
		creds = credentials.NewStaticCredentials(gatewayConfig.AccessKeyID, gatewayConfig.SecretAccessKey, "")
		sharedConfigEnable = session.SharedConfigDisable
	}

	if gatewayConfig.LocalstackURL != "" || gatewayConfig.LocalHTTPSProxy != "" {
		s3ForcePathStyle = true
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
			Credentials:      creds,
			Region:           aws.String(gatewayConfig.S3Region),
			Endpoint:         endpointUrl,
			S3ForcePathStyle: aws.Bool(s3ForcePathStyle),
			HTTPClient:       httpClient,
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
	gateways.KV = NewDynamoGateway(logger, provider, sess)

	logger.Debug("loading s3 AWS gateway...")
	gateways.S3 = NewAwsS3Gateway(logger, provider, sess)

	logger.Debug("loading cloudwatch AWS gateway...")
	gateways.CW = metrics.NewAwsCloudwatchGateway(logger, provider, sess)
	return
}
