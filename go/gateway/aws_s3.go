package gateway

import (
	"crypto/md5"
	"encoding/base64"
	"io/ioutil"
	"log"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/refinery-labs/loq/constants"
	"github.com/refinery-labs/loq/util"
	"go.uber.org/config"
	"go.uber.org/zap"
)

const s3EncryptionAlgo = "AES256"

type awsS3Gateway struct {
	awsS3GatewayConfig
	logger *zap.Logger
	s3     *session.Session
	s3Host string
}

type awsS3GatewayConfig struct {
	S3Region string `yaml:"region"`
	S3Bucket string `yaml:"s3_bucket"`
}

// AwsS3Gateway ...
type AwsS3Gateway interface {
	GetObject(key string) (content []byte, err error)
	GeneratePresignedGetUrl(key string, encryptionKey []byte) (string, map[string]string, error)
	GeneratePresignedPutUrl(key string, encryptionKey []byte) (string, map[string]string, error)
}

// TODO (cthompson) this is currently a hack until we figure out a better way for creating gateways with different named configs
func NewAwsS3GatewayWithoutConfig(bucket, region string) (s3Gateway AwsS3Gateway, err error) {
	gatewayConfig := awsS3GatewayConfig{
		S3Region: region,
		S3Bucket: bucket,
	}

	s3Host := gatewayConfig.S3Bucket + ".s3.us-west-2.amazonaws.com"

	sess, err := session.NewSession(
		&aws.Config{
			Region: &gatewayConfig.S3Region,
		},
	)

	if err != nil {
		util.Panicf("Failed to instantiate S3 session %s", err)
	}

	s3Gateway = &awsS3Gateway{
		awsS3GatewayConfig: gatewayConfig,
		s3:                 sess,
		s3Host:             s3Host,
	}
	return
}

// NewAwsS3Gateway...
func NewAwsS3Gateway(logger *zap.Logger, provider config.Provider) (s3Gateway AwsS3Gateway, err error) {
	var (
		gatewayConfig awsS3GatewayConfig
	)

	err = provider.Get("aws_gateway").Populate(&gatewayConfig)
	if err != nil {
		return
	}

	s3Host := gatewayConfig.S3Bucket + ".s3.us-west-2.amazonaws.com"

	sess, err := session.NewSession(
		&aws.Config{
			Region:           &gatewayConfig.S3Region,
			Endpoint:         aws.String("http://127.0.0.1:9000"),
			S3ForcePathStyle: aws.Bool(true),
		},
	)

	if err != nil {
		util.Panicf("Failed to instantiate S3 session %s", err)
	}

	s3Gateway = &awsS3Gateway{
		logger:             logger,
		awsS3GatewayConfig: gatewayConfig,
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
