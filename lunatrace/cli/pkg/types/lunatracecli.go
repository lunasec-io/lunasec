// Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
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

import (
	"github.com/urfave/cli/v2"
	"reflect"
)

type LunaTraceAssetType string

const (
	ContainerAsset  LunaTraceAssetType = "container"
	RepositoryAsset LunaTraceAssetType = "repository"
	DirectoryAsset  LunaTraceAssetType = "directory"
	FileAsset       LunaTraceAssetType = "file"
)

type AssetTypeCliHandler func(c *cli.Context, appConfig LunaTraceConfig) (err error)

type CliAssetCmdConfig struct {
	Usage        string
	Flags        []cli.Flag
	AssetType    LunaTraceAssetType
	AssetHandler AssetTypeCliHandler
}

type LunaTraceGlobalFlags struct {
	Verbose        bool `json:"verbose"`
	Json           bool `json:"json"`
	Debug          bool `json:"debug"`
	IgnoreWarnings bool `json:"ignore-warnings"`
	LogToStderr    bool `json:"log-to-stderr"`
}

func NewLunaTraceGlobalFlags() *LunaTraceGlobalFlags {
	return &LunaTraceGlobalFlags{}
}

func (s *LunaTraceGlobalFlags) Fields() (fields []string) {
	elem := reflect.TypeOf(s).Elem()
	for i := 0; i < elem.NumField(); i += 1 {
		field := elem.Field(i)
		fields = append(fields, field.Name)
	}
	return
}

func (s *LunaTraceGlobalFlags) Set(field string, value bool) {
	reflect.ValueOf(s).Elem().FieldByName(field).SetBool(value)
}
