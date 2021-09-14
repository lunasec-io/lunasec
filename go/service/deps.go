package service

import (
	"net/url"

	"go.uber.org/config"
)

type authCallbackConfig struct {
	AuthCallbackHost string `yaml:"auth_callback_host"`
}

type AwsGatewayConfig struct {
	Region string `yaml:"region"`
	S3Bucket string `yaml:"s3_bucket"`
	LocalstackURL string `yaml:"localstack_url"`
	LocalHTTPSProxy string `yaml:"local_https_proxy"`
}

func getS3HostURL(gatewayConfig AwsGatewayConfig) string {
	if gatewayConfig.LocalHTTPSProxy != "" {
		return gatewayConfig.LocalstackURL
	}

	s3Host := gatewayConfig.S3Bucket + ".s3." + gatewayConfig.Region + ".amazonaws.com"

	s3URL := url.URL{
		Scheme: "https",
		Host:   s3Host,
	}
	return s3URL.String()
}

func CreateCSPMiddleware(provider config.Provider) CSPMiddlware {
	var (
		authConfig   authCallbackConfig
		gatewayConfig AwsGatewayConfig
	)
	// TODO report this to someplace
	reportUri := "http://localhost:5004"

	// TODO (cthompson) these config values are taken from another place in the config
	// we should figure out how to consolidate them
	err := provider.Get("session_controller").Populate(&authConfig)
	if err != nil {
		panic(err)
	}

	err = provider.Get("aws_gateway").Populate(&gatewayConfig)
	if err != nil {
		panic(err)
	}

	s3HostURL := getS3HostURL(gatewayConfig)

	cspPolicy := map[string][]string{
		"connect-src": {
			"'self'",
			authConfig.AuthCallbackHost,
			s3HostURL,
			"https://localhost:4567",
		},
		"script-src": {
			"unsafe-inline",
			"{{nonce}}",
		},
		"object-src":                {"none"},
		"default-src":               {"none"},
		"frame-ancestors":           {"{{referer}}"},
		"base-uri":                  {"none"},
		"require-trusted-types-for": {"script"},
		"report-uri":                {reportUri},
		"style-src": {
			"unsafe-inline",
			"{{nonce}}",
		},
	}
	return NewCSPMiddleware(cspPolicy, 16, false)
}
