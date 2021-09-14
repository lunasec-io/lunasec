package tokenizerbackend

import (
	"github.com/refinery-labs/loq/controller"
	"github.com/refinery-labs/loq/gateway"
	"github.com/refinery-labs/loq/service"
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
	sessionController, err := controller.NewSessionController(
		logger, provider, gateways.KV, authProviderJwtVerifier,
	)
	if err != nil {
		panic(err)
	}


	routes = map[string]http.HandlerFunc{
		"/session/ensure": sessionController.SessionEnsure,
		"/session/verify": sessionController.SessionVerify,
		"/session/create": sessionController.SessionCreate,
	}
	return
}
