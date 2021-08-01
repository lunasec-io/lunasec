package gateway

import (
	"crypto/md5"
	"encoding/base64"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/refinery-labs/loq/constants"
	"go.uber.org/config"
	"go.uber.org/zap"
	"io/ioutil"
	"log"
)

const s3EncryptionAlgo = "AES256"

type awsS3Gateway struct {
	AwsS3GatewayConfig
	logger *zap.Logger
	s3     *session.Session
	s3Host string
}

type AwsS3GatewayConfig struct {
	S3Region string `yaml:"region"`
	S3Bucket string `yaml:"s3_bucket"`
}

type AwsS3GatewayConfigWrapper struct {
	AwsGateway AwsS3GatewayConfig `yaml:"aws_gateway"`
}

// AwsS3Gateway ...
type AwsS3Gateway interface {
	GetObject(key string) (content []byte, err error)
	GeneratePresignedGetUrl(key string, encryptionKey []byte) (string, map[string]string, error)
	GeneratePresignedPutUrl(key string, encryptionKey []byte) (string, map[string]string, error)
}

func NewAwsS3GatewayConfig(region, bucket string) AwsS3GatewayConfigWrapper {
	return AwsS3GatewayConfigWrapper{
		AwsGateway: AwsS3GatewayConfig{
			S3Region: region,
			S3Bucket: bucket,
		},
	}
}

// TODO (cthompson) this should just be a presigning service since local dev presigns urls with an endpoint URL
// that would not work if attempting to contact s3 directly from this service. Another S3 gateway for calls
// directly to s3 from this service should be created.

// NewAwsS3Gateway...
func NewAwsS3Gateway(logger *zap.Logger, provider config.Provider, sess *session.Session) (s3Gateway AwsS3Gateway) {
	var (
		gatewayConfig AwsS3GatewayConfig
	)

	err := provider.Get("aws_gateway").Populate(&gatewayConfig)
	if err != nil {
		logger.Error("unable to populate s3 config", zap.Error(err))
		panic(err)
	}

	s3Host := gatewayConfig.S3Bucket + ".s3.us-west-2.amazonaws.com"

	s3Gateway = &awsS3Gateway{
		logger:             logger,
		AwsS3GatewayConfig: gatewayConfig,
		s3:                 sess,
		s3Host:             s3Host,
	}
	return
}

func (s *awsS3Gateway) GetObject(key string) (content []byte, err error) {
	s3Client := s3.New(s.s3)
	input := s3.GetObjectInput{
		Bucket: aws.String(s.S3Bucket),
		Key:    aws.String(key),
	}
	resp, err := s3Client.GetObject(&input)
	if err != nil {
		log.Println(err)
		return
	}
	defer resp.Body.Close()

	return ioutil.ReadAll(resp.Body)
}

// TODO merge both functions
func (s *awsS3Gateway) GeneratePresignedPutUrl(key string, encryptionKey []byte) (string, map[string]string, error) {
	svc := s3.New(s.s3)
	b64EncryptionKey := base64.StdEncoding.EncodeToString(encryptionKey)
	keyChecksum := md5.Sum(encryptionKey)
	keyChecksumBase64 := base64.StdEncoding.EncodeToString(keyChecksum[:])

	req, _ := svc.PutObjectRequest(&s3.PutObjectInput{
		Bucket:               aws.String(s.S3Bucket),
		Key:                  aws.String(key),
		SSECustomerAlgorithm: aws.String(s3EncryptionAlgo),
		SSECustomerKey:       aws.String(string(encryptionKey)),
		SSECustomerKeyMD5:    aws.String(keyChecksumBase64),
	})

	url, err := req.Presign(constants.S3Timeout)

	if err != nil {
		return "", nil, err
	}

	headers := map[string]string{
		"host": s.s3Host,
		"x-amz-server-side-encryption-customer-key":       b64EncryptionKey,
		"x-amz-server-side-encryption-customer-key-md5":   keyChecksumBase64,
		"x-amz-server-side-encryption-customer-algorithm": s3EncryptionAlgo,
	}

	return url, headers, err
}

func (s *awsS3Gateway) GeneratePresignedGetUrl(key string, encryptionKey []byte) (string, map[string]string, error) {
	svc := s3.New(s.s3)
	b64EncryptionKey := base64.StdEncoding.EncodeToString(encryptionKey)
	keyChecksum := md5.Sum(encryptionKey)
	keyChecksumBase64 := base64.StdEncoding.EncodeToString(keyChecksum[:])

	req, _ := svc.GetObjectRequest(&s3.GetObjectInput{
		Bucket:               aws.String(s.S3Bucket),
		Key:                  aws.String(key),
		SSECustomerAlgorithm: aws.String(s3EncryptionAlgo),
		SSECustomerKey:       aws.String(string(encryptionKey)),
		SSECustomerKeyMD5:    aws.String(keyChecksumBase64),
	})
	url, err := req.Presign(constants.S3Timeout)

	if err != nil {
		return "", nil, err
	}

	headers := map[string]string{
		"host": s.s3Host,
		"x-amz-server-side-encryption-customer-key":       b64EncryptionKey,
		"x-amz-server-side-encryption-customer-key-md5":   keyChecksumBase64,
		"x-amz-server-side-encryption-customer-algorithm": s3EncryptionAlgo,
	}

	return url, headers, err
}
