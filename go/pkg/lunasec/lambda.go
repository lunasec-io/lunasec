package lunasec

import (
	"github.com/aws/aws-cdk-go/awscdk"
	"github.com/aws/aws-cdk-go/awscdk/awslambda"
	"github.com/aws/jsii-runtime-go"
)

type lambdaResourceBuilder struct {
	handler string
}

func (l *lambdaResourceBuilder) getProperties() *awslambda.FunctionProps {
	return &awslambda.FunctionProps{
		Code:    awslambda.NewAssetCode(jsii.String("lambda"), nil),
		Handler: jsii.String(l.handler),
		Timeout: awscdk.Duration_Seconds(jsii.Number(300)),
		Runtime: awslambda.Runtime_PYTHON_3_6(),
	}
}

func (l *lambdaResourceBuilder) Build() {
	//lambdaFn := awslambda.NewFunction(stack, jsii.String("Singleton"))
}
