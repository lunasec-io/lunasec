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
	"encoding/json"
	"errors"
	"github.com/lunasec-io/lunasec/lunadefend/go/gateway/metrics"
	"go.uber.org/zap"
	"time"

	"github.com/lunasec-io/lunasec/lunadefend/go/gateway"
	"github.com/lunasec-io/lunasec/lunadefend/go/types"
	"github.com/lunasec-io/lunasec/lunadefend/go/util"
)

type metadataService struct {
	logger *zap.Logger
	kv     gateway.AwsDynamoGateway
	cw     metrics.AwsCloudwatchGateway
}

// MetadataService manages metadata for secrets
type MetadataService interface {
	SetMetadata(token types.Token, authorInfo interface{}, customMetadata interface{}) (err error)
	GetMetadata(token types.Token) (metadata TokenMetadata, err error)
}

// NewMetadataService ...
func NewMetadataService(
	logger *zap.Logger,
	cw metrics.AwsCloudwatchGateway,
	kv gateway.AwsDynamoGateway,
) MetadataService {
	return &metadataService{
		logger: logger,
		cw:     cw,
		kv:     kv,
	}
}

const TokenMetadataSchemaVersion = 1

type TokenMetadata struct {
	SchemaVersion  int64       `json:"schema_version"`
	CreatedAt      int64       `json:"created_at"`
	AuthorInfo     interface{} `json:"author_info"`
	CustomMetadata interface{} `json:"custom_metadata"`
}

// SetMetadata ...
func (s *metadataService) SetMetadata(token types.Token, authorInfo interface{}, customMetadata interface{}) (err error) {
	metadata := TokenMetadata{
		SchemaVersion:  TokenMetadataSchemaVersion,
		CreatedAt:      time.Now().Unix(),
		AuthorInfo:     authorInfo,
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
