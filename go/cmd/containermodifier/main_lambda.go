// +build lambda

package main

import (
	"log"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/refinery-labs/loq/controller"
	"github.com/refinery-labs/loq/gateway"
)

func main() {
	log.SetFlags(log.Lshortfile)

	ecrGateway := gateway.NewAwsECRGatewayWithoutConfig("us-west-2")
	containerModifierController := controller.NewContainerModifierController(ecrGateway)
	lambda.Start(containerModifierController.HandleLambdaInvoke)
}
