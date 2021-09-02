package tokenizer

import (
	"fmt"
	"log"
	"net/http"

	apigateway "github.com/apex/gateway"
	"github.com/refinery-labs/loq/constants"
	"github.com/refinery-labs/loq/gateway"
	"github.com/refinery-labs/loq/service"
	"github.com/refinery-labs/loq/util"
	"github.com/rs/cors"
)

func newServer(configPath string, authType constants.AuthType) http.Handler {
	sm := http.NewServeMux()

	logger, err := util.GetLogger()
	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	provider := util.GetConfigProvider(configPath)

	logger.Debug("loading AWS gateways")
	gateways := gateway.GetAwsGateways(logger, provider)

	authProviderJwtVerifier := service.NewJwtVerifier("customer_jwt_verifier", logger, provider)

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
