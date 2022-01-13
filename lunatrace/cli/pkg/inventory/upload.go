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
package cloudscan

import (
	"bytes"
	"compress/gzip"
	"encoding/json"
	"errors"
	"fmt"
	"lunasec/log4shell/constants"
	"lunasec/log4shell/types"
	"lunasec/log4shell/types/model"
	"lunasec/log4shell/util"
	"github.com/rs/zerolog/log"
	"net/http"
	"net/url"
)

func formatGenerateUploadUrl(email, applicationName string) (uploadSbomUrl string, err error) {
	metadata := map[string]string{
		"name": applicationName,
	}

	metadataBytes, err := json.Marshal(metadata)

	values := url.Values{}
	values.Set("email", email)
	values.Set("metadata", string(metadataBytes))

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
	var generateUploadUrlResp types.GenerateUploadUrlResponse

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

func serializeAndCompressOutput(output types.SbomOutput) (buffer bytes.Buffer, err error) {
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

func UploadCollectedSboms(email, applicationName string, sbomModels []model.Document) (err error) {
	output := types.SbomOutput{
		Email:           email,
		ApplicationName: applicationName,
		Sboms:           sbomModels,
	}

	serializedOutput, err := serializeAndCompressOutput(output)
	if err != nil {
		return
	}

	uploadSbomUrl, err := formatGenerateUploadUrl(email, applicationName)
	if err != nil {
		return
	}

	uploadUrl, uploadHeaders, err := generateUploadUrl(uploadSbomUrl)
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
