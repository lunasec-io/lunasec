package event

type TokenizerGetRequest struct {
	TokenJwt string `json:"tokenJwt"`
}

type TokenizerGetResponse struct {
	DownloadURL string            `json:"downloadUrl"`
	Headers     map[string]string `json:"headers"`
}
