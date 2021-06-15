package constants

const (
	StageEnvVar = "STAGE"
)

type AppEnv string

const (
	Development AppEnv = "DEV"
	Staging AppEnv = "STAGING"
	Production AppEnv = "PROD"
)
