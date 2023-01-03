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
package controller

import (
	"bytes"
	"fmt"
	"go.uber.org/zap"
	"log"

	v1 "github.com/google/go-containerregistry/pkg/v1"
	"github.com/google/go-containerregistry/pkg/v1/tarball"
	"github.com/lunasec-io/lunasec/lunadefend/go/gateway"
	"github.com/lunasec-io/lunasec/lunadefend/go/pkg/containermodifier"
	"github.com/lunasec-io/lunasec/lunadefend/go/service"
	"github.com/lunasec-io/lunasec/lunadefend/go/types"
	"github.com/lunasec-io/lunasec/lunadefend/go/types/event"
	"github.com/lunasec-io/lunasec/lunadefend/go/util"
)

type ContainerModifierController interface {
	HandleLambdaInvoke(invokeEvent event.ContainerModifyEvent) (resp event.ContainerModifyResponse, err error)
	HandleLocalInvoke(containerTarFile, configFile string)
}

type containerModifierController struct {
	// TODO (cthompson) container modifier should be deployed with a bucket configured for it
	ecrGateway gateway.AwsECRGateway
}

func NewContainerModifierController(
	ecrGateway gateway.AwsECRGateway,
) ContainerModifierController {
	return &containerModifierController{
		ecrGateway: ecrGateway,
	}
}

func getContainerLayerFromS3(s3 gateway.AwsS3Gateway, key string) (layer v1.Layer, err error) {
	tarData, err := s3.GetObject(key)
	if err != nil {
		log.Println(err)
		return
	}
	tarReader := bytes.NewReader(tarData)
	return tarball.LayerFromReader(tarReader)
}

func (c *containerModifierController) getContainerModifierForLambdaInvoke(invokeEvent event.ContainerModifyEvent) (modifier service.DockerContainerModifier, err error) {
	options, err := gateway.LoadCraneOptions(c.ecrGateway)
	if err != nil {
		log.Println(err)
		return
	}

	dockerManager := service.NewDockerManager(options)

	modifier = service.NewDockerContainerModifier(
		invokeEvent.BaseImage,
		invokeEvent.ShouldModifyEntrypoint(),
		dockerManager,
	)
	return
}

func (c *containerModifierController) getContainerModifierForLocalInvoke(containerTarFile string) service.DockerContainerModifier {
	return service.NewDockerContainerModifier(
		containerTarFile,
		true,
		nil,
	)
}

func (c *containerModifierController) buildFunctionConfigLayer(base v1.Image, runtime string, functions []types.FunctionConfig) (layer v1.Layer, err error) {
	imgConfigFile, err := base.ConfigFile()
	if err != nil {
		log.Println(err)
		return
	}
	workDir := imgConfigFile.Config.WorkingDir

	return containermodifier.CreateFunctionConfigLayer(workDir, runtime, functions)
}

func (c *containerModifierController) createFunctionLayers(base v1.Image, invokeEvent event.ContainerModifyEvent) (functionLayers []v1.Layer, err error) {
	s3Config := gateway.NewAwsS3GatewayConfig("us-west-2", invokeEvent.ImageFiles.Bucket)
	provider, err := util.GetStaticConfigProvider(s3Config)
	if err != nil {
		log.Println(err)
		return
	}

	logger, err := zap.NewProduction()
	if err != nil {
		log.Println(err)
		return
	}

	sess, err := gateway.NewAwsSession(logger, provider)
	if err != nil {
		log.Println(err)
		return
	}

	s3Gateway := gateway.NewAwsS3Gateway(logger, provider, sess)

	functionFilesLayer, err := getContainerLayerFromS3(s3Gateway, invokeEvent.ImageFiles.Key)
	if err != nil {
		log.Println(err)
		return
	}

	runtimeLayers, err := util.LoadRuntimeLayers()
	if err != nil {
		log.Println(err)
		return
	}

	functionConfigLayer, err := c.buildFunctionConfigLayer(base, invokeEvent.Runtime, invokeEvent.Functions)
	if err != nil {
		log.Println(err)
		return
	}
	functionLayers = []v1.Layer{
		functionFilesLayer,
		functionConfigLayer,
	}
	functionLayers = append(functionLayers, runtimeLayers...)
	return
}

func (c *containerModifierController) HandleLambdaInvoke(invokeEvent event.ContainerModifyEvent) (resp event.ContainerModifyResponse, err error) {
	var (
		appendLayers []v1.Layer
		newImg       v1.Image
	)

	modifier, err := c.getContainerModifierForLambdaInvoke(invokeEvent)
	if err != nil {
		log.Println(err)
		return
	}

	base, err := modifier.LoadImageFromRemote()
	if err != nil {
		log.Println(err)
		return
	}

	newTag := fmt.Sprintf("%s/%s", invokeEvent.Registry, invokeEvent.NewImageName)

	log.Println("Creating function files layer...")
	if invokeEvent.ShouldModifyEntrypoint() {
		appendLayers, err = c.createFunctionLayers(base, invokeEvent)
		if err != nil {
			log.Println(err)
			return
		}

		log.Println("Modifying docker image...")
		newImg, err = modifier.AppendLayersToBaseImage(base, appendLayers)
		if err != nil {
			log.Println(err)
			return
		}
	} else {
		newImg = base
	}

	containerHash, err := newImg.Digest()
	if err != nil {
		log.Println(err)
		return
	}

	deploymentID, err := modifier.GetImageDeploymentID(base)
	if err != nil {
		log.Println(err)
		return
	}

	modifier.PushImageToRemote(newImg, newTag)

	resp = event.ContainerModifyResponse{
		Tag:          containerHash.String(),
		DeploymentID: deploymentID,
	}
	return
}

func (c *containerModifierController) HandleLocalInvoke(containerTarFile, configFile string) {
	functionConfig, err := containermodifier.LoadFunctionConfig(configFile)
	if err != nil {
		panic(err)
	}

	modifier := c.getContainerModifierForLocalInvoke(containerTarFile)

	base, err := modifier.LoadImageFromFile()
	if err != nil {
		log.Println(err)
		return
	}

	runtimeLayers, err := util.LoadRuntimeLayersFromTar()
	if err != nil {
		log.Println(err)
		return
	}

	functionConfigLayer, err := c.buildFunctionConfigLayer(base, functionConfig.Runtime, functionConfig.Functions)
	if err != nil {
		log.Println(err)
		return
	}

	appendLayers := []v1.Layer{
		functionConfigLayer,
	}
	appendLayers = append(appendLayers, runtimeLayers...)

	img, err := modifier.AppendLayersToBaseImage(base, appendLayers)
	if err != nil {
		log.Println(err)
		return
	}

	newTag, newFilename := containermodifier.GetNewContainerNames(containerTarFile)

	log.Printf("saving modified container image to: %s\n", newFilename)
	err = modifier.SaveImageToFile(img, newTag, newFilename)
	if err != nil {
		log.Println(err)
		return
	}
}
