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
	"github.com/aws/aws-sdk-go/aws/client"
	"github.com/lunasec-io/lunasec/lunadefend/go/constants"
	"github.com/lunasec-io/lunasec/lunadefend/go/constants/metrics"
	"go.uber.org/config"
	"go.uber.org/zap"
	"log"
)

type MetricProviderConfig struct {
	Disabled                      bool                      `yaml:"disabled"`
	Provider                      constants.MetricsProvider `yaml:"provider"`
	DisableUsageStatisticsMetrics bool                      `yaml:"disable_usage_statistics"`
}

// LunaSecMetricsGateway ...
type LunaSecMetricsGateway interface {
	Metric(name metrics.ApplicationMetric, value int)
}

func NewMetricsConfig(
	provider config.Provider,
) (metricsConfig MetricProviderConfig, err error) {
	err = provider.Get("metrics").Populate(&metricsConfig)
	return
}

func SetupMetricsGateway(logger *zap.Logger, provider config.Provider, sess client.ConfigProvider) LunaSecMetricsGateway {
	metricsConfig, err := NewMetricsConfig(provider)

	if err != nil {
		log.Println("Metrics config missing but is required")
		log.Println(err)
		panic(err)
	}

	if metricsConfig.Disabled == true || metricsConfig.Provider == constants.MetricsProviderNone {
		return NewNopMetricsGateway()
	}

	if metricsConfig.Provider == constants.MetricsProviderAwsCloudwatch {
		return NewAwsCloudwatchGateway(logger, provider, sess)
	}

	log.Printf("Unsupported metrics provider specified: %s", metricsConfig.Provider)
	panic("Unsupported metrics provider specified")
}
