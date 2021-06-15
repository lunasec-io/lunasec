package model

type CDNConfig struct {
	Protocol   string `yaml:"protocol"`
	Host       string `yaml:"host"`
	MainScript string `yaml:"main_script"`
	MainStyle  string `yaml:"main_style"`
}

type StyleInfo struct {
	Pseudo map[string]string `json:"pseudo"`
	Style  map[string]string `json:"style"`
}

type FrameVars struct {
	CSPNonce      string
	RequestOrigin string
	RequestNonce  string
	InputStyle    string
	ScriptUrl     string
	StyleUrl      string
}
