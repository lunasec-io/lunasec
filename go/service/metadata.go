package service

import (
	"encoding/json"
	"errors"
	"go.uber.org/zap"
	"time"

	"github.com/refinery-labs/loq/gateway"
	"github.com/refinery-labs/loq/types"
	"github.com/refinery-labs/loq/util"
)

type metadataService struct {
	logger *zap.Logger
	kv gateway.AwsDynamoGateway
	cw gateway.AwsCloudwatchGateway
}

// MetadataService manages metadata for secrets
type MetadataService interface {
	SetMetadata(token types.Token, authorInfo interface{}, customMetadata interface{}) (err error)
	GetMetadata(token types.Token) (metadata TokenMetadata, err error)
}

// NewMetadataService ...
func NewMetadataService(
	logger *zap.Logger,
	cw gateway.AwsCloudwatchGateway,
	kv gateway.AwsDynamoGateway,
) MetadataService {
	return &metadataService{
		logger: logger,
		cw: cw,
		kv: kv,
	}
}

const TokenMetadataSchemaVersion = 1

type TokenMetadata struct {
	SchemaVersion int64 `json:"schema_version"`
	CreatedAt int64 `json:"created_at"`
	AuthorInfo interface{} `json:"author_info"`
	CustomMetadata interface{} `json:"custom_metadata"`
}

// SetMetadata ...
func (s *metadataService) SetMetadata(token types.Token, authorInfo interface{}, customMetadata interface{}) (err error) {
	metadata := TokenMetadata{
		SchemaVersion: TokenMetadataSchemaVersion,
		CreatedAt: time.Now().Unix(),
		AuthorInfo: authorInfo,
		CustomMetadata: customMetadata,
	}

	serializedMetadata, err := json.Marshal(metadata)
	if err != nil {
		return
	}
	return s.kv.Set(gateway.MetaStore, util.Sha512Sum(string(token)), string(serializedMetadata))
}

// GetMetadata ...
func (s *metadataService) GetMetadata(token types.Token) (metadata TokenMetadata, err error) {
	meta, err := s.kv.Get(gateway.MetaStore, util.Sha512Sum(string(token)))
	if err != nil {
		return
	}

	if len(meta) == 0 {
		err = errors.New("unable to locate metadata for token")
		return
	}

	err = json.Unmarshal([]byte(meta), &metadata)
	return
}
