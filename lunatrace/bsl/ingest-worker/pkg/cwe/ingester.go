// Copyright by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Business Source License v1.1
// (the "License"); you may not use this file except in compliance with the
// License. You may obtain a copy of the License at
//
// https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
//
// See the License for the specific language governing permissions and
// limitations under the License.
package cwe

import (
	"context"
	"github.com/Khan/genqlient/graphql"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/util"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/gql"
	"github.com/rs/zerolog/log"
	"go.uber.org/fx"
	"strconv"
)

type CWEIngester interface {
	Ingest(ctx context.Context) error
}

type CWEIngesterParams struct {
	fx.In

	GQLClient graphql.Client
}

type cweIngester struct {
	CWEIngesterParams
}

func getCommonName(weaknessId int) *string {
	commonName, ok := cweCommonName[weaknessId]
	if !ok || commonName == "" {
		return nil
	}
	return &commonName
}

func (s *cweIngester) Ingest(ctx context.Context) error {
	cwes, err := FetchCWEsFromMitre()
	if err != nil {
		log.Error().
			Err(err)
		return err
	}

	for _, weakness := range cwes.Weaknesses {
		weaknessIdStr := weakness.ID

		weaknessId, err := strconv.Atoi(weaknessIdStr)
		if err != nil {
			return err
		}

		_, err = gql.InsertVulnerabilityCWE(ctx, s.GQLClient, []*gql.Vulnerability_cwe_insert_input{
			{
				Description:          util.Ptr(weakness.Description),
				Extended_description: util.Ptr(weakness.ExtendedDescription),
				Name:                 util.Ptr(weakness.Name),
				Id:                   util.Ptr(weaknessId),
				Common_name:          getCommonName(weaknessId),
			},
		}, []gql.Vulnerability_cwe_update_column{
			gql.Vulnerability_cwe_update_columnId,
			gql.Vulnerability_cwe_update_columnName,
			gql.Vulnerability_cwe_update_columnDescription,
			gql.Vulnerability_cwe_update_columnExtendedDescription,
			gql.Vulnerability_cwe_update_columnCommonName,
		})
	}
	return nil
}

func NewCWEIngester(params CWEIngesterParams) CWEIngester {
	return &cweIngester{
		params,
	}
}
