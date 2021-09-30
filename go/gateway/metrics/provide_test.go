package metrics

import (
  "github.com/aws/aws-sdk-go/aws"
  "github.com/aws/aws-sdk-go/aws/client"
  "github.com/refinery-labs/loq/constants"
  "go.uber.org/config"
  "go.uber.org/zap"
  "strings"
  "testing"
)

const validConfig = `
metrics:
  disabled: false
  provider: aws_cloudwatch
  disable_usage_statistics: false
`

const invalidConfig = `
metrics:
  disabled: false
  provider: aws_cloudwatch_fake
  disable_usage_statistics: false
`

func createTestConfigProvider(rawConfigs ...string) config.Provider {
  var configFiles []config.YAMLOption

  for i := 0; i < len(rawConfigs); i++ {
    configFiles = append(configFiles, config.Source(strings.NewReader(rawConfigs[i])))
  }

  provider, err := config.NewYAML(configFiles...)

  if err != nil {
    panic(err)
  }

  return provider
}

func TestParsingValidConfig(t *testing.T) {
  provider := createTestConfigProvider(validConfig)

  testConfig, err := NewMetricsConfig(provider)

  if err != nil {
    t.Error(err)
  }

  if testConfig.Disabled == true {
    t.Errorf("metrics should not be disabled")
  }

  if testConfig.Provider != constants.MetricsProviderAwsCloudwatch {
    t.Errorf("metrics provider not 'aws_cloudwatch': %s", testConfig.Provider)
  }

  if testConfig.DisableUsageStatisticsMetrics == true {
    t.Errorf("usage statistics should not be disabled")
  }
}

func TestParsingInvalidConfig(t *testing.T) {
  provider := createTestConfigProvider(invalidConfig)

  testConfig, err := NewMetricsConfig(provider)

  if err == nil {
    t.Errorf("metrics provider should throw error")
  }

  if strings.Contains(err.Error(), "aws_cloudwatch_fake is not a valid MetricsProvider") == false {
    t.Errorf("error should state that given metrics provider is bad")
  }

  if testConfig.Disabled == true {
    t.Errorf("metrics should not be disabled")
  }

  if testConfig.Provider != constants.MetricsProviderNone {
    t.Errorf("metrics provider not 'none': %s", testConfig.Provider)
  }

  if testConfig.DisableUsageStatisticsMetrics == true {
    t.Errorf("usage statistics should not be disabled")
  }
}

type FakeConfig struct {
}

func (f FakeConfig) ClientConfig(serviceName string, cfgs ...*aws.Config) client.Config {
  return client.Config{}
}

func TestSetupNopMetricsGateway(t *testing.T) {
  provider := createTestConfigProvider(validConfig, `
metrics:
  provider: none
`)

  logger, err := zap.NewDevelopment()

  if err != nil {
    t.Error(err)
  }

  sess := FakeConfig{}

  // TODO: Clean up this interface so that it doesn't always require an AWS session.
  // This probably just needs to be handed a type that implements an interface of something like
  // func GetDependencies() *someDependenciesThatCanBeTypeCasted {}
  metricsGateway := SetupMetricsGateway(logger, provider, sess)

  if metricsGateway == nil {
    t.Errorf("metrics gateway should not be nil")
  }

  _, ok := metricsGateway.(NopMetricsGateway)
  if !ok {
    t.Errorf("returned metrics gateway not of type NopMetricsGateway")
  }
}

// TODO: Test the AWS leg of this code.
// Unfortunately, it'll require either stubbing the `session` or it will require actually running it with real creds.
