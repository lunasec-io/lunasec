package main

import (
	"os"

	"github.com/aws/aws-cdk-go/awscdk"
	"github.com/aws/aws-cdk-go/awscdk/awsevents"
	"github.com/aws/aws-cdk-go/awscdk/awseventstargets"
	"github.com/aws/aws-cdk-go/awscdk/awslambda"
	"github.com/aws/constructs-go/constructs/v3"
	"github.com/aws/jsii-runtime-go"
)

type LambdaCronStackProps struct {
	awscdk.StackProps
}

func NewLambdaCronStack(scope constructs.Construct, id string, props *LambdaCronStackProps) awscdk.Stack {
	var sprops awscdk.StackProps
	if props != nil {
		sprops = props.StackProps
	}
	stack := awscdk.NewStack(scope, &id, &sprops)

	// The code that defines your stack goes here

	lambdaFn := awslambda.NewFunction(stack, jsii.String("Singleton"), &awslambda.FunctionProps{
		Code:    awslambda.NewAssetCode(jsii.String("lambda"), nil),
		Handler: jsii.String("handler.main"),
		Timeout: awscdk.Duration_Seconds(jsii.Number(300)),
		Runtime: awslambda.Runtime_PYTHON_3_6(),
	})

	// Run every day at 6PM UTC
	// See https://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html
	rule := awsevents.NewRule(stack, jsii.String("Rule"), &awsevents.RuleProps{
		Schedule: awsevents.Schedule_Expression(jsii.String("cron(0 18 ? * MON-FRI *)")),
	})

	rule.AddTarget(awseventstargets.NewLambdaFunction(lambdaFn, nil))

	return stack
}

func env() *awscdk.Environment {
	return &awscdk.Environment{
		Account: jsii.String(os.Getenv("CDK_DEFAULT_ACCOUNT")),
		Region:  jsii.String(os.Getenv("CDK_DEFAULT_REGION")),
	}
}

func main() {
	app := awscdk.NewApp(nil)

	NewLambdaCronStack(app, "LambdaCronStack", &LambdaCronStackProps{
		awscdk.StackProps{
			Env: env(),
		},
	})

	app.Synth(nil)
}
