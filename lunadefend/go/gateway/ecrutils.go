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
package gateway

import (
	"github.com/google/go-containerregistry/pkg/authn"
	"github.com/google/go-containerregistry/pkg/crane"
	"log"
)

func LoadPublicCraneOptions(ecrGateway AwsECRGateway) (options crane.Option, err error) {
	cfg, err := ecrGateway.GetPublicCredentials()
	if err != nil {
		log.Println(err)
		return
	}

	authenticator := authn.FromConfig(cfg)

	options = crane.WithAuth(authenticator)
	return
}

func LoadCraneOptions(ecrGateway AwsECRGateway) (options crane.Option, err error) {
	cfg, err := ecrGateway.GetCredentials()
	if err != nil {
		log.Println(err)
		return
	}

	authenticator := authn.FromConfig(cfg)

	options = crane.WithAuth(authenticator)
	return
}
