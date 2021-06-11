package model

import "encoding/json"

type FunctionLookup map[string]RefineryFunction

type RefineryFunction struct {
	Command      string            `json:"command"`
	Handler      string            `json:"handler"`
	ImportPath   string            `json:"import_path"`
	FunctionName string            `json:"function_name"`
	WorkDir      string            `json:"work_dir"`
	Env          map[string]string `json:"env"`
}

type RuntimeInvoker interface {
	Initialize() error
	Run() (*json.RawMessage, *json.RawMessage, error)
}
