package event

type GrantType string

const (
	ReadToken GrantType = "read_token"
	StoreToken GrantType = "store_token"
)

type GrantSetRequest struct {
	SessionID string `json:"sessionId"`
	TokenID  string                 `json:"tokenId"`
	GrantType GrantType 			`json:"grantType"`
}

type GrantSetResponse struct {
}
