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
			},
		})
	}
	return nil
}

func NewCWEIngester(params CWEIngesterParams) CWEIngester {
	return &cweIngester{
		params,
	}
}
