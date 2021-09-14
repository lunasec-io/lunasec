// +build lambda

package main

import (
	"context"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/refinery-labs/loq/pkg/tokenizerbackend"
)

var (
	gatewayServer = tokenizerbackend.NewApiGatewayServer()
)

func Handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	// If no name is provided in the HTTP request body, throw an error
	return gatewayServer.ProxyWithContext(ctx, req)
}

func main() {
	lambda.Start(Handler)
}
