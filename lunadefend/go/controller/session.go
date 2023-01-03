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
	"net/http"
	"net/url"
	"time"

	"github.com/google/uuid"
	"github.com/lunasec-io/lunasec/lunadefend/go/constants"
	"github.com/lunasec-io/lunasec/lunadefend/go/controller/request"
	"github.com/lunasec-io/lunasec/lunadefend/go/gateway"
	"github.com/lunasec-io/lunasec/lunadefend/go/service"
	"github.com/lunasec-io/lunasec/lunadefend/go/types/event"
	"github.com/lunasec-io/lunasec/lunadefend/go/util"
	"github.com/pkg/errors"
	"go.uber.org/config"
	"go.uber.org/zap"
)

const (
	defaultCallbackPath = "/.lunasec/secure-frame"
)

type AuthProviderType string

const (
	BackendApplicationAuthProvider AuthProviderType = "backend_application"
)

type AuthProviderConfig struct {
	Url     string           `yaml:"url"`
	Type    AuthProviderType `yaml:"type"`
	Default bool             `yaml:"default"`
}

type AuthProviderLookup map[string]AuthProviderConfig

type SessionControllerConfig struct {
	AuthProviders AuthProviderLookup `yaml:"auth_providers"`
}

type sessionController struct {
	SessionControllerConfig
	logger                  *zap.Logger
	kv                      gateway.AwsDynamoGateway
	authProviderJwtVerifier service.JwtVerifier
	authProviders           AuthProviderLookup
	defaultAuthProvider     AuthProviderConfig
}

type SessionController interface {
	SessionEnsure(w http.ResponseWriter, r *http.Request)
	SessionVerify(w http.ResponseWriter, r *http.Request)
	SessionCreate(w http.ResponseWriter, r *http.Request)
}

func getDefaultAuthProviderFromConfig(logger *zap.Logger, controllerConfig SessionControllerConfig) (authProviders AuthProviderLookup, defaultAuthProvider AuthProviderConfig) {
	var (
		hasSetDefaultAuthProvider bool
	)

	authProviders = AuthProviderLookup{}
	for authProviderName, authProviderConfig := range controllerConfig.AuthProviders {
		parsedUrl, err := url.Parse(authProviderConfig.Url)
		if err != nil {
			err = errors.New("unable to parse auth provider url")
			logger.Error(
				err.Error(),
				zap.String("auth provider url", authProviderConfig.Url),
			)
			panic(err)
		}

		// if there is no auth provider set, we default to the backend application auth provider type
		if authProviderConfig.Type == "" {
			authProviderConfig.Type = BackendApplicationAuthProvider

			// adjust the auth provider url to include the default callback path if it is not set
			if parsedUrl.Path == "" {
				parsedUrl.Path = defaultCallbackPath
				authProviderConfig.Url = parsedUrl.String()
			}
		}

		logger.Debug(
			"loading auth provider",
			zap.String("authProvider", authProviderName),
			zap.String("authProviderType", string(authProviderConfig.Type)),
			zap.String("authProviderUrl", authProviderConfig.Url),
		)

		authProviders[authProviderName] = authProviderConfig

		// if there is only one auth provider, make this the default
		if len(controllerConfig.AuthProviders) == 1 {
			defaultAuthProvider = authProviderConfig
			break
		}

		// if the auth provider has declare itself as default, make it the default
		if authProviderConfig.Default {
			if hasSetDefaultAuthProvider {
				err = errors.New("attempting to set multiple default auth providers, this is not allowed")
				logger.Error(
					err.Error(),
					zap.String("current default auth provider", defaultAuthProvider.Url),
					zap.String("other auth provider", authProviderConfig.Url),
				)
				panic(err)
			}
			defaultAuthProvider = authProviderConfig
			hasSetDefaultAuthProvider = true
		}
	}
	return
}

func NewSessionController(
	logger *zap.Logger,
	provider config.Provider,
	kv gateway.AwsDynamoGateway,
	authProviderJwtVerifier service.JwtVerifier,
) (controller SessionController) {
	var (
		controllerConfig SessionControllerConfig
	)
	err := provider.Get("session_controller").Populate(&controllerConfig)
	if err != nil {
		logger.Error(
			err.Error(),
		)
		panic(err)
	}

	authProviders, defaultAuthProvider := getDefaultAuthProviderFromConfig(logger, controllerConfig)

	controller = &sessionController{
		SessionControllerConfig: controllerConfig,
		logger:                  logger,
		kv:                      kv,
		authProviderJwtVerifier: authProviderJwtVerifier,
		authProviders:           authProviders,
		defaultAuthProvider:     defaultAuthProvider,
	}
	return
}

