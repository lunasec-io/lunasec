package event

type TokenizerSetRequest struct {
	Metadata map[string]interface{} `json:"metadata"`
}

type TokenizerSetResponse struct {
	TokenID   string            `json:"tokenId"`
	UploadURL string            `json:"uploadUrl"`
	Headers   map[string]string `json:"headers"`
}
