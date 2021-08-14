package util

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/refinery-labs/loq/types"
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
		Error:   types.ErrorResponse{
			Message: errorStr,
			Name: "TokenizerError",
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
