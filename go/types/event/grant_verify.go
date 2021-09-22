package event

type GrantVerifyRequest struct {
	SessionID string `json:"sessionId"`
	TokenID  string                 `json:"tokenId"`
}

type GrantVerifyResponse struct {
	Valid bool `json:"valid"`
}

