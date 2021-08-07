package controller

import (
	"github.com/refinery-labs/loq/constants"
	"net/http"

	"github.com/refinery-labs/loq/service"
	"go.uber.org/config"
)

var WithNoAuth = func(
	allowedSubjects []constants.JwtSubject,
	handlerFunc http.HandlerFunc,
) http.HandlerFunc {
	return handlerFunc
}

func WithCSP(provider config.Provider) func(http.HandlerFunc) http.HandlerFunc {
	csp := service.CreateCSPMiddleware(provider)
	return csp.Middleware()
}
