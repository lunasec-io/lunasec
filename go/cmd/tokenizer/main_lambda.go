// +build lambda

package main

import (
  "github.com/aws/aws-lambda-go/lambda"
  "github.com/refinery-labs/loq/pkg/tokenizer"
)

func main() {
  gatewayServer := tokenizer.NewApiGatewayServer()
  lambda.StartHandler(gatewayServer)
}
