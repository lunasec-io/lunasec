package types

import "github.com/lunasec-io/lunasec-monorepo/constants"

type CollectedMetrics map[constants.ApplicationMetric]int64

type ReportedMetrics struct {
	Version          string           `json:"version"`
	DeploymentUUID   string           `json:"deployment_uuid"`
	CollectedMetrics CollectedMetrics `json:"collected_metrics"`
}
