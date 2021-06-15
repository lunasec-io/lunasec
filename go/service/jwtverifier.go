package service

import (
	"crypto/rsa"
	"encoding/base64"

	"github.com/dgrijalva/jwt-go"
	"github.com/pkg/errors"
	"github.com/refinery-labs/loq/model"
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
	VerifyWithClaims(token string) (claims *jwt.StandardClaims, err error)
	VerifyWithLunaSecTokenClaims(token string) (claims *model.TokenJwtClaims, err error)
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
	return NewJwtVerifierWithPublicKey(logger, publicKey)
}

func NewJwtVerifierWithPublicKey(
	logger *zap.Logger,
	publicKey []byte,
) (verifier JwtVerifier, err error) {
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

func (j *jwtVerifier) VerifyWithClaims(token string) (claims *jwt.StandardClaims, err error) {
	parsedToken, err := jwt.ParseWithClaims(token, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
		return j.publicKey, nil
	})

	if err != nil {
		err = errors.Wrap(err, "error while parsing token with claims")
		j.logger.Error(err.Error(), zap.String("token", token))
		return
	}

	if !parsedToken.Valid {
		err = errors.New("jwt token is not valid")
		j.logger.Error(err.Error(), zap.String("token", token))
		return
	}
	claims, ok := parsedToken.Claims.(*jwt.StandardClaims)
	if !ok {
		err = errors.New("unable to assert type of claims as TokenJwtClaims")
		j.logger.Error(err.Error(), zap.String("token", token))
		return
	}
	return
}

func (j *jwtVerifier) VerifyWithLunaSecTokenClaims(token string) (claims *model.TokenJwtClaims, err error) {
	parsedToken, err := jwt.ParseWithClaims(token, &model.TokenJwtClaims{}, func(t *jwt.Token) (interface{}, error) {
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
	claims, ok := parsedToken.Claims.(*model.TokenJwtClaims)
	if !ok {
		err = errors.New("unable to assert type of claims as TokenJwtClaims")
		j.logger.Error(err.Error())
		return
	}
	return
}
