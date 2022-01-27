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
package graphql

import (
	"lunasec/lunatrace/pkg/constants"
	"lunasec/lunatrace/pkg/types"
	"lunasec/lunatrace/pkg/util"
)

func getGitMetadataVariables(variables map[string]string) {
	gitMeta := util.CollectRepoMetadata()

	variables["git_remote"] = gitMeta.Remote
	variables["git_hash"] = gitMeta.Hash
	variables["git_branch"] = gitMeta.Branch
}

func NewInsertNewBuildRequest(projectId, s3Url string) types.GraphqlRequest {
	variables := map[string]string{
		"project_id": projectId,
		"s3_url":     s3Url,
	}

	getGitMetadataVariables(variables)

	return types.GraphqlRequest{
		Query:         constants.InsertNewBuildQuery,
		Variables:     variables,
		OperationName: "InsertNewBuildQuery",
	}
}

func NewGetProjectInfoRequest() types.GraphqlRequest {
	return types.GraphqlRequest{
		Query:         constants.GetProjectInfoQuery,
		Variables:     map[string]string{},
		OperationName: "GetProjectInfoQuery",
	}
}
