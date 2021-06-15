package controller

import (
	"net/http"

	"github.com/refinery-labs/loq/service"
	"go.uber.org/config"
)

func WithNoAuth() func(http.HandlerFunc) http.HandlerFunc {
	return func(handlerFunc http.HandlerFunc) http.HandlerFunc {
		return handlerFunc
	}
}

func WithCSP(provider config.Provider) func(http.HandlerFunc) http.HandlerFunc {
	csp := service.CreateCSPMiddleware(provider)
	return csp.Middleware()
}
