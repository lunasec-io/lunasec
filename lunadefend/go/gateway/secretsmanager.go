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
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/secretsmanager"
	"github.com/lunasec-io/lunasec/lunadefend/go/gateway/configs"
	"go.uber.org/config"
	"go.uber.org/zap"
)

type awsSecretsManagerGateway struct {
	logger *zap.Logger
	awsSecretsManagerGatewayConfig
	session *session.Session
}

type awsSecretsManagerGatewayConfig struct {
	configs.AwsGatewayConfig
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
