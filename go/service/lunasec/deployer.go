package lunasec

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/refinery-labs/loq/model"
	"github.com/refinery-labs/loq/service"
	"gopkg.in/yaml.v3"
	"io/ioutil"
	"log"
	"os"
	"path"
	"strings"

	"github.com/aws/aws-cdk-go/awscdk"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/jsii-runtime-go"
	"github.com/refinery-labs/loq/gateway"
)

type SecureFrameService string

const (
	secureFrameBackendRepoName SecureFrameService = "secure-frame-backend"
)

const (
	StackName = "LunasecSecureEnclave"
	LunasecBuildDir = "build"
)

type StackOutput map[string]map[string]string

type AwsResourceConfig struct {
	TableNames map[model.KVStore]string `yaml:"table_names"`
	CiphertextBucket string `yaml:"s3_bucket"`
}

type ServiceToImageMap map[SecureFrameService]string

type LunasecStackProps struct {
	awscdk.StackProps
}

type DeployerConfig struct {
	localDev bool
	buildDir string
	configOutputPath string
	sts gateway.AwsStsGateway
}

type Deployer interface {
	Deploy() (err error)
}

type deployer struct {
	DeployerConfig
	buildConfig        BuildConfig
}

func NewDeployerConfig(localDev bool, buildDir string, configOutputPath string, sts gateway.AwsStsGateway) DeployerConfig {
	return DeployerConfig{
		localDev: localDev,
		buildDir: buildDir,
		configOutputPath: configOutputPath,
		sts: sts,
	}
}

func NewDeployer(
	deployerConfig DeployerConfig,
	buildConfig BuildConfig,
) Deployer {
	return &deployer{
		DeployerConfig: deployerConfig,
		buildConfig: buildConfig,
	}
}

func getDeploymentEnv(sts gateway.AwsStsGateway) (env *awscdk.Environment, err error) {
	accountID, err := sts.GetCurrentAccountId()
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

func getOutputName(name string) *string {
	outputName := fmt.Sprintf("%sArnOutput", name)
	return jsii.String(strings.Replace(outputName, "-", "", -1))
}

func (l *deployer) Deploy() (err error) {
	workDir, err := os.Getwd()
	if err != nil {
		log.Println(err)
		return
	}

	deploymentEnv, err := getDeploymentEnv(l.sts)
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
			StackName,
			"--template-body",
			fmt.Sprintf("file://%s/%s.template.json", l.buildDir, StackName),
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

	stackOutputFilePath := path.Join(l.buildDir, "outputs.json")

	// TODO (cthompson) we probably want to require approval for this, but for now this is ok
	args = []string{"deploy", "--require-approval", "never", "-a", l.buildDir, "--outputs-file", stackOutputFilePath}

	cdkExecutor = service.NewExecutor("cdk", args, []string{}, workDir, nil, true)
	_, err = cdkExecutor.Execute()
	if err != nil {
		log.Println(err)
		return
	}

	return l.writeConfig(stackOutputFilePath)
}

func (l *deployer) writeConfig(stackOutputFilePath string) (err error) {
	var (
		stackOutput StackOutput
		awsResourceConfig AwsResourceConfig
	)

	outputFile, err := ioutil.ReadFile(stackOutputFilePath)
	if err != nil {
		log.Println(err)
		return
	}

	err = json.Unmarshal(outputFile, &stackOutput)
	if err != nil {
		log.Println(err)
		return
	}

	outputs, ok := stackOutput[StackName]
	if !ok {
		err = fmt.Errorf("stack (%s) does not have any outputs", StackName)
		log.Println(err)
		return
	}

	// TODO (cthompson) this is pretty dirty, we ideally build this resource config from the actual config objects that each service expects
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

	err = ioutil.WriteFile(path.Join(l.configOutputPath, "aws_resources.yaml"), out, 0744)
	return
}
