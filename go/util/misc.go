package util

import (
	"log"
	"os"
	"regexp"

	"github.com/refinery-labs/loq/constants"
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
