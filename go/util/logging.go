package util

import (
	"go.uber.org/zap"
)

func GetLogger() (*zap.Logger, error) {
	if IsDevEnv() {
		return zap.NewDevelopment()
	}
	return zap.NewProduction()
}
