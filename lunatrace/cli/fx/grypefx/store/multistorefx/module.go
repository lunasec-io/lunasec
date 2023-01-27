// Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
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
package multistorefx

import (
	"errors"

	v5 "github.com/anchore/grype/grype/db/v5"
	"github.com/rs/zerolog/log"
)

type multiStore struct {
	stores []v5.StoreReader
}

func (m *multiStore) GetVulnerabilityNamespaces() ([]string, error) {
	var namespaces []string

	for _, store := range m.stores {
		storeNamespaces, err := store.GetVulnerabilityNamespaces()
		if err != nil {
			return namespaces, err
		}
		namespaces = append(namespaces, storeNamespaces...)
	}
	return namespaces, nil
}

func (m *multiStore) SearchForVulnerabilities(namespace, packageName string) ([]v5.Vulnerability, error) {
	log.Debug().Str("namespace", namespace).Str("packageName", packageName).Msg("search for vulnerabilities")
	return m.GetVulnerability(namespace, packageName)
}

func (m *multiStore) GetVulnerabilityMatchExclusion(id string) ([]v5.VulnerabilityMatchExclusion, error) {
	//TODO implement me
	panic("implement me")
}

func (m *multiStore) DiffStore(s v5.StoreReader) (*[]v5.Diff, error) {
	//TODO implement me
	panic("implement me")
}

func (m *multiStore) GetAllVulnerabilities() (*[]v5.Vulnerability, error) {
	//TODO implement me
	panic("implement me")
}

func (m *multiStore) GetAllVulnerabilityMetadata() (*[]v5.VulnerabilityMetadata, error) {
	//TODO implement me
	panic("implement me")
}

func (m *multiStore) GetID() (*v5.ID, error) {
	for _, store := range m.stores {
		id, err := store.GetID()
		if err != nil {
			continue
		}
		return id, nil
	}
	return nil, errors.New("all stores errored")
}

func (m *multiStore) GetVulnerability(namespace, name string) ([]v5.Vulnerability, error) {
	out := make([]v5.Vulnerability, 0)
	for _, store := range m.stores {
		vs, err := store.GetVulnerability(namespace, name)
		if err != nil {
			return nil, err
		}
		out = append(out, vs...)
	}
	return out, nil
}

func (m *multiStore) GetVulnerabilityMetadata(id, namespace string) (*v5.VulnerabilityMetadata, error) {
	for _, store := range m.stores {
		vs, err := store.GetVulnerabilityMetadata(id, namespace)
		if err != nil {
			continue
		}
		return vs, nil
	}
	return nil, errors.New("all stores errored")
}

func NewMultiStore(stores ...v5.StoreReader) (v5.StoreReader, error) {
	if len(stores) < 1 {
		return nil, errors.New("at least one store must be passed to multistore")
	}
	return &multiStore{stores: stores}, nil
}
