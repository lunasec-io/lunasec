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
//
package util

import (
	"lunasec/lunadefend/constants"
	"os"
)

func IsDevEnv() bool {
	stage := os.Getenv(constants.StageEnvVar)
	return constants.AppEnv(stage) == constants.Development
}

func IsProdEnv() bool {
	stage := os.Getenv(constants.StageEnvVar)
	return constants.AppEnv(stage) == constants.Production
}
