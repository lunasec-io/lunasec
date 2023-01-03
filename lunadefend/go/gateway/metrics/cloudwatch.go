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
package metrics

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/client"
	"github.com/aws/aws-sdk-go/service/cloudwatch"
	"github.com/lunasec-io/lunasec/lunadefend/go/constants"
	"github.com/lunasec-io/lunasec/lunadefend/go/constants/metrics"
	"github.com/lunasec-io/lunasec/lunadefend/go/gateway/configs"
	"github.com/lunasec-io/lunasec/lunadefend/go/types"
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
	stackID      string
	rwMutex      sync.RWMutex
	metricsCache map[string]int64
}

// AwsCloudwatchGateway ...
type AwsCloudwatchGateway interface {
	Metric(name metrics.ApplicationMetric, value int)
	PushMetrics()
	GetMetricSumFromPastDay(name metrics.ApplicationMetric) (sum int64, err error)
}

// NewAwsCloudwatchGateway...
func NewAwsCloudwatchGateway(logger *zap.Logger, provider config.Provider, sess client.ConfigProvider) AwsCloudwatchGateway {
	var (
		appConfig     types.AppConfig
		gatewayConfig configs.AwsGatewayConfig
	)

	err := provider.Get("aws_gateway").Populate(&gatewayConfig)
	if err != nil {
		log.Println(err)
		panic(err)
	}

	err = provider.Get("app").Populate(&appConfig)
	if err != nil {
		log.Println(err)
		panic(err)
	}

	cw := cloudwatch.New(sess)

	return &cloudwatchGateway{
		logger:       logger,
		cw:           cw,
		namespace:    gatewayConfig.CloudwatchNamespace,
		stackID:      appConfig.StackID,
		metricsCache: map[string]int64{},
	}
}

func (c *cloudwatchGateway) Metric(name metrics.ApplicationMetric, value int) {
	c.rwMutex.Lock()
	defer c.rwMutex.Unlock()

	c.metricsCache[string(name)] += int64(value)

	return
}

func (c *cloudwatchGateway) cloneMetricsCache() map[string]int64 {
	c.rwMutex.Lock()
	defer c.rwMutex.Unlock()

	metricsCache := map[string]int64{}
	for k, v := range c.metricsCache {
		metricsCache[k] = v
	}

	// clear metrics cache for next set of metrics
	c.metricsCache = map[string]int64{}

	return metricsCache
}

func (c *cloudwatchGateway) pushMetricsData(metricsData []*cloudwatch.MetricDatum) {
	input := &cloudwatch.PutMetricDataInput{
		Namespace:  aws.String(c.namespace),
		MetricData: metricsData,
	}

	c.logger.Debug("pushing metrics data to cloudwatch: ", zap.Any("input", input))

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

	if len(c.metricsCache) == 0 {
		return
	}

	c.logger.Debug(
		"pushing metric data",
		zap.Any("metrics", c.metricsCache),
	)

	// clone map to avoid blocking
	metricsCache := c.cloneMetricsCache()

	for name, value := range metricsCache {
		metric := &cloudwatch.MetricDatum{
			MetricName: aws.String(name),
			Dimensions: []*cloudwatch.Dimension{
				{
					Name:  aws.String("stackID"),
					Value: aws.String(c.stackID),
				},
				{
					Name:  aws.String("version"),
					Value: aws.String(constants.Version),
				},
			},
			Value: aws.Float64(float64(value)),
		}
		metricsData = append(metricsData, metric)

		if len(metricsData) == 20 {
			c.pushMetricsData(metricsData)
			metricsData = []*cloudwatch.MetricDatum{}
		}
	}

	// push any remaining metrics
	c.pushMetricsData(metricsData)
}

func (c *cloudwatchGateway) GetMetricSumFromPastDay(name metrics.ApplicationMetric) (sum int64, err error) {
	pastDay := -1 * time.Hour * 24
	startTime := time.Now().Add(pastDay)
	endTime := time.Now()

	// get metrics in 12 hour periods
	period := int64(60 * 60 * 12)

	stats := []string{
		"Sum",
	}

	input := cloudwatch.GetMetricStatisticsInput{
		Namespace:  aws.String(c.namespace),
		MetricName: aws.String(string(name)),
		StartTime:  &startTime,
		EndTime:    &endTime,
		Period:     aws.Int64(period),
		Statistics: aws.StringSlice(stats),
	}

	output, err := c.cw.GetMetricStatistics(&input)
	if err != nil {
		return
	}

	for _, dataPoint := range output.Datapoints {
		sum += int64(*dataPoint.Sum)
	}
	return
}
