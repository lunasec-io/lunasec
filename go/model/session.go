package model

import "github.com/dgrijalva/jwt-go"

type SessionJwtClaims struct {
	jwt.StandardClaims
	SessionID string `json:"session_id"`
}

func NewSessionJwtClaims(sessionID string) SessionJwtClaims {
	return SessionJwtClaims{
		SessionID: sessionID,
	}
}
