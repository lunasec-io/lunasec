package service

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"

	"github.com/aws/aws-cdk-go/awscdk"
	"github.com/aws/aws-cdk-go/awscdk/awsapigateway"
	"github.com/aws/aws-cdk-go/awscdk/awscloudfront"
	"github.com/aws/aws-cdk-go/awscdk/awsdynamodb"
	"github.com/aws/aws-cdk-go/awscdk/awsecr"
	"github.com/aws/aws-cdk-go/awscdk/awslambda"
	"github.com/aws/aws-cdk-go/awscdk/awss3"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/ecr"
	"github.com/aws/constructs-go/constructs/v3"
	"github.com/aws/jsii-runtime-go"
	v1 "github.com/google/go-containerregistry/pkg/v1"
	"github.com/refinery-labs/loq/gateway"
)

type SecureFrameService string

const (
	secureFrameBackendRepoName SecureFrameService = "secure-frame-backend"
)

type ServiceToImageMap map[SecureFrameService]string

type LunasecDeployer interface {
	Deploy() (err error)
}

type LunasecStackProps struct {
	awscdk.StackProps
}

type lunasecDeployer struct {
	skipImageMirroring bool
}

func NewLunasecDeployer(skipImageMirroring bool) LunasecDeployer {
	return &lunasecDeployer{
		skipImageMirroring: skipImageMirroring,
	}
}

func getDeploymentEnv() (env *awscdk.Environment, err error) {
	stsGateway := gateway.NewAwsStsGateway()
	accountID, err := stsGateway.GetCurrentAccountId()
	if err != nil {
		log.Println(err)
		return
	}

	sess, err := session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	})
	if err != nil {
		log.Println(err)
		return
	}
	region := *sess.Config.Region

	if region == "" {
		err = errors.New("region is not set for provided aws account, please set this value with AWS_DEFAULT_REGION or in the profile configuration")
		return
	}

	env = &awscdk.Environment{
		Account: jsii.String(accountID),
		Region:  jsii.String(region),
	}
	return
}

func (l *lunasecDeployer) mirrorRepos(env *awscdk.Environment) (lookup ServiceToImageMap, err error) {
	lookup = ServiceToImageMap{}

	if l.skipImageMirroring {
		// TODO (cthompson) we should lookup what the digest is of latest to pin versions
		lookup[secureFrameBackendRepoName] = "latest"
		return
	}

	// TODO (cthompson) ecr repo url should be read from configuration
	secureFrameBackendTag, err := mirrorRepoToEcr(*env.Account, "public.ecr.aws/d7v1k2o3/secure-frame-backend", string(secureFrameBackendRepoName))
	if err != nil {
		log.Println(err)
		return
	}
	lookup[secureFrameBackendRepoName] = secureFrameBackendTag
	return
}

func (l *lunasecDeployer) Deploy() (err error) {
	app := awscdk.NewApp(nil)

	deploymentEnv, err := getDeploymentEnv()
	if err != nil {
		return
	}

	serviceLookup, err := l.mirrorRepos(deploymentEnv)
	if err != nil {
		return
	}

	l.addComponentsToStack(app, "LunasecSecureEnclave", &LunasecStackProps{
		awscdk.StackProps{
			Env: deploymentEnv,
		},
	}, serviceLookup)

	out := app.Synth(&awscdk.StageSynthesisOptions{})

	// TODO (cthompson) we probably want to require approval for this, but for now this is ok
	args := []string{"deploy", "--require-approval", "never", "-a", *out.Directory()}

	cdkExecutor := NewExecutor("cdk", args, []string{}, *out.Directory(), nil, true)
	_, err = cdkExecutor.Execute()
	if err != nil {
		log.Println(err)
		return
	}
	return
}

