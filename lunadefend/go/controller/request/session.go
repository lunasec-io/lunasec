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
package request

import (
	"fmt"
	"net/http"

	"github.com/lunasec-io/lunasec/lunadefend/go/constants"
	"github.com/pkg/errors"
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
