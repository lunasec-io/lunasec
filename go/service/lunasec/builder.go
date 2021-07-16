package lunasec

import (
	"encoding/json"
	"github.com/aws/aws-cdk-go/awscdk"
	"github.com/aws/aws-cdk-go/awscdk/awsapigateway"
	"github.com/aws/aws-cdk-go/awscdk/awscloudfront"
	"github.com/aws/aws-cdk-go/awscdk/awsdynamodb"
	"github.com/aws/aws-cdk-go/awscdk/awsecr"
	"github.com/aws/aws-cdk-go/awscdk/awslambda"
	"github.com/aws/aws-cdk-go/awscdk/awss3"
	"github.com/aws/aws-cdk-go/awscdk/awss3deployment"
	"github.com/aws/constructs-go/constructs/v3"
	"github.com/aws/jsii-runtime-go"
	"github.com/refinery-labs/loq/gateway"
	"github.com/refinery-labs/loq/model"
	"github.com/refinery-labs/loq/util"
	"go.uber.org/config"
	"log"
)

type BuildConfig struct {
	CustomerFrontEnd string `yaml:"customer_front_end"`
	CustomerBackEnd string `yaml:"customer_back_end"`
	CDNConfig model.CDNConfig `yaml:"cdn_config"`
	CustomerPublicKey string `yaml:"customer_public_key"`
	FrontEndAssetsFolder string `yaml:"front_end_assets_folder"`
	LocalStackUrl string `yaml:"localstack_url"`
}

type BuilderConfig struct {
	buildDir           string
	localDev bool
	skipImageMirroring bool
	sts gateway.AwsStsGateway
}

type Builder interface {
	Build() (err error)
}

type builder struct {
	BuilderConfig
	buildConfig BuildConfig
}

func NewBuilderConfig(
	buildDir string,
	localDev bool,
	skipImageMirroring bool,
	sts gateway.AwsStsGateway,
) BuilderConfig {
	return BuilderConfig{
		buildDir: buildDir,
		localDev: localDev,
		skipImageMirroring: skipImageMirroring,
		sts: sts,
	}
}

func NewBuildConfig(
	provider config.Provider,
) (buildConfig BuildConfig, err error) {
	err = provider.Get("lunasec").Populate(&buildConfig)
	return
}

func NewBuilder(
	builderConfig BuilderConfig,
	buildConfig BuildConfig,
) Builder {
	return &builder{
		builderConfig,
		buildConfig,
	}
}

