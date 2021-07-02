package service

import (
	"encoding/json"
	"errors"

	"github.com/refinery-labs/loq/gateway"
	"github.com/refinery-labs/loq/model"
	"github.com/refinery-labs/loq/util"
)

type grantService struct {
	kv gateway.DynamoKvGateway
}

// GrantService manages grants for tokens
type GrantService interface {
	SetGrant(userID string, token model.Token) error
	GetGrant(userID string, token model.Token) (interface{}, error)
}

// NewGrantService ...
func NewGrantService(kv gateway.DynamoKvGateway) GrantService {
	return &grantService{
		kv: kv,
	}
}

func getGrantKey(userID string, token model.Token) string {
	return util.Sha512Sum(userID + string(token))
}

// SetGrant ...
func (s *grantService) SetGrant(userID string, token model.Token, expiration ) (err error) {
	serializedMetadata, err := json.Marshal(metadata)
	if err != nil {
		return
	}
	return s.kv.Set(gateway.GrantStore, util.Sha512Sum(string(token)), string(serializedMetadata))
}

// GetGrant ...
func (s *grantService) GetGrant(userID string, token model.Token) (err error) {
	meta, err := s.kv.Get(gateway.GrantStore, getGrantKey(userID, token))
	if err != nil {
		return
	}

	if len(meta) == 0 {
		err = errors.New("unable to locate data for token")
		return
	}

	err = json.Unmarshal([]byte(meta), &metadata)
	return
}
