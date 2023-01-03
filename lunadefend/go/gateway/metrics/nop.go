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

import "github.com/lunasec-io/lunasec/lunadefend/go/constants/metrics"

type nopMetricsGateway struct {
}

type NopMetricsGateway interface {
	Metric(name metrics.ApplicationMetric, value int)
}

// NewNopMetricsGateway
// This class disables metrics by performing an empty return whenever metrics are emitted.
func NewNopMetricsGateway() NopMetricsGateway {
	return &nopMetricsGateway{}
}

// PutMetric
// This intentionally does nothing in order to allow "disabling" metrics.
func (c *nopMetricsGateway) Metric(name metrics.ApplicationMetric, value int) {
	return
}