func (l *builder) Build() (err error) {
	app := awscdk.NewApp(nil)

	deploymentEnv, err := getDeploymentEnv(l.sts)
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

	l.addComponentsToStack(app, StackName, &LunasecStackProps{
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

func (l *builder) mirrorRepos(env *awscdk.Environment) (lookup ServiceToImageMap, err error) {
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

func (l *builder) getCiphertextBucket(stack awscdk.Stack) awss3.Bucket {
	bucketName := "ciphertext-bucket"
	bucket := awss3.NewBucket(stack, jsii.String(bucketName), &awss3.BucketProps{
		Cors: &[]*awss3.CorsRule{
			{
				AllowedHeaders: &[]*string{jsii.String("*")},
				AllowedOrigins: &[]*string{jsii.String("*")},
				AllowedMethods: &[]awss3.HttpMethods{"GET", "PUT"},
			},
		},
	})
	awscdk.NewCfnOutput(stack, getOutputName(bucketName), &awscdk.CfnOutputProps{
		Value:      bucket.BucketName(),
		ExportName: getOutputName(bucketName),
	})
	return bucket
}

func (l *builder) getSecureFrameBucket(stack awscdk.Stack) awss3.Bucket {
	return awss3.NewBucket(stack, jsii.String("secure-frame-bucket"), &awss3.BucketProps{
		AccessControl:        awss3.BucketAccessControl_PUBLIC_READ,
		WebsiteIndexDocument: jsii.String("index.html"),
		WebsiteErrorDocument: jsii.String("index.html"),
	})
}

func (l *builder) getCloudfrontDistribution(stack awscdk.Stack, secureFrameBucket awss3.Bucket) awscloudfront.CfnDistribution {
	if l.localDev {
		return nil
	}
	return awscloudfront.NewCfnDistribution(stack, jsii.String("secure-frame-cloudfront"), &awscloudfront.CfnDistributionProps{
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
}

func (l *builder) getSecureFrameDomainName(secureFrameCloudfront awscloudfront.CfnDistribution) string {
	if l.localDev {
		return l.buildConfig.LocalStackUrl
	}
	return *secureFrameCloudfront.AttrDomainName()
}

func (l *builder) getSecureFrameBucketDeployment(stack awscdk.Stack, secureFrameBucket awss3.Bucket) awss3deployment.BucketDeployment {
	if l.localDev {
		return nil
	}

	bucketSource := awss3deployment.Source_Asset(jsii.String(l.buildConfig.FrontEndAssetsFolder), nil)

	return awss3deployment.NewBucketDeployment(stack, jsii.String("secure-frame-bucket-deployment"), &awss3deployment.BucketDeploymentProps{
		Sources: &[]awss3deployment.ISource{
			bucketSource,
		},
		DestinationBucket: secureFrameBucket,
	})
}

func (l *builder) createBasicDynamodbTable(stack awscdk.Stack, name string) awsdynamodb.Table {
	table := awsdynamodb.NewTable(stack, jsii.String(name), &awsdynamodb.TableProps{
		PartitionKey: &awsdynamodb.Attribute{
			Name: jsii.String("Key"),
			Type: awsdynamodb.AttributeType_STRING,
		},

		// TimeToLiveAttribute: jsii.String("TODO"),
	})
	awscdk.NewCfnOutput(stack, getOutputName(name), &awscdk.CfnOutputProps{
		Value:      table.TableName(),
		ExportName: getOutputName(name),
	})
	return table
}

func (l *builder) getSecureFrameLambda(stack awscdk.Stack, containerTag string, lambdaEnv *map[string]*string) awslambda.Function {
	secureFrameRepo := awsecr.Repository_FromRepositoryName(stack, jsii.String("secure-frame-repo"), jsii.String(string(secureFrameBackendRepoName)))

	return awslambda.NewDockerImageFunction(stack, jsii.String("secure-frame-lambda"), &awslambda.DockerImageFunctionProps{
		Code: awslambda.DockerImageCode_FromEcr(secureFrameRepo, &awslambda.EcrImageCodeProps{
			Tag: jsii.String(containerTag),
		}),
		Environment: lambdaEnv,
	})
}

func (l *builder) getLambdaRestApi(stack awscdk.Stack, secureFrameLambda awslambda.Function) awsapigateway.LambdaRestApi {
	return awsapigateway.NewLambdaRestApi(stack, jsii.String("gateway"), &awsapigateway.LambdaRestApiProps{
		Handler: secureFrameLambda,
	})
}

func (l *builder) addComponentsToStack(scope constructs.Construct, id string, props *LunasecStackProps, serviceImageLookup ServiceToImageMap) awscdk.Stack {
	var sprops awscdk.StackProps
	if props != nil {
		sprops = props.StackProps
	}
	stack := awscdk.NewStack(scope, &id, &sprops)

	ciphertextBucket := l.getCiphertextBucket(stack)

	secureFrameBucket := l.getSecureFrameBucket(stack)

	secureFrameCloudfront := l.getCloudfrontDistribution(stack, secureFrameBucket)
	secureFrameDomainName := l.getSecureFrameDomainName(secureFrameCloudfront)

	l.getSecureFrameBucketDeployment(stack, secureFrameBucket)

	metadataTable := l.createBasicDynamodbTable(stack, "metadata-table")

	keysTable := l.createBasicDynamodbTable(stack, "keys-table")

	// TODO (cthompson) enable TTL for this table since a bunch of one time use records are created
	sessionsTable := l.createBasicDynamodbTable(stack, "sessions-table")

	// TODO (cthompson) enable TTL for this table since a bunch of one time use records are created
	grantsTable := l.createBasicDynamodbTable(stack, "grants-table")

	cdnConfig, err := json.Marshal(model.CDNConfig{
		Protocol: "https",
		Host:        secureFrameDomainName,
		MainScript: l.buildConfig.CDNConfig.MainScript,
		MainStyle:  l.buildConfig.CDNConfig.MainStyle,
	})
	if err != nil {
		panic(err)
	}

	lambdaEnv := &map[string]*string{
		"SECURE_FRAME_FRONT_END":     secureFrameCloudfront.AttrDomainName(),
		"CUSTOMER_FRONT_END":         jsii.String(l.buildConfig.CustomerFrontEnd),
		"CIPHERTEXT_VAULT_S3_BUCKET": ciphertextBucket.BucketArn(),
		"CUSTOMER_BACK_END":          jsii.String(l.buildConfig.CustomerBackEnd),
		"SECURE_FRAME_CDN_CONFIG":    jsii.String(string(cdnConfig)),
		// TODO (cthompson) does this value provide us any security?
		"TOKENIZER_CLIENT_SECRET": jsii.String("TODO"),
		"CUSTOMER_PUBLIC_KEY": jsii.String(l.buildConfig.CustomerPublicKey),
		"METADATA_KV_TABLE":   metadataTable.TableName(),
		"KEYS_KV_TABLE":       keysTable.TableName(),
		"SESSIONS_KV_TABLE":   sessionsTable.TableName(),
		"GRANTS_KV_TABLE":   grantsTable.TableName(),
	}

	containerTag := serviceImageLookup[secureFrameBackendRepoName]

	secureFrameLambda := l.getSecureFrameLambda(stack, containerTag, lambdaEnv)

	ciphertextBucket.GrantReadWrite(secureFrameLambda, "*")
	metadataTable.GrantReadWriteData(secureFrameLambda)
	keysTable.GrantReadWriteData(secureFrameLambda)
	sessionsTable.GrantReadWriteData(secureFrameLambda)
	grantsTable.GrantReadWriteData(secureFrameLambda)

	l.getLambdaRestApi(stack, secureFrameLambda)

	return stack
}
