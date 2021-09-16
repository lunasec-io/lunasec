package service

import (
	"encoding/json"
	"github.com/refinery-labs/loq/constants"
	"go.uber.org/config"
	"go.uber.org/zap"
	"log"
	"time"

	"github.com/refinery-labs/loq/gateway"
	"github.com/refinery-labs/loq/types"
	"github.com/refinery-labs/loq/util"
)

type TokenGrant struct {
	GrantExpiry int64
}

type grantServiceConfig struct {
	GrantTTL string `yaml:"grant_ttl"`
}

type grantService struct {
	logger *zap.Logger
	kv gateway.DynamoKvGateway
	grantDuration time.Duration
}

// GrantService manages grants for tokens
type GrantService interface {
	SetTokenGrantForSession(token types.Token, sessionID string, grantType constants.GrantType) error
	ValidTokenGrantExistsForSession(token types.Token, sessionID string, grantType constants.GrantType) (valid bool, err error)
}

// NewGrantService ...
func NewGrantService(
	logger *zap.Logger,
	provider config.Provider,
	kv gateway.DynamoKvGateway,
) (service GrantService) {
	var (
		serviceConfig grantServiceConfig
	)

	err := provider.Get("grant_service").Populate(&serviceConfig)
	if err != nil {
		panic(err)
	}

	grantDuration, err := time.ParseDuration(serviceConfig.GrantTTL)
	if err != nil {
		panic(err)
	}
	service = &grantService{
		logger: logger,
		kv: kv,
		grantDuration: grantDuration,
	}
	return
}

func getGrantKey(sessionID string, token types.Token, grantType constants.GrantType) string {
	return util.Sha512Sum(sessionID + string(token) + string(grantType))
}

func (s *grantService) SetTokenGrantForSession(token types.Token, sessionID string, grantType constants.GrantType) (err error) {
	grantExpiry := time.Now().Add(s.grantDuration).Unix()
	tokenGrant := TokenGrant{
		GrantExpiry: grantExpiry,
	}
	serializedGrant, err := json.Marshal(tokenGrant)
	if err != nil {
		return
	}

	grantKey := getGrantKey(sessionID, token, grantType)

	s.logger.Debug(
		"setting grant for token",
		zap.String("token", string(token)),
		zap.String("sessionID", sessionID),
		zap.String("grantType", string(grantType)),
		zap.String("grantKey", grantKey),
	)

	return s.kv.Set(gateway.GrantStore, grantKey, string(serializedGrant))
}

func (s *grantService) ValidTokenGrantExistsForSession(token types.Token, sessionID string, grantType constants.GrantType) (valid bool, err error) {
	var (
		tokenGrant TokenGrant
	)

	grantKey := getGrantKey(sessionID, token, grantType)

	s.logger.Debug(
		"getting grant for token",
		zap.String("token", string(token)),
		zap.String("sessionID", sessionID),
		zap.String("grantType", string(grantType)),
		zap.String("grantKey", grantKey),
	)

	grantString, err := s.kv.Get(gateway.GrantStore, grantKey)
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
