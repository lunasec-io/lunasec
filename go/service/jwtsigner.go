package service

import (
	"crypto/rsa"
	"encoding/base64"
	"encoding/json"

	"github.com/dgrijalva/jwt-go"
	"github.com/pkg/errors"
	"github.com/refinery-labs/loq/gateway"
	"go.uber.org/config"
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
	Create() (token string, err error)
	CreateWithClaims(claims jwt.Claims) (token string, err error)
}

func NewJwtSignerFromPrivateKey(
	logger *zap.Logger,
	privateKey []byte,
) (signer JwtSigner, err error) {
	var (
		rsaPrivateKey *rsa.PrivateKey
	)

	rsaPrivateKey, err = jwt.ParseRSAPrivateKeyFromPEM(privateKey)
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

func NewJwtSignerFromSecretsManager(
	logger *zap.Logger,
	provider config.Provider,
	secretsManager gateway.AwsSecretsManagerGateway,
) (signer JwtSigner, err error) {
	var (
		serviceConfig JwtSignerAwsConfig
	)
	err = provider.Get("jwt_manager").Populate(&serviceConfig)
	if err != nil {
		err = errors.Wrap(err, "unable to load jwt manager config")
		return
	}

	privateKey, err := getSigningKeysFromSecret(secretsManager, serviceConfig.SigningKeysArn)
	if err != nil {
		err = errors.Wrap(err, "unable to load signing keys from secret")
		return
	}
	return NewJwtSignerFromPrivateKey(logger, privateKey)
}

func (j *jwtSigner) Create() (token string, err error) {
	t := jwt.New(jwt.GetSigningMethod("RS256"))

	t.Claims = &jwt.StandardClaims{
		// set the expire time
		// see http://tools.ietf.org/html/draft-ietf-oauth-json-web-token-20#section-4.1.4
		// TODO set this to expire
		// ExpiresAt: time.Now().Add(time.Minute * 1).Unix(),
	}

	// Creat token string
	return t.SignedString(j.privateKey)
}

func (j *jwtSigner) CreateWithClaims(claims jwt.Claims) (token string, err error) {
	t := jwt.New(jwt.GetSigningMethod("RS256"))

	t.Claims = claims

	// Creat token string
	return t.SignedString(j.privateKey)
}

type SigningKeys struct {
	EncodedPrivateKey string `json:"private_key"`
}

func getSigningKeysFromSecret(secretsManager gateway.AwsSecretsManagerGateway, signingKeyArn string) (privateKey []byte, err error) {
	var signingKeys SigningKeys

	signingKeyJson, err := secretsManager.GetSecret(signingKeyArn)
	if err != nil {
		err = errors.Wrap(err, "unable to get signing keys secret from secrets manager")
		return
	}

	err = json.Unmarshal(signingKeyJson, &signingKeys)
	if err != nil {
		err = errors.Wrap(err, "unable to unmarshal signing keys")
		return
	}

	privateKey, err = base64.StdEncoding.DecodeString(signingKeys.EncodedPrivateKey)
	if err != nil {
		err = errors.Wrap(err, "unable to decode encoded private key")
		return
	}
	return privateKey, nil
}
