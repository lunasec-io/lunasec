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
	"github.com/lunasec-io/lunasec/lunadefend/go/constants"
	"github.com/lunasec-io/lunasec/lunadefend/go/controller"
	"github.com/lunasec-io/lunasec/lunadefend/go/gateway"
	"github.com/lunasec-io/lunasec/lunadefend/go/service"
	"github.com/lunasec-io/lunasec/lunadefend/go/types"
	"github.com/lunasec-io/lunasec/lunadefend/go/types/handler"
	"github.com/lunasec-io/lunasec/lunadefend/go/util"
	"go.uber.org/config"
	"go.uber.org/zap"
	"net/http"
)

func getRoutes(
	logger *zap.Logger,
	provider config.Provider,
	gateways gateway.Gateways,
	authProviderJwtVerifier service.JwtVerifier,
) map[string]handler.Config {
	meta := service.NewMetadataService(logger, gateways.CW, gateways.KV)
	grant := service.NewGrantService(logger, provider, gateways.CW, gateways.KV)
	tokenizer := service.NewTokenizerService(logger, provider, gateways.CW, gateways.KV, gateways.S3)

	metadataController := controller.NewMetaController(meta, authProviderJwtVerifier, grant)
	grantController := controller.NewGrantController(grant, authProviderJwtVerifier)
	tokenizerController := controller.NewTokenizerController(provider, tokenizer, authProviderJwtVerifier, meta, grant)

	return map[string]handler.Config{
		"/grant/set": {
			grantController.SetGrant,
			constants.OnlyApplicationSubject,
		},
		"/grant/verify": {
			grantController.VerifyGrant,
			constants.OnlyApplicationSubject,
		},
		"/metadata/get": {
			metadataController.GetMetadata,
			constants.AnySubject,
		},
		"/metadata/set": {
			metadataController.SetMetadata,
			constants.OnlyDeveloperSubject,
		},
		"/tokenize": {
			tokenizerController.TokenizerSet,
			constants.AnySubject,
		},
		"/detokenize": {
			tokenizerController.TokenizerGet,
			constants.AnySubject,
		},
	}
}

func GetTokenizerRoutes(
	authType constants.AuthType,
	sm *http.ServeMux,
	logger *zap.Logger,
	provider config.Provider,
	gateways gateway.Gateways,
	authProviderJwtVerifier service.JwtVerifier,
) {
	var (
		authFunc func(allowedSubjects []constants.JwtSubject, handlerFunc http.HandlerFunc) http.HandlerFunc
	)

	switch authType {
	case constants.NoAuthType:
		logger.Debug("!!! creating tokenizer with no authentication !!!")
		authFunc = controller.WithNoAuth
	case constants.JwtAuthType:
		logger.Debug("creating tokenizer with jwt authentication")
		authFunc = service.NewJwtHttpAuth(logger, authProviderJwtVerifier).WithJwtAuth
	default:
		err := fmt.Errorf("invalid auth type: %s", authType)
		logger.Error("unable to determine auth type", zap.Error(err))
		panic(err)
	}

	metricsMiddlware := controller.WithMetrics(gateways.CW)

	middleware := []types.Middleware{
		controller.WithJSONContentType,
		metricsMiddlware,
	}

	tokenizerRoutes := getRoutes(logger, provider, gateways, authProviderJwtVerifier)
	for url, handlerConfig := range tokenizerRoutes {
		routeHandler := util.ApplyMiddlewareToHandler(middleware, handlerConfig.Handler)
		sm.HandleFunc(url, authFunc(handlerConfig.AllowedSubjects, routeHandler))
	}
}
