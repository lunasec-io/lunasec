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
package tokenizer

import (
	"fmt"
	"log"
	"net/http"

	apigateway "github.com/apex/gateway"
	"github.com/lunasec-io/lunasec/lunadefend/go/constants"
	"github.com/lunasec-io/lunasec/lunadefend/go/gateway"
	"github.com/lunasec-io/lunasec/lunadefend/go/service"
	"github.com/lunasec-io/lunasec/lunadefend/go/util"
	"github.com/rs/cors"
)

func newServer(configPath string, authType constants.AuthType) http.Handler {
	sm := http.NewServeMux()

	logger, err := util.GetLogger()
	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	util.ApplyHealthCheck(sm, logger)

	provider := util.GetConfigProviderFromDir(configPath)

	logger.Debug("loading AWS gateways")
	gateways := gateway.GetAwsGateways(logger, provider)

	authProviderJwtVerifier := service.NewJwtVerifier(constants.AuthJwtVerifier, logger, provider)

	GetTokenizerRoutes(authType, sm, logger, provider, gateways, authProviderJwtVerifier)

	c := cors.New(cors.Options{})
	return c.Handler(sm)
}

func newHttpServer(sm http.Handler) *http.Server {
	addr := util.GetEnvWithFallback("TOKENIZER_HTTP_ADDR", "0.0.0.0:37767")
	server := &http.Server{
		Addr:           addr,
		Handler:        sm,
		MaxHeaderBytes: 2 << 20, // 2 MB
	}
	log.Printf("HTTP server listening at %s\n", addr)
	return server
}

func NewLocalDevServer() *http.Server {
	sm := newServer(constants.TokenizerConfigPath, constants.JwtAuthType)
	return newHttpServer(sm)
}

func NewApiGatewayServer() *apigateway.Gateway {
	sm := newServer(constants.TokenizerConfigPath, constants.JwtAuthType)
	return apigateway.NewGateway(sm)
}

// NewHttpServerSidecar creates a new server with no authentication, and is meant to run as a sidecar in a container.
// NOTE: auth is assumed to have already been performed when invoking this service.
func NewHttpServerSidecar() *http.Server {
	sm := newServer(constants.TokenizerConfigPath, constants.NoAuthType)
	return newHttpServer(sm)
}
