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
	"crypto/tls"
	"encoding/json"
	"errors"
	"fmt"
	"go.uber.org/zap"
	"gopkg.in/square/go-jose.v2"
	"net/http"
	"sync"
	"time"
)

// from: https://github.com/upgear/go-jwks/blob/master/client.go

const maxRetries = 10

// JwksManager fetchs and maintains a cache of keys from a public endpoint.
type JwksManager struct {
	logger     *zap.Logger
	endpoint   string
	keys       cache
	httpClient *http.Client
}

// NewClient returns a JwksManager which is used to fetch keys from a supplied endpoint.
// It will attempt to cache the keys returned before returning. If an error
// occurs, it will return an error (with the instantiated JwksManager).
func NewJwksManager(logger *zap.Logger, endpoint string, insecureSkipVerify bool) (*JwksManager, error) {
	httpClient := &http.Client{
		Timeout: 30 * time.Second,
		Transport: &http.Transport{
			TLSClientConfig: &tls.Config{
				// Allow for insecure clients (poc/testing purposes)
				InsecureSkipVerify: insecureSkipVerify,
			},
		},
	}

	c := &JwksManager{
		logger:   logger,
		endpoint: endpoint,
		keys: cache{
			kv:  make(map[string]interface{}),
			mtx: &sync.RWMutex{},
		},
		httpClient: httpClient,
	}

	return c, c.updateCache()
}

// GetKey returns a key for a given key id.
// It first looks in the JwksManager's cache and if it can not find a key it
// will attempt fetch the key from the endpoint directly.
func (c *JwksManager) GetKey(kid string) (interface{}, error) {
	key, ok := c.keys.get(kid)
	if !ok {
		if err := c.updateCache(); err != nil {
			return nil, err
		}
	}

	key, ok = c.keys.get(kid)
	if !ok {
		return nil, errors.New("unrecognized key id")
	}

	return key, nil
}

func (c *JwksManager) updateCache() error {
	ks, err := c.fetchJWKs(c.endpoint)
	if err != nil {
		return err
	}

	for _, k := range ks {
		c.keys.put(k.KeyID, k.Key)
	}

	return nil
}

func (c *JwksManager) fetchJWKs(origin string) (keys []jose.JSONWebKey, err error) {
	var (
		resp *http.Response
		ks   jose.JSONWebKeySet
	)

	retries := maxRetries
	for retries > 0 {
		resp, err = c.httpClient.Get(origin)
		if err == nil {
			break
		}

		c.logger.Debug(
			"unable to connect to JWKS server",
			zap.String("origin", origin),
			zap.Error(err),
		)

		retries -= 1
		time.Sleep(time.Second * 10)
	}

	if retries == 0 {
		err = errors.New(fmt.Sprintf("max retries hit when attempting to contact jwks server: %s", origin))

		c.logger.Error(
			"unable to connect to JWKS server",
			zap.String("origin", origin),
			zap.Error(err),
		)
		return
	}

	defer resp.Body.Close()

	if err = json.NewDecoder(resp.Body).Decode(&ks); err != nil {
		return
	}

	keys = ks.Keys
	return
}

type cache struct {
	kv  map[string]interface{}
	mtx *sync.RWMutex
}

func (c *cache) get(k string) (interface{}, bool) {
	c.mtx.RLock()
	v, ok := c.kv[k]
	c.mtx.RUnlock()
	return v, ok
}

func (c *cache) put(k string, v interface{}) {
	c.mtx.Lock()
	c.kv[k] = v
	c.mtx.Unlock()
}
