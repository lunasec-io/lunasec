package gateway

type awsS3GatewayMock struct {
	host   string
	bucket map[string][]byte
}

// NewAwsS3GatewayMock...
func NewAwsS3GatewayMock() (s3Gateway AwsS3Gateway) {
	s3Gateway = &awsS3GatewayMock{}
	return
}

// TODO merge both functions
func (s *awsS3GatewayMock) GetObject(key string) ([]byte, error) {
	return s.bucket[key], nil
}

// TODO merge both functions
func (s *awsS3GatewayMock) GeneratePresignedPutUrl(key string, encryptionKey []byte) (string, map[string]string, error) {
	url := ""
	headers := map[string]string{
		"host": s.host,
	}

	return url, headers, nil
}

func (s *awsS3GatewayMock) GeneratePresignedGetUrl(key string, encryptionKey []byte) (string, map[string]string, error) {
	url := ""
	headers := map[string]string{
		"host": s.host,
	}

	return url, headers, nil
}
