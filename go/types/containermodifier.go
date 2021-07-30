package types

type FunctionConfig struct {
	ImportPath   string            `json:"import_path"`
	FunctionName string            `json:"function_name"`
	WorkDir      string            `json:"work_dir"`
	Env          map[string]string `json:"env"`
}

type FunctionConfigFile struct {
	Runtime   string           `json:"runtime"`
	Functions []FunctionConfig `json:"functions"`
}
