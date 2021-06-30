package gateway

import (
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/sts"
	"github.com/refinery-labs/loq/util"
)

type awsStsGateway struct {
	session *session.Session
}

type AwsStsGateway interface {
	GetCurrentAccountId() (accountId string, err error)
}

func NewAwsStsGateway() AwsStsGateway {
	sess, err := session.NewSession()

	if err != nil {
		util.Panicf("Failed to instantiate sts session %s", err)
	}
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
