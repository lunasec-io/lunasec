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
	"encoding/json"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
	"io/ioutil"
	"lunasec/lunatrace/inventory/syftmodel"
	"lunasec/lunatrace/pkg/command"
	"net/http"
	"time"
)

func InventoryServerCommand(c *cli.Context, globalBoolFlags map[string]bool) (err error) {
	command.EnableGlobalFlags(c, globalBoolFlags)

	http.HandleFunc("/sbom", HandleSbom)
	http.HandleFunc("/application/identify", HandleIdentify)

	err = http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to start inventory server")
	}
	return
}

type HandleIdentifyRequest struct {
	ApplicationId string `json:"application_id"`
}

type HandleSbomRequest struct {
	ApplicationId string               `json:"application_id"`
	Sboms         []syftmodel.Document `json:"sboms"`
}

type ApplicationSbomUpload struct {
	UploadTime time.Time
	Sboms      []syftmodel.Document
}

var (
	uploadedSboms = map[string][]ApplicationSbomUpload{}
)

func readBody(r *http.Request, i interface{}) (err error) {
	reader, err := r.GetBody()
	if err != nil {
		log.Error().
			Msg("unable to get body")
		return
	}
	defer reader.Close()

	body, err := ioutil.ReadAll(reader)
	if err != nil {
		log.Error().
			Msg("unable to read body")
		return
	}

	err = json.Unmarshal(body, i)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to unmarshal body")
		return
	}
	return
}

func HandleIdentify(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		var (
			handleIdentifyRequest HandleIdentifyRequest
		)

		err := readBody(r, &handleIdentifyRequest)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		log.Info().
			Str("applicationId", handleIdentifyRequest.ApplicationId).
			Msg("application has identified itself")
	default:
		log.Error().
			Str("method", r.Method).
			Msg("no method handler")
	}
}

func HandleSbom(w http.ResponseWriter, r *http.Request) {
	var (
		handleSbomRequest HandleSbomRequest
	)

	err := readBody(r, &handleSbomRequest)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	switch r.Method {
	case http.MethodPut:
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
