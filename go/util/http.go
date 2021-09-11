package util

import (
	"github.com/refinery-labs/loq/types"
	"net/http"
	"time"
)

func ApplyMiddlewareToHandler(middleware []types.Middleware, handler http.HandlerFunc) http.HandlerFunc {
	for _, middlewareHandler := range middleware {
		handler = middlewareHandler(handler)
	}
	return handler
}

func AddRoutesToServer(sm *http.ServeMux, middleware []types.Middleware, routes map[string]http.HandlerFunc) {
	for path, handler := range routes {
		handler = ApplyMiddlewareToHandler(middleware, handler)
		sm.Handle(path, handler)
	}
}

// AddCookie will apply a new cookie to the response of a http request
// with the key/value specified.
func AddCookie(w http.ResponseWriter, name, value, path string, ttl time.Duration) {
	var (
		expire time.Time
	)
	if ttl != -1 {
		expire = time.Now().Add(ttl)
	}
	cookie := http.Cookie{
		Name:  name,
		Value: value,
		//TODO add expire, should be == the expire of the jwt
		Expires:  expire,
		Path:     path,
		SameSite: http.SameSiteNoneMode,
		Secure:   true,
	}
	http.SetCookie(w, &cookie)
}