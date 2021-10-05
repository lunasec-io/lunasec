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
	"sync"
	"time"
)

type cloudwatchGateway struct {
	logger       *zap.Logger
	cw           *cloudwatch.CloudWatch
	namespace    string
	rwMutex      sync.RWMutex
	metricsCache map[string]int64
}

// AwsCloudwatchGateway ...
type AwsCloudwatchGateway interface {
	Metric(name string, value int)
	PushMetrics()
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
		logger:    logger,
		cw:        cw,
		namespace: gatewayConfig.CloudwatchNamespace,
	}
}

func (c *cloudwatchGateway) Metric(name string, value int) {
	c.rwMutex.Lock()
	defer c.rwMutex.Unlock()

	c.metricsCache[name] += int64(value)

	return
}

func (c *cloudwatchGateway) cloneMetricsCache() map[string]int64 {
	c.rwMutex.Lock()
	defer c.rwMutex.Unlock()

	metricsCache := map[string]int64{}
	for k, v := range c.metricsCache {
		metricsCache[k] = v
	}
	return metricsCache
}

func (c *cloudwatchGateway) pushMetricsData(metricsData []*cloudwatch.MetricDatum) {
	input := &cloudwatch.PutMetricDataInput{
		Namespace:  aws.String(c.namespace),
		MetricData: metricsData,
	}

	_, err := c.cw.PutMetricData(input)

	if err != nil {
		c.logger.Error(
			"failed to push metrics",
			zap.Error(err),
		)
	}
}

func (c *cloudwatchGateway) PushMetrics() {
	var (
		metricsData []*cloudwatch.MetricDatum
	)

	// clone map to avoid blocking
	metricsCache := c.cloneMetricsCache()

	for name, value := range metricsCache {
		metric := &cloudwatch.MetricDatum{
			MetricName: aws.String(name),
			Value:      aws.Float64(float64(value)),
		}
		metricsData = append(metricsData, metric)

		if len(metricsData) == 20 {
			c.pushMetricsData(metricsData)
			metricsData = []*cloudwatch.MetricDatum{}
		}
	}
}

func (c *cloudwatchGateway) GetMetrics() {
	lastDay := -1 * time.Hour * 24
	start := time.Now().Add(lastDay)
	end := time.Now()
	input := cloudwatch.ListMetricsInput{
	}

	pageNum := 0
	maxPages := 10
	c.cw.ListMetricsPages(
		&input,
		func(page *cloudwatch.GetMetricDataOutput, lastPage bool) bool {
			pageNum++
			page.MetricDataResults[0].
			return pageNum <= maxPages
		},
	)
}
