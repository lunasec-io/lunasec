package request

import (
	"fmt"
	"net/http"

	"github.com/pkg/errors"
	"github.com/refinery-labs/loq/constants"
)

func GetJwtToken(r *http.Request) (token string, err error) {
	token = r.Header.Get(constants.JwtAuthHeader)
	if token != "" {
		return
	}

	token, _ = GetDataAccessToken(r)
	if token != "" {
		return
	}
	err = errors.New("jwt token not present in request")
	return
}

func GetDataAccessToken(r *http.Request) (dataAccessToken string, err error) {
	dataAccessTokenCookie, err := r.Cookie(constants.DataAccessTokenCookie)
	if err != nil {
		err = errors.Wrap(err, fmt.Sprintf("expected cookie header: %s", constants.DataAccessTokenCookie))
		return
	}
	return dataAccessTokenCookie.Value, err
}

func GetStateCookie(r *http.Request) (stateCookie *http.Cookie, err error) {
	stateCookie, err = r.Cookie(constants.AuthStateCookie)
	if err != nil {
		err = errors.Wrap(err, fmt.Sprintf("expected cookie header: %s", constants.AuthStateCookie))
		return
	}
	return stateCookie, err
}
