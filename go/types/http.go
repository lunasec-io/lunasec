package types

type HTTPResponse struct {
	Success bool          `json:"success"`
	Error   ErrorResponse `json:"error,omitempty"`
	Data    *interface{}  `json:"data,omitempty"`
}

type ErrorResponse struct {
	Name    string `json:"errorName,omitempty"`
	Message *string `json:"errorMessage,omitempty"`
}