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
