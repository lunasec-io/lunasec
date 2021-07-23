package service

import (
	"encoding/json"
	"errors"

	"github.com/refinery-labs/loq/gateway"
	"github.com/refinery-labs/loq/model"
	"github.com/refinery-labs/loq/util"
)

type metadataService struct {
	kv gateway.DynamoKvGateway
}

// MetadataService manages metadata for secrets
type MetadataService interface {
	SetMetadata(token model.Token, metadata interface{}) error
	GetMetadata(token model.Token) (interface{}, error)
}

// NewMetadataService ...
func NewMetadataService(kv gateway.DynamoKvGateway) MetadataService {
	return &metadataService{
		kv: kv,
	}
}

// SetMetadata ...
func (s *metadataService) SetMetadata(token model.Token, metadata interface{}) (err error) {
	serializedMetadata, err := json.Marshal(metadata)
	if err != nil {
		return
	}
	return s.kv.Set(gateway.MetaStore, util.Sha512Sum(string(token)), string(serializedMetadata))
}

// GetMetadata ...
func (s *metadataService) GetMetadata(token model.Token) (metadata interface{}, err error) {
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
