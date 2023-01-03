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
package tokenizerbackend

import (
	"fmt"
	"github.com/lunasec-io/lunasec/lunadefend/go/constants"
	"github.com/lunasec-io/lunasec/lunadefend/go/pkg/tokenizer"
	"github.com/lunasec-io/lunasec/lunadefend/go/types"
	"go.uber.org/config"
	"go.uber.org/zap"
	"log"
	"net/http"

	"github.com/awslabs/aws-lambda-go-api-proxy/handlerfunc"
	"github.com/lunasec-io/lunasec/lunadefend/go/controller"
	"github.com/lunasec-io/lunasec/lunadefend/go/gateway"
	"github.com/lunasec-io/lunasec/lunadefend/go/service"
	"github.com/lunasec-io/lunasec/lunadefend/go/util"
	"github.com/rs/cors"
)

func newServer(logger *zap.Logger, provider config.Provider, gateways gateway.Gateways) http.Handler {
	var (
		appConfig types.AppConfig
	)

	sm := http.NewServeMux()

	cspMiddleware := controller.WithCSP(provider)

	middleware := []types.Middleware{
		controller.WithJSONContentType,
		cspMiddleware,
	}

	if util.IsDevEnv() {
		middleware = append(middleware, controller.WithHttpLogging)
	}

	err := provider.Get("app").Populate(&appConfig)
	if err != nil {
		log.Println(err)
		panic(err)
	}

	authProviderJwtVerifier := service.NewJwtVerifier(constants.AuthJwtVerifier, logger, provider)

	secureFrameRoutes := getSecureFrameRoutes(logger, provider)

	sessionManagementRoutes := getSessionManagementRoutes(logger, provider, gateways, authProviderJwtVerifier)

	sm.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		util.RespondSuccess(w)
	})

	util.AddRoutesToServer(sm, middleware, secureFrameRoutes)
	util.AddRoutesToServer(sm, middleware, sessionManagementRoutes)

	tokenizer.GetTokenizerRoutes(
		constants.JwtAuthType,
		sm,
		logger,
		provider,
		gateways,
		authProviderJwtVerifier,
	)

	c := cors.New(cors.Options{
		AllowedHeaders: appConfig.Cors.AllowedHeaders,
		AllowOriginRequestFunc: func(r *http.Request, origin string) bool {
			tokenizerURL := util.GetAPIGatewayTokenizerURL(r)

			allowedOrigins := appConfig.Cors.AllowedOrigins
			if tokenizerURL != "" {
				allowedOrigins = append(allowedOrigins, tokenizerURL)
			}

			logger.Debug("CORS allowed origins", zap.Strings("allowedOrigins", allowedOrigins))

			for _, allowedOrigin := range allowedOrigins {
				if origin == allowedOrigin {
					return true
				}
			}
			return false
		},
		AllowCredentials: true,
	})
	return c.Handler(sm)
}

func NewDevServer(logger *zap.Logger, provider config.Provider, gateways gateway.Gateways) *http.Server {
	sm := newServer(logger, provider, gateways)

	addr := util.GetEnvWithFallback("SECUREFRAME_HTTP_ADDR", "0.0.0.0:37766")
	server := &http.Server{
		Addr:           addr,
		Handler:        sm,
		MaxHeaderBytes: 2 << 20, // 2 MB
	}
	fmt.Printf("HTTP server listening at %s\n", addr)
	return server
}

func NewApiGatewayServer(logger *zap.Logger, provider config.Provider, gateways gateway.Gateways) *handlerfunc.HandlerFuncAdapter {
	sm := newServer(logger, provider, gateways)
	return handlerfunc.New(sm.ServeHTTP)
}
