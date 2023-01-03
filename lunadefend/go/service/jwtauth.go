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
package service

import (
	"github.com/lunasec-io/lunasec/lunadefend/go/constants"
	"github.com/lunasec-io/lunasec/lunadefend/go/util"
	"net/http"
	"net/http/httputil"

	"github.com/lunasec-io/lunasec/lunadefend/go/controller/request"
	"go.uber.org/zap"
)

type jwtHttpAuth struct {
	logger      *zap.Logger
	jwtVerifier JwtVerifier
}

type JwtHttpAuth interface {
	WithJwtAuth(allowedSubjects []constants.JwtSubject, next http.HandlerFunc) http.HandlerFunc
}

func NewJwtHttpAuth(logger *zap.Logger, jwtVerifier JwtVerifier) JwtHttpAuth {
	return &jwtHttpAuth{
		logger:      logger,
		jwtVerifier: jwtVerifier,
	}
}

func (j *jwtHttpAuth) defaultUnauthorizedHandler(w http.ResponseWriter, r *http.Request) {
	serializedReq, _ := httputil.DumpRequest(r, false)
	j.logger.Info(
		"unauthorized request received",
		zap.String("request", string(serializedReq)),
	)

	http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
}

func subjectIsAllowed(subject constants.JwtSubject, allowedSubjects []constants.JwtSubject) bool {
	for _, s := range allowedSubjects {
		if s == subject {
			return true
		}
	}
	return false
}

func (j *jwtHttpAuth) sessionHashMatchesProvidedIdentity(sessionID string, w http.ResponseWriter, r *http.Request) bool {
	sessionHash := util.CreateSessionHash(sessionID)

	requestSessionHash := r.Header.Get(constants.SessionHashHeader)
	if requestSessionHash == "" {
		j.logger.Debug(
			"session hash header not set, setting it now",
			zap.String("sessionHash", sessionHash),
		)
		w.Header().Set(constants.SessionHashHeader, sessionHash)
		return true
	}

	if requestSessionHash == sessionHash {
		return true
	}
	return false
}

func (j *jwtHttpAuth) WithJwtAuth(allowedSubjects []constants.JwtSubject, next http.HandlerFunc) http.HandlerFunc {
	unauthHandler := http.HandlerFunc(j.defaultUnauthorizedHandler)
	return func(w http.ResponseWriter, r *http.Request) {
		j.logger.Debug(
			"validating auth for request",
			zap.String("method", r.Method),
			zap.String("path", r.URL.Path),
		)

		jwtToken, err := request.GetJwtToken(r)
		if err != nil {
			j.logger.Error(
				"unable to get jwt token from request",
				zap.Error(err),
			)
			unauthHandler.ServeHTTP(w, r)
			return
		}

		claims, err := j.jwtVerifier.VerifyWithSessionClaims(jwtToken)
		if err != nil {
			j.logger.Error(
				"invalid jwt token",
				zap.String("jwt", jwtToken),
				zap.Error(err),
			)
			unauthHandler.ServeHTTP(w, r)
			return
		}

		if !j.sessionHashMatchesProvidedIdentity(claims.SessionID, w, r) {
			j.logger.Error(
				"provided identity does not match the pre-existing session",
				zap.String("jwt", jwtToken),
				zap.String("sessionHash", ""),
				zap.Error(err),
			)
			unauthHandler.ServeHTTP(w, r)
			return
		}

		subject := constants.JwtSubject(claims.Subject)
		if !subjectIsAllowed(subject, allowedSubjects) {
			j.logger.Error(
				"subject is not allowed",
				zap.String("jwt", jwtToken),
				zap.String("subject", claims.Subject),
				zap.Strings("allowedSubjects", constants.SubjectsToStringSlice(allowedSubjects)),
				zap.Error(err),
			)
			unauthHandler.ServeHTTP(w, r)
			return
		}

		next.ServeHTTP(w, r)
	}
}
