package service

import (
	"crypto/rsa"
	"encoding/base64"

	"github.com/dgrijalva/jwt-go"
	"github.com/pkg/errors"
	"github.com/refinery-labs/loq/types"
	"go.uber.org/config"
	"go.uber.org/zap"
)

type jwtVerifier struct {
	logger    *zap.Logger
	publicKey *rsa.PublicKey
}

type JwtVerifierConfig struct {
	PublicKey string `yaml:"public_key"`
}

type JwtVerifier interface {
	Verify(token string) (err error)
	VerifyWithSessionClaims(token string) (claims *types.SessionJwtClaims, err error)
}

func NewJwtVerifier(
	configKey string,
	logger *zap.Logger,
	provider config.Provider,
) (verifier JwtVerifier, err error) {
	var (
		serviceConfig JwtVerifierConfig
	)

	err = provider.Get(configKey).Populate(&serviceConfig)
	if err != nil {
		return
	}

	publicKey, err := base64.StdEncoding.DecodeString(serviceConfig.PublicKey)
	if err != nil {
		err = errors.Wrap(err, "unable to decode auth provider public key")
		return
	}
	rsaPublicKey, err := jwt.ParseRSAPublicKeyFromPEM(publicKey)
	if err != nil {
		err = errors.Wrap(err, "unable to parse public key from pem")
		return
	}
	verifier = &jwtVerifier{
		logger:    logger,
		publicKey: rsaPublicKey,
	}
	return
}

func (j *jwtVerifier) Verify(token string) (err error) {
	var (
		parsedToken *jwt.Token
	)

	parsedToken, err = jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		return j.publicKey, nil
	})

	if err != nil {
		return
	}

	if !parsedToken.Valid {
		err = errors.New("jwt token is not valid")
		return
	}
	return
}

func (j *jwtVerifier) VerifyWithSessionClaims(token string) (claims *types.SessionJwtClaims, err error) {
	parsedToken, err := jwt.ParseWithClaims(token, &types.SessionJwtClaims{}, func(t *jwt.Token) (interface{}, error) {
		return j.publicKey, nil
	})

	if err != nil {
		err = errors.Wrap(err, "error while parsing token with claims")
		j.logger.Error(err.Error())
		return
	}

	if !parsedToken.Valid {
		err = errors.New("jwt token is not valid")
		j.logger.Error(err.Error())
		return
	}
	claims, ok := parsedToken.Claims.(*types.SessionJwtClaims)
	if !ok {
		err = errors.New("unable to assert type of claims as SessionJwtClaims")
		j.logger.Error(err.Error())
		return
	}
	return
}
