package event

import "encoding/json"

type ExecuteFunctionRequest struct {
	FunctionName string           `json:"function_name"`
	BlockInput   *json.RawMessage `json:"block_input"`
	Backpack     *json.RawMessage `json:"backpack"`
}

type ExecuteFunctionResponse struct {
	Result   *json.RawMessage `json:"result"`
	Backpack *json.RawMessage `json:"backpack"`
}
