package controller

import (
	"github.com/refinery-labs/loq/constants"
	"github.com/refinery-labs/loq/types"
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

func WithCSP(provider config.Provider) types.Middleware {
	csp := service.CreateCSPMiddleware(provider)
	return csp.Middleware()
}
