package gateway

import (
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/refinery-labs/loq/model"
	"go.uber.org/zap"
)

var primaryKey = "Key"

const (
	MetaStore    = model.KVStore("tokenizer-metadata")
	KeyStore     = model.KVStore("tokenizer-keys")
	SessionStore = model.KVStore("tokenizer-sessions")
)

type dynamoKvGateway struct {
	logger *zap.Logger
	db     *dynamodb.DynamoDB
}

// DynamoKvGateway ...
type DynamoKvGateway interface {
	Get(store model.KVStore, key string) (string, error)
	Set(store model.KVStore, key string, value string) error
}

// NewDynamoKvGateway...
func NewDynamoKvGateway(logger *zap.Logger) DynamoKvGateway {
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))

	logger.Debug("creating new dynamodb session")
	db := dynamodb.New(sess)

	return &dynamoKvGateway{
		logger: logger,
		db:     db,
	}
}

func (s *dynamoKvGateway) Get(store model.KVStore, key string) (string, error) {
	dbResult, err := s.db.GetItem(&dynamodb.GetItemInput{
		TableName: aws.String(string(store)),
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
		TableName: aws.String(string(store)),
	}

	if _, err := s.db.PutItem(input); err != nil {
		return err
	}

	return nil
}
