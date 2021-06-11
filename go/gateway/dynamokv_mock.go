package gateway

import (
	"errors"
	"time"

	"github.com/refinery-labs/loq/model"
)

type dynamoKvGatewayMock struct {
	tables map[model.KVStore]map[string]model.Metadata
}

// NewDynamoKvGatewayMock...
func NewDynamoKvGatewayMock() DynamoKvGateway {
	tables := map[model.KVStore]map[string]model.Metadata{
		MetaStore:    {},
		KeyStore:     {},
		SessionStore: {},
	}

	return &dynamoKvGatewayMock{
		tables: tables,
	}
}

func (s *dynamoKvGatewayMock) Get(store model.KVStore, key string) (string, error) {
	metadata, ok := s.tables[store][key]
	if !ok {
		return "", errors.New("unable to find value for given key")
	}
	return metadata.Value, nil
}

func (s *dynamoKvGatewayMock) Set(store model.KVStore, key string, value string) error {
	metadata := model.Metadata{
		Key:       key,
		Value:     value,
		Timestamp: time.Now().Unix(),
	}
	s.tables[store][key] = metadata
	return nil
}
