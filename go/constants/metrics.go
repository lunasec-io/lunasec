package constants

type ApplicationMetric string

const (
	TokenizeSuccessMetric    ApplicationMetric = "tokenizeSuccess"
	TokenizeFailureMetric                      = "tokenizeFailure"
	DetokenizeSuccessMetric                    = "detokenizeSuccess"
	DetokenizeFailureMetric                    = "detokenizeFailure"
	CreateGrantSuccessMetric                   = "createGrantSuccess"
	CreateGrantFailureMetric                   = "createGrantFailure"
)
