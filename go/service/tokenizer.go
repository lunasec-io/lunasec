package service

import (
	"encoding/hex"
	"errors"

	"github.com/refinery-labs/loq/gateway"
	"github.com/refinery-labs/loq/types"
	"github.com/refinery-labs/loq/util"
)

type tokenizerService struct {
	kv gateway.DynamoKvGateway
	s3 gateway.AwsS3Gateway
}

// TokenizerService ...
type TokenizerService interface {
	TokenizerSet(secret string) (types.Token, string, map[string]string, error)
	TokenizerGet(secret string, token types.Token) (string, map[string]string, error)
	TokenizerDelete(secret string, token types.Token) error
}

// NewTokenizerService ...
func NewTokenizerService(kv gateway.DynamoKvGateway, s3 gateway.AwsS3Gateway) TokenizerService {
	return &tokenizerService{
		kv: kv,
		s3: s3,
	}
}

// SetTokenizer ...
func (s *tokenizerService) TokenizerSet(secret string) (types.Token, string, map[string]string, error) {
	token := util.GenToken()
	Kp := util.Keygen()
	snk := util.GenerateSaltsAndKey(token, secret)

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
func (s *tokenizerService) TokenizerGet(secret string, token types.Token) (string, map[string]string, error) {
	snk := util.GenerateSaltsAndKey(token, secret)
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

func (s *tokenizerService) TokenizerDelete(secret string, token types.Token) error {
	return nil
}
