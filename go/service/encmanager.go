package service

import (
	"bytes"
	"encoding/base64"

	"github.com/google/tink/go/hybrid"
	"github.com/google/tink/go/insecurecleartextkeyset"
	"github.com/google/tink/go/keyset"
	"github.com/google/tink/go/tink"
	"github.com/pkg/errors"
	"github.com/refinery-labs/loq/gateway"
	"go.uber.org/config"
	"go.uber.org/zap"
)

const hybridContextInfo = "secureFrame"

type hybridEncryptionManager struct {
	logger        *zap.Logger
	hybridEncrypt tink.HybridEncrypt
	hybridDecrypt tink.HybridDecrypt
}

type hybridEncryptionManagerConfig struct {
	TokenizerBackendKeysetArn string `yaml:"secure_frame_keyset_arn"`
}

type EncryptionManager interface {
	DecryptString(ciphertext string) (plaintext string, err error)
}

func NewHybridEncryptionManager(
	logger *zap.Logger,
	provider config.Provider,
	secretsManager gateway.AwsSecretsManagerGateway,
) (manager EncryptionManager, err error) {
	var (
		serviceConfig hybridEncryptionManagerConfig
	)

	err = provider.Get("hybrid_encryption_manager").Populate(&serviceConfig)
	if err != nil {
		err = errors.Wrap(err, "unable to get config for hybrid encryption manager")
		return
	}

	keysetHandle, err := getTokenizerBackendKeyset(secretsManager, serviceConfig.TokenizerBackendKeysetArn)
	if err != nil {
		return
	}

	// for debugging
	publicKeysetHandle, err := keysetHandle.Public()
	if err != nil {
		err = errors.Wrap(err, "unable to get secure frame public keyset")
		return
	}
	keysetBytes, err := getKeysetBytes(publicKeysetHandle)
	if err != nil {
		err = errors.Wrap(err, "unable to get secure frame public keyset bytes")
		return
	}
	keysetEncoded := base64.StdEncoding.EncodeToString(keysetBytes)
	logger.Debug("keyset public key", zap.String("public key", keysetEncoded))

	hybridDecrypt, err := hybrid.NewHybridDecrypt(keysetHandle)
	if err != nil {
		return
	}

	manager = &hybridEncryptionManager{
		logger:        logger,
		hybridDecrypt: hybridDecrypt,
	}
	return
}

func (e *hybridEncryptionManager) DecryptString(ciphertext string) (plaintext string, err error) {
	var (
		ciphertextBytes []byte
	)
	ciphertextBytes, err = base64.StdEncoding.DecodeString(ciphertext)
	if err != nil {
		return
	}
	plaintextBytes, err := e.hybridDecrypt.Decrypt(ciphertextBytes, []byte(hybridContextInfo))
	if err != nil {
		return
	}
	return string(plaintextBytes), nil
}

func getTokenizerBackendKeyset(secretsManager gateway.AwsSecretsManagerGateway, keysetArn string) (secureFrameKeyset *keyset.Handle, err error) {
	keysetData, err := secretsManager.GetSecret(keysetArn)
	if err != nil {
		err = errors.Wrap(err, "unable to get keyset secret from secrets manager")
		return
	}

	keysetBytesReader := bytes.NewReader(keysetData)
	keysetReader := keyset.NewBinaryReader(keysetBytesReader)
	return insecurecleartextkeyset.Read(keysetReader)
}

func getKeysetBytes(keysetHandle *keyset.Handle) ([]byte, error) {
	var (
		bytesBuffer []byte
	)
	writer := bytes.NewBuffer(bytesBuffer)
	binaryWriter := keyset.NewBinaryWriter(writer)
	err := keysetHandle.WriteWithNoSecrets(binaryWriter)
	return writer.Bytes(), err
}
