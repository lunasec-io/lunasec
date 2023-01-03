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

	v3 "github.com/anchore/grype/grype/db/v3"
)

type multiStore struct {
	stores []v3.StoreReader
}

func (m *multiStore) DiffStore(s v3.StoreReader) (*[]v3.Diff, error) {
	//TODO implement me
	panic("implement me")
}

func (m *multiStore) GetAllVulnerabilities() (*[]v3.Vulnerability, error) {
	//TODO implement me
	panic("implement me")
}

func (m *multiStore) GetAllVulnerabilityMetadata() (*[]v3.VulnerabilityMetadata, error) {
	//TODO implement me
	panic("implement me")
}

func (m *multiStore) GetID() (*v3.ID, error) {
	for _, store := range m.stores {
		id, err := store.GetID()
		if err != nil {
			continue
		}
		return id, nil
	}
	return nil, errors.New("all stores errored")
}

func (m *multiStore) GetVulnerability(namespace, name string) ([]v3.Vulnerability, error) {
	out := make([]v3.Vulnerability, 0)
	for _, store := range m.stores {
		vs, err := store.GetVulnerability(namespace, name)
		if err != nil {
			return nil, err
		}
		out = append(out, vs...)
	}
	return out, nil
}

func (m *multiStore) GetVulnerabilityMetadata(id, namespace string) (*v3.VulnerabilityMetadata, error) {
	for _, store := range m.stores {
		vs, err := store.GetVulnerabilityMetadata(id, namespace)
		if err != nil {
			continue
		}
		return vs, nil
	}
	return nil, errors.New("all stores errored")
}

func NewMultiStore(stores ...v3.StoreReader) (v3.StoreReader, error) {
	if len(stores) < 1 {
		return nil, errors.New("at least one store must be passed to multistore")
	}
	return &multiStore{stores: stores}, nil
}
