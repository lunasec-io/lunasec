package service

import (
	"crypto/rsa"
	"crypto/x509"
	"github.com/refinery-labs/loq/types"
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
