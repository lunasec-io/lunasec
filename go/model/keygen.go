package model

import "github.com/dgrijalva/jwt-go"

// SaltsAndKey is the return value for GenerateSaltsAndKey
type SaltsAndKey struct {
	// Plaintext's salt
	Sp string
	// Encryption key's salt
	Sk string
	// Encryption key's encryption key
	Kt string
}

type TokenJwtClaims struct {
	TokenID string `json:"token_id"`
	jwt.StandardClaims
}

func NewTokenJwtClaims(tokenID string) TokenJwtClaims {
	return TokenJwtClaims{
		TokenID: tokenID,
	}
}
