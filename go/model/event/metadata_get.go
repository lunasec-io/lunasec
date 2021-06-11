package event

type MetadataGetRequest struct {
	TokenID string `json:"tokenId"`
}

type MetadataGetResponse struct {
	Metadata interface{} `json:"metadata"`
}
