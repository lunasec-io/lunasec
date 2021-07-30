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

type JwtSubject string

const (
	UserSubject JwtSubject = "user"
	ApplicationSubject JwtSubject = "application"
)

var (
	AnySubject = []JwtSubject{ApplicationSubject, UserSubject}
	OnlyApplicationSubject = []JwtSubject{ApplicationSubject}
)

func SubjectsToStringSlice(subjects []JwtSubject) (strings []string) {
	for _, s := range subjects {
		strings = append(strings, string(s))
	}
	return
}
