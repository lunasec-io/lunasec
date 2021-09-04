package lunasec

import (
	"encoding/json"
	"fmt"
	"github.com/aws/aws-cdk-go/awscdk"
	"github.com/aws/aws-cdk-go/awscdk/awsapigateway"
	"github.com/aws/aws-cdk-go/awscdk/awscloudfront"
	"github.com/aws/aws-cdk-go/awscdk/awsdynamodb"
	"github.com/aws/aws-cdk-go/awscdk/awsecr"
	"github.com/aws/aws-cdk-go/awscdk/awslambda"
	"github.com/aws/aws-cdk-go/awscdk/awss3"
	"github.com/aws/aws-cdk-go/awscdk/awss3deployment"
	"github.com/aws/aws-cdk-go/awscdk/awssecretsmanager"
	"github.com/aws/constructs-go/constructs/v3"
	"github.com/aws/jsii-runtime-go"
	"github.com/refinery-labs/loq/constants"
	"github.com/refinery-labs/loq/gateway"
	"github.com/refinery-labs/loq/types"
	"github.com/refinery-labs/loq/util"
	"go.uber.org/config"
	"io/ioutil"
	"log"
	"os"
	"regexp"
	"strings"
)

type ServiceVersions map[constants.LunaSecServices]string

type BuildConfig struct {
	StackVersion        string          `yaml:"stack_version"`
	CustomerFrontEnd     string          `yaml:"customer_front_end"`
	CustomerBackEnd      string          `yaml:"customer_back_end"`
	SessionPublicKey     string          `yaml:"session_public_key"`
	FrontEndAssetsFolder string          `yaml:"front_end_assets_folder"`
	LocalStackUrl        string          `yaml:"localstack_url"`
	ServiceVersions    ServiceVersions `yaml:"service_versions"`
}

type BuilderConfig struct {
	buildDir           string
	localDev bool
	skipImageMirroring bool
	env *awscdk.Environment
}

type Builder interface {
	Build() (err error)
}

type builder struct {
	BuilderConfig
	buildConfig BuildConfig
	npmGateway gateway.NpmGateway
}

