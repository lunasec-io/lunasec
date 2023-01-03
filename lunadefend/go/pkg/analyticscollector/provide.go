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
	"github.com/lunasec-io/lunasec/lunadefend/go/gateway"
	"github.com/lunasec-io/lunasec/lunadefend/go/gateway/metrics"
	"github.com/lunasec-io/lunasec/lunadefend/go/util"
	"go.uber.org/config"
	"go.uber.org/zap"
	"log"
)

func analyticsCollectorDependencies() (*zap.Logger, config.Provider, metrics.AwsCloudwatchGateway) {
	logger, err := util.GetLogger()
	if err != nil {
		log.Println(err)
		panic(err)
	}

	provider := util.GetConfigProviderFromDir("config/analyticscollector")

	sess, err := gateway.NewAwsSession(logger, provider)
	if err != nil {
		panic(err)
	}

	cloudwatch := metrics.NewAwsCloudwatchGateway(logger, provider, sess)

	return logger, provider, cloudwatch
}
