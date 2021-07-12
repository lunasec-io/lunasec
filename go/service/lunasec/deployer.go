package lunasec

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/aws/aws-cdk-go/awscdk/awsapigateway"
	"github.com/aws/aws-cdk-go/awscdk/awss3deployment"
	"github.com/refinery-labs/loq/model"
	"github.com/refinery-labs/loq/service"
	"github.com/refinery-labs/loq/util"
	"go.uber.org/config"
	"gopkg.in/yaml.v3"
	"io/ioutil"
	"log"
	"os"
	"path"
	"strings"

	"github.com/aws/aws-cdk-go/awscdk"
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
	stackName = "LunasecSecureEnclave"
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
	CustomerBackEnd string `yaml:"customer_back_end"`
	CDNConfig model.CDNConfig `yaml:"cdn_config"`
	CustomerPublicKey string `yaml:"customer_public_key"`
	FrontEndAssetsFolder string `yaml:"front_end_assets_folder"`
	LocalStackUrl string `yaml:"localstack_url"`
}

type lunasecDeployer struct {
	buildDir           string
	skipImageMirroring bool
	localDev           bool
	buildConfig        LunasecBuildConfig
	configOutput       string
}

func NewLunasecDeployer(
	provider config.Provider,
	buildDir string,
	skipImageMirroring bool,
	localDev bool,
	configOutput string,
) (deployer LunasecDeployer, err error) {
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
		localDev: localDev,
		buildConfig: buildConfig,
		configOutput: configOutput,
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

	l.addComponentsToStack(app, stackName, &LunasecStackProps{
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

func getOutputName(name string) *string {
	outputName := fmt.Sprintf("%sArnOutput", name)
	return jsii.String(strings.Replace(outputName, "-", "", -1))
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

	if l.localDev {
		args := []string{
			fmt.Sprintf("--endpoint-url=%s", l.buildConfig.LocalStackUrl),
			"cloudformation",
			"create-stack",
			"--stack-name",
			stackName,
			"--template-body",
			fmt.Sprintf("file://%s/%s.template.json", l.buildDir, stackName),
		}
		awsCliExecutor := service.NewExecutor("aws", args, []string{}, workDir, nil, true)
		_, err = awsCliExecutor.Execute()
		if err != nil {
			log.Println(err)
			return
		}
		return
	}

	awsURI := fmt.Sprintf("aws://%s/%s", *deploymentEnv.Account, *deploymentEnv.Region)

	args := []string{"bootstrap", awsURI}
	cdkExecutor := service.NewExecutor("cdk", args, []string{}, workDir, nil, true)
	_, err = cdkExecutor.Execute()
	if err != nil {
		log.Println(err)
		return
	}

	outputFilePath := path.Join(l.buildDir, "outputs.json")

	// TODO (cthompson) we probably want to require approval for this, but for now this is ok
	args = []string{"deploy", "--require-approval", "never", "-a", l.buildDir, "--outputs-file", outputFilePath}

	cdkExecutor = service.NewExecutor("cdk", args, []string{}, workDir, nil, true)
	_, err = cdkExecutor.Execute()
	if err != nil {
		log.Println(err)
		return
	}

	type StackOutput map[string]map[string]string
	type AwsResourceConfig struct {
		TableNames map[model.KVStore]string `yaml:"table_names"`
		CiphertextBucket string `yaml:"s3_bucket"`
	}

	var (
		stackOutput StackOutput
		awsResourceConfig AwsResourceConfig
	)

	outputFile, err := ioutil.ReadFile(outputFilePath)
	if err != nil {
		log.Println(err)
		return
	}

	err = json.Unmarshal(outputFile, &stackOutput)
	if err != nil {
		log.Println(err)
		return
	}

	outputs, ok := stackOutput[stackName]
	if !ok {
		err = fmt.Errorf("stack (%s) does not have any outputs", stackName)
		log.Println(err)
		return
	}

	awsResourceConfig.CiphertextBucket = outputs[*getOutputName("ciphertext-bucket")]

	awsResourceConfig.TableNames = map[model.KVStore]string{}
	awsResourceConfig.TableNames[gateway.MetaStore] = outputs[*getOutputName("metadata-table")]
	awsResourceConfig.TableNames[gateway.KeyStore] = outputs[*getOutputName("keys-table")]
	awsResourceConfig.TableNames[gateway.SessionStore] = outputs[*getOutputName("sessions-table")]
	awsResourceConfig.TableNames[gateway.GrantStore] = outputs[*getOutputName("grants-table")]

	out, err := yaml.Marshal(awsResourceConfig)
	if err != nil {
		log.Println(err)
		return
	}

	err = ioutil.WriteFile(path.Join(l.configOutput, "aws_resources.yaml"), out, 0755)
	return
}

func (l *lunasecDeployer) getCiphertextBucket(stack awscdk.Stack) awss3.Bucket {
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

func (l *lunasecDeployer) getSecureFrameBucket(stack awscdk.Stack) awss3.Bucket {
	return awss3.NewBucket(stack, jsii.String("secure-frame-bucket"), &awss3.BucketProps{
		AccessControl:        awss3.BucketAccessControl_PUBLIC_READ,
		WebsiteIndexDocument: jsii.String("index.html"),
		WebsiteErrorDocument: jsii.String("index.html"),
	})
}

func (l *lunasecDeployer) getCloudfrontDistribution(stack awscdk.Stack, secureFrameBucket awss3.Bucket) awscloudfront.CfnDistribution {
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

func (l *lunasecDeployer) getSecureFrameDomainName(secureFrameCloudfront awscloudfront.CfnDistribution) string {
	if l.localDev {
		return l.buildConfig.LocalStackUrl
	}
	return *secureFrameCloudfront.AttrDomainName()
}

func (l *lunasecDeployer) getSecureFrameBucketDeployment(stack awscdk.Stack, secureFrameBucket awss3.Bucket) awss3deployment.BucketDeployment {
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

func (l *lunasecDeployer) createBasicDynamodbTable(stack awscdk.Stack, name string) awsdynamodb.Table {
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

func (l *lunasecDeployer) getSecureFrameLambda(stack awscdk.Stack, containerTag string, lambdaEnv *map[string]*string) awslambda.Function {
	secureFrameRepo := awsecr.Repository_FromRepositoryName(stack, jsii.String("secure-frame-repo"), jsii.String(string(secureFrameBackendRepoName)))

	return awslambda.NewDockerImageFunction(stack, jsii.String("secure-frame-lambda"), &awslambda.DockerImageFunctionProps{
		Code: awslambda.DockerImageCode_FromEcr(secureFrameRepo, &awslambda.EcrImageCodeProps{
			Tag: jsii.String(containerTag),
		}),
		Environment: lambdaEnv,
	})
}

func (l *lunasecDeployer) getLambdaRestApi(stack awscdk.Stack, secureFrameLambda awslambda.Function) awsapigateway.LambdaRestApi {
	return awsapigateway.NewLambdaRestApi(stack, jsii.String("gateway"), &awsapigateway.LambdaRestApiProps{
		Handler: secureFrameLambda,
	})
}

func (l *lunasecDeployer) addComponentsToStack(scope constructs.Construct, id string, props *LunasecStackProps, serviceImageLookup ServiceToImageMap) awscdk.Stack {
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

func pullContainerFromPublicEcr(ecrGateway gateway.AwsECRGateway, containerURL string) (containerImg v1.Image, err error) {
	options, err := gateway.LoadPublicCraneOptions(ecrGateway)
	if err != nil {
		log.Println(err)
		return
	}

	publicEcrDockerManager := service.NewDockerManager(options)

	containerImg, err = publicEcrDockerManager.PullImage(containerURL)
	if err != nil {
		log.Println(err)
		return
	}
	return
}

func pushContainerToPrivateEcr(ecrGateway gateway.AwsECRGateway, ecrRepository string, containerImg v1.Image) (tag string, err error) {
	// TODO (cthompson) check if the pulled image and latest of the repository are the same

	tagDigest, err := containerImg.Digest()
	if err != nil {
		log.Println(err)
		return
	}
	tag = tagDigest.Hex

	ecrImageURL := fmt.Sprintf("%s:%s", ecrRepository, tag)

	options, err := gateway.LoadCraneOptions(ecrGateway)
	if err != nil {
		log.Println(err)
		return
	}

	privateEcrDockerManager := service.NewDockerManager(options)

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
	return pushContainerToPrivateEcr(ecrGateway, ecrRepository, containerImg)
}