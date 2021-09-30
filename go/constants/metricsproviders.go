package constants

//go:generate go-enum -f=$GOFILE --marshal --lower --names -t ./enumtemplates/yamlmarshal.tmpl

// MetricsProvider
// Stores a list of valid Metric Providers for logging data to.
// This is a generated enum.
/*
ENUM(
none,
aws_cloudwatch,
) */
type MetricsProvider int
