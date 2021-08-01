package event

type CreateFunctionRequest struct {
	FunctionID string `json:"functionId"`
	Code       string `json:"code"`
}
