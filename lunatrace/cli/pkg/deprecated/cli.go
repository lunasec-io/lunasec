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

func NewInsertNewBuildRequest(variables map[string]string) GraphqlRequest {

	return GraphqlRequest{
		Query:         InsertNewBuildQuery,
		Variables:     variables,
		OperationName: "InsertNewBuildQuery",
	}
}

func UpdateBuildS3UrlRequest(buildId string, s3Url string) GraphqlRequest {
	variables := map[string]string{
		"id":     buildId,
		"s3_url": s3Url,
	}

	return GraphqlRequest{
		Query:         SetBuildS3UrlQuery,
		Variables:     variables,
		OperationName: "SetBuildS3Url",
	}
}

func DeleteBuildRequest(buildId string) GraphqlRequest {
	variables := map[string]string{
		"id": buildId,
	}

	return GraphqlRequest{
		Query:         DeleteBuildQuery,
		Variables:     variables,
		OperationName: "DeleteBuild",
	}
}

func PresignSbomUploadRequest(orgId string, buildId string) GraphqlRequest {
	variables := map[string]string{
		"orgId":   orgId,
		"buildId": buildId,
	}

	return GraphqlRequest{
		Query:         PresignSbomQuery,
		Variables:     variables,
		OperationName: "PresignSbom",
	}
}

func NewGetProjectInfoRequest() GraphqlRequest {
	return GraphqlRequest{
		Query:         GetProjectInfoQuery,
		Variables:     map[string]string{},
		OperationName: "GetProjectInfoQuery",
	}
}
