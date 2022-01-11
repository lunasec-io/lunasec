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
//
package types

import "github.com/lunasec-io/lunasec/tools/log4shell/types/model"

type SbomOutput struct {
	Email           string           `json:"email"`
	ApplicationName string           `json:"application_name"`
	Sboms           []model.Document `json:"sboms"`
}

type UploadSbomUrl struct {
	Url     string            `json:"url"`
	Headers map[string]string `json:"headers"`
}

type GenerateUploadUrlResponse struct {
	Error     bool          `json:"error"`
	Message   string        `json:"message"`
	UploadURL UploadSbomUrl `json:"uploadUrl"`
}
