// Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
package lunasec

import (
	"encoding/json"
	"fmt"
	"github.com/aws/aws-cdk-go/awscdk"
	"github.com/aws/aws-cdk-go/awscdk/awsapigateway"
	"github.com/aws/aws-cdk-go/awscdk/awscloudfront"
	"github.com/aws/aws-cdk-go/awscdk/awsdynamodb"
	"github.com/aws/aws-cdk-go/awscdk/awsecr"
	"github.com/aws/aws-cdk-go/awscdk/awsevents"
	"github.com/aws/aws-cdk-go/awscdk/awseventstargets"
	"github.com/aws/aws-cdk-go/awscdk/awsiam"
	"github.com/aws/aws-cdk-go/awscdk/awslambda"
	"github.com/aws/aws-cdk-go/awscdk/awss3"
	"github.com/aws/aws-cdk-go/awscdk/awss3deployment"
	"github.com/aws/aws-cdk-go/awscdk/awssecretsmanager"
	"github.com/aws/constructs-go/constructs/v3"
	"github.com/aws/jsii-runtime-go"
	"github.com/lunasec-io/lunasec-monorepo/constants"
	"github.com/lunasec-io/lunasec-monorepo/gateway"
	"github.com/lunasec-io/lunasec-monorepo/gateway/metrics"
	"github.com/lunasec-io/lunasec-monorepo/types"
	"github.com/lunasec-io/lunasec-monorepo/util"
	"go.uber.org/config"
	"io/ioutil"
	"log"
	"os"
	"path"
	"regexp"
	"strconv"
	"strings"
)

type ServiceVersions map[constants.LunaSecServices]string

type BuildConfig struct {
	StackVersion         string          `yaml:"stack_version"`
	ApplicationFrontEnd  string          `yaml:"application_front_end"`
	ApplicationBackEnd   string          `yaml:"application_back_end"`
	SessionPublicKey     string          `yaml:"session_public_key"`
	SessionJwksEndpoint  string          `yaml:"session_jwks_endpoint"`
	FrontEndAssetsFolder string          `yaml:"front_end_assets_folder"`
	LocalStackUrl        string          `yaml:"localstack_url"`
	ServiceVersions      ServiceVersions `yaml:"service_versions"`
	LocalBuildArtifacts  bool            `yaml:"local_build_artifacts"`
}

type BuilderConfig struct {
	buildDir           string
	localDev           bool
	skipImageMirroring bool
	env                *awscdk.Environment
}

type Builder interface {
	Build() (err error)
}

type builder struct {
	BuilderConfig
	buildConfig   BuildConfig
	npmGateway    gateway.NpmGateway
	metricsConfig metrics.MetricProviderConfig
}

func NewBuilderConfig(
	buildDir string,
	localDev bool,
	env *awscdk.Environment,
) BuilderConfig {
	return BuilderConfig{
		buildDir:           buildDir,
		localDev:           localDev,
		skipImageMirroring: false,
		env:                env,
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
	metricsConfig metrics.MetricProviderConfig,
) Builder {
	buildConfig.StackVersion = util.NormalizeVersionName(buildConfig.StackVersion)

	if buildConfig.SessionPublicKey == "" {
		jwksURL := fmt.Sprintf("%s/%s", buildConfig.ApplicationBackEnd, ".lunasec/jwks.json")
		log.Printf("session_public_key not provided, auth will be performed with JWKS url: %s", jwksURL)
		buildConfig.SessionJwksEndpoint = jwksURL
	}

	return &builder{
		builderConfig,
		buildConfig,
		npmGateway,
		metricsConfig,
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
		constants.LunaSecServicesTokenizerBackend:      "latest",
		constants.LunaSecAnalyticsCollectorServiceName: "latest",
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
			l.buildConfig.LocalBuildArtifacts,
		)
		if err != nil {
			log.Println(err)
			return
		}
		lookup[serviceName] = containerTag
	}
	return
}

