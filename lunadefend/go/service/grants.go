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
package service

import (
	"encoding/json"
	"errors"
	"github.com/lunasec-io/lunasec/lunadefend/go/constants"
	"github.com/lunasec-io/lunasec/lunadefend/go/constants/metrics"
	"github.com/lunasec-io/lunasec/lunadefend/go/gateway"
	metricsgateway "github.com/lunasec-io/lunasec/lunadefend/go/gateway/metrics"
	"github.com/lunasec-io/lunasec/lunadefend/go/types"
	"github.com/lunasec-io/lunasec/lunadefend/go/util"
	"go.uber.org/config"
	"go.uber.org/zap"
	"log"
	"time"
)

type TokenGrant struct {
	GrantExpiry int64
}

type grantServiceConfig struct {
	GrantTTL    string `yaml:"grant_default_duration"`
	GrantMaxTTL string `yaml:"grant_maximum_duration"`
}

type grantService struct {
	logger               *zap.Logger
	cw                   metricsgateway.AwsCloudwatchGateway
	kv                   gateway.AwsDynamoGateway
	grantDefaultDuration time.Duration
	grantMaxDuration     time.Duration
}

// GrantService manages grants for tokens
type GrantService interface {
	SetTokenGrantForSession(token types.Token, sessionID string, grantType constants.GrantType, customGrantDuration string) error
	ValidTokenGrantExistsForSession(token types.Token, sessionID string, grantType constants.GrantType) (valid bool, err error)
}

// NewGrantService ...
func NewGrantService(
	logger *zap.Logger,
	provider config.Provider,
	cw metricsgateway.AwsCloudwatchGateway,
	kv gateway.AwsDynamoGateway,
) (service GrantService) {
	var (
		serviceConfig grantServiceConfig
	)

	err := provider.Get("grant_service").Populate(&serviceConfig)
	if err != nil {
		panic(err)
	}

	grantDefaultDuration, err := time.ParseDuration(serviceConfig.GrantTTL)
	if err != nil {
		panic(err)
	}
	grantMaxDuration, err := time.ParseDuration(serviceConfig.GrantMaxTTL)
	if err != nil {
		panic(err)
	}

	service = &grantService{
		logger:               logger,
		cw:                   cw,
		kv:                   kv,
		grantDefaultDuration: grantDefaultDuration,
		grantMaxDuration:     grantMaxDuration,
	}
	return service
}

func getGrantKey(sessionID string, token types.Token, grantType constants.GrantType) string {
	return util.Sha512Sum(sessionID + string(token) + string(grantType))
}

func (s *grantService) getGrantDuration(customDurationString string) (int64, error) {
	s.logger.Debug(
		"read custom grant duration from request:",
		zap.String("durationString", customDurationString))

	if customDurationString == "" {
		return time.Now().Add(s.grantDefaultDuration).Unix(), nil
	}

	customDuration, err := time.ParseDuration(customDurationString)
	if err != nil {
		return 0, errors.New("Grant duration parse failed, please use a supported duration format like 30m or 1h20m10s")
	}

	if customDuration > s.grantMaxDuration {
		return 0, errors.New("Grant duration set longer than configured maximum time")
	}
	return time.Now().Add(customDuration).Unix(), nil
}

func (s *grantService) SetTokenGrantForSession(token types.Token, sessionID string, grantType constants.GrantType, customGrantDuration string) (err error) {
	defer func() {
		if err != nil {
			s.cw.Metric(metrics.CreateGrantFailureMetric, 1)
		}
	}()

	grantExpiry, err := s.getGrantDuration(customGrantDuration)
	if err != nil {
		return err
	}
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

	s.cw.Metric(metrics.CreateGrantSuccessMetric, 1)
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
