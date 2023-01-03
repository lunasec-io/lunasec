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
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/sts"
)

type awsStsGateway struct {
	session *session.Session
}

type AwsStsGateway interface {
	GetCurrentAccountId() (accountId string, err error)
}

func NewAwsStsGateway(sess *session.Session) AwsStsGateway {
	return &awsStsGateway{
		session: sess,
	}
}

func (a *awsStsGateway) GetCurrentAccountId() (accountId string, err error) {
	client := sts.New(a.session)

	input := &sts.GetCallerIdentityInput{}
	account, err := client.GetCallerIdentity(input)
	if err != nil {
		return
	}

	accountId = *account.Account
	return
}
