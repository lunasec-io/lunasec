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
	"github.com/lunasec-io/lunasec/lunadefend/go/types"
	"gopkg.in/square/go-jose.v2"
	"gopkg.in/square/go-jose.v2/jwt"

	"github.com/pkg/errors"
	"go.uber.org/zap"
)

type jwtSigner struct {
	logger     *zap.Logger
	privateKey *rsa.PrivateKey
}

type JwtSignerAwsConfig struct {
	SigningKeysArn string `yaml:"signing_keys_arn"`
}

type JwtSigner interface {
	CreateWithSessionClaims(claims types.SessionJwtClaims) (token string, err error)
}

func NewJwtSignerFromPrivateKey(
	logger *zap.Logger,
	privateKey []byte,
) (signer JwtSigner, err error) {
	var (
		rsaPrivateKey *rsa.PrivateKey
	)

	rsaPrivateKey, err = x509.ParsePKCS1PrivateKey(privateKey)
	if err != nil {
		err = errors.Wrap(err, "unable to parse rsa private key from pem")
		return
	}

	signer = &jwtSigner{
		logger:     logger,
		privateKey: rsaPrivateKey,
	}
	return
}

func (j *jwtSigner) CreateWithSessionClaims(claims types.SessionJwtClaims) (token string, err error) {
	key := jose.SigningKey{Algorithm: jose.RS256, Key: j.privateKey}

	var signerOpts = jose.SignerOptions{}

	signer, err := jose.NewSigner(key, signerOpts.WithType("JWT"))
	if err != nil {
		err = errors.Wrap(err, "unable to create jwt signiner")
		return
	}

	builder := jwt.Signed(signer).Claims(claims)

	return builder.CompactSerialize()
}
