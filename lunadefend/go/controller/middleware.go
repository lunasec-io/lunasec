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
package controller

import (
	"fmt"
	"github.com/lunasec-io/lunasec/lunadefend/go/constants"
	metricsgateway "github.com/lunasec-io/lunasec/lunadefend/go/gateway/metrics"
	"github.com/lunasec-io/lunasec/lunadefend/go/types"
	"net/http"
	"net/http/httputil"

	"github.com/lunasec-io/lunasec/lunadefend/go/service"
	"go.uber.org/config"
)

var WithNoAuth = func(
	allowedSubjects []constants.JwtSubject,
	handlerFunc http.HandlerFunc,
) http.HandlerFunc {
	return handlerFunc
}

func WithCSP(provider config.Provider) types.Middleware {
	csp := service.CreateCSPMiddleware(provider)
	return csp.Middleware()
}

func WithMetrics(cloudwatch metricsgateway.AwsCloudwatchGateway) types.Middleware {
	return func(next http.HandlerFunc) http.HandlerFunc {
		return func(w http.ResponseWriter, r *http.Request) {
			next.ServeHTTP(w, r)
			cloudwatch.PushMetrics()
		}
	}
}

func WithJSONContentType(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	}
}

func WithHttpLogging(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		dump, err := httputil.DumpRequest(r, true)
		if err == nil {
			fmt.Printf("%s", string(dump))
		} else {
			fmt.Printf("error while dumping request: %v", err)
		}
		next.ServeHTTP(w, r)
	}
}
