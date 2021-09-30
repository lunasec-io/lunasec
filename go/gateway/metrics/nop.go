package metrics

type nopMetricsGateway struct {
}

type NopMetricsGateway interface {
  PutMetric(name string, value int)
}

// NewNopMetricsGateway
// This class disables metrics by performing an empty return whenever metrics are emitted.
func NewNopMetricsGateway() NopMetricsGateway {
  return &nopMetricsGateway{}
}

// PutMetric
// This intentionally does nothing in order to allow "disabling" metrics.
func (c *nopMetricsGateway) PutMetric(name string, value int) {
  return
}
