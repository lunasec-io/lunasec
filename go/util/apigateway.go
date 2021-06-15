package util

import (
	"encoding/json"
	"github.com/refinery-labs/loq/model"
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
	httpErr := model.HTTPError{
		Error: err.Error(),
	}

	return MarshalApiGatewayResponse(
		http.StatusInternalServerError,
		nil,
		httpErr,
	)
}