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
package gqlstorefx

import (
	"context"
	"errors"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/gql"
	"github.com/rs/zerolog/log"
	"strings"
	"time"

	"github.com/Khan/genqlient/graphql"
	"github.com/anchore/grype/grype/db/v3"
	"github.com/google/uuid"
	"go.uber.org/fx"

	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/util"
)

const SchemaVersion = -1

type StoreDeps struct {
	fx.In
	GQLClient graphql.Client
}

// gqlStore is a vulnerability store for Grype that is backed by the LunaTrace GraphQL database.
type gqlStore struct {
	d StoreDeps
}

func (g *gqlStore) DiffStore(s v3.StoreReader) (*[]v3.Diff, error) {
	//TODO implement me
	panic("implement me")
}

func (g *gqlStore) GetAllVulnerabilities() (*[]v3.Vulnerability, error) {
	//TODO implement me
	panic("implement me")
}

func (g *gqlStore) GetAllVulnerabilityMetadata() (*[]v3.VulnerabilityMetadata, error) {
	//TODO implement me
	panic("implement me")
}

// GetID returns info about the state of the graphql db. It is considered to be always up to date and has a special
// schema version number to differentiate it from Grype's native data.
func (g *gqlStore) GetID() (*v3.ID, error) {
	return &v3.ID{
		BuildTimestamp: time.Now(),
		SchemaVersion:  SchemaVersion,
	}, nil
}

// GetVulnerability retrieves one or more vulnerabilities given a namespace and package name.
func (g *gqlStore) GetVulnerability(namespace, name string) ([]v3.Vulnerability, error) {

	// TODO (cthompson) this will be problematic in the future if want to have different namespaces outside of github
	// the mapNamespace function should return an error if it can not find the namespace

	// ignore vulnerabilities that do not come from github advisories
	githubNamespacePrefix := "github:"
	if !strings.HasPrefix(namespace, githubNamespacePrefix) {
		return nil, nil
	}
	formattedNamespace := strings.ReplaceAll(namespace, githubNamespacePrefix, "")

	packageManager, err := mapNamespace(formattedNamespace)
	if err != nil {
		log.Error().
			Err(err).
			Str("name", name).
			Str("namespace", namespace).
			Msg("unable to get package manager")
		return nil, err
	}

	vulns, err := gql.GetVulnerability(context.TODO(), g.d.GQLClient, name, packageManager)
	if err != nil {
		log.Error().
			Err(err).
			Str("name", name).
			Str("namespace", namespace).
			Msg("unable to get vulnerability from database")
		return nil, err
	}
	return mapVulns(vulns.Vulnerability)
}

// GetVulnerabilityMetadata retrieves metadata for the given vulnerability ID relative to a specific record source.
func (g *gqlStore) GetVulnerabilityMetadata(id, namespace string) (*v3.VulnerabilityMetadata, error) {
	uid, err := uuid.Parse(id)
	if err != nil {
		return nil, err
	}
	meta, err := gql.GetVulnerabilityMetadata(context.TODO(), g.d.GQLClient, uid)
	if err != nil {
		return nil, err
	}
	if meta.Vulnerability_by_pk == nil {
		return nil, errors.New("vulnerability not found by ID")
	}

	return &v3.VulnerabilityMetadata{
		ID:           meta.Vulnerability_by_pk.Id.String(),
		Namespace:    meta.Vulnerability_by_pk.Source, //todo sourceid?
		DataSource:   "",
		RecordSource: "",

		URLs:        mapURLs(meta.Vulnerability_by_pk),
		Description: util.DerefOr0(meta.Vulnerability_by_pk.Details),

		Cvss:     nil,
		Severity: "",
	}, nil
}

func NewGraphQLStore(d StoreDeps) (v3.StoreReader, error) {
	return &gqlStore{d: d}, nil
}
