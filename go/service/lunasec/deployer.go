package lunasec

import (
	"encoding/json"
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

	awsURI := fmt.Sprintf("aws://%s/%s", *l.env.Account, *l.env.Region)

	args := []string{"bootstrap", "-a", l.buildDir, awsURI}
	cdkExecutor := service.NewExecutor("cdk", args, map[string]string{}, workDir, nil, true)
	_, err = cdkExecutor.Execute()
	if err != nil {
		log.Println(err)
		return
	}

	stackOutputFilePath := path.Join(l.buildDir, "outputs.json")

	// TODO (cthompson) we probably want to require approval for this, but for now this is ok
	args = []string{"deploy", "--require-approval", "never", "-a", l.buildDir, "--outputs-file", stackOutputFilePath}

	cmd := "cdk"
	if l.localDev {
		cmd = "cdklocal"
	}

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
