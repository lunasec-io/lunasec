package tokenizerbackend

import (
	"fmt"
	"github.com/refinery-labs/loq/constants"
	"github.com/refinery-labs/loq/pkg/tokenizer"
	"github.com/refinery-labs/loq/types"
	"log"
	"net/http"

	"github.com/awslabs/aws-lambda-go-api-proxy/handlerfunc"
	"github.com/refinery-labs/loq/controller"
	"github.com/refinery-labs/loq/gateway"
	"github.com/refinery-labs/loq/service"
	"github.com/refinery-labs/loq/util"
	"github.com/rs/cors"
)

type CorsConfig struct {
	AllowedOrigins []string `yaml:"allowed_origins"`
	AllowedHeaders []string `yaml:"allowed_headers"`
}

type AppConfig struct {
	Cors        CorsConfig `yaml:"cors"`
}

func newServer() http.Handler {
	var (
		appConfig AppConfig
	)

	sm := http.NewServeMux()

	logger, err := util.GetLogger()
	if err != nil {
		log.Println(err)
		panic(err)
	}

	provider := util.GetConfigProviderFromDir("config/tokenizerbackend")

	cspMiddleware := controller.WithCSP(provider)

	err = provider.Get("app").Populate(&appConfig)
	if err != nil {
		log.Println(err)
		panic(err)
	}

	gateways := gateway.GetAwsGateways(logger, provider)

	authProviderJwtVerifier := service.NewJwtVerifier(constants.CustomerJwtVerifier, logger, provider)

	middleware := []types.Middleware{
		cspMiddleware,
	}

	secureFrameRoutes := getSecureFrameRoutes(logger, provider)

	sessionManagementRoutes := getSessionManagementRoutes(logger, provider, gateways, authProviderJwtVerifier)

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
		AllowedHeaders:   appConfig.Cors.AllowedHeaders,
		AllowedOrigins:   appConfig.Cors.AllowedOrigins,
		AllowCredentials: true,
	})
	return c.Handler(sm)
}

func NewDevServer() *http.Server {
	sm := newServer()

	addr := util.GetEnvWithFallback("SECUREFRAME_HTTP_ADDR", "0.0.0.0:37766")
	server := &http.Server{
		Addr:           addr,
		Handler:        sm,
		MaxHeaderBytes: 2 << 20, // 2 MB
	}
	fmt.Printf("HTTP server listening at %s\n", addr)
	return server
}

func NewApiGatewayServer() *handlerfunc.HandlerFuncAdapter {
	sm := newServer()
	return handlerfunc.New(sm.ServeHTTP)
}
