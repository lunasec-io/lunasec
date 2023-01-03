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
package util

import (
	"encoding/json"
	"fmt"
	"github.com/awslabs/aws-lambda-go-api-proxy/core"
	"github.com/lunasec-io/lunasec/lunadefend/go/types"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
)

// from: https://github.com/aquasecurity/lmdrouter/blob/master/encoder.go

// MarshalApiGatewayResponse generated an events.APIGatewayProxyResponse object that can
// be directly returned via the lambda's handler function. It receives an HTTP
// status code for the response, a map of HTTP headers (can be empty or nil),
// and a value (probably a struct) representing the response body. This value
// will be marshaled to JSON (currently without base 64 encoding).
func MarshalApiGatewayResponse(status int, headers map[string]string, data interface{}) (
	events.APIGatewayProxyResponse,
	error,
) {
	b, err := json.Marshal(data)
	if err != nil {
		status = http.StatusInternalServerError
		b = []byte(`{"code":500,"message":"the server has encountered an unexpected error"}`)
	}

	if headers == nil {
		headers = make(map[string]string)
	}
	headers["Content-Type"] = "application/json; charset=UTF-8"

	return events.APIGatewayProxyResponse{
		StatusCode:      status,
		IsBase64Encoded: false,
		Headers:         headers,
		Body:            string(b),
	}, nil
}

// ApiGatewayError generates an events.APIGatewayProxyResponse from an error value.
func ApiGatewayError(err error) (events.APIGatewayProxyResponse, error) {
	httpErr := types.HTTPError{
		Error: err.Error(),
	}

	return MarshalApiGatewayResponse(
		http.StatusInternalServerError,
		nil,
		httpErr,
	)
}

func GetAPIGatewayTokenizerURL(r *http.Request) (tokenizerURL string) {
	requestContext, ok := core.GetAPIGatewayContextFromContext(r.Context())
	if ok {
		// the request came from API gateway, build the backend url
		tokenizerURL = fmt.Sprintf("%s://%s/%s", r.URL.Scheme, requestContext.DomainName, requestContext.Stage)
	}
	return
}
