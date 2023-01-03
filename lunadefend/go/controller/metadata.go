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
package controller

import (
	"encoding/json"
	"github.com/lunasec-io/lunasec/lunadefend/go/util/auth"
	"github.com/pkg/errors"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/lunasec-io/lunasec/lunadefend/go/service"
	"github.com/lunasec-io/lunasec/lunadefend/go/types"
	"github.com/lunasec-io/lunasec/lunadefend/go/types/event"
	"github.com/lunasec-io/lunasec/lunadefend/go/util"
)

type metaController struct {
	meta        service.MetadataService
	jwtVerifier service.JwtVerifier
	grant       service.GrantService
}

// MetaController ...
type MetaController interface {
	GetMetadata(w http.ResponseWriter, req *http.Request)
	SetMetadata(w http.ResponseWriter, req *http.Request)
}

// NewMetaController ...
func NewMetaController(meta service.MetadataService, jwtVerifier service.JwtVerifier, grant service.GrantService) MetaController {
	return &metaController{
		meta:        meta,
		jwtVerifier: jwtVerifier,
		grant:       grant,
	}
}

// GetMetadata ...
func (s *metaController) GetMetadata(w http.ResponseWriter, r *http.Request) {
	log.Printf("Received GetMetadata request")

	input := event.MetadataGetRequest{}
	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	if err := json.Unmarshal(b, &input); err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	meta, err := s.meta.GetMetadata(types.Token(input.TokenID))
	if err != nil {
		statusCode := 500
		if err.Error() == "unable to locate metadata for token" {
			statusCode = 404
		}
		util.RespondError(w, statusCode, err)
		return
	}

	resp := event.MetadataGetResponse{
		Metadata: meta.CustomMetadata,
	}

	util.Respond(w, resp)
}

// SetMetadata ...
func (s *metaController) SetMetadata(w http.ResponseWriter, r *http.Request) {
	log.Printf("Received SetMetadata request")

	input := event.MetadataSetRequest{}
	b, err := ioutil.ReadAll(r.Body)

	if err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	if err := json.Unmarshal(b, &input); err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	claims, err := auth.GetRequestClaims(s.jwtVerifier, r)
	if err != nil {
		err = errors.Wrap(err, "unable to verify token jwt with claims")
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	if err := s.meta.SetMetadata(types.Token(input.TokenID), claims, input.Metadata); err != nil {
		util.RespondError(w, http.StatusInternalServerError, err)
		return
	}

	resp := event.MetadataSetResponse{}

	util.Respond(w, resp)
}
