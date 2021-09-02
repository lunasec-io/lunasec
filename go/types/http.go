package types

import "net/http"

type Middleware func(http.HandlerFunc) http.HandlerFunc

type HTTPResponse struct {
	Success bool         `json:"success"`
	Error   *string      `json:"error,omitempty"`
	Data    *interface{} `json:"data,omitempty"`
}
