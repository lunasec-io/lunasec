package controller

import (
	"encoding/json"
	"github.com/refinery-labs/loq/constants"
	"github.com/refinery-labs/loq/controller/request"
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
	jwtVerifier service.JwtVerifier
	meta          service.MetadataService
	grant         service.GrantService
}

type tokenizerControllerConfig struct {
	CustomerTokenSecret string `yaml:"customer_token_secret"`
}

type TokenizerController interface {
	TokenizerGet(w http.ResponseWriter, req *http.Request)
	TokenizerSet(w http.ResponseWriter, req *http.Request)
}

func NewTokenizerController(provider config.Provider, tokenizer service.TokenizerService, jwtVerifier service.JwtVerifier, meta service.MetadataService, grant service.GrantService) (controller TokenizerController, err error) {
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
		jwtVerifier:             jwtVerifier,
		meta:                      meta,
		grant:                     grant,
	}
	return
}

func (s *tokenizerController) getRequestClaims(r *http.Request) (claims *model.SessionJwtClaims, err error) {
	accessToken, err := request.GetJwtToken(r)
	if err != nil {
		return
	}

	return s.jwtVerifier.VerifyWithSessionClaims(accessToken)
}

func (s *tokenizerController) requestHasValidGrantForToken(r *http.Request, tokenID model.Token) (valid bool, err error) {
	claims, err := s.getRequestClaims(r)
	if err != nil {
		err = errors.Wrap(err, "unable to verify token jwt with claims")
		return
	}

	return s.grant.ValidTokenGrantExistsForSession(tokenID, claims.SessionID, constants.ReadToken)
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

	valid, err := s.requestHasValidGrantForToken(r, model.Token(input.TokenID))
	if err != nil {
		log.Println(err)
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	if !valid {
		err = errors.New("session does not have valid token grant available to detokeni")
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	url, headers, err := s.tokenizer.TokenizerGet(s.CustomerTokenSecret, model.Token(input.TokenID))

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
		if err := s.meta.SetMetadata(tokenID, input.Metadata); err != nil {
			util.RespondError(w, http.StatusInternalServerError, err)
			return
		}
	}
	claims, err := s.getRequestClaims(r)
	if err != nil {
		err = errors.Wrap(err, "unable to verify token jwt with claims")
		return
	}

	// create grants for both reading the token, in case the front end wants to be able to read the token right away
	// and also a grant for the customer's backend to verify the token was created by this session id
	if err := s.grant.SetTokenGrantForSession(tokenID, claims.SessionID, constants.ReadToken); err != nil {
		util.RespondError(w, http.StatusInternalServerError, err)
		return
	}
	if err := s.grant.SetTokenGrantForSession(tokenID, claims.SessionID, constants.StoreToken); err != nil {
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
