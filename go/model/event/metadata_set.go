package event

type MetadataSetRequest struct {
	Metadata map[string]interface{} `json:"metadata"`
	TokenID  string                 `json:"tokenId"`
}

type MetadataSetResponse struct {
}
