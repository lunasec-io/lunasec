package types

type HTTPResponse struct {
	Success bool         `json:"success"`
	Error   *string      `json:"error,omitempty"`
	Data    *interface{} `json:"data,omitempty"`
}
