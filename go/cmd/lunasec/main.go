package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/aws/aws-cdk-go/awscdk"
	"github.com/aws/aws-cdk-go/awscdk/awsapigateway"
	"github.com/aws/aws-cdk-go/awscdk/awscloudfront"
	"github.com/aws/aws-cdk-go/awscdk/awsdynamodb"
	"github.com/aws/aws-cdk-go/awscdk/awsecr"
	"github.com/aws/aws-cdk-go/awscdk/awslambda"
	"github.com/aws/aws-cdk-go/awscdk/awss3"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/service/ecr"
	"github.com/aws/constructs-go/constructs/v3"
	"github.com/aws/jsii-runtime-go"
	"github.com/refinery-labs/loq/controller"
	"github.com/refinery-labs/loq/gateway"
	"github.com/refinery-labs/loq/service"
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

	secureFrameBackendRepoName := "secure-frame-backend"

	accountID := os.Getenv("CDK_DEFAULT_ACCOUNT")
	secureFrameBackendTag, err := mirrorRepoToEcr(accountID, "public.ecr.aws/d7v1k2o3/secure-frame-backend", secureFrameBackendRepoName)
	if err != nil {
		panic(err)
	}

	ciphertextBucket := awss3.NewBucket(stack, jsii.String("ciphertext-bucket"), &awss3.BucketProps{
		Cors: &[]*awss3.CorsRule{
			{
				AllowedHeaders: &[]*string{jsii.String("*")},
				AllowedOrigins: &[]*string{jsii.String("*")},
				AllowedMethods: &[]awss3.HttpMethods{"GET", "PUT"},
			},
		},
	})

	secureFrameBucket := awss3.NewBucket(stack, jsii.String("secure-frame-bucket"), &awss3.BucketProps{
		AccessControl:        awss3.BucketAccessControl_PUBLIC_READ_WRITE,
		WebsiteIndexDocument: jsii.String("index.html"),
		WebsiteErrorDocument: jsii.String("index.html"),
	})

	secureFrameCloudfront := awscloudfront.NewCfnDistribution(stack, jsii.String("secure-frame-cloudfront"), &awscloudfront.CfnDistributionProps{
		DistributionConfig: awscloudfront.CfnDistribution_DistributionConfigProperty{
			Origins: []awscloudfront.CfnDistribution_OriginProperty{
				{
					DomainName: secureFrameBucket.BucketDomainName(),
					Id:         jsii.String("secure-frame-domain"),
					CustomOriginConfig: &awscloudfront.CfnDistribution_CustomOriginConfigProperty{
						HttpPort:             jsii.Number(80),
						HttpsPort:            jsii.Number(443),
						OriginProtocolPolicy: jsii.String("https-only"),
					},
				},
			},
			Enabled:           jsii.Bool(true),
			DefaultRootObject: jsii.String("index.html"),
			CustomErrorResponses: []awscloudfront.CfnDistribution_CustomErrorResponseProperty{
				{
					ErrorCode:        jsii.Number(404),
					ResponseCode:     jsii.Number(200),
					ResponsePagePath: jsii.String("/index.html"),
				},
			},
			DefaultCacheBehavior: awscloudfront.CfnDistribution_DefaultCacheBehaviorProperty{
				AllowedMethods: &[]*string{
					jsii.String("HEAD"), jsii.String("DELETE"),
					jsii.String("GET"), jsii.String("POST"),
					jsii.String("OPTIONS"), jsii.String("PUT"),
					jsii.String("PATCH"),
				},
				ForwardedValues: awscloudfront.CfnDistribution_ForwardedValuesProperty{
					QueryString: jsii.Bool(false),
					Cookies: awscloudfront.CfnDistribution_CookiesProperty{
						Forward: jsii.String("none"),
					},
				},
				TargetOriginId:       jsii.String("secure-frame-domain"),
				ViewerProtocolPolicy: jsii.String("redirect-to-https"),
			},
			ViewerCertificate: awscloudfront.CfnDistribution_ViewerCertificateProperty{
				CloudFrontDefaultCertificate: jsii.Bool(true),
			},
		},
	})

	metadataTable := awsdynamodb.NewTable(stack, jsii.String("metadata-table"), &awsdynamodb.TableProps{
		PartitionKey: &awsdynamodb.Attribute{
			Name: jsii.String("Key"),
			Type: awsdynamodb.AttributeType_STRING,
		},
	})

	keysTable := awsdynamodb.NewTable(stack, jsii.String("keys-table"), &awsdynamodb.TableProps{
		PartitionKey: &awsdynamodb.Attribute{
			Name: jsii.String("Key"),
			Type: awsdynamodb.AttributeType_STRING,
		},
	})

	sessionsTable := awsdynamodb.NewTable(stack, jsii.String("sessions-table"), &awsdynamodb.TableProps{
		PartitionKey: &awsdynamodb.Attribute{
			Name: jsii.String("Key"),
			Type: awsdynamodb.AttributeType_STRING,
		},
	})

	repository := awsecr.Repository_FromRepositoryName(stack, jsii.String("repo"), jsii.String(secureFrameBackendRepoName))

	cdnConfig, err := json.Marshal(map[string]string{
		"host":        *secureFrameCloudfront.AttrDomainName(),
		"main_script": "main.dc2fde6210856cfb0d6c.js",
		"main_style":  "main.css",
	})
	if err != nil {
		panic(err)
	}

	secureFrameLambda := awslambda.NewDockerImageFunction(stack, jsii.String("secure-frame-lambda"), &awslambda.DockerImageFunctionProps{
		Code: awslambda.DockerImageCode_FromEcr(repository, &awslambda.EcrImageCodeProps{
			Tag: jsii.String(secureFrameBackendTag),
		}),
		Environment: &map[string]*string{
			"SECURE_FRAME_FRONT_END":     secureFrameCloudfront.AttrDomainName(),
			"CUSTOMER_FRONT_END":         jsii.String("http://localhost:3000"),
			"CIPHERTEXT_VAULT_S3_BUCKET": ciphertextBucket.BucketArn(),
			"AUTH_CALLBACK_URL":          jsii.String("http://localhost:3001"),
			"SECURE_FRAME_CDN_CONFIG":    jsii.String(string(cdnConfig)),
			"TOKENIZER_CLIENT_SECRET":    jsii.String("TODO"),
			"CUSTOMER_PUBLIC_KEY":        jsii.String("LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFsbjFtVm1vSVJqREdRNHBWY2NzQgo1eUozREZJdFVlOXpMRlU0bmFxc2ZGWUp5d0t5QXNINDh3VUhrQlgwWlJ1cm5FRW9tdHhtajNGOUIrZForVUxGCmUzSm5GcldEak43WE9GeHluM0pmWGp3VmZFZkEyRnhZTEx4Z3daeGZGRnZjV0NoMmpvZEFsUE82NkxCdGVTYkEKcGNsdlNucDc0WkhDU0VyOERGQ3Y3TFU1MGQwb0greGhyTjFoNllMdkxHTGJkRkZacHZ3MWRyQmFWN0tOdk9SOAp0NHFNYmNUZERqNWZXUEJtS1o1YVk0ZTNwS1g4OVNCYzhDdFlmQmNmU003dTRreGRHSXQrbmthMjlTeUtTWUJ4CldMYzRiRk1LT3dXancwZ2UvTGJud3RGRWxRK1J5VG83QVNqK29OSzNDUk9STkFheFkrT3o4cUwwMGN1d3VvM2EKUFFJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t"),
			"METADATA_KV_TABLE":          metadataTable.TableName(),
			"KEYS_KV_TABLE":              keysTable.TableName(),
			"SESSIONS_KV_TABLE":          sessionsTable.TableName(),
		},
	})

	ciphertextBucket.GrantReadWrite(secureFrameLambda, "*")
	metadataTable.GrantReadWriteData(secureFrameLambda)
	keysTable.GrantReadWriteData(secureFrameLambda)
	sessionsTable.GrantReadWriteData(secureFrameLambda)

	awsapigateway.NewLambdaRestApi(stack, jsii.String("gateway"), &awsapigateway.LambdaRestApiProps{
		Handler: secureFrameLambda,
	})

	return stack
}

