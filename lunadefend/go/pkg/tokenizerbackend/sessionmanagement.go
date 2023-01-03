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
	"github.com/lunasec-io/lunasec/lunadefend/go/controller"
	"github.com/lunasec-io/lunasec/lunadefend/go/gateway"
	"github.com/lunasec-io/lunasec/lunadefend/go/service"
	"go.uber.org/config"
	"go.uber.org/zap"
	"net/http"
)

func getSessionManagementRoutes(
	logger *zap.Logger,
	provider config.Provider,
	gateways gateway.Gateways,
	authProviderJwtVerifier service.JwtVerifier,
) (routes map[string]http.HandlerFunc) {
	sessionController := controller.NewSessionController(
		logger, provider, gateways.KV, authProviderJwtVerifier,
	)

	routes = map[string]http.HandlerFunc{
		"/session/ensure": sessionController.SessionEnsure,
		"/session/verify": sessionController.SessionVerify,
		"/session/create": sessionController.SessionCreate,
	}
	return
}
