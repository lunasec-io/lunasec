package service

import (
	"github.com/refinery-labs/loq/constants"
	"net/http"
	"net/http/httputil"

	"github.com/refinery-labs/loq/controller/request"
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
