package main

import (
	"crypto/rsa"
	"encoding/base64"
	"errors"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"os"
)

func main() {
	var (
		rsaPrivateKey *rsa.PrivateKey
	)

	b64PrivateKey := os.Getenv("PRIVATE_KEY")
	if b64PrivateKey == "" {
		panic(errors.New("private key is empty"))
	}
	privateKey, err := base64.StdEncoding.DecodeString(b64PrivateKey)
	if err != nil {
		panic(err)
	}

	rsaPrivateKey, err = jwt.ParseRSAPrivateKeyFromPEM(privateKey)
	if err != nil {
		panic(err)
	}

	t := jwt.New(jwt.GetSigningMethod("RS256"))

	t.Claims = &jwt.StandardClaims{
		// set the expire time
		// see http://tools.ietf.org/html/draft-ietf-oauth-json-web-token-20#section-4.1.4
		// TODO set this to expire
		// ExpiresAt: time.Now().Add(time.Minute * 1).Unix(),
	}

	// Create token string
	token, err := t.SignedString(rsaPrivateKey)
	if err != nil {
		panic(err)
	}

	fmt.Println("id_token:", token)
}
