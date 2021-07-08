package event

import "github.com/refinery-labs/loq/constants"

type GrantVerifyRequest struct {
	SessionID string `json:"sessionId"`
	TokenID  string                 `json:"tokenId"`
	GrantType constants.GrantType 			`json:"grantType"`
}

type GrantVerifyResponse struct {
	Valid bool `json:"valid"`
}

