package controller

import (
	"encoding/json"
	"github.com/refinery-labs/loq/controller/request"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/refinery-labs/loq/model"
	"github.com/refinery-labs/loq/model/event"
	"github.com/refinery-labs/loq/service"
	"github.com/refinery-labs/loq/util"
)

type grantController struct {
	grant          service.GrantService
	jwtVerifier service.JwtVerifier
}

// GrantController ...
type GrantController interface {
	SetGrant(w http.ResponseWriter, req *http.Request)
}

// NewGrantController ...
func NewGrantController(grant service.GrantService, jwtVerifier service.JwtVerifier) GrantController {
	return &grantController{
		grant:          grant,
		jwtVerifier: jwtVerifier,
	}
}

// SetMetadata ...
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

	accessToken, err := request.GetJwtToken(r)
	if err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	claims, err := s.jwtVerifier.VerifyWithSessionClaims(accessToken)
	if err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	if err := s.grant.SetTokenGrantForSession(model.Token(input.TokenID), claims.SessionID); err != nil {
		util.RespondError(w, http.StatusInternalServerError, err)
		return
	}

	resp := event.GrantSetResponse{}

	util.Respond(w, resp)
}
