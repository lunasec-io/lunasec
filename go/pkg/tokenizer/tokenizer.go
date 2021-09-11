package tokenizer

import (
	"fmt"
	"github.com/refinery-labs/loq/constants"
	"github.com/refinery-labs/loq/controller"
	"github.com/refinery-labs/loq/gateway"
	"github.com/refinery-labs/loq/service"
	"github.com/refinery-labs/loq/types/handler"
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
	meta := service.NewMetadataService(gateways.KV)
	grant := service.NewGrantService(logger, provider, gateways.KV)
	tokenizer := service.NewTokenizerService(provider, gateways.KV, gateways.S3)

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
		"/tokenize":     {
			tokenizerController.TokenizerSet,
			constants.AnySubject,
		},
		"/detokenize":   {
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

	setContentType := func(next http.HandlerFunc) http.HandlerFunc {
		return func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "application/json")
			next.ServeHTTP(w, r)
		}
	}

	tokenizerRoutes := getRoutes(logger, provider, gateways, authProviderJwtVerifier)
	for url, handlerConfig := range tokenizerRoutes {
		routeHandler := setContentType(handlerConfig.Handler)
		sm.HandleFunc(url, authFunc(handlerConfig.AllowedSubjects, routeHandler))
	}
}

