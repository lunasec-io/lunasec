package constants

type JwtVerifierType string

const (
	AuthJwtVerifier = "auth_jwt_verifier"
)

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

type JwtSubject string

const (
	UserSubject JwtSubject = "user"
	ApplicationSubject JwtSubject = "application"
	DeveloperSubject JwtSubject = "developer"
)

var (
	AnySubject = []JwtSubject{UserSubject, ApplicationSubject, DeveloperSubject}
	OnlyApplicationSubject = []JwtSubject{ApplicationSubject}
	OnlyDeveloperSubject = []JwtSubject{DeveloperSubject}
)

func SubjectsToStringSlice(subjects []JwtSubject) (strings []string) {
	for _, s := range subjects {
		strings = append(strings, string(s))
	}
	return
}
