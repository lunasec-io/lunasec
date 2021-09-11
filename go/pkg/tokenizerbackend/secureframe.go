package tokenizerbackend

import (
	"github.com/refinery-labs/loq/controller"
	"go.uber.org/config"
	"go.uber.org/zap"
	"net/http"
)

func getSecureFrameRoutes(
	logger *zap.Logger,
	provider config.Provider,
) (routes map[string]http.HandlerFunc) {
	secureFrameController, err := controller.NewSecureFrameController(logger, provider)
	if err != nil {
		panic(err)
	}

	routes = map[string]http.HandlerFunc{
		"/frame":          secureFrameController.Frame,
	}
	return
}
