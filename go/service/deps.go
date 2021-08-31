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
	LocalstackURL string `yaml:"localstack_url"`
}

func CreateCSPMiddleware(provider config.Provider) CSPMiddlware {
	var (
		authConfig   authCallbackConfig
		bucketConfig S3BucketConfig
	)
	// TODO report this to someplace
	reportUri := "http://localhost:5004"

	// TODO (cthompson) these config values are taken from another place in the config
	// we should figure out how to consolidate them
	err := provider.Get("session_controller").Populate(&authConfig)
	if err != nil {
		panic(err)
	}

	err = provider.Get("aws_gateway").Populate(&bucketConfig)
	if err != nil {
		panic(err)
	}

	s3Host := bucketConfig.S3Bucket + ".s3.us-west-2.amazonaws.com"

	s3URL := url.URL{
		Scheme: "https",
		Host:   s3Host,
	}

	cspPolicy := map[string][]string{
		"connect-src": {
			"'self'",
			authConfig.AuthCallbackHost,
			s3URL.String(),
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
