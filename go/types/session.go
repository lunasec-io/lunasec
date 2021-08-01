package types

import "gopkg.in/square/go-jose.v2/jwt"

type SessionJwtClaims struct {
	jwt.Claims
	SessionID string `json:"session_id"`
}

func NewSessionJwtClaims(sessionID string) SessionJwtClaims {
	return SessionJwtClaims{
		SessionID: sessionID,
	}
}
