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
package deprecated

type RepoMetadata struct {
	RemoteUrl  string
	BranchName string
	CommitHash string
}

func (s *RepoMetadata) Merge(remoteUrl, branchName, commitHash string) {
	if remoteUrl != "" {
		s.RemoteUrl = remoteUrl
	}
	if branchName != "" {
		s.BranchName = branchName
	}
	if commitHash != "" {
		s.CommitHash = commitHash
	}
}

type GetProjectInfoResponse struct {
	GraphqlErrors
	Data struct {
		Method []struct {
			Project struct {
				OrganizationId string `json:"organization_id"`
				Id             string `json:"id"`
			} `json:"project"`
		} `json:"project_access_tokens"`
	} `json:"data"`
}

func (s *GetProjectInfoResponse) HasOnlyOneProject() bool {
	return len(s.Data.Method) == 1
}

func (s *GetProjectInfoResponse) GetProjectId() string {
	return s.Data.Method[0].Project.Id
}

func (s *GetProjectInfoResponse) GetOrganizationId() string {
	return s.Data.Method[0].Project.OrganizationId
}

type NewBuildResponse struct {
	GraphqlErrors
	Data struct {
		Method struct {
			Id               string `json:"id"`
			AgentAccessToken string `json:"agent_access_token"`
		} `json:"insert_builds_one"`
	} `json:"data"`
}

type SetBuildS3UrlResponse struct {
	GraphqlErrors
	Data struct {
		Method struct {
			Id string `json:"id"`
		} `json:"update_builds_by_pk"`
	} `json:"data"`
}

type DeleteBuildResponse struct {
	GraphqlErrors
	Data struct {
		Method struct {
			Id string `json:"id"`
		} `json:"delete_builds_by_pk"`
	} `json:"data"`
}

type PresignSbomResponse struct {
	GraphqlErrors
	Data struct {
		Method struct {
			UploadUrl struct {
				Url     string            `json:"url"`
				Headers map[string]string `json:"headers"`
			} `json:"uploadUrl"`
		} `json:"presignSbomUpload"`
	} `json:"data"`
}

func (s *PresignSbomResponse) GetUrl() string {
	return s.Data.Method.UploadUrl.Url
}
func (s *PresignSbomResponse) GetHeaders() map[string]string {
	return s.Data.Method.UploadUrl.Headers
}

func (s *NewBuildResponse) GetBuildId() string {
	return s.Data.Method.Id
}

func (s *NewBuildResponse) GetAgentAccessToken() string {
	return s.Data.Method.AgentAccessToken
}
