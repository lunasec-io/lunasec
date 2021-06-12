// +build lambda

package main

import (
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/refinery-labs/loq/pkg/secureframe"
)

func main() {
	gatewayServer := secureframe.NewApiGatewayServer()
	lambda.StartHandler(gatewayServer)
}
