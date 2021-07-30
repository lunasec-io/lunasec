package handler

import (
	"github.com/refinery-labs/loq/constants"
	"net/http"
)

type Config struct {
	Handler http.HandlerFunc
	AllowedSubjects []constants.JwtSubject
}
