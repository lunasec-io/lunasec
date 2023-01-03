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
//
// go:generate mockgen

package gateway

import (
	"encoding/base64"
	"errors"
	"fmt"
	"log"
	"strings"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/ecr"
	"github.com/aws/aws-sdk-go/service/ecrpublic"
	"github.com/google/go-containerregistry/pkg/authn"
	"github.com/lunasec-io/lunasec/lunadefend/go/util"
)

type awsECRGateway struct {
	session *session.Session
}

type AwsECRGateway interface {
	GetCredentials() (authConfig authn.AuthConfig, err error)
	GetPublicCredentials() (authConfig authn.AuthConfig, err error)
	CreateRepository(repoName string) error
	GetLatestImageTag(repoName string) (tag string, err error)
}

func NewAwsECRGateway() AwsECRGateway {
	sess, err := session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	})

	if err != nil {
		util.Panicf("Failed to instantiate ecr session %s", err)
	}
	return &awsECRGateway{
		session: sess,
	}
}

func (s *awsECRGateway) CreateRepository(repoName string) error {
	ecrClient := ecr.New(s.session)
	req := &ecr.CreateRepositoryInput{
		RepositoryName: aws.String(repoName),
	}
	_, err := ecrClient.CreateRepository(req)
	if err != nil {
		return err
	}
	return nil
}

func (s *awsECRGateway) GetPublicCredentials() (authConfig authn.AuthConfig, err error) {
	log.Println("Getting authorization token from ecr public...")
	ecrClient := ecrpublic.New(s.session, aws.NewConfig().WithRegion("us-east-1"))
	input := &ecrpublic.GetAuthorizationTokenInput{}
	ecrAuthToken, err := ecrClient.GetAuthorizationToken(input)
	if err != nil {
		log.Println(err)
		return
	}

	authData := ecrAuthToken.AuthorizationData
	authToken := *authData.AuthorizationToken
	return s.getAuthConfig(authToken)
}

func (s *awsECRGateway) GetCredentials() (authConfig authn.AuthConfig, err error) {
	log.Println("Getting authorization token from ecr...")
	ecrClient := ecr.New(s.session)
	ecrAuthToken, err := ecrClient.GetAuthorizationToken(nil)
	if err != nil {
		log.Println(err)
		return
	}

	authData := ecrAuthToken.AuthorizationData
	if len(authData) == 0 {
		err = errors.New("no auth data for ecr")
		log.Println(err)
		return
	}

	authToken := *authData[0].AuthorizationToken
	return s.getAuthConfig(authToken)
}

func (s *awsECRGateway) getAuthConfig(authToken string) (authConfig authn.AuthConfig, err error) {
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

func (s *awsECRGateway) GetLatestImageTag(repoName string) (tag string, err error) {
	ecrClient := ecr.New(s.session)

	listImagesInput := &ecr.ListImagesInput{
		Filter: &ecr.ListImagesFilter{
			TagStatus: aws.String(ecr.TagStatusTagged),
		},
		RepositoryName: aws.String(repoName),
	}
	listImagesOutput, err := ecrClient.ListImages(listImagesInput)
	if err != nil {
		log.Println(err)
		return
	}

	if len(listImagesOutput.ImageIds) == 0 {
		err = fmt.Errorf("unable to find images for the provided repository: %s", repoName)
		return
	}

	for _, imageId := range listImagesOutput.ImageIds {
		if *imageId.ImageTag == "latest" {
			tag = *imageId.ImageDigest
		}
	}
	return
}