func (s *sessionController) SessionVerify(w http.ResponseWriter, r *http.Request) {
	dataAccessToken, err := request.GetJwtToken(r)
	if err != nil {
		s.logger.Info("cookie not set when verifying session", zap.String("reportedError", err.Error()))
		err = errors.New("LunaSec is not logged in")
		// NOTE we return status ok here because we don't always expect the access_token to be set
		util.RespondError(w, http.StatusOK, err)
		return
	}

	err = s.authProviderJwtVerifier.Verify(dataAccessToken)
	if err != nil {
		s.logger.Info("unable to verify session", zap.String("reportedError", err.Error()))
		err = errors.New("LunaSec session cookie signing check failed")
		// NOTE we return status ok here because we don't always expect the session to be valid
		util.RespondError(w, http.StatusOK, err)
		return
	}
	util.RespondSuccess(w)
}

func (s *sessionController) getAuthProviderWithName(authProviderName string) (authProviderConfig AuthProviderConfig, err error) {
	var (
		ok bool
	)

	if authProviderName == "" {
		authProviderConfig = s.defaultAuthProvider
		return
	}

	authProviderConfig, ok = s.authProviders[authProviderName]
	if !ok {
		err = errors.New("unable to find auth provider with provided name")
	}
	return
}

func (s *sessionController) SessionEnsure(w http.ResponseWriter, r *http.Request) {
	// TODO if state token is already present in cookie, do we remove it?
	query := r.URL.Query()

	authProviderName := query.Get(constants.AuthProviderNameQueryParam)

	authProvider, err := s.getAuthProviderWithName(authProviderName)
	if err != nil {
		s.logger.Error(
			err.Error(),
			zap.String("authProviderName", authProviderName),
		)
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	stateToken := uuid.NewString()
	s.logger.Debug("creating an auth session", zap.String("stateToken", stateToken))
	err = s.kv.Set(gateway.SessionStore, stateToken, string(constants.SessionUnused))
	if err != nil {
		s.logger.Error(
			"unable to set session store state token status",
			zap.Error(err),
			zap.String("stateToken", stateToken),
		)
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	v := url.Values{}
	v.Set(constants.AuthStateQueryParam, stateToken)

	redirectUrl, err := url.Parse(authProvider.Url)
	if err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	redirectUrl.RawQuery = v.Encode()

	s.logger.Debug("redirecting session ensure request", zap.String("redirectUrl", redirectUrl.String()))

	// TODO (cthompson) revisit this cookie ttl
	util.AddCookie(w, constants.AuthStateCookie, stateToken, "/", time.Minute*15)
	http.Redirect(w, r, redirectUrl.String(), http.StatusFound)
}

func getSessionCreateRequest(r *http.Request) (req event.SessionCreateRequest, err error) {
	query := r.URL.Query()

	req.StateToken = query.Get(constants.AuthStateQueryParam)
	req.AuthToken = query.Get(constants.AuthProviderTokenQueryParam)

	if req.StateToken == "" {
		err = errors.New("missing state in request")
	}

	if req.AuthToken == "" {
		err = errors.New("missing openid_token in request")
	}

	if err != nil {
		return
	}

	req.StateCookie, err = request.GetStateCookie(r)
	if err != nil {
		err = errors.Wrap(err, "unable to get state cookie in request")
		return
	}
	return
}

// It's worth noting that none of the JSON responses here get returned to the client because of the CORS options
// including all of these nice errors.  Aside from logging in dev, all this gets lost
func (s *sessionController) SessionCreate(w http.ResponseWriter, r *http.Request) {
	req, err := getSessionCreateRequest(r)
	if err != nil {
		s.logger.Error(
			"unable to get session create request arguments",
			zap.Error(err),
		)
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	if req.StateToken != req.StateCookie.Value {
		err = errors.New("state token query parameter and state token cookie do not match")
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	sessionState, err := s.kv.Get(gateway.SessionStore, req.StateToken)
	if err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	if constants.SessionState(sessionState) == constants.SessionUsed {
		err = errors.New("attempted to complete oauth flow with an already used state")
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	claims, err := s.authProviderJwtVerifier.VerifyWithSessionClaims(req.AuthToken)
	if err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	encodedSessionHash := util.CreateSessionHash(claims.SessionID)

	w.Header().Set("SESSION_HASH", encodedSessionHash)

	// TODO (cthompson) revist this cookie ttl
	util.AddCookie(w, constants.DataAccessTokenCookie, req.AuthToken, "/", time.Minute*15)
	// removes state cookie
	util.AddCookie(w, constants.AuthStateCookie, "", "/", 0)
	util.RespondSuccess(w)
}
