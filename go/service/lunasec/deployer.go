package lunasec

import (
	"encoding/json"
	"fmt"
	"github.com/refinery-labs/loq/constants"
	"github.com/refinery-labs/loq/service"
	"github.com/refinery-labs/loq/types"
	"gopkg.in/yaml.v3"
	"io/ioutil"
	"log"
	"os"
	"path"
	"strings"

	"github.com/aws/aws-cdk-go/awscdk"
	"github.com/aws/jsii-runtime-go"
	"github.com/refinery-labs/loq/gateway"
)

type StackOutput map[string]map[string]string

type AwsResources struct {
	TableNames map[types.KVStore]string `yaml:"table_names"`
	CiphertextBucket string             `yaml:"s3_bucket"`
	LocalstackURL string                `yaml:"localstack_url"`
}

type TokenizerConfig struct {
	SecretArn string `yaml:"secret_arn"`
}

type AwsResourceConfig struct {
	AwsGateway AwsResources `yaml:"aws_gateway"`
	Tokenizer TokenizerConfig `yaml:"tokenizer"`
}

type ServiceToImageMap map[constants.LunaSecServices]string

type LunasecStackProps struct {
	awscdk.StackProps
}

type DeployerConfig struct {
	localDev bool
	buildDir string
	configOutputPath string
	sts gateway.AwsStsGateway
	env *awscdk.Environment
}

type Deployer interface {
	Deploy() (err error)
}

type deployer struct {
	DeployerConfig
	buildConfig        BuildConfig
}

func NewDeployerConfig(localDev bool, buildDir string, configOutputPath string, env *awscdk.Environment) DeployerConfig {
	return DeployerConfig{
		localDev: localDev,
		buildDir: buildDir,
		configOutputPath: configOutputPath,
		env: env,
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

	cmd := "cdk"
	if l.localDev {
		cmd = "cdklocal"
	}

	args := []string{"bootstrap", "-a", l.buildDir}
	cdkExecutor := service.NewExecutor(cmd, args, map[string]string{}, workDir, nil, true)
	_, err = cdkExecutor.Execute()
	if err != nil {
		log.Println(err)
		return
	}

	stackOutputFilePath := path.Join(l.buildDir, "outputs.json")

	// TODO (cthompson) we probably want to require approval for this, but for now this is ok
	args = []string{"deploy", "--require-approval", "never", "-a", l.buildDir, "--outputs-file", stackOutputFilePath}

	cdkExecutor = service.NewExecutor(cmd, args, map[string]string{}, workDir, nil, true)
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

	outputs, ok := stackOutput[constants.LunaSecStackName]
	if !ok {
		err = fmt.Errorf("stack (%s) does not have any outputs", constants.LunaSecStackName)
		log.Println(err)
		return
	}

	// TODO (cthompson) this is pretty dirty, we ideally build this resource config from the actual config objects that each service expects
	awsResourceConfig.AwsGateway.CiphertextBucket = outputs[*getOutputName("ciphertext-bucket")]

	awsResourceConfig.AwsGateway.TableNames = map[types.KVStore]string{}
	awsResourceConfig.AwsGateway.TableNames[gateway.MetaStore] = outputs[*getOutputName("metadata-table")]
	awsResourceConfig.AwsGateway.TableNames[gateway.KeyStore] = outputs[*getOutputName("keys-table")]
	awsResourceConfig.AwsGateway.TableNames[gateway.SessionStore] = outputs[*getOutputName("sessions-table")]
	awsResourceConfig.AwsGateway.TableNames[gateway.GrantStore] = outputs[*getOutputName("grants-table")]

	awsResourceConfig.AwsGateway.LocalstackURL = l.buildConfig.LocalStackUrl

	awsResourceConfig.Tokenizer.SecretArn = outputs[*getOutputName("tokenizer-secret")]

	out, err := yaml.Marshal(awsResourceConfig)
	if err != nil {
		log.Println(err)
		return
	}

	err = ioutil.WriteFile(path.Join(l.configOutputPath, "aws_resources.yaml"), out, 0744)
	return
}
