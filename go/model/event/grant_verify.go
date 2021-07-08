package event

import "github.com/refinery-labs/loq/constants"

type GrantVerifyRequest struct {
	TokenID  string                 `json:"tokenId"`
	GrantType constants.GrantType 			`json:"grantType"`
}

type GrantVerifyResponse struct {
	Valid bool `json:"valid"`
}

