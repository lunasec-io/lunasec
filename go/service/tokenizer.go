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
//
package service

import (
	"encoding/hex"
	"errors"
	"go.uber.org/config"

	"github.com/refinery-labs/loq/gateway"
	"github.com/refinery-labs/loq/types"
	"github.com/refinery-labs/loq/util"
)

type tokenizerService struct {
	config TokenizerConfig
	kv gateway.DynamoKvGateway
	s3 gateway.AwsS3Gateway
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
	config config.Provider,
	kv gateway.DynamoKvGateway,
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
		config: tokenizerConfig,
		kv: kv,
		s3: s3,
	}
}

// SetTokenizer ...
func (s *tokenizerService) TokenizerSet() (types.Token, string, map[string]string, error) {
	token := util.GenToken()
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

	url, key, err := s.s3.GeneratePresignedPutUrl(ciphertextLookupHash, Kp)

	return token, url, key, err
}

// GetTokenizer
func (s *tokenizerService) TokenizerGet(token types.Token) (string, map[string]string, error) {
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

	return s.s3.GeneratePresignedGetUrl(ciphertextLookupHash, Kp)
}

func (s *tokenizerService) TokenizerDelete(token types.Token) error {
	return nil
}
