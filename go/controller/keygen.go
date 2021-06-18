package controller

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"go.uber.org/config"

	"github.com/pkg/errors"
	"github.com/refinery-labs/loq/model"
	"github.com/refinery-labs/loq/model/event"
	"github.com/refinery-labs/loq/service"
	"github.com/refinery-labs/loq/util"
)

type tokenizerController struct {
	tokenizerControllerConfig
	tokenizer     service.TokenizerService
	tokenVerifier service.JwtVerifier
	meta          service.MetadataService
}

type tokenizerControllerConfig struct {
	CustomerTokenSecret string `yaml:"customer_token_secret"`
}

type TokenizerController interface {
	TokenizerGet(w http.ResponseWriter, req *http.Request)
	TokenizerSet(w http.ResponseWriter, req *http.Request)
}

func NewTokenizerController(provider config.Provider, tokenizer service.TokenizerService, tokenVerifier service.JwtVerifier, meta service.MetadataService) (controller TokenizerController, err error) {
	var (
		controllerConfig tokenizerControllerConfig
	)

	err = provider.Get("tokenizer_controller").Populate(&controllerConfig)
	if err != nil {
		return
	}

	controller = &tokenizerController{
		tokenizerControllerConfig: controllerConfig,
		tokenizer:                 tokenizer,
		tokenVerifier:             tokenVerifier,
		meta:                      meta,
	}
	return
}

func (s *tokenizerController) validateTokenJwt(tokenJwt string) (tokenID string, err error) {
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

	grantType, tokenJwt, err := util.ParseLunaSecGrantToGrantTypeAndJwt(input.TokenJwt)
	if err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	log.Printf("Grant Type: " + grantType + ", JWT: " + tokenJwt)

	tokenID, err := s.validateTokenJwt(tokenJwt)
	if err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	url, headers, err := s.tokenizer.TokenizerGet(s.CustomerTokenSecret, model.Token(tokenID))

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

	tokenID, url, headers, err := s.tokenizer.TokenizerSet(s.CustomerTokenSecret)
	if err != nil {
		util.RespondError(w, http.StatusInternalServerError, err)
		return
	}

	if len(input.Metadata) > 0 {
		if err := s.meta.SetMetadata(model.Token(tokenID), input.Metadata); err != nil {
			util.RespondError(w, http.StatusInternalServerError, err)
			return
		}
	}

	resp := event.TokenizerSetResponse{
		TokenID:   string(tokenID),
		UploadURL: url,
		Headers:   headers,
	}

	util.Respond(w, resp)
}
