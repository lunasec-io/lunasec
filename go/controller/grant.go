package controller

import (
"encoding/json"
"io/ioutil"
"log"
"net/http"

"github.com/pkg/errors"
"github.com/refinery-labs/loq/model"
"github.com/refinery-labs/loq/model/event"
"github.com/refinery-labs/loq/service"
"github.com/refinery-labs/loq/util"
)

type grantController struct {
	grant          service.GrantService
	tokenVerifier service.JwtVerifier
}

// GrantController ...
type GrantController interface {
	SetGrant(w http.ResponseWriter, req *http.Request)
}

// NewGrantController ...
func NewGrantController(grant service.GrantService, tokenVerifier service.JwtVerifier) GrantController {
	return &grantController{
		grant:          grant,
		tokenVerifier: tokenVerifier,
	}
}

func (s *metaController) validateTokenJwt(tokenJwt string) (tokenID string, err error) {
	claims, err := s.tokenVerifier.VerifyWithLunaSecTokenClaims(tokenJwt)
	if err != nil {
		err = errors.Wrap(err, "unable to verify token jwt with claims")
		return
	}

	// TODO (cthompson): should we validate the claims further here? we could check if the subject
	// matches the session that has been provided to us

	tokenID = claims.TokenID
	return
}

// SetMetadata ...
func (s *grantController) SetGrant(w http.ResponseWriter, r *http.Request) {
	log.Printf("Received SetGrant request")

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

	tokenID, err := s.validateTokenJwt(input.TokenID)
	if err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	if err := s.meta.SetMetadata(model.Token(tokenID), input.Metadata); err != nil {
		util.RespondError(w, http.StatusInternalServerError, err)
		return
	}

	resp := event.MetadataSetResponse{}

	util.Respond(w, resp)
}
