package types

import "github.com/lunasec-io/lunasec-monorepo/constants"

type CorsConfig struct {
	AllowedOrigins []string `yaml:"allowed_origins"`
	AllowedHeaders []string `yaml:"allowed_headers"`
}

type AppConfig struct {
	DeploymentUUID string     `yaml:"deployment_uuid"`
	Cors           CorsConfig `yaml:"cors"`
}

type AnalyticsCollectorConfig struct {
	AnalyticsServer string                        `yaml:"analytics_server"`
	Metrics         []constants.ApplicationMetric `yaml:"metrics"`
}
