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
//
package vulnproviderfx

import (
	"time"

	"github.com/Khan/genqlient/graphql"
	"github.com/anchore/grype/grype/db/v3"
	"go.uber.org/fx"
)

const schemaVersion = 69420

type GraphQLStoreDeps struct {
	fx.In
	GQLClient graphql.Client
}

// graphQLStore is a vulnerability store for Grype that is backed by the LunaTrace GraphQL database.
type graphQLStore struct {
	d GraphQLStoreDeps
}

// GetID returns info about the state of the graphql db. It is considered to be always up to date and has a special
// schema version number to differentiate it from Grype's native data.
func (g *graphQLStore) GetID() (*v3.ID, error) {
	return &v3.ID{
		BuildTimestamp: time.Now(),
		SchemaVersion:  schemaVersion,
	}, nil
}

func (g *graphQLStore) GetVulnerability(namespace, name string) ([]v3.Vulnerability, error) {
	//TODO implement me
	panic("implement me")
}

func (g *graphQLStore) GetVulnerabilityMetadata(id, namespace string) (*v3.VulnerabilityMetadata, error) {
	//TODO implement me
	panic("implement me")
}
