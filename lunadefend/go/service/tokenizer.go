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
	"encoding/hex"
	"errors"
	"github.com/lunasec-io/lunasec/lunadefend/go/constants/metrics"
	metricservice "github.com/lunasec-io/lunasec/lunadefend/go/gateway/metrics"
	"go.uber.org/config"
	"go.uber.org/zap"

	"github.com/lunasec-io/lunasec/lunadefend/go/gateway"
	"github.com/lunasec-io/lunasec/lunadefend/go/types"
	"github.com/lunasec-io/lunasec/lunadefend/go/util"
)

type tokenizerService struct {
	logger *zap.Logger
	config TokenizerConfig
	cw     metricservice.AwsCloudwatchGateway
	kv     gateway.AwsDynamoGateway
	s3     gateway.AwsS3Gateway
	secret string
}

type TokenizerConfig struct {
	SecretArn string `yaml:"secret_arn"`
}

// TokenizerService ...
type TokenizerService interface {
	TokenizerSet() (types.Token, string, map[string]string, error)
	TokenizerGet(token types.Token) (string, map[string]string, error)
	TokenizerDelete(token types.Token) error
}

// NewTokenizerService ...
func NewTokenizerService(
	logger *zap.Logger,
	config config.Provider,
	cw metricservice.AwsCloudwatchGateway,
	kv gateway.AwsDynamoGateway,
	s3 gateway.AwsS3Gateway,
) TokenizerService {
	var (
		tokenizerConfig TokenizerConfig
	)

	err := config.Get("tokenizer").Populate(&tokenizerConfig)
	if err != nil {
		panic(err)
	}

	return &tokenizerService{
		logger: logger,
		config: tokenizerConfig,
		cw:     cw,
		kv:     kv,
		s3:     s3,
	}
}

// SetTokenizer ...
func (s *tokenizerService) TokenizerSet() (token types.Token, url string, key map[string]string, err error) {
	defer func() {
		if err != nil {
			s.cw.Metric(metrics.TokenizeFailureMetric, 1)
		}
	}()

	token = util.GenToken()
	Kp := util.Keygen()
	snk := util.GenerateSaltsAndKey(token, s.secret)

	// E(Kt, Kp)
	encryptedEncryptionKeyBytes, err := util.Encrypt(snk.Kt, Kp)

	if err != nil {
		return "", "", nil, err
	}

	// H(T + Sk)
	ciphertextLookupHash := util.GetCompositeHash(token, snk.Sp)
	encryptionKeyLookupHash := util.GetCompositeHash(token, snk.Sk)
	encryptedEncryptionKey := hex.EncodeToString(encryptedEncryptionKeyBytes)

	if err := s.kv.Set(gateway.KeyStore, encryptionKeyLookupHash, encryptedEncryptionKey); err != nil {
		return "", "", nil, err
	}

	url, key, err = s.s3.GeneratePresignedPutUrl(ciphertextLookupHash, Kp)
	if err != nil {
		return token, url, key, err
	}
	s.cw.Metric(metrics.TokenizeSuccessMetric, 1)
	return token, url, key, err
}

// GetTokenizer
func (s *tokenizerService) TokenizerGet(token types.Token) (url string, key map[string]string, err error) {
	defer func() {
		if err != nil {
			s.cw.Metric(metrics.DetokenizeFailureMetric, 1)
		}
	}()

	snk := util.GenerateSaltsAndKey(token, s.secret)
	encryptionKeyLookupHash := util.GetCompositeHash(token, snk.Sk)
	encryptedEncryptionKey, err := s.kv.Get(gateway.KeyStore, encryptionKeyLookupHash)

	if err != nil {
		return "", nil, err
	}

	if len(encryptedEncryptionKey) == 0 {
		return "", nil, errors.New("unable to locate data for token")
	}

	encryptedEncryptionKeyBytes, err := hex.DecodeString(encryptedEncryptionKey)

	if err != nil {
		return "", nil, err
	}

	Kp, err := util.Decrypt(snk.Kt, encryptedEncryptionKeyBytes)

	if err != nil {
		return "", nil, err
	}

	ciphertextLookupHash := util.GetCompositeHash(token, snk.Sp)

	url, key, err = s.s3.GeneratePresignedPutUrl(ciphertextLookupHash, Kp)
	if err != nil {
		return url, key, err
	}
	s.cw.Metric(metrics.DetokenizeSuccessMetric, 1)
	return url, key, err
}

func (s *tokenizerService) TokenizerDelete(token types.Token) error {
	return nil
}
