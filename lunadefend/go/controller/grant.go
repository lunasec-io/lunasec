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
	"github.com/lunasec-io/lunasec/lunadefend/go/controller/request"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/lunasec-io/lunasec/lunadefend/go/service"
	"github.com/lunasec-io/lunasec/lunadefend/go/types"
	"github.com/lunasec-io/lunasec/lunadefend/go/types/event"
	"github.com/lunasec-io/lunasec/lunadefend/go/util"
)

type grantController struct {
	grant       service.GrantService
	jwtVerifier service.JwtVerifier
}

// GrantController ...
type GrantController interface {
	SetGrant(w http.ResponseWriter, req *http.Request)
	VerifyGrant(w http.ResponseWriter, req *http.Request)
}

// NewGrantController ...
func NewGrantController(grant service.GrantService, jwtVerifier service.JwtVerifier) GrantController {
	return &grantController{
		grant:       grant,
		jwtVerifier: jwtVerifier,
	}
}

func (s *grantController) getSessionID(r *http.Request) (sessionID string, err error) {
	accessToken, err := request.GetJwtToken(r)
	if err != nil {
		return
	}

	claims, err := s.jwtVerifier.VerifyWithSessionClaims(accessToken)
	if err != nil {
		return
	}
	sessionID = claims.SessionID
	return
}

func (s *grantController) SetGrant(w http.ResponseWriter, r *http.Request) {
	log.Printf("Received SetGrant request")

	input := event.GrantSetRequest{}
	b, err := ioutil.ReadAll(r.Body)

	if err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	if err := json.Unmarshal(b, &input); err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	if err := s.grant.SetTokenGrantForSession(types.Token(input.TokenID), input.SessionID, constants.TokenFullAccess, input.CustomDuration); err != nil {
		util.RespondError(w, http.StatusInternalServerError, err)
		return
	}

	resp := event.GrantSetResponse{}

	util.Respond(w, resp)
}

func (s *grantController) VerifyGrant(w http.ResponseWriter, r *http.Request) {
	log.Printf("Received VerifyGrant request")

	input := event.GrantVerifyRequest{}
	b, err := ioutil.ReadAll(r.Body)

	if err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	if err := json.Unmarshal(b, &input); err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	valid, err := s.grant.ValidTokenGrantExistsForSession(types.Token(input.TokenID), input.SessionID, constants.TokenFullAccess)
	if err != nil {
		util.RespondError(w, http.StatusInternalServerError, err)
		return
	}

	resp := event.GrantVerifyResponse{
		Valid: valid,
	}

	util.Respond(w, resp)
}
