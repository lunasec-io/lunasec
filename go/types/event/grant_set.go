package event

type GrantSetRequest struct {
	SessionID string `json:"sessionId"`
	TokenID  string                 `json:"tokenId"`
}

type GrantSetResponse struct {
}
