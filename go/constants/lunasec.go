package constants

const (
	LunaSecStackName = "LunasecSecureEnclave"
	LunasecBuildDir  = "build"
	DeployedAwsResourcesConfig = "aws_resources.yaml"
)

type LunaSecServices string

const (
	TokenizerBackendServiceName LunaSecServices = "tokenizer-backend"
	SecureFrameFrontEndServiceName LunaSecServices = "secure-frame-frontend"
)