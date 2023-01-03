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
	"github.com/lunasec-io/lunasec/lunadefend/go/constants"
	"github.com/lunasec-io/lunasec/lunadefend/go/util/auth"
	"io/ioutil"
	"log"
	"net/http"

	"go.uber.org/config"

	"github.com/lunasec-io/lunasec/lunadefend/go/service"
	"github.com/lunasec-io/lunasec/lunadefend/go/types"
	"github.com/lunasec-io/lunasec/lunadefend/go/types/event"
	"github.com/lunasec-io/lunasec/lunadefend/go/util"
	"github.com/pkg/errors"
)

type tokenizerController struct {
	tokenizerControllerConfig
	tokenizer   service.TokenizerService
	jwtVerifier service.JwtVerifier
	meta        service.MetadataService
	grant       service.GrantService
}

type tokenizerControllerConfig struct {
}

type TokenizerController interface {
	TokenizerGet(w http.ResponseWriter, req *http.Request)
	TokenizerSet(w http.ResponseWriter, req *http.Request)
}

func NewTokenizerController(
	provider config.Provider,
	tokenizer service.TokenizerService,
	jwtVerifier service.JwtVerifier,
	meta service.MetadataService,
	grant service.GrantService,
) (controller TokenizerController) {
	var (
		controllerConfig tokenizerControllerConfig
	)

	err := provider.Get("tokenizer_controller").Populate(&controllerConfig)
	if err != nil {
		panic(err)
	}

	controller = &tokenizerController{
		tokenizerControllerConfig: controllerConfig,
		tokenizer:                 tokenizer,
		jwtVerifier:               jwtVerifier,
		meta:                      meta,
		grant:                     grant,
	}
	return
}

func (s *tokenizerController) requestHasValidGrantForToken(r *http.Request, tokenID types.Token) (valid bool, err error) {
	claims, err := auth.GetRequestClaims(s.jwtVerifier, r)
	if err != nil {
		err = errors.Wrap(err, "unable to verify token jwt with claims")
		return
	}

	return s.grant.ValidTokenGrantExistsForSession(tokenID, claims.SessionID, constants.TokenFullAccess)
}

func (s *tokenizerController) TokenizerGet(w http.ResponseWriter, r *http.Request) {
	log.Printf("Received TokenizerGet request")

	input := event.TokenizerGetRequest{}
	b, err := ioutil.ReadAll(r.Body)

	if err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	if err := json.Unmarshal(b, &input); err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	valid, err := s.requestHasValidGrantForToken(r, types.Token(input.TokenID))
	if err != nil {
		log.Println(err)
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	if !valid {
		err = errors.New("session does not have valid token grant available to detokenize")
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	url, headers, err := s.tokenizer.TokenizerGet(types.Token(input.TokenID))
	if err != nil {
		statusCode := 500
		// TODO: Make this error message a constant
		if err.Error() == "unable to locate data for token" {
			statusCode = 404
		}
		util.RespondError(w, statusCode, err)
		return
	}

	resp := event.TokenizerGetResponse{
		DownloadURL: url,
		Headers:     headers,
	}

	util.Respond(w, resp)
}

func (s *tokenizerController) TokenizerSet(w http.ResponseWriter, r *http.Request) {
	log.Printf("Received TokenizerSet request")

	input := event.TokenizerSetRequest{}
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

	tokenID, url, headers, err := s.tokenizer.TokenizerSet()
	if err != nil {
		util.RespondError(w, http.StatusInternalServerError, err)
		return
	}

	if len(input.Metadata) > 0 {
		if err := s.meta.SetMetadata(tokenID, claims, input.Metadata); err != nil {
			util.RespondError(w, http.StatusInternalServerError, err)
			return
		}
	}
	//We automatically create grants for new tokens so that they can be set in the DB, and detokenized elsewhere in the same browser session
	if err := s.grant.SetTokenGrantForSession(tokenID, claims.SessionID, constants.TokenFullAccess, ""); err != nil {
		util.RespondError(w, http.StatusInternalServerError, err)
		return
	}

	resp := event.TokenizerSetResponse{
		TokenID:   string(tokenID),
		UploadURL: url,
		Headers:   headers,
	}

	util.Respond(w, resp)
}
