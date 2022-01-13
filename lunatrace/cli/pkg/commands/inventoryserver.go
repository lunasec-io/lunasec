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
package commands

import (
	"encoding/json"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
	"io/ioutil"
	"lunasec/lunatrace/pkg/types/model"
	"net/http"
	"time"
)

func InventoryServerCommand(c *cli.Context, globalBoolFlags map[string]bool) (err error) {
	enableGlobalFlags(c, globalBoolFlags)

	http.HandleFunc("/sbom", HandleSbom)
	http.HandleFunc("/application/identify", HandleSbom)

	err = http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to start inventory server")
	}
	return
}

type HandleSbomRequest struct {
	ApplicationId string           `json:"application_id"`
	Sboms         []model.Document `json:"sboms"`
}

type ApplicationSbomUpload struct {
	UploadTime time.Time
	Sboms      []model.Document
}

var (
	uploadedSboms = map[string][]ApplicationSbomUpload{}
)

func HandleSbom(w http.ResponseWriter, r *http.Request) {
	var (
		handleSbomRequest HandleSbomRequest
	)

	switch r.Method {
	case http.MethodPut:
		reader, err := r.GetBody()
		if err != nil {
			log.Error().
				Msg("unable to get body")
			w.WriteHeader(500)
			return
		}
		defer reader.Close()

		body, err := ioutil.ReadAll(reader)
		if err != nil {
			log.Error().
				Msg("unable to read body")
			w.WriteHeader(500)
			return
		}

		err = json.Unmarshal(body, &handleSbomRequest)
		if err != nil {
			log.Error().
				Err(err).
				Msg("unable to unmarshal body")
			w.WriteHeader(500)
			return
		}

		upload := []ApplicationSbomUpload{
			{
				UploadTime: time.Now(),
				Sboms:      handleSbomRequest.Sboms,
			},
		}

		if applicationUploads, ok := uploadedSboms[handleSbomRequest.ApplicationId]; ok {
			upload = append(applicationUploads, upload...)
		}

		uploadedSboms[handleSbomRequest.ApplicationId] = upload

	case http.MethodGet:
		values := r.URL.Query()

		applicationId := values.Get("application-id")

		uploads, ok := uploadedSboms[applicationId]
		if !ok {
			log.Error().
				Str("applicationId", applicationId).
				Msg("unable to find entries for application id")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		marshaledUploads, err := json.Marshal(uploads)
		if err != nil {
			log.Error().
				Err(err).
				Msg("unable to marshal response")
			w.WriteHeader(500)
			return
		}

		w.Write(marshaledUploads)

	default:
		log.Error().
			Str("method", r.Method).
			Msg("no method handler")
	}
}