func env() *awscdk.Environment {
	return &awscdk.Environment{
		Account: jsii.String(os.Getenv("CDK_DEFAULT_ACCOUNT")),
		Region:  jsii.String(os.Getenv("CDK_DEFAULT_REGION")),
	}
}

func mirrorRepoToEcr(accountID, containerURL, newImageName string) (tag string, err error) {
	ecrGateway := gateway.NewAwsECRGatewayWithoutConfig("us-west-2")

	ecrRegistry := fmt.Sprintf("%s.dkr.ecr.us-west-2.amazonaws.com", accountID)
	ecrRepository := fmt.Sprintf("%s/%s", ecrRegistry, newImageName)

	options, err := controller.LoadPublicCraneOptions(ecrGateway)
	if err != nil {
		log.Println(err)
		return
	}

	modifier := service.NewDockerContainerModifier(
		"",
		false,
		options,
	)

	log.Printf("pulling image %s", containerURL)
	containerImg, err := modifier.PullImage(containerURL)
	if err != nil {
		log.Println(err)
		return
	}

	tagDigest, err := containerImg.Digest()
	if err != nil {
		log.Println(err)
		return
	}
	tag = tagDigest.Hex

	log.Printf("creating repository %s", ecrRepository)
	err = ecrGateway.CreateRepository(newImageName)
	if err != nil {
		shouldError := true
		if aerr, ok := err.(awserr.Error); ok {
			switch aerr.Code() {
			case ecr.ErrCodeRepositoryAlreadyExistsException:
				shouldError = false
			}
		}
		if shouldError {
			log.Println(err)
			return
		}
	}

	// TODO (cthompson) check if the pulled image and latest of the repository are the same

	options, err = controller.LoadCraneOptions(ecrGateway)
	if err != nil {
		log.Println(err)
		return
	}

	modifier = service.NewDockerContainerModifier(
		"",
		false,
		options,
	)

	ecrURL := fmt.Sprintf("%s:%s", ecrRepository, tag)

	log.Printf("pushing image %s", ecrURL)
	err = modifier.PushImage(containerImg, ecrURL)
	if err != nil {
		log.Println(err)
		return
	}
	log.Printf("mirrored image %s to ecr at %s", containerURL, ecrURL)
	return
}

func main() {
	log.SetFlags(log.Lshortfile)
	app := awscdk.NewApp(nil)

	NewLambdaCronStack(app, "LambdaCronStack", &LambdaCronStackProps{
		awscdk.StackProps{
			Env: env(),
		},
	})

	app.Synth(nil)
}
