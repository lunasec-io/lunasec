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
package metrics

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/client"
	"github.com/lunasec-io/lunasec/lunadefend/go/constants"
	"go.uber.org/config"
	"go.uber.org/zap"
	"gopkg.in/yaml.v3"
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

	if strings.Contains(err.Error(), "invalid provider name specified, must be") == false {
		t.Errorf("error should state that given metrics provider is bad")
	}

	if testConfig.Disabled == true {
		t.Errorf("metrics should not be disabled")
	}

	if testConfig.Provider != "" {
		t.Errorf("metrics provider not empty: %s", testConfig.Provider)
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

const validMetricsConfig = `
disabled: false
provider: aws_cloudwatch
disable_usage_statistics: false
`

func TestValidVanillaYamlUnmarshal(t *testing.T) {
	var metricsConfig MetricProviderConfig

	err := yaml.Unmarshal([]byte(validMetricsConfig), &metricsConfig)

	if err != nil {
		t.Errorf("should not have yaml error: %v", err)
	}

	if metricsConfig.Disabled {
		t.Errorf("expected disabled to be false")
	}

	if metricsConfig.Provider != constants.MetricsProviderAwsCloudwatch {
		t.Errorf("invalid provider read from config: %s", metricsConfig.Provider)
	}

	if metricsConfig.DisableUsageStatisticsMetrics {
		t.Errorf("expected usage statistics to be false")
	}
}

const invalidMetricsConfig = `
disabled: false
provider: aws_cloudwatch_fake
disable_usage_statistics: false
`

func TestInvalidVanillaYamlUnmarshal(t *testing.T) {
	var metricsConfig MetricProviderConfig

	// test yaml v3 deserialization
	err := yaml.Unmarshal([]byte(invalidMetricsConfig), &metricsConfig)

	if err == nil {
		t.Errorf("metrics provider should throw error")
	}

	if strings.Contains(err.Error(), "invalid provider name specified, must be") == false {
		t.Errorf("error should state that given metrics provider is bad")
	}

	if metricsConfig.Disabled == true {
		t.Errorf("metrics should not be disabled")
	}

	if metricsConfig.Provider != "" {
		t.Errorf("metrics provider not empty: %s", metricsConfig.Provider)
	}

	if metricsConfig.DisableUsageStatisticsMetrics == true {
		t.Errorf("usage statistics should not be disabled")
	}
}

// TODO: Test the AWS leg of this code.
// Unfortunately, it'll require either stubbing the `session` or it will require actually running it with real creds.
