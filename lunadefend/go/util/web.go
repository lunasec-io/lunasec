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
	"log"
	"net/http"

	"github.com/lunasec-io/lunasec/lunadefend/go/types"
)

// Respond jsonifies a model and sends it to the client.
func Respond(w http.ResponseWriter, data interface{}) {
	resp := types.HTTPResponse{
		Success: true,
		Data:    &data,
	}

	body, err := json.Marshal(resp)

	// TODO standardize outputs into json strings
	if err != nil {
		RespondError(w, http.StatusInternalServerError, err)
	}

	w.Write(body)
}

// RespondSuccess jsonifies a model and sends it to the client.
func RespondSuccess(w http.ResponseWriter) {
	resp := types.HTTPResponse{
		Success: true,
	}

	body, err := json.Marshal(resp)

	// TODO standardize outputs into json strings
	if err != nil {
		RespondError(w, http.StatusInternalServerError, err)
	}

	w.Write(body)
}

// RespondError ...
func RespondError(w http.ResponseWriter, status int, err error) {
	log.Printf("Error while processing request: \"%s\"", err)

	// TODO send error code when responding
	errorStr := err.Error()
	resp := types.HTTPResponse{
		Success: false,
		Error: types.ErrorResponse{
			Message: errorStr,
			Name:    "TokenizerError", // Eventually it would be nice to wrap errors with more info like this name field so the frontend can display more meaningful errors
		},
	}

	body, err := json.Marshal(resp)

	if err != nil {
		panic(err)
	}

	w.WriteHeader(status)
	w.Header().Set("Content-Type", "application/json")
	w.Write(body)
}
