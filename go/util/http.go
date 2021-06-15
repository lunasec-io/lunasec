package util

import (
	"net/http"
	"time"
)

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
		Expires: expire,
		Path:    path,
	}
	http.SetCookie(w, &cookie)
}

func MergeRoutes(routeMaps ...map[string]http.HandlerFunc) map[string]http.HandlerFunc {
	newRoutes := map[string]http.HandlerFunc{}
	for _, routes := range routeMaps {
		for path, handler := range routes {
			newRoutes[path] = handler
		}
	}
	return newRoutes
}
