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
	"context"
	"crypto/tls"
	"fmt"
	"log"

	"github.com/pinecone-io/go-pinecone/pinecone_grpc"
	"go.uber.org/fx"
	_ "gocloud.dev/pubsub/awssnssqs"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/metadata"
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
	Upsert(vectors []*pinecone_grpc.Vector) error
}

type pineconeClient struct {
	p    Params
	conn *grpc.ClientConn
}

func (p *pineconeClient) Upsert(vectors []*pinecone_grpc.Vector) error {
	client := pinecone_grpc.NewVectorServiceClient(p.conn)
	_, err := client.Upsert(context.Background(), &pinecone_grpc.UpsertRequest{
		Vectors:   vectors,
		Namespace: p.p.Environment,
	})
	return err
}

func NewPineconeClient(p Params) PineconeClient {
	ctx := metadata.AppendToOutgoingContext(context.Background(), "api-key", p.APIKey)
	target := fmt.Sprintf("%s-%s.svc.%s.pinecone.io:443", p.Index, p.Project, p.Environment)

	config := &tls.Config{}

	conn, err := grpc.DialContext(
		ctx,
		target,
		grpc.WithTransportCredentials(credentials.NewTLS(config)),
		grpc.WithAuthority(target),
		grpc.WithBlock(),
	)
	if err != nil {
		log.Fatalf("fail to dial: %v", err)
	}

	return &pineconeClient{
		p:    p,
		conn: conn,
	}
}
