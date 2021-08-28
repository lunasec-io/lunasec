package tokenizer

import (
	"fmt"
	"github.com/refinery-labs/loq/types/handler"
	"log"
	"net/http"

	apigateway "github.com/apex/gateway"
	"github.com/refinery-labs/loq/constants"
	"github.com/refinery-labs/loq/controller"
	"github.com/refinery-labs/loq/gateway"
	"github.com/refinery-labs/loq/service"
	"github.com/refinery-labs/loq/util"
	"github.com/rs/cors"
	"go.uber.org/config"
	"go.uber.org/zap"
)

// GetRoutes ...
func GetRoutes(logger *zap.Logger, provider config.Provider, gateways gateway.Gateways, jwtVerifier service.JwtVerifier) map[string]handler.Config {
	meta := service.NewMetadataService(gateways.KV)
	grant, err := service.NewGrantService(logger, provider, gateways.KV)
	if err != nil {
		fmt.Println(err)
		panic(err)
	}
	tokenizer := service.NewTokenizerService(gateways.KV, gateways.S3)

	metadataController := controller.NewMetaController(meta, jwtVerifier, grant)
	grantController := controller.NewGrantController(grant, jwtVerifier)
	tokenizerController, err := controller.NewTokenizerController(provider, tokenizer, jwtVerifier, meta, grant)
	if err != nil {
		fmt.Println(err)
		panic(err)
	}

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

func newServer(configPath string, authType constants.AuthType) http.Handler {
	var (
		authFunc func(allowedSubjects []constants.JwtSubject, handlerFunc http.HandlerFunc) http.HandlerFunc
	)

	sm := http.NewServeMux()

	logger, err := util.GetLogger()
	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	provider := util.GetConfigProvider(configPath)

	logger.Debug("loading AWS gateways")
	gateways := gateway.GetAwsGateways(logger, provider)

	authProviderJwtVerifier, err := service.NewJwtVerifier("session_jwt_verifier", logger, provider)
	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	switch authType {
	case constants.NoAuthType:
		logger.Debug("!!! creating tokenizer with no authentication !!!")
		authFunc = controller.WithNoAuth
	case constants.JwtAuthType:
		logger.Debug("creating tokenizer with jwt authentication")
		authFunc = service.NewJwtHttpAuth(logger, authProviderJwtVerifier).WithJwtAuth
	default:
		err = fmt.Errorf("invalid auth type: %s", authType)
		logger.Error("unable to determine auth type", zap.Error(err))
		panic(err)
	}

	for url, handlerConfig := range GetRoutes(logger, provider, gateways, authProviderJwtVerifier) {
		sm.HandleFunc(url, authFunc(handlerConfig.AllowedSubjects, handlerConfig.Handler))
	}

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
	sm := newServer("config/tokenizer", constants.JwtAuthType)
	return newHttpServer(sm)
}

func NewApiGatewayServer() *apigateway.Gateway {
	sm := newServer("/config/tokenizer", constants.JwtAuthType)
	return apigateway.NewGateway(sm)
}

// NewHttpServerSidecar creates a new server with no authentication, and is meant to run as a sidecar in a container.
// NOTE: auth is assumed to have already been performed when invoking this service.
func NewHttpServerSidecar() *http.Server {
	sm := newServer("/config/tokenizer", constants.NoAuthType)
	return newHttpServer(sm)
}
