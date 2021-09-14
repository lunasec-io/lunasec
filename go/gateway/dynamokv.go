package gateway

import (
	"fmt"
	"log"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/refinery-labs/loq/types"
	"go.uber.org/config"
	"go.uber.org/zap"
)

var primaryKey = "Key"

const (
	MetaStore    = types.KVStore("metadata")
	KeyStore     = types.KVStore("keys")
	SessionStore = types.KVStore("sessions")
	GrantStore = types.KVStore("grants")
)

func validateTableConfig(tableConfig map[types.KVStore]string) {
	tableNames := []types.KVStore {
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
		panic(errs)
	}
}

type dynamoKvGateway struct {
	DynamoKvGatewayConfig
	logger *zap.Logger
	db     *dynamodb.DynamoDB
}

type DynamoKvGatewayConfig struct {
	TableNames map[types.KVStore]string `yaml:"table_names"`
}

// DynamoKvGateway ...
type DynamoKvGateway interface {
	Get(store types.KVStore, key string) (string, error)
	Set(store types.KVStore, key string, value string) error
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

	validateTableConfig(gatewayConfig.TableNames)

	logger.Debug("creating new dynamodb session")
	db := dynamodb.New(sess)

	return &dynamoKvGateway{
		DynamoKvGatewayConfig: gatewayConfig,
		logger:                logger,
		db:                    db,
	}
}

func (s *dynamoKvGateway) getTableName(store types.KVStore) (tableName string, err error) {
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

func (s *dynamoKvGateway) Get(store types.KVStore, key string) (string, error) {
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

func (s *dynamoKvGateway) Set(store types.KVStore, key string, value string) error {
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
