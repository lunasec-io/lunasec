package event

type TokenizerGetRequest struct {
	TokenID string `json:"tokenID"`
}

type TokenizerGetResponse struct {
	DownloadURL string            `json:"downloadUrl"`
	Headers     map[string]string `json:"headers"`
}
