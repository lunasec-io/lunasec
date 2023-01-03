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
package analyticscollector

import (
	"bytes"
	"encoding/json"
	"github.com/lunasec-io/lunasec/lunadefend/go/constants"
	"github.com/lunasec-io/lunasec/lunadefend/go/types"
	"go.uber.org/zap"
	"log"
	"net/http"
)

func Handler() {
	var (
		analyticsCollectorConfig types.AnalyticsCollectorConfig
		appConfig                types.AppConfig
	)

	logger, provider, cloudwatch := analyticsCollectorDependencies()

	if err := provider.Get("analyticscollector").Populate(&analyticsCollectorConfig); err != nil {
		logger.Error("unable to load config", zap.Error(err))
		return
	}

	err := provider.Get("app").Populate(&appConfig)
	if err != nil {
		log.Println(err)
		panic(err)
	}

	// collect all configured metrics from Cloudwatch
	collectedMetrics := types.CollectedMetrics{}
	for _, metric := range analyticsCollectorConfig.Metrics {
		sum, err := cloudwatch.GetMetricSumFromPastDay(metric)
		if err != nil {
			logger.Error(
				"unable to get sum for metric",
				zap.String("metric", string(metric)),
				zap.Error(err),
			)
			continue
		}
		collectedMetrics[metric] = sum
	}

	logger.Info(
		"collected metrics",
		zap.Any("metrics", collectedMetrics),
	)

	reportedMetrics := types.ReportedMetrics{
		Version:          constants.Version,
		StackID:          appConfig.StackID,
		CollectedMetrics: collectedMetrics,
	}

	logger.Info(
		"sending collected metrics to analytics server",
		zap.String("analytics server", analyticsCollectorConfig.AnalyticsServer),
		zap.Any("reported metrics", reportedMetrics),
	)

	body, err := json.Marshal(reportedMetrics)
	if err != nil {
		logger.Error(
			"unable to marshal metrics",
			zap.Error(err),
			zap.Any("metrics", collectedMetrics),
		)
		return
	}

	req, err := http.NewRequest(http.MethodPost, analyticsCollectorConfig.AnalyticsServer, bytes.NewBuffer(body))
	if err != nil {
		logger.Error(
			"failure sending metrics to reporting url",
			zap.Error(err),
			zap.String("reporting url", analyticsCollectorConfig.AnalyticsServer),
			zap.Any("metrics", collectedMetrics),
		)
		return
	}

	client := http.Client{}

	// we aren't checking the status since we can see any issues within the context of the
	// analytics collector server
	_, err = client.Do(req)
	if err != nil {
		logger.Error(
			"failure sending metrics to reporting url",
			zap.Error(err),
			zap.String("reporting url", analyticsCollectorConfig.AnalyticsServer),
			zap.Any("metrics", collectedMetrics),
		)
		return
	}
}
