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
package util

import (
	"log"
	"os"
	"regexp"

	"github.com/lunasec-io/lunasec/lunadefend/go/constants"
)

var uuidPattern = regexp.MustCompile("^" + constants.TokenPrefix + "[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[8|9|aA|bB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$")

// GetEnvWithFallback gets an environment variable, if one is not set, the fallback value is returned
func GetEnvWithFallback(key string, fallback string) string {
	val := os.Getenv(key)

	if val == "" {
		return fallback
	}

	return val
}

// EnvMapToArray transforms a map of environment variables to an array of formatted environment variables.
func EnvMapToArray(envMap map[string]string) []string {
	var envArray []string

	for k, v := range envMap {
		envArray = append(envArray, k+"="+v)
	}
	return envArray
}

// Panicf panics with string formatting
func Panicf(msg string, args ...interface{}) {
	log.Fatalf(msg, args...)
}

// IsValidUUID checks if input string matches uuid
func IsValidUUID(uuid string) bool {
	return uuidPattern.MatchString(uuid)
}
