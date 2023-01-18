// Copyright by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Business Source License v1.1
// (the "License"); you may not use this file except in compliance with the
// License. You may obtain a copy of the License at
//
// https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
//
// See the License for the specific language governing permissions and
// limitations under the License.
package awsfx

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"go.uber.org/fx"
)

type AwsSessionResult struct {
	fx.Out

	AwsSession *session.Session
}

func NewSession(config Config) AwsSessionResult {
	awsSession := session.Must(session.NewSession(&aws.Config{
		Region: aws.String(config.Region),
	}))
	return AwsSessionResult{
		AwsSession: awsSession,
	}
}
