package controller

import (
	"encoding/json"
	"github.com/refinery-labs/loq/controller/request"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/pkg/errors"
	"github.com/refinery-labs/loq/model"
	"github.com/refinery-labs/loq/model/event"
	"github.com/refinery-labs/loq/service"
	"github.com/refinery-labs/loq/util"
)

type metaController struct {
	meta          service.MetadataService
	jwtVerifier service.JwtVerifier
	grant         service.GrantService
}

// MetaController ...
type MetaController interface {
	GetMetadata(w http.ResponseWriter, req *http.Request)
	SetMetadata(w http.ResponseWriter, req *http.Request)
}

// NewMetaController ...
func NewMetaController(meta service.MetadataService, jwtVerifier service.JwtVerifier, grant service.GrantService) MetaController {
	return &metaController{
		meta:          meta,
		jwtVerifier: jwtVerifier,
		grant:                     grant,
	}
}

func (s *metaController) requestHasValidGrantForToken(r *http.Request, tokenID model.Token) (valid bool, err error) {
	accessToken, err := request.GetDataAccessToken(r)
	if err != nil {
		return
	}

	claims, err := s.jwtVerifier.VerifyWithSessionClaims(accessToken)
	if err != nil {
		err = errors.Wrap(err, "unable to verify token jwt with claims")
		return
	}

	return s.grant.ValidTokenGrantExistsForSession(tokenID, claims.SessionID)
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

	valid, err := s.requestHasValidGrantForToken(r, model.Token(input.TokenID))
	if err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}
	if !valid {
		err = errors.New("no valid token grant was found for provided session and token ID")
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	meta, err := s.meta.GetMetadata(model.Token(input.TokenID))

	if err != nil {
		statusCode := 500
		if err.Error() == "unable to locate data for token" {
			statusCode = 404
		}
		util.RespondError(w, statusCode, err)
		return
	}

	resp := event.MetadataGetResponse{
		Metadata: meta,
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

	valid, err := s.requestHasValidGrantForToken(r, model.Token(input.TokenID))
	if err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}
	if !valid {
		err = errors.New("no valid token grant was found for provided session and token ID")
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	if err := s.meta.SetMetadata(model.Token(input.TokenID), input.Metadata); err != nil {
		util.RespondError(w, http.StatusInternalServerError, err)
		return
	}

	resp := event.MetadataSetResponse{}

	util.Respond(w, resp)
}
