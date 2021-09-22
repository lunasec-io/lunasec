package controller

import (
	"encoding/json"
	"github.com/refinery-labs/loq/constants"
	"github.com/refinery-labs/loq/controller/request"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/refinery-labs/loq/service"
	"github.com/refinery-labs/loq/types"
	"github.com/refinery-labs/loq/types/event"
	"github.com/refinery-labs/loq/util"
)

type grantController struct {
	grant          service.GrantService
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
		grant:          grant,
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

	if err := s.grant.SetTokenGrantForSession(types.Token(input.TokenID), input.SessionID, constants.TokenFullAccess); err != nil {
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
