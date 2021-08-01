package service

import (
	"crypto/tls"
	"encoding/json"
	"errors"
	"gopkg.in/square/go-jose.v2"
	"net/http"
	"sync"
	"time"
)

// from: https://github.com/upgear/go-jwks/blob/master/client.go

// JwksManager fetchs and maintains a cache of keys from a public endpoint.
type JwksManager struct {
	endpoint string
	keys     cache
	httpClient *http.Client
}

// NewClient returns a JwksManager which is used to fetch keys from a supplied endpoint.
// It will attempt to cache the keys returned before returning. If an error
// occurs, it will return an error (with the instantiated JwksManager).
func NewJwksManager(endpoint string, insecureSkipVerify bool) (*JwksManager, error) {
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

func (c *JwksManager) fetchJWKs(origin string) ([]jose.JSONWebKey, error) {
	var ks jose.JSONWebKeySet

	resp, err := c.httpClient.Get(origin)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if err := json.NewDecoder(resp.Body).Decode(&ks); err != nil {
		return nil, err
	}

	return ks.Keys, nil
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