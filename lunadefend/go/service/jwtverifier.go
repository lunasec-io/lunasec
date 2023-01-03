// Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
package service

import (
	"crypto/rsa"
	"crypto/x509"
	"encoding/base64"
	"fmt"
	"github.com/lunasec-io/lunasec/lunadefend/go/constants"
	"github.com/lunasec-io/lunasec/lunadefend/go/types"
	"github.com/pkg/errors"
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
	JwksURL   string `yaml:"jwks_url"`
	JwksKID   string `yaml:"jwks_kid"`
}

type JwtVerifier interface {
	Verify(token string) (err error)
	VerifyWithSessionClaims(token string) (claims types.SessionJwtClaims, err error)
}

func NewJwtVerifier(
	configKey constants.JwtVerifierType,
	logger *zap.Logger,
	provider config.Provider,
) (verifier JwtVerifier) {
	var (
		publicKey     []byte
		serviceConfig JwtVerifierConfig
		rsaPublicKey  *rsa.PublicKey
		jwksManager   *JwksManager
		jwkKey        interface{}
	)

	err := provider.Get(string(configKey)).Populate(&serviceConfig)
	if err != nil {
		panic(err)
	}

	if serviceConfig.PublicKey != "" {
		publicKey, err = base64.StdEncoding.DecodeString(serviceConfig.PublicKey)
		if err != nil {
			panic(errors.Wrap(err, "unable to decode auth provider public key"))
		}

		rsaPublicKey, err = x509.ParsePKCS1PublicKey(publicKey)
		if err != nil {
			panic(errors.Wrap(err, "unable to parse public key from pem"))
		}
		logger.Debug("loaded public key from config file")
	} else if serviceConfig.JwksURL != "" {
		jwksManager, err = NewJwksManager(logger, serviceConfig.JwksURL, true)
		if err != nil {
			logger.Error(
				"Error fetching JSON Web Key(JWKS) from application backend. Is your application backend running? Env var is ",
				zap.String("SESSION_JWKS_URL", serviceConfig.JwksURL),
				zap.Error(err),
			)
			panic(err)
		}

		jwkKey, err = jwksManager.GetKey("lunasec-signing-key")
		if err != nil {
			panic(err)
		}

		rsaPublicKey = jwkKey.(*rsa.PublicKey)
		logger.Debug(
			"loaded public key from jwks endpoint",
			zap.String("jwksURL", serviceConfig.JwksURL),
			zap.String("kid", serviceConfig.JwksKID),
		)

		fmt.Println(base64.StdEncoding.EncodeToString(x509.MarshalPKCS1PublicKey(rsaPublicKey)))
	} else {
		panic(errors.New("neither public_key or jwks_url were provided in jwt verifier config"))
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
		err = errors.Wrap(err, "error while parsing token")
		j.logger.Error("unable to parse token", zap.Error(err))
		return
	}

	err = parsedToken.Claims(j.publicKey, &claims)
	if err != nil {
		err = errors.Wrap(err, "unable to verify signature and get claims")
		j.logger.Error("unable to verify signature and get claims", zap.Error(err))
		return
	}
	return
}

func (j *jwtVerifier) VerifyWithSessionClaims(token string) (claims types.SessionJwtClaims, err error) {
	parsedToken, err := jwt.ParseSigned(token)
	if err != nil {
		err = errors.Wrap(err, "error while parsing token")
		j.logger.Error("unable to parse token", zap.Error(err))
		return
	}

	err = parsedToken.Claims(j.publicKey, &claims)
	if err != nil {
		err = errors.Wrap(err, "unable to verify signature and get claims")
		j.logger.Error("unable to verify signature and get claims", zap.Error(err))
		return
	}
	return
}
