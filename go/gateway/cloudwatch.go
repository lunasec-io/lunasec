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
//
package gateway

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/cloudwatch"
	"go.uber.org/config"
	"go.uber.org/zap"
	"log"
)

type cloudwatchGateway struct {
	logger *zap.Logger
	cw *cloudwatch.CloudWatch
	namespace string
}

// AwsCloudwatchGateway ...
type AwsCloudwatchGateway interface {
	PutMetric(name string, value int)
}

// NewAwsCloudwatchGateway...
func NewAwsCloudwatchGateway(logger *zap.Logger, provider config.Provider, sess *session.Session) AwsCloudwatchGateway {
	var (
		gatewayConfig AwsGatewayConfig
	)

	err := provider.Get("aws_gateway").Populate(&gatewayConfig)
	if err != nil {
		log.Println(err)
		panic(err)
	}

	cw := cloudwatch.New(sess)

	return &cloudwatchGateway{
		logger:                logger,
		cw:                    cw,
		namespace: gatewayConfig.CloudwatchNamespace,
	}
}

func (c *cloudwatchGateway) PutMetric(name string, value int) {
	// TODO (cthompson) we can potentially do some smart caching here to avoid having to call out to AWS for every metric call
	input := &cloudwatch.PutMetricDataInput{
		Namespace: aws.String(c.namespace),
		MetricData: []*cloudwatch.MetricDatum{
			{
				MetricName: aws.String(name),
				Value: aws.Float64(float64(value)),
			},
		},
	}
	_, err := c.cw.PutMetricData(input)
	if err != nil {
		c.logger.Error(
			"failed to push metric",
			zap.Error(err),
			zap.String("name", name),
			zap.Int("value", value),
		)
	}
	return
}