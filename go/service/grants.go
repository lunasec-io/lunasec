package service

import (
	"encoding/json"
	"github.com/refinery-labs/loq/constants"
	"go.uber.org/config"
	"log"
	"time"

	"github.com/refinery-labs/loq/gateway"
	"github.com/refinery-labs/loq/model"
	"github.com/refinery-labs/loq/util"
)

type TokenGrant struct {
	GrantExpiry int64
}

type grantServiceConfig struct {
	GrantTTL string `yaml:"grant_ttl"`
}

type grantService struct {
	kv gateway.DynamoKvGateway
	grantDuration time.Duration
}

// GrantService manages grants for tokens
type GrantService interface {
	SetTokenGrantForSession(token model.Token, sessionID string, grantType constants.GrantType) error
	ValidTokenGrantExistsForSession(token model.Token, sessionID string, grantType constants.GrantType) (valid bool, err error)
}

// NewGrantService ...
func NewGrantService(provider config.Provider, kv gateway.DynamoKvGateway) (service GrantService, err error) {
	var (
		serviceConfig grantServiceConfig
	)

	err = provider.Get("grant_service").Populate(&serviceConfig)
	if err != nil {
		log.Println(err)
		return
	}

	grantDuration, err := time.ParseDuration(serviceConfig.GrantTTL)
	if err != nil {
		log.Println(err)
		return
	}
	service = &grantService{
		kv: kv,
		grantDuration: grantDuration,
	}
	return
}

func getGrantKey(sessionID string, token model.Token, grantType constants.GrantType) string {
	return util.Sha512Sum(sessionID + string(token) + string(grantType))
}

func (s *grantService) SetTokenGrantForSession(token model.Token, sessionID string, grantType constants.GrantType) (err error) {
	grantExpiry := time.Now().Add(s.grantDuration).Unix()
	tokenGrant := TokenGrant{
		GrantExpiry: grantExpiry,
	}
	serializedGrant, err := json.Marshal(tokenGrant)
	if err != nil {
		return
	}
	return s.kv.Set(gateway.GrantStore, getGrantKey(sessionID, token, grantType), string(serializedGrant))
}

func (s *grantService) ValidTokenGrantExistsForSession(token model.Token, sessionID string, grantType constants.GrantType) (valid bool, err error) {
	var (
		tokenGrant TokenGrant
	)
	grantString, err := s.kv.Get(gateway.GrantStore, getGrantKey(sessionID, token, grantType))
	if err != nil {
		return
	}

	if len(grantString) == 0 {
		log.Printf("unable to find grant for token: %s", token)
		return
	}

	err = json.Unmarshal([]byte(grantString), &tokenGrant)
	if err != nil {
		return
	}

	expiryTime := time.Unix(tokenGrant.GrantExpiry, 0)
	now := time.Now()
	if now.After(expiryTime) {
		log.Printf("grant has expired: expiry: %s, now: %s", expiryTime.String(), now)
		return
	}
	valid = true
	return
}
