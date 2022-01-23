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
package inventory

import (
	"bytes"
	"compress/gzip"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/rs/zerolog/log"
	"lunasec/lunatrace/inventory/syftmodel"
	"lunasec/lunatrace/pkg/constants"
	"lunasec/lunatrace/pkg/graphql"
	"lunasec/lunatrace/pkg/types"
	"lunasec/lunatrace/pkg/util"
	"net/http"
	"net/url"
)

func formatGenerateUploadUrl(orgId, projectId string) (uploadSbomUrl string, err error) {
	values := url.Values{}
	values.Set("ordId", orgId)
	values.Set("projectId", projectId)

	baseUrl, err := url.Parse(constants.UploadSbomUrl)
	if err != nil {
		fmt.Println("Malformed URL: ", err.Error())
		return
	}

	baseUrl.RawQuery = values.Encode()

	uploadSbomUrl = baseUrl.String()
	return
}

func generateUploadUrl(uploadSbomUrl string) (url string, headers map[string]string, err error) {
	var generateUploadUrlResp GenerateUploadUrlResponse

	data, err := util.HttpRequest(http.MethodGet, uploadSbomUrl, map[string]string{}, nil)
	if err != nil {
		log.Error().
			Err(err).
			Msg("Unable to get SBOM upload URL.")
		return
	}

	err = json.Unmarshal(data, &generateUploadUrlResp)
	if err != nil {
		log.Error().
			Err(err).
			Msg("Unable to parse upload sbom response.")
		return
	}

	if generateUploadUrlResp.Error {
		err = errors.New(generateUploadUrlResp.Message)
		log.Error().
			Err(err).
			Str("requestUrl", uploadSbomUrl).
			Msg("Error when attempting to get upload url.")
		return
	}
	url = generateUploadUrlResp.UploadURL.Url
	headers = generateUploadUrlResp.UploadURL.Headers
	return
}

func serializeAndCompressOutput(output SbomOutput) (buffer bytes.Buffer, err error) {
	serializedOutput, err := json.Marshal(output)
	if err != nil {
		log.Error().Err(err).Msg("unable to marshall dependencies output")
		return
	}

	gzwriter := gzip.NewWriter(&buffer)
	_, err = gzwriter.Write(serializedOutput)
	gzwriter.Close()

	if err != nil {
		log.Error().
			Err(err).
			Msg("Unable to compress sbom output.")
		return
	}
	return
}

func uploadCollectedSbomsToUrl(
	projectId string,
	sbomModel syftmodel.Document,
	uploadUrl string,
	uploadHeaders map[string]string,
) (err error) {
	output := SbomOutput{
		ProjectId: projectId,
		Sbom:      sbomModel,
	}

	serializedOutput, err := serializeAndCompressOutput(output)
	if err != nil {
		return
	}

	data, err := util.HttpRequest(http.MethodPut, uploadUrl, uploadHeaders, &serializedOutput)
	if err != nil {
		log.Error().
			Err(err).
			Str("response data", string(data)).
			Str("uploadUrl", uploadUrl).
			Interface("headers", uploadHeaders).
			Msg("Unable to upload SBOM data.")
		return
	}
	return
}

func UploadCollectedSboms(appConfig types.LunaTraceConfig, sbomModel syftmodel.Document) (err error) {
	headers := map[string]string{
		"X-LunaTrace-Project-Access-Token": appConfig.ProjectAccessToken,
	}

	var projectInfoResponse types.GetProjectInfoResponse

	err = graphql.PerformGraphqlRequest(
		appConfig.GraphqlServer,
		headers,
		graphql.NewGetProjectInfoRequest(),
		&projectInfoResponse,
	)
	if err = util.GetGraphqlError(err, projectInfoResponse.GraphqlErrors); err != nil {
		log.Error().
			Err(err).
			Msg("Unable to get project info. Make sure that your configured LUNASEC_PROJECT_SECRET is correct.")
		return
	}

	projectId := projectInfoResponse.GetProjectId()
	orgId := projectInfoResponse.GetOrganizationId()

	uploadSbomUrl, err := formatGenerateUploadUrl(orgId, projectId)
	if err != nil {
		return
	}

	uploadUrl, uploadHeaders, err := generateUploadUrl(uploadSbomUrl)
	if err != nil {
		return
	}

	err = uploadCollectedSbomsToUrl(projectId, sbomModel, uploadUrl, uploadHeaders)
	if err != nil {
		return
	}

	var newBuildResponse types.NewBuildResponse

	err = graphql.PerformGraphqlRequest(
		appConfig.GraphqlServer,
		headers,
		graphql.NewInsertNewBuildRequest(projectId, uploadUrl),
		&newBuildResponse,
	)
	if err = util.GetGraphqlError(err, newBuildResponse.GraphqlErrors); err != nil {
		log.Error().
			Err(err).
			Msg("unable to create new build for project")
		return
	}
	return
}
