package constants

type SessionState string

const (
	SessionUnused SessionState = "unused"
	SessionUsed                = "used"
)

type AuthType string

const (
	NoAuthType  AuthType = "none"
	JwtAuthType AuthType = "jwt"
)

const (
	JwtAuthHeader = "Authorization"
)
