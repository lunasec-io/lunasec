package util

import (
	"github.com/refinery-labs/loq/constants"
	"os"
)

func IsDevEnv() bool {
	stage := os.Getenv(constants.StageEnvVar)
	return constants.AppEnv(stage) == constants.Development
}

func IsProdEnv() bool {
	stage := os.Getenv(constants.StageEnvVar)
	return constants.AppEnv(stage) == constants.Production
}
