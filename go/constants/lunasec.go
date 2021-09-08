package constants

const (
	LunaSecStackName = "LunasecSecureEnclave"
	LunasecBuildDir  = "build"
)

type LunaSecServices string

const (
	TokenizerBackendServiceName LunaSecServices = "tokenizer-backend"
	SecureFrameFrontEndServiceName LunaSecServices = "secure-frame-frontend"
)
