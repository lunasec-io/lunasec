// Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
package types

type CDNConfig struct {
	Protocol   string `yaml:"protocol" json:"protocol"`
	Host       string `yaml:"host" json:"host"`
	MainScript string `yaml:"main_script" json:"main_script"`
	MainStyle  string `yaml:"main_style" json:"main_style"`
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
	BackendUrl    string
}
