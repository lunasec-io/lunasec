package controller

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

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

	if err := s.meta.SetMetadata(model.Token(input.TokenID), input.Metadata); err != nil {
		util.RespondError(w, http.StatusInternalServerError, err)
		return
	}

	resp := event.MetadataSetResponse{}

	util.Respond(w, resp)
}
