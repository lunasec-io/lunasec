package service

import (
	"crypto/rsa"
	"crypto/x509"
	"encoding/base64"
	"fmt"
	"github.com/pkg/errors"
	"github.com/refinery-labs/loq/types"
	"go.uber.org/config"
	"go.uber.org/zap"
	"gopkg.in/square/go-jose.v2/jwt"
)

type jwtVerifier struct {
	logger    *zap.Logger
	publicKey *rsa.PublicKey
}

type JwtVerifierConfig struct {
	PublicKey string `yaml:"public_key"`
	JwksURL string `yaml:"jwks_url"`
	JwksKID string `yaml:"jwks_kid"`
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
		publicKey []byte
		serviceConfig JwtVerifierConfig
		rsaPublicKey *rsa.PublicKey
		jwksManager *JwksManager
		jwkKey interface{}
	)

	err = provider.Get(configKey).Populate(&serviceConfig)
	if err != nil {
		return
	}

	if serviceConfig.PublicKey != "" {
		publicKey, err = base64.StdEncoding.DecodeString(serviceConfig.PublicKey)
		if err != nil {
			err = errors.Wrap(err, "unable to decode auth provider public key")
			return
		}

		rsaPublicKey, err = x509.ParsePKCS1PublicKey(publicKey)
		if err != nil {
			err = errors.Wrap(err, "unable to parse public key from pem")
			return
		}
		logger.Debug("loaded public key from config file")
	} else if serviceConfig.JwksURL != "" {
		jwksManager, err = NewJwksManager(serviceConfig.JwksURL, true)
		if err != nil {
			return
		}

		jwkKey, err = jwksManager.GetKey("lunasec-signing-key")
		if err != nil {
			return
		}

		rsaPublicKey = jwkKey.(*rsa.PublicKey)
		logger.Debug(
			"loaded public key from jwks endpoint",
			zap.String("jwksURL", serviceConfig.JwksURL),
			zap.String("kid", serviceConfig.JwksKID),
		)

		fmt.Println(base64.StdEncoding.EncodeToString(x509.MarshalPKCS1PublicKey(rsaPublicKey)))
	} else {
		err = errors.New("neither public_key or jwks_url were provided in jwt verifier config")
	}

	verifier = &jwtVerifier{
		logger:    logger,
		publicKey: rsaPublicKey,
	}
	return
}

func (j *jwtVerifier) Verify(token string) (err error) {
	var (
		claims jwt.Claims
	)
	parsedToken, err := jwt.ParseSigned(token)
	if err != nil {
		return
	}

	err = parsedToken.Claims(j.publicKey, &claims)
	if err != nil {
		err = errors.Wrap(err, "jwt token is not valid")
		return
	}
	return
}

func (j *jwtVerifier) VerifyWithSessionClaims(token string) (claims *types.SessionJwtClaims, err error) {
	parsedToken, err := jwt.ParseSigned(token)
	if err != nil {
		err = errors.Wrap(err, "error while parsing token")
		j.logger.Error("unable to parse token", zap.Error(err))
		return
	}

	err = parsedToken.Claims(j.publicKey, &claims)
	if err != nil {
		err = errors.New("jwt token claims are not valid")
		j.logger.Error(err.Error())
		return
	}
	return
}
