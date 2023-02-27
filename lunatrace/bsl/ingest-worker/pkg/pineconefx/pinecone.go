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
package pineconefx

import (
	"fmt"

	"github.com/rs/zerolog/log"
	"go.uber.org/fx"
	_ "gocloud.dev/pubsub/awssnssqs"
	"google.golang.org/grpc"
)

var Module = fx.Options(
	fx.Provide(
		NewConfig,
		NewPineconeClient,
	),
)

type Params struct {
	fx.In

	Config
}

type PineconeClient interface {
	Upsert(vectors []*Vector) error
}

type pineconeClient struct {
	params Params
	conn   *grpc.ClientConn
}

func (p *pineconeClient) Upsert(vectors []*Vector) error {
	url := fmt.Sprintf("https://%s-%s.svc.%s.pinecone.io/vectors/upsert", p.params.Index, p.params.Project, p.params.Environment)
	_, err := callAPI[UpsertRequest, any]("POST", url, p.params.APIKey, &UpsertRequest{Vectors: vectors})
	return err
}

func NewPineconeClient(params Params) PineconeClient {
	if params.Project == "" {
		projectName, err := getProjectName(params.Environment, params.APIKey)
		if err != nil {
			log.Error().Err(err).Msg("unable to get project name")
			return nil
		}
		params.Project = projectName
	}

	return &pineconeClient{
		params: params,
	}
}
