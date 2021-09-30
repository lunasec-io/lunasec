package metrics

import (
  "github.com/aws/aws-sdk-go/aws/client"
  "github.com/refinery-labs/loq/constants"
  "go.uber.org/config"
  "go.uber.org/zap"
  "log"
)

type MetricProviderConfig struct {
  Disabled                      bool                      `yaml:"disabled"`
  Provider                      constants.MetricsProvider `yaml:"provider"`
  DisableUsageStatisticsMetrics bool                      `yaml:"disable_usage_statistics"`
}

// LunaSecMetricsGateway ...
type LunaSecMetricsGateway interface {
  PutMetric(name string, value int)
}

func NewMetricsConfig(
  provider config.Provider,
) (metricsConfig MetricProviderConfig, err error) {
  err = provider.Get("metrics").Populate(&metricsConfig)
  return
}

func SetupMetricsGateway(logger *zap.Logger, provider config.Provider, sess client.ConfigProvider) LunaSecMetricsGateway {
  metricsConfig, err := NewMetricsConfig(provider)

  if err != nil {
    log.Println("Metrics config missing but is required")
    log.Println(err)
    panic(err)
  }

  if metricsConfig.Disabled == true || metricsConfig.Provider == constants.MetricsProviderNone {
    return NewNopMetricsGateway()
  }

  if metricsConfig.Provider == constants.MetricsProviderNone {
    log.Println("Metrics provider not specified but is required")
    panic("Must provide metrics provider")
  }

  if metricsConfig.Provider == constants.MetricsProviderAwsCloudwatch {
    return NewAwsCloudwatchGateway(logger, provider, sess)
  }

  log.Printf("Unsupported metrics provider specified: %s", metricsConfig.Provider)
  panic("Unsupported metrics provider specified")
}

