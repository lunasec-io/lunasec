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
	"github.com/lunasec-io/lunasec-monorepo/constants"
	"github.com/lunasec-io/lunasec-monorepo/service"
	"github.com/lunasec-io/lunasec-monorepo/types"
	"gopkg.in/yaml.v3"
	"io/ioutil"
	"log"
	"path"
	"strings"

	"github.com/aws/aws-cdk-go/awscdk"
	"github.com/aws/jsii-runtime-go"
	"github.com/lunasec-io/lunasec-monorepo/gateway"
)

type StackOutput map[string]map[string]string

type AwsResources struct {
	TableNames       map[types.KVStore]string `yaml:"table_names"`
	CiphertextBucket string                   `yaml:"s3_bucket"`
	LocalstackURL    string                   `yaml:"localstack_url"`
}

type TokenizerConfig struct {
	SecretArn       string `yaml:"secret_arn"`
	GatewayEndpoint string `yaml:"gateway_endpoint"`
}

type AwsResourceConfig struct {
	AwsGateway AwsResources    `yaml:"aws_gateway"`
	Tokenizer  TokenizerConfig `yaml:"tokenizer"`
}

type ServiceToImageMap map[constants.LunaSecServices]string

type LunasecStackProps struct {
	awscdk.StackProps
}

type DeployerConfig struct {
	localDev         bool
	buildDir         string
	configOutputPath string
	sts              gateway.AwsStsGateway
	env              *awscdk.Environment
}

type Deployer interface {
	Deploy() (err error)
	WriteConfig() (err error)
}

type deployer struct {
	DeployerConfig
	buildConfig BuildConfig
}

func NewDeployerConfig(localDev bool, buildDir string, configOutputPath string, env *awscdk.Environment) DeployerConfig {
	return DeployerConfig{
		localDev:         localDev,
		buildDir:         buildDir,
		configOutputPath: configOutputPath,
		env:              env,
	}
}

func NewDeployer(
	deployerConfig DeployerConfig,
	buildConfig BuildConfig,
) Deployer {
	return &deployer{
		DeployerConfig: deployerConfig,
		buildConfig:    buildConfig,
	}
}

func getOutputName(name string) *string {
	outputName := fmt.Sprintf("%sArnOutput", name)
	return jsii.String(strings.Replace(outputName, "-", "", -1))
}

func (l *deployer) getStackOutputsFilename() string {
	return path.Join(l.buildDir, constants.StackOutputsFilename)
}

func (l *deployer) Deploy() (err error) {
	cmd := "cdk"
	if l.localDev {
		cmd = "cdklocal"
	}

	args := []string{"bootstrap", "-a", l.buildDir}
	cdkExecutor := service.NewExecutor(cmd, args, map[string]string{}, "", nil, true)
	_, err = cdkExecutor.Execute()
	if err != nil {
		log.Println(err)
		return
	}

	// TODO (cthompson) we probably want to require approval for this, but for now this is ok
	args = []string{"deploy", "--require-approval", "never", "-a", l.buildDir, "--outputs-file", l.getStackOutputsFilename()}

	cdkExecutor = service.NewExecutor(cmd, args, map[string]string{}, "", nil, true)
	_, err = cdkExecutor.Execute()
	if err != nil {
		log.Println(err)
		return
	}
	return
}

func (l *deployer) WriteConfig() (err error) {
	var (
		stackOutput       StackOutput
		awsResourceConfig AwsResourceConfig
	)

	outputFile, err := ioutil.ReadFile(l.getStackOutputsFilename())
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
	awsResourceConfig.Tokenizer.GatewayEndpoint = outputs[*getOutputName("tokenizer-gateway")]

	out, err := yaml.Marshal(awsResourceConfig)
	if err != nil {
		log.Println(err)
		return
	}

	err = ioutil.WriteFile(l.configOutputPath, out, 0744)
	return
}
