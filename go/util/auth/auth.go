package auth

import (
	"github.com/refinery-labs/loq/controller/request"
	"github.com/refinery-labs/loq/service"
	"github.com/refinery-labs/loq/types"
	"net/http"
)

func GetRequestClaims(jwtVerifier service.JwtVerifier, r *http.Request) (claims *types.SessionJwtClaims, err error) {
	accessToken, err := request.GetJwtToken(r)
	if err != nil {
		return
	}

	return jwtVerifier.VerifyWithSessionClaims(accessToken)
}
