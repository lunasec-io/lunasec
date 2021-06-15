package controller

import (
	"net/http"
	"net/url"
	"time"

	"github.com/google/uuid"
	"github.com/pkg/errors"
	"github.com/refinery-labs/loq/constants"
	"github.com/refinery-labs/loq/controller/request"
	"github.com/refinery-labs/loq/gateway"
	"github.com/refinery-labs/loq/model/event"
	"github.com/refinery-labs/loq/service"
	"github.com/refinery-labs/loq/util"
	"go.uber.org/config"
	"go.uber.org/zap"
)

type sessionController struct {
	SessionControllerConfig
	logger                  *zap.Logger
	kv                      gateway.DynamoKvGateway
	authProviderJwtVerifier service.JwtVerifier
}

type SessionControllerConfig struct {
	AuthCallbackUrl string `yaml:"auth_callback_url"`
}

type SessionController interface {
	SessionEnsure(w http.ResponseWriter, r *http.Request)
	SessionVerify(w http.ResponseWriter, r *http.Request)
	SessionCreate(w http.ResponseWriter, r *http.Request)
}

func NewSessionController(
	logger *zap.Logger,
	provider config.Provider,
	kv gateway.DynamoKvGateway,
	authProviderJwtVerifier service.JwtVerifier,
) (controller SessionController, err error) {
	var controllerConfig SessionControllerConfig
	err = provider.Get("session_controller").Populate(&controllerConfig)
	if err != nil {
		return
	}

	controller = &sessionController{
		SessionControllerConfig: controllerConfig,
		logger:                  logger,
		kv:                      kv,
		authProviderJwtVerifier: authProviderJwtVerifier,
	}
	return
}

func (s *sessionController) SessionEnsure(w http.ResponseWriter, r *http.Request) {
	dataAccessToken, err := request.GetDataAccessToken(r)
	if err != nil {
		s.logger.Warn("cookie not set", zap.Error(err))
		err = errors.New("cookie 'access_token' not set in request")
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	err = s.authProviderJwtVerifier.Verify(dataAccessToken)
	if err != nil {
		s.logger.Warn("unable to verify session", zap.Error(err))
		err = errors.New("unable to verify session")
		util.RespondError(w, http.StatusUnauthorized, err)
		return
	}
	util.RespondSuccess(w)
}

func (s *sessionController) SessionVerify(w http.ResponseWriter, r *http.Request) {
	// TODO if state token is already present in cookie, do we remove it?
	s.logger.Info("received session ensure request")

	stateToken := uuid.NewString()
	err := s.kv.Set(gateway.SessionStore, stateToken, string(constants.SessionUnused))
	if err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	v := url.Values{}
	v.Set(constants.AuthStateQueryParam, stateToken)

	oauthUrl, err := url.Parse(s.AuthCallbackUrl)
	if err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	oauthUrl.RawQuery = v.Encode()
	oauthUrl.Path = "/secure-frame"

	// TODO (cthompson) revisit this cookie ttl
	util.AddCookie(w, constants.AuthStateCookie, stateToken, "/", time.Hour)
	http.Redirect(w, r, oauthUrl.String(), http.StatusFound)
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

func (s *sessionController) SessionCreate(w http.ResponseWriter, r *http.Request) {
	s.logger.Info("received session create request")
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

	err = s.authProviderJwtVerifier.Verify(req.AuthToken)
	if err != nil {
		util.RespondError(w, http.StatusBadRequest, err)
		return
	}

	// TODO (cthompson) revist this cookie ttl
	util.AddCookie(w, constants.DataAccessTokenCookie, req.AuthToken, "/", -1)
	// removes state cookie
	util.AddCookie(w, constants.AuthStateCookie, "", "/", 0)
	w.WriteHeader(200)
}
