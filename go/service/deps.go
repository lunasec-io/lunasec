package service

import (
	"net/url"

	"go.uber.org/config"
)

type authCallbackConfig struct {
	AuthCallbackHost string `yaml:"auth_callback_host"`
}

type S3BucketConfig struct {
	S3Bucket string `yaml:"s3_bucket"`
	LocalHTTPSProxy string `yaml:"local_https_proxy"`
	LocalstackURL string `yaml:"localstack_url"`
}

func CreateCSPMiddleware(provider config.Provider) CSPMiddlware {
	var (
		authConfig    authCallbackConfig
		gatewayConfig S3BucketConfig
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

	s3Host := gatewayConfig.S3Bucket + ".s3.us-west-2.amazonaws.com"

	s3URL := url.URL{
		Scheme: "https",
		Host:   s3Host,
	}

	connectSrcUrls := []string{
		"'self'",
		authConfig.AuthCallbackHost,
		s3URL.String(),
	}

	if gatewayConfig.LocalstackURL != "" {
		connectSrcUrls = append(connectSrcUrls, gatewayConfig.LocalstackURL)
	}

	if gatewayConfig.LocalHTTPSProxy != "" {
		connectSrcUrls = append(connectSrcUrls, gatewayConfig.LocalHTTPSProxy)
	}

	cspPolicy := map[string][]string{
		"connect-src": connectSrcUrls,
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
