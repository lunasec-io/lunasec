// Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
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
package tallyfx

import (
	"context"
	"time"

	"github.com/uber-go/tally/v4"
	"github.com/uber-go/tally/v4/prometheus"
	"go.uber.org/config"
	"go.uber.org/fx"
)

const metricsConfigKey = "metrics"

type MetricsConfig struct {
	ServiceName string `yaml:"service_name"`
}

func NewMetrics(c config.Provider, lc fx.Lifecycle) (tally.Scope, error) {
	var cfg MetricsConfig
	err := c.Get(metricsConfigKey).Populate(&cfg)
	if err != nil {
		return nil, err
	}

	reporter := prometheus.NewReporter(prometheus.Options{})

	scope, closer := tally.NewRootScope(tally.ScopeOptions{
		Tags: map[string]string{
			"service": "asdf",
		},
		Reporter: reporter,
	}, time.Second)

	lc.Append(fx.Hook{OnStop: func(_ context.Context) error {
		return closer.Close()
	}})

	return scope, nil
}