func NewBuilderConfig(
	buildDir string,
	localDev bool,
	skipImageMirroring bool,
	env *awscdk.Environment,
) BuilderConfig {
	return BuilderConfig{
		buildDir: buildDir,
		localDev: localDev,
		skipImageMirroring: skipImageMirroring,
		env: env,
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
	npmGateway gateway.NpmGateway,
) Builder {
	buildConfig.StackVersion = util.NormalizeVersionName(buildConfig.StackVersion)
	return &builder{
		builderConfig,
		buildConfig,
		npmGateway,
	}
}

func (l *builder) Build() (err error) {
	app := awscdk.NewApp(nil)

	serviceLookup, err := l.mirrorRepos(l.env)
	if err != nil {
		log.Println(err)
		return
	}

	l.addComponentsToStack(app, constants.LunaSecStackName, &LunasecStackProps{
		awscdk.StackProps{
			Env: l.env,
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

func (l *builder) getContainerURL(serviceName constants.LunaSecServices) string {
	version, ok := l.buildConfig.ServiceVersions[serviceName]
	if !ok {
		version = l.buildConfig.StackVersion
	}
	return fmt.Sprintf("lunasec/%s:%s", serviceName, version)
}

func (l *builder) mirrorRepos(env *awscdk.Environment) (lookup ServiceToImageMap, err error) {
	var (
		containerTag string
	)

	lookup = ServiceToImageMap{
		constants.TokenizerBackendServiceName: "latest",
	}

	if l.localDev {
		return
	}

	if l.skipImageMirroring {
		// TODO (cthompson) we should lookup what the digest is of latest to pin versions
		return
	}

	for serviceName, _ := range lookup {
		containerTag, err = mirrorRepoToEcr(
			*env.Account,
			l.getContainerURL(serviceName),
			string(serviceName),
		)
		if err != nil {
			log.Println(err)
			return
		}
		lookup[serviceName] = containerTag
	}
	return
}

func (l *builder) getCdnConfig(secureFrameDomainName string) (packageDir, serializedConfig string, err error) {
	cdnConfig := types.CDNConfig{
		Protocol: "https",
		Host:       secureFrameDomainName,
		MainScript: "",
		MainStyle:  "",
	}

	mainScriptPattern := regexp.MustCompile(`js\/main(\.[a-f0-9]+|\-dev)\.js`)
	mainStylePattern := regexp.MustCompile(`main(\.[a-f0-9]+|)\.css`)

	version := l.buildConfig.StackVersion

	packageTarFile, err := l.npmGateway.DownloadPackage("@lunasec/secure-frame-front-end", version)
	if err != nil {
		return
	}

	extractedPackageDir, err := ioutil.TempDir(os.TempDir(), "secure-frame-front-end")
	if err != nil {
		return
	}
	err = util.ExtractTgzWithCallback(packageTarFile.Name(), extractedPackageDir, func(filename string) {
		if mainScriptPattern.MatchString(filename) {
			cdnConfig.MainScript = filename
		}
		if mainStylePattern.MatchString(filename) {
			cdnConfig.MainStyle = filename
		}
	})
	if err != nil {
		return
	}

	if cdnConfig.MainScript == "" || cdnConfig.MainStyle == "" {
		err = fmt.Errorf("unable to locate script and/or style asset script: %s style: %s",
			cdnConfig.MainScript, cdnConfig.MainStyle)
		return
	}

	packageDir = strings.ReplaceAll(extractedPackageDir, "public/", "")
	serializedConfigBytes, err := json.Marshal(cdnConfig)
	serializedConfig = string(serializedConfigBytes)
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

func (l *builder) getTokenizerBackendBucket(stack awscdk.Stack) awss3.Bucket {
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

func (l *builder) getTokenizerBackendDomainName(secureFrameCloudfront awscloudfront.CfnDistribution) string {
	if l.localDev {
		return l.buildConfig.LocalStackUrl
	}
	return *secureFrameCloudfront.AttrDomainName()
}

func (l *builder) getTokenizerBackendBucketDeployment(stack awscdk.Stack, secureFrameBucket awss3.Bucket, assetFolder string) awss3deployment.BucketDeployment {
	if l.localDev {
		return nil
	}

	bucketSource := awss3deployment.Source_Asset(jsii.String(assetFolder), nil)

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

func (l *builder) createSecret(stack awscdk.Stack, name, description string) awssecretsmanager.Secret {
	secret := awssecretsmanager.NewSecret(stack, jsii.String(name), &awssecretsmanager.SecretProps{
		Description: jsii.String(description),
	})
	awscdk.NewCfnOutput(stack, getOutputName(name), &awscdk.CfnOutputProps{
		Value:      secret.SecretArn(),
		ExportName: getOutputName(name),
	})
	return secret
}

func (l *builder) getTokenizerBackendLambda(stack awscdk.Stack, containerTag string, lambdaEnv *map[string]*string) awslambda.Function {
	secureFrameRepo := awsecr.Repository_FromRepositoryName(stack, jsii.String("secure-frame-repo"), jsii.String(string(constants.TokenizerBackendServiceName)))

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

func (l *builder) getTokenizerBackendBucketAssetFolder(secureFrameDomainName string) (assetsFolder, cdnConfig string) {
	if l.localDev {
		return l.buildConfig.FrontEndAssetsFolder, ""
	}

	var err error
	assetsFolder, cdnConfig, err = l.getCdnConfig(secureFrameDomainName)
	if err != nil {
		panic(err)
	}
	return
}

func (l *builder) addComponentsToStack(scope constructs.Construct, id string, props *LunasecStackProps, serviceImageLookup ServiceToImageMap) awscdk.Stack {
	var sprops awscdk.StackProps
	if props != nil {
		sprops = props.StackProps
	}
	stack := awscdk.NewStack(scope, &id, &sprops)

	ciphertextBucket := l.getCiphertextBucket(stack)

	secureFrameBucket := l.getTokenizerBackendBucket(stack)

	secureFrameCloudfront := l.getCloudfrontDistribution(stack, secureFrameBucket)
	secureFrameDomainName := l.getTokenizerBackendDomainName(secureFrameCloudfront)

	assetFolder, cdnConfig := l.getTokenizerBackendBucketAssetFolder(secureFrameDomainName)
	l.getTokenizerBackendBucketDeployment(stack, secureFrameBucket, assetFolder)

	metadataTable := l.createBasicDynamodbTable(stack, "metadata-table")

	keysTable := l.createBasicDynamodbTable(stack, "keys-table")

	// TODO (cthompson) enable TTL for this table since a bunch of one time use records are created
	sessionsTable := l.createBasicDynamodbTable(stack, "sessions-table")

	// TODO (cthompson) enable TTL for this table since a bunch of one time use records are created
	grantsTable := l.createBasicDynamodbTable(stack, "grants-table")

	secretDescription := "Secret used by the tokenizer-backend in generating encryption keys for ciphertexts."
	tokenizerSecret := l.createSecret(stack, "tokenizer-secret", secretDescription)

	if !l.localDev {
		lambdaEnv := &map[string]*string{
			"SECURE_FRAME_FRONT_END":     secureFrameCloudfront.AttrDomainName(),
			"CUSTOMER_FRONT_END":         jsii.String(l.buildConfig.CustomerFrontEnd),
			"CIPHERTEXT_VAULT_S3_BUCKET": ciphertextBucket.BucketArn(),
			"CUSTOMER_BACK_END":          jsii.String(l.buildConfig.CustomerBackEnd),
			"SECURE_FRAME_CDN_CONFIG":    jsii.String(string(cdnConfig)),
			"TOKENIZER_SECRET_ARN": tokenizerSecret.SecretArn(),
			"SESSION_PUBLIC_KEY": jsii.String(l.buildConfig.SessionPublicKey),
			"METADATA_KV_TABLE":   metadataTable.TableName(),
			"KEYS_KV_TABLE":       keysTable.TableName(),
			"SESSIONS_KV_TABLE":   sessionsTable.TableName(),
			"GRANTS_KV_TABLE":   grantsTable.TableName(),
		}

		containerTag := serviceImageLookup[constants.TokenizerBackendServiceName]

		secureFrameLambda := l.getTokenizerBackendLambda(stack, containerTag, lambdaEnv)
		ciphertextBucket.GrantReadWrite(secureFrameLambda, "*")
		metadataTable.GrantReadWriteData(secureFrameLambda)
		keysTable.GrantReadWriteData(secureFrameLambda)
		sessionsTable.GrantReadWriteData(secureFrameLambda)
		grantsTable.GrantReadWriteData(secureFrameLambda)

		l.getLambdaRestApi(stack, secureFrameLambda)
	}
	return stack
}
