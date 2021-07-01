package service

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/aws/aws-cdk-go/awscdk/awss3deployment"
	"github.com/refinery-labs/loq/model"
	"github.com/refinery-labs/loq/util"
	"go.uber.org/config"
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

const (
	lunasecBuildDir = "build"
)

type ServiceToImageMap map[SecureFrameService]string

type LunasecDeployer interface {
	Build() (err error)
	Deploy() (err error)
}

type LunasecStackProps struct {
	awscdk.StackProps
}

type LunasecBuildConfig struct {
	CustomerFrontEnd string `yaml:"customer_front_end"`
	AuthCallbackURL string `yaml:"auth_callback_url"`
	CDNConfig model.CDNConfig `yaml:"cdn_config"`
	CustomerPublicKey string `yaml:"customer_public_key"`
	FrontEndAssetsFolder string `yaml:"front_end_assets_folder"`
}

type lunasecDeployer struct {
	buildDir string
	skipImageMirroring bool
	buildConfig LunasecBuildConfig
}

func NewLunasecDeployer(provider config.Provider, buildDir string, skipImageMirroring bool) (deployer LunasecDeployer, err error) {
	var (
		buildConfig LunasecBuildConfig
	)

	if buildDir == "" {
		buildDir = lunasecBuildDir
	}

	if provider != nil {
		err = provider.Get("lunasec").Populate(&buildConfig)
		if err != nil {
			log.Println(err)
			return
		}
	}

	deployer = &lunasecDeployer{
		buildDir: buildDir,
		skipImageMirroring: skipImageMirroring,
		buildConfig: buildConfig,
	}
	return
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

func (l *lunasecDeployer) Build() (err error) {
	app := awscdk.NewApp(nil)

	deploymentEnv, err := getDeploymentEnv()
	if err != nil {
		log.Println(err)
		return
	}

	// TODO (cthompson) check the environment, we if we are running this in a dev environment, we could build the services with a CDK component
	serviceLookup, err := l.mirrorRepos(deploymentEnv)
	if err != nil {
		log.Println(err)
		return
	}

	l.addComponentsToStack(app, "LunasecSecureEnclave", &LunasecStackProps{
		awscdk.StackProps{
			Env: deploymentEnv,
		},
	}, serviceLookup)

	out := app.Synth(&awscdk.StageSynthesisOptions{})

	err = util.CopyDirectory(*out.Directory(), l.buildDir)
	if err != nil {
		log.Println(err)
		return
	}
	log.Printf("successfully built secure Lunasec components to directory: %s", l.buildDir)
	return
}

func (l *lunasecDeployer) Deploy() (err error) {
	workDir, err := os.Getwd()
	if err != nil {
		log.Println(err)
		return
	}

	deploymentEnv, err := getDeploymentEnv()
	if err != nil {
		log.Println(err)
		return
	}

	awsURI := fmt.Sprintf("aws://%s/%s", *deploymentEnv.Account, *deploymentEnv.Region)

	args := []string{"bootstrap", awsURI}
	cdkExecutor := NewExecutor("cdk", args, []string{}, workDir, nil, true)
	_, err = cdkExecutor.Execute()
	if err != nil {
		log.Println(err)
		return
	}

	// TODO (cthompson) we probably want to require approval for this, but for now this is ok
	args = []string{"deploy", "--require-approval", "never", "-a", l.buildDir}

	cdkExecutor = NewExecutor("cdk", args, []string{}, workDir, nil, true)
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

	bucketSource := awss3deployment.Source_Asset(jsii.String(l.buildConfig.FrontEndAssetsFolder), nil)

	_ = awss3deployment.NewBucketDeployment(stack, jsii.String("secure-frame-bucket-deployment"), &awss3deployment.BucketDeploymentProps{
		Sources: &[]awss3deployment.ISource{
			bucketSource,
		},
		DestinationBucket: secureFrameBucket,
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
	cdnConfig, err := json.Marshal(model.CDNConfig{
		Protocol: "https",
		Host:        *secureFrameCloudfront.AttrDomainName(),
		MainScript: l.buildConfig.CDNConfig.MainScript,
		MainStyle:  l.buildConfig.CDNConfig.MainStyle,
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
			"CUSTOMER_FRONT_END":         jsii.String(l.buildConfig.CustomerFrontEnd),
			"CIPHERTEXT_VAULT_S3_BUCKET": ciphertextBucket.BucketArn(),
			"AUTH_CALLBACK_URL":          jsii.String(l.buildConfig.AuthCallbackURL),
			"SECURE_FRAME_CDN_CONFIG":    jsii.String(string(cdnConfig)),
			// TODO (cthompson) does this value provide us any security?
			"TOKENIZER_CLIENT_SECRET": jsii.String("TODO"),
			"CUSTOMER_PUBLIC_KEY": jsii.String(l.buildConfig.CustomerPublicKey),
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