// TODO (cthompson) keep previous versions in the bucket to avoid breaking frontends on different versions?
func (l *builder) getCdnConfig(secureFrameDomainName string) (packageDir, serializedConfig string, err error) {
	cdnConfig := types.CDNConfig{
		Protocol:   "https",
		Host:       secureFrameDomainName,
		MainScript: "",
		MainStyle:  "",
	}

	mainScriptPattern := regexp.MustCompile(`^js\/main(\.[a-f0-9]+|\-dev)\.js$`)
	mainStylePattern := regexp.MustCompile(`^main(\.[a-f0-9]+|)\.css$`)

	version, ok := l.buildConfig.ServiceVersions[constants.LunaSecServicesSecureFrameFrontend]
	if !ok {
		version = l.buildConfig.StackVersion
	}

	// TODO (cthompson) when l.buildConfig.LocalBuildArtifacts is set, use a local version of this

	packageTarFile, err := l.npmGateway.DownloadPackage("@lunasec/secure-frame-front-end", version)
	if err != nil {
		return
	}

	extractedPackageDir, err := ioutil.TempDir(os.TempDir(), "secure-frame-front-end")
	if err != nil {
		return
	}

	err = util.ExtractTgzWithCallback(packageTarFile.Name(), func(filename string, data []byte) (err error) {
		formattedName := strings.ReplaceAll(filename, "package/public/", "")

		shouldSaveFile := false
		if mainScriptPattern.MatchString(formattedName) {
			formattedName = strings.ReplaceAll(formattedName, "js/", "")
			cdnConfig.MainScript = formattedName
			shouldSaveFile = true
		}
		if mainStylePattern.MatchString(formattedName) {
			cdnConfig.MainStyle = formattedName
			shouldSaveFile = true
		}

		if shouldSaveFile {
			err = ioutil.WriteFile(
				path.Join(extractedPackageDir, formattedName),
				data,
				0755,
			)
		}
		return
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
	return awss3.NewBucket(stack, jsii.String("tokenizer-backend-bucket"), &awss3.BucketProps{
		AccessControl:        awss3.BucketAccessControl_PUBLIC_READ,
		WebsiteIndexDocument: jsii.String("index.html"),
		WebsiteErrorDocument: jsii.String("index.html"),
	})
}

func (l *builder) getCloudfrontDistribution(stack awscdk.Stack, secureFrameBucket awss3.Bucket) awscloudfront.CfnDistribution {
	if l.localDev {
		return nil
	}
	return awscloudfront.NewCfnDistribution(stack, jsii.String("tokenizer-backend-cloudfront"), &awscloudfront.CfnDistributionProps{
		DistributionConfig: awscloudfront.CfnDistribution_DistributionConfigProperty{
			Origins: []awscloudfront.CfnDistribution_OriginProperty{
				{
					DomainName: secureFrameBucket.BucketDomainName(),
					Id:         jsii.String("tokenizer-backend-domain"),
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
				TargetOriginId:       jsii.String("tokenizer-backend-domain"),
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

	return awss3deployment.NewBucketDeployment(stack, jsii.String("tokenizer-backend-bucket-deployment"), &awss3deployment.BucketDeploymentProps{
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
		Description:   jsii.String(description),
		RemovalPolicy: awscdk.RemovalPolicy_RETAIN,
	})
	awscdk.NewCfnOutput(stack, getOutputName(name), &awscdk.CfnOutputProps{
		Value:      secret.SecretArn(),
		ExportName: getOutputName(name),
	})
	return secret
}

func (l *builder) createAnalyticsCollectorCron(stack awscdk.Stack, serviceImageLookup ServiceToImageMap) {
	lambdaEnv := map[string]*string{
		"STACK_ID": stack.Node().Id(),
	}

	containerTag := serviceImageLookup[constants.LunaSecAnalyticsCollectorServiceName]

	analyticsCollectorLambda := l.getAnalyticsCollectorLambda(stack, containerTag, &lambdaEnv)

	metricStatisticsStatement := awsiam.NewPolicyStatement(&awsiam.PolicyStatementProps{
		Resources: &[]*string{
			jsii.String("*"),
		},
		Actions: &[]*string{
			jsii.String("cloudwatch:GetMetricStatistics"),
		},
	})

	analyticsCollectorLambda.AddToRolePolicy(metricStatisticsStatement)

	everyDayRule := awsevents.NewRule(stack, jsii.String("analytics-collector-cron"), &awsevents.RuleProps{
		Schedule: awsevents.Schedule_Cron(&awsevents.CronOptions{
			Minute: jsii.String("0"),
			Hour:   jsii.String("0"),
		}),
	})

	everyDayRule.AddTarget(awseventstargets.NewLambdaFunction(analyticsCollectorLambda, nil))
}

func (l *builder) getTokenizerBackendLambda(stack awscdk.Stack, containerTag string, lambdaEnv *map[string]*string) awslambda.Function {
	tokenizerBackendRepo := awsecr.Repository_FromRepositoryName(stack, jsii.String("tokenizer-backend-repo"), jsii.String(string(constants.LunaSecServicesTokenizerBackend)))

	return awslambda.NewDockerImageFunction(stack, jsii.String("tokenizer-backend-lambda"), &awslambda.DockerImageFunctionProps{
		Code: awslambda.DockerImageCode_FromEcr(tokenizerBackendRepo, &awslambda.EcrImageCodeProps{
			Tag: jsii.String(containerTag),
		}),
		Environment: lambdaEnv,
	})
}

func (l *builder) getAnalyticsCollectorLambda(stack awscdk.Stack, containerTag string, lambdaEnv *map[string]*string) awslambda.Function {
	analyticsCollectorRepo := awsecr.Repository_FromRepositoryName(stack, jsii.String("analytics-collector-repo"), jsii.String(string(constants.LunaSecAnalyticsCollectorServiceName)))

	return awslambda.NewDockerImageFunction(stack, jsii.String("analytics-collector-lambda"), &awslambda.DockerImageFunctionProps{
		Code: awslambda.DockerImageCode_FromEcr(analyticsCollectorRepo, &awslambda.EcrImageCodeProps{
			Tag: jsii.String(containerTag),
		}),
		Environment: lambdaEnv,
	})
}

func (l *builder) getLambdaRestApi(stack awscdk.Stack, tokenizerBackendLambda awslambda.Function) awsapigateway.LambdaRestApi {
	tokenizerGateway := awsapigateway.NewLambdaRestApi(stack, jsii.String("gateway"), &awsapigateway.LambdaRestApiProps{
		Handler: tokenizerBackendLambda,
	})
	awscdk.NewCfnOutput(stack, getOutputName("tokenizer-gateway"), &awscdk.CfnOutputProps{
		Value:      tokenizerGateway.Url(),
		ExportName: getOutputName("tokenizer-gateway"),
	})
	return tokenizerGateway
}

func (l *builder) getTokenizerBackendBucketAssetFolder(tokenizerBackendDomainName string) (assetsFolder, cdnConfig string) {
	if l.localDev {
		return l.buildConfig.FrontEndAssetsFolder, ""
	}

	var err error
	assetsFolder, cdnConfig, err = l.getCdnConfig(tokenizerBackendDomainName)
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
	stackId := stack.Node().Id()

	ciphertextBucket := l.getCiphertextBucket(stack)

	secureFrameBucket := l.getTokenizerBackendBucket(stack)

	secureFrameCloudfront := l.getCloudfrontDistribution(stack, secureFrameBucket)
	tokenizerBackendDomainName := l.getTokenizerBackendDomainName(secureFrameCloudfront)

	assetFolder, cdnConfig := l.getTokenizerBackendBucketAssetFolder(tokenizerBackendDomainName)
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
		lambdaEnv := map[string]*string{
			"TOKENIZER_URL":                    secureFrameCloudfront.AttrDomainName(),
			"APPLICATION_FRONT_END":            jsii.String(l.buildConfig.ApplicationFrontEnd),
			"CIPHERTEXT_VAULT_S3_BUCKET":       ciphertextBucket.BucketArn(),
			"APPLICATION_BACK_END":             jsii.String(l.buildConfig.ApplicationBackEnd),
			"SECURE_FRAME_CDN_CONFIG":          jsii.String(cdnConfig),
			"TOKENIZER_SECRET_ARN":             tokenizerSecret.SecretArn(),
			"METADATA_KV_TABLE":                metadataTable.TableName(),
			"KEYS_KV_TABLE":                    keysTable.TableName(),
			"SESSIONS_KV_TABLE":                sessionsTable.TableName(),
			"GRANTS_KV_TABLE":                  grantsTable.TableName(),
			"STACK_ID":                         stackId,
			"METRICS_DISABLED":                 jsii.String(strconv.FormatBool(l.metricsConfig.Disabled)),
			"METRICS_PROVIDER":                 jsii.String(string(l.metricsConfig.Provider)),
			"METRICS_DISABLE_USAGE_STATISTICS": jsii.String(strconv.FormatBool(l.metricsConfig.DisableUsageStatisticsMetrics)),
		}

		if l.buildConfig.SessionPublicKey != "" {
			lambdaEnv["SESSION_PUBLIC_KEY"] = jsii.String(l.buildConfig.SessionPublicKey)
		} else {
			lambdaEnv["SESSION_JWKS_URL"] = jsii.String(l.buildConfig.SessionJwksEndpoint)
		}

		containerTag := serviceImageLookup[constants.LunaSecServicesTokenizerBackend]

		tokenizerBackendLambda := l.getTokenizerBackendLambda(stack, containerTag, &lambdaEnv)
		ciphertextBucket.GrantReadWrite(tokenizerBackendLambda, "*")
		metadataTable.GrantReadWriteData(tokenizerBackendLambda)
		keysTable.GrantReadWriteData(tokenizerBackendLambda)
		sessionsTable.GrantReadWriteData(tokenizerBackendLambda)
		grantsTable.GrantReadWriteData(tokenizerBackendLambda)

		l.getLambdaRestApi(stack, tokenizerBackendLambda)

		if !l.metricsConfig.Disabled {
			l.createAnalyticsCollectorCron(stack, serviceImageLookup)
		}
	}
	return stack
}
