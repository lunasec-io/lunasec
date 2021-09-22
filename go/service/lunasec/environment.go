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
package lunasec

import (
	"github.com/aws/aws-cdk-go/awscdk"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/jsii-runtime-go"
	"github.com/pkg/errors"
	"github.com/refinery-labs/loq/gateway"
	"log"
)

func NewDeploymentEnvironment(sess *session.Session) (env *awscdk.Environment, err error) {
	sts := gateway.NewAwsStsGateway(sess)

	accountID, err := sts.GetCurrentAccountId()
	if err != nil {
		log.Println(err)
		return
	}

	region := *sess.Config.Region

	if region == "" {
		err = errors.New("region is not set for provided aws account, please set this value with AWS_DEFAULT_REGION or in the profile configuration")
		return
	}

	env = &awscdk.Environment{
		Account: jsii.String(accountID),
		Region:  jsii.String(region),
	}
	return
}
