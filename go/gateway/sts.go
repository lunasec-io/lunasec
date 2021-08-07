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
