package secureframe

import (
	"fmt"
	"log"
	"net/http"

	"github.com/awslabs/aws-lambda-go-api-proxy/handlerfunc"
	"github.com/refinery-labs/loq/controller"
	"github.com/refinery-labs/loq/gateway"
	"github.com/refinery-labs/loq/pkg/tokenizer"
	"github.com/refinery-labs/loq/service"
	"github.com/refinery-labs/loq/util"
	"github.com/rs/cors"
	"go.uber.org/config"
	"go.uber.org/zap"
)

type CorsConfig struct {
	AllowedOrigins []string `yaml:"allowed_origins"`
	AllowedHeaders []string `yaml:"allowed_headers"`
}

type AppConfig struct {
	DisableAuth bool       `yaml:"disable_auth"`
	Cors        CorsConfig `yaml:"cors"`
}

func GetSecureFrameRoutesWithSessionManagement(
	logger *zap.Logger,
	provider config.Provider,
	gateways gateway.Gateways,
	authProviderJwtVerifier service.JwtVerifier,
) (secureFrameRoutes map[string]http.HandlerFunc) {
	sessionController, err := controller.NewSessionController(
		logger, provider, gateways.KV, authProviderJwtVerifier,
	)
	if err != nil {
		panic(err)
	}

	secureFrameController, err := controller.NewSecureFrameController(logger, provider)
	if err != nil {
		panic(err)
	}

	secureFrameRoutes = map[string]http.HandlerFunc{
		"/session/ensure": sessionController.SessionEnsure,
		"/session/verify": sessionController.SessionVerify,
		"/session/create": sessionController.SessionCreate,
		"/frame":          secureFrameController.Frame,
	}
	return
}

func applyTokenizerRoutesWithAuth(
	sm *http.ServeMux,
	logger *zap.Logger,
	provider config.Provider,
	gateways gateway.Gateways,
	authProviderJwtVerifier service.JwtVerifier,
) {
	authFunc := service.NewJwtHttpAuth(logger, authProviderJwtVerifier).WithJwtAuth

	setContentType := func(next http.HandlerFunc) http.HandlerFunc {
		return func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "application/json")
			next.ServeHTTP(w, r)
		}
	}

	tokenizerRoutes := tokenizer.GetRoutes(logger, provider, gateways)
	for url, handlerConfig := range tokenizerRoutes {
		handler := setContentType(handlerConfig.Handler)
		sm.HandleFunc(url, authFunc(handlerConfig.AllowedSubjects, handler))
	}
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

	provider := util.GetConfigProvider("config/secureframe")

	cspMiddleware := controller.WithCSP(provider)

	err = provider.Get("app").Populate(&appConfig)
	if err != nil {
		log.Println(err)
		panic(err)
	}

	gateways := gateway.GetAwsGateways(logger, provider)

	authProviderJwtVerifier, err := service.NewJwtVerifier("customer_jwt_verifier", logger, provider)
	if err != nil {
		log.Println(err)
		panic(err)
	}

	secureFrameRoutes := GetSecureFrameRoutesWithSessionManagement(logger, provider, gateways, authProviderJwtVerifier)

	for url, fn := range secureFrameRoutes {
		sm.HandleFunc(url, cspMiddleware(fn))
	}

	applyTokenizerRoutesWithAuth(sm, logger, provider, gateways, authProviderJwtVerifier)

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
