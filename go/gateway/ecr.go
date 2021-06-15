// go:generate mockgen

package gateway

import (
	"encoding/base64"
	"errors"
	"log"
	"strings"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/ecr"
	"github.com/google/go-containerregistry/pkg/authn"
	"github.com/refinery-labs/loq/util"
)

type awsECRGateway struct {
	session *session.Session
}

type AwsECRGateway interface {
	GetCredentials() (authConfig authn.AuthConfig, err error)
}

func NewAwsECRGatewayWithoutConfig(region string) AwsECRGateway {
	sess, err := session.NewSession(
		&aws.Config{
			Region: aws.String(region),
		},
	)

	if err != nil {
		util.Panicf("Failed to instantiate ecr session %s", err)
	}
	return &awsECRGateway{
		session: sess,
	}
}

func (s *awsECRGateway) GetCredentials() (authConfig authn.AuthConfig, err error) {
	log.Println("Getting authorization token from ecr...")
	ecrClient := ecr.New(s.session)
	ecrAuthToken, err := ecrClient.GetAuthorizationToken(nil)

	authData := ecrAuthToken.AuthorizationData
	if len(authData) == 0 {
		err = errors.New("No auth data for ecr")
		log.Println(err)
		return
	}

	authToken := *authData[0].AuthorizationToken

	auth, err := base64.StdEncoding.DecodeString(authToken)
	if err != nil {
		log.Println(err)
		return
	}

	authParts := strings.Split(string(auth), ":")

	authConfig = authn.AuthConfig{
		Username: authParts[0],
		Password: authParts[1],
	}
	return
}
