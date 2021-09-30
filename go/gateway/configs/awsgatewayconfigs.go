package configs

type AwsGatewayConfig struct {
  S3Region            string `yaml:"region"`
  S3Bucket            string `yaml:"s3_bucket"`
  CloudwatchNamespace string `yaml:"cloudwatch_namespace"`
  AccessKeyID         string `yaml:"access_key_id"`
  SecretAccessKey     string `yaml:"secret_access_key"`
  LocalstackURL       string `yaml:"localstack_url"`
  LocalHTTPSProxy     string `yaml:"local_https_proxy"`
}
