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
//
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
