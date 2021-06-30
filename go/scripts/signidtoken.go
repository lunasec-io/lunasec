package main

import (
	"crypto/rsa"
	"encoding/base64"
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

func main() {
	var (
		rsaPrivateKey *rsa.PrivateKey
		rsaPublicKey  *rsa.PublicKey
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

	b64PublicKey := os.Getenv("PUBLIC_KEY")
	if b64PublicKey == "" {
		panic(errors.New("public key is empty"))
	}
	publicKey, err := base64.StdEncoding.DecodeString(b64PublicKey)
	if err != nil {
		panic(err)
	}

	rsaPublicKey, err = jwt.ParseRSAPublicKeyFromPEM(publicKey)
	if err != nil {
		panic(err)
	}

	t := jwt.New(jwt.GetSigningMethod("RS256"))

	t.Claims = &jwt.StandardClaims{
		// set the expire time
		// see http://tools.ietf.org/html/draft-ietf-oauth-json-web-token-20#section-4.1.4
		// TODO set this to expire
		ExpiresAt: time.Now().Add(time.Hour * 24 * 365 * 10).Unix(),
	}

	// Create token string
	token, err := t.SignedString(rsaPrivateKey)
	if err != nil {
		panic(err)
	}

	_, err = jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		return rsaPublicKey, nil
	})

	if err != nil {
		panic(err)
	}

	fmt.Println("valid id_token:", token)
}
