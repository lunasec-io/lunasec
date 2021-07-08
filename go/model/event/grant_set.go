package event

import "github.com/refinery-labs/loq/constants"

type GrantSetRequest struct {
	SessionID string `json:"sessionId"`
	TokenID  string                 `json:"tokenId"`
	GrantType constants.GrantType 			`json:"grantType"`
}

type GrantSetResponse struct {
}
