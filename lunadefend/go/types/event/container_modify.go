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
package event

import (
	"github.com/lunasec-io/lunasec/lunadefend/go/constants"
	"github.com/lunasec-io/lunasec/lunadefend/go/types"
)

type ImageFile struct {
	Bucket string `json:"bucket"`
	Key    string `json:"key"`
}

type ContainerModifyEvent struct {
	Registry     string                 `json:"registry"`
	BaseImage    string                 `json:"base_image"`
	NewImageName string                 `json:"new_image_name"`
	ImageFiles   ImageFile              `json:"image_files"`
	Runtime      string                 `json:"runtime"`
	Functions    []types.FunctionConfig `json:"functions"`
}

func (c ContainerModifyEvent) ShouldModifyEntrypoint() bool {
	return c.Runtime == string(constants.Docker)
}

type ContainerModifyResponse struct {
	Tag          string `json:"tag"`
	DeploymentID string `json:"deployment_id"`
}
