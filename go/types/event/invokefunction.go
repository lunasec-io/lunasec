package event

import "encoding/json"

type InvokeHandlerRequest struct {
	BlockInput *json.RawMessage `json:"block_input"`
	Backpack *json.RawMessage `json:"backpack"`
	ImportPath string `json:"import_path"`
	FunctionName string `json:"function_name"`
}

type InvokeHandlerResponse struct {
	Result   *json.RawMessage `json:"result"`
	Backpack *json.RawMessage `json:"backpack"`
	Error    string           `json:"error"`
}
