package event

import "net/http"

type SessionCreateRequest struct {
	StateCookie *http.Cookie
	StateToken  string
	AuthToken   string
}