func (l *lunasecDeployer) addComponentsToStack(scope constructs.Construct, id string, props *LunasecStackProps, serviceImageLookup ServiceToImageMap) awscdk.Stack {
	var sprops awscdk.StackProps
	if props != nil {
		sprops = props.StackProps
	}
	stack := awscdk.NewStack(scope, &id, &sprops)

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
		// TODO (cthompson) enable TTL for this table since a bunch of one time use records are created
		// TimeToLiveAttribute: ,
	})

	// TODO (cthompson) we should read this from a configuration file
	cdnConfig, err := json.Marshal(map[string]string{
		"host":        *secureFrameCloudfront.AttrDomainName(),
		"main_script": "main.dc2fde6210856cfb0d6c.js",
		"main_style":  "main.css",
	})
	if err != nil {
		panic(err)
	}

	secureFrameRepo := awsecr.Repository_FromRepositoryName(stack, jsii.String("secure-frame-repo"), jsii.String(string(secureFrameBackendRepoName)))

	secureFrameLambda := awslambda.NewDockerImageFunction(stack, jsii.String("secure-frame-lambda"), &awslambda.DockerImageFunctionProps{
		Code: awslambda.DockerImageCode_FromEcr(secureFrameRepo, &awslambda.EcrImageCodeProps{
			Tag: jsii.String(serviceImageLookup[secureFrameBackendRepoName]),
		}),
		Environment: &map[string]*string{
			"SECURE_FRAME_FRONT_END":     secureFrameCloudfront.AttrDomainName(),
			"CUSTOMER_FRONT_END":         jsii.String("http://localhost:3000"),
			"CIPHERTEXT_VAULT_S3_BUCKET": ciphertextBucket.BucketArn(),
			"AUTH_CALLBACK_URL":          jsii.String("http://localhost:3001"),
			"SECURE_FRAME_CDN_CONFIG":    jsii.String(string(cdnConfig)),
			// TODO (cthompson) does this value provide us any security?
			"TOKENIZER_CLIENT_SECRET": jsii.String("TODO"),
			// TODO (cthompson) this value will be given to us by our customer
			"CUSTOMER_PUBLIC_KEY": jsii.String("LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFsbjFtVm1vSVJqREdRNHBWY2NzQgo1eUozREZJdFVlOXpMRlU0bmFxc2ZGWUp5d0t5QXNINDh3VUhrQlgwWlJ1cm5FRW9tdHhtajNGOUIrZForVUxGCmUzSm5GcldEak43WE9GeHluM0pmWGp3VmZFZkEyRnhZTEx4Z3daeGZGRnZjV0NoMmpvZEFsUE82NkxCdGVTYkEKcGNsdlNucDc0WkhDU0VyOERGQ3Y3TFU1MGQwb0greGhyTjFoNllMdkxHTGJkRkZacHZ3MWRyQmFWN0tOdk9SOAp0NHFNYmNUZERqNWZXUEJtS1o1YVk0ZTNwS1g4OVNCYzhDdFlmQmNmU003dTRreGRHSXQrbmthMjlTeUtTWUJ4CldMYzRiRk1LT3dXancwZ2UvTGJud3RGRWxRK1J5VG83QVNqK29OSzNDUk9STkFheFkrT3o4cUwwMGN1d3VvM2EKUFFJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t"),
			"METADATA_KV_TABLE":   metadataTable.TableName(),
			"KEYS_KV_TABLE":       keysTable.TableName(),
			"SESSIONS_KV_TABLE":   sessionsTable.TableName(),
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

func pullContainerFromPublicEcr(ecrGateway gateway.AwsECRGateway, containerURL string) (containerImg v1.Image, err error) {
	options, err := gateway.LoadPublicCraneOptions(ecrGateway)
	if err != nil {
		log.Println(err)
		return
	}

	publicEcrDockerManager := NewDockerManager(options)

	containerImg, err = publicEcrDockerManager.PullImage(containerURL)
	if err != nil {
		log.Println(err)
		return
	}
	return
}

func pushContainerToPrivateEcr(ecrGateway gateway.AwsECRGateway, ecrRepository string, containerImg v1.Image) (ecrImageURL string, err error) {
	// TODO (cthompson) check if the pulled image and latest of the repository are the same

	tagDigest, err := containerImg.Digest()
	if err != nil {
		log.Println(err)
		return
	}
	tag := tagDigest.Hex

	ecrImageURL = fmt.Sprintf("%s:%s", ecrRepository, tag)

	options, err := gateway.LoadCraneOptions(ecrGateway)
	if err != nil {
		log.Println(err)
		return
	}

	privateEcrDockerManager := NewDockerManager(options)

	err = privateEcrDockerManager.PushImage(containerImg, ecrImageURL)
	if err != nil {
		log.Println(err)
		return
	}
	return
}

func createEcrRepository(ecrGateway gateway.AwsECRGateway, repoName string) (err error) {
	err = ecrGateway.CreateRepository(repoName)
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
		err = nil
	}
	return
}

func mirrorRepoToEcr(accountID, containerURL, newImageName string) (tag string, err error) {
	ecrGateway := gateway.NewAwsECRGatewayWithoutConfig()

	ecrRegistry := fmt.Sprintf("%s.dkr.ecr.us-west-2.amazonaws.com", accountID)
	ecrRepository := fmt.Sprintf("%s/%s", ecrRegistry, newImageName)

	log.Printf("pulling image from public ecr: %s", containerURL)
	containerImg, err := pullContainerFromPublicEcr(ecrGateway, containerURL)
	if err != nil {
		return
	}

	log.Printf("creating repository %s", ecrRepository)
	err = createEcrRepository(ecrGateway, newImageName)
	if err != nil {
		return
	}

	log.Printf("pushing image %s to private ecr", ecrRepository)
	ecrImageURL, err := pushContainerToPrivateEcr(ecrGateway, ecrRepository, containerImg)
	if err != nil {
		return
	}

	log.Printf("mirrored image %s to ecr at %s", containerURL, ecrImageURL)
	return
}
