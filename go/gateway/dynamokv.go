package gateway

import (
	"fmt"
	"log"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/refinery-labs/loq/model"
	"go.uber.org/config"
	"go.uber.org/zap"
)

var primaryKey = "Key"

const (
	MetaStore    = model.KVStore("metadata")
	KeyStore     = model.KVStore("keys")
	SessionStore = model.KVStore("sessions")
	GrantStore = model.KVStore("grants")
)

type dynamoKvGateway struct {
	DynamoKvGatewayConfig
	logger *zap.Logger
	db     *dynamodb.DynamoDB
}

type DynamoKvGatewayConfig struct {
	TableNames map[model.KVStore]string `yaml:"table_names"`
}

// DynamoKvGateway ...
type DynamoKvGateway interface {
	Get(store model.KVStore, key string) (string, error)
	Set(store model.KVStore, key string, value string) error
}

// NewDynamoKvGateway...
func NewDynamoKvGateway(logger *zap.Logger, provider config.Provider, sess *session.Session) DynamoKvGateway {
	var (
		gatewayConfig DynamoKvGatewayConfig
	)

	err := provider.Get("aws_gateway").Populate(&gatewayConfig)
	if err != nil {
		log.Println(err)
		panic(err)
	}

	logger.Debug("creating new dynamodb session")
	db := dynamodb.New(sess)

	return &dynamoKvGateway{
		DynamoKvGatewayConfig: gatewayConfig,
		logger:                logger,
		db:                    db,
	}
}

func (s *dynamoKvGateway) getTableName(store model.KVStore) (tableName string, err error) {
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

func (s *dynamoKvGateway) Get(store model.KVStore, key string) (string, error) {
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

	metadata := model.Metadata{}

	if err = dynamodbattribute.UnmarshalMap(dbResult.Item, &metadata); err != nil {
		return "", err
	}

	return metadata.Value, nil
}

func (s *dynamoKvGateway) Set(store model.KVStore, key string, value string) error {
	tableName, err := s.getTableName(store)
	if err != nil {
		return err
	}

	metadata := model.Metadata{
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
