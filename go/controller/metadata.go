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

type metaController struct {
	meta          service.MetadataService
	tokenVerifier service.JwtVerifier
}

// MetaController ...
type MetaController interface {
	GetMetadata(w http.ResponseWriter, req *http.Request)
	SetMetadata(w http.ResponseWriter, req *http.Request)
}

// NewMetaController ...
func NewMetaController(meta service.MetadataService, tokenVerifier service.JwtVerifier) MetaController {
	return &metaController{
		meta:          meta,
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

	tokenID, err := s.validateTokenJwt(input.TokenID)
	if err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	meta, err := s.meta.GetMetadata(model.Token(tokenID))

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
