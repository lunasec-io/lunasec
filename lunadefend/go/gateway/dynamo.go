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
package gateway

import (
	"fmt"
	"log"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/lunasec-io/lunasec/lunadefend/go/types"
	"go.uber.org/config"
	"go.uber.org/zap"
)

var primaryKey = "Key"

const (
	MetaStore    = types.KVStore("metadata")
	KeyStore     = types.KVStore("keys")
	SessionStore = types.KVStore("sessions")
	GrantStore   = types.KVStore("grants")
)

func validateTableConfig(tableConfig map[types.KVStore]string) {
	tableNames := []types.KVStore{
		MetaStore,
		KeyStore,
		SessionStore,
		GrantStore,
	}

	var errs []error
	for _, tableName := range tableNames {
		if _, ok := tableConfig[tableName]; !ok {
			err := fmt.Errorf("unable to find ARN for table: %s", tableName)
			errs = append(errs, err)
		}
	}

	if len(errs) != 0 {
		errMsg := ""
		for _, err := range errs {
			errMsg = errMsg + ", " + err.Error()
		}
		panic(errMsg)
	}
}

type dynamoGateway struct {
	DynamoKvGatewayConfig
	logger *zap.Logger
	db     *dynamodb.DynamoDB
}

type DynamoKvGatewayConfig struct {
	TableNames map[types.KVStore]string `yaml:"table_names"`
}

// AwsDynamoGateway ...
type AwsDynamoGateway interface {
	Get(store types.KVStore, key string) (string, error)
	Set(store types.KVStore, key string, value string) error
}

// NewDynamoGateway...
func NewDynamoGateway(logger *zap.Logger, provider config.Provider, sess *session.Session) AwsDynamoGateway {
	var (
		gatewayConfig DynamoKvGatewayConfig
	)

	err := provider.Get("aws_gateway").Populate(&gatewayConfig)
	if err != nil {
		log.Println(err)
		panic(err)
	}

	validateTableConfig(gatewayConfig.TableNames)

	logger.Debug("creating new dynamodb session")
	db := dynamodb.New(sess)

	return &dynamoGateway{
		DynamoKvGatewayConfig: gatewayConfig,
		logger:                logger,
		db:                    db,
	}
}

func (s *dynamoGateway) getTableName(store types.KVStore) (tableName string, err error) {
	var (
		ok bool
	)
	tableName, ok = s.TableNames[store]
	if !ok {
		err = fmt.Errorf("unable to find table name for store: %s", store)
		return
	}
	if tableName == "" {
		err = fmt.Errorf("table name found, but was assigned to empty string for store: %s", store)
		return
	}
	return
}

func (s *dynamoGateway) Get(store types.KVStore, key string) (string, error) {
	tableName, err := s.getTableName(store)
	if err != nil {
		return "", err
	}

	dbResult, err := s.db.GetItem(&dynamodb.GetItemInput{
		TableName: aws.String(tableName),
		Key: map[string]*dynamodb.AttributeValue{
			primaryKey: {
				S: aws.String(key),
			},
		},
	})

	if err != nil || dbResult.Item == nil {
		return "", err
	}

	metadata := types.Metadata{}

	if err = dynamodbattribute.UnmarshalMap(dbResult.Item, &metadata); err != nil {
		return "", err
	}

	return metadata.Value, nil
}

func (s *dynamoGateway) Set(store types.KVStore, key string, value string) error {
	tableName, err := s.getTableName(store)
	if err != nil {
		return err
	}

	metadata := types.Metadata{
		Key:       key,
		Value:     value,
		Timestamp: time.Now().Unix(),
	}

	av, err := dynamodbattribute.MarshalMap(metadata)

	if err != nil {
		return err
	}

	input := &dynamodb.PutItemInput{
		Item:      av,
		TableName: aws.String(tableName),
	}

	if _, err := s.db.PutItem(input); err != nil {
		return err
	}

	return nil
}
