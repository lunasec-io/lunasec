package controller

import (
	"bytes"
	"fmt"
	"log"

	"github.com/google/go-containerregistry/pkg/authn"
	"github.com/google/go-containerregistry/pkg/crane"
	v1 "github.com/google/go-containerregistry/pkg/v1"
	"github.com/google/go-containerregistry/pkg/v1/tarball"
	"github.com/refinery-labs/loq/gateway"
	"github.com/refinery-labs/loq/model"
	"github.com/refinery-labs/loq/model/event"
	"github.com/refinery-labs/loq/pkg/containermodifier"
	"github.com/refinery-labs/loq/service"
	"github.com/refinery-labs/loq/util"
)

func LoadPublicCraneOptions(ecrGateway gateway.AwsECRGateway) (options crane.Option, err error) {
	cfg, err := ecrGateway.GetPublicCredentials()
	if err != nil {
		log.Println(err)
		return
	}

	authenticator := authn.FromConfig(cfg)

	options = crane.WithAuth(authenticator)
	return
}

func LoadCraneOptions(ecrGateway gateway.AwsECRGateway) (options crane.Option, err error) {
	cfg, err := ecrGateway.GetCredentials()
	if err != nil {
		log.Println(err)
		return
	}

	authenticator := authn.FromConfig(cfg)

	options = crane.WithAuth(authenticator)
	return
}

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
	options, err := LoadCraneOptions(c.ecrGateway)
	if err != nil {
		log.Println(err)
		return
	}

	modifier = service.NewDockerContainerModifier(
		invokeEvent.BaseImage,
		invokeEvent.ShouldModifyEntrypoint(),
		options,
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

func (c *containerModifierController) buildFunctionConfigLayer(base v1.Image, runtime string, functions []model.FunctionConfig) (layer v1.Layer, err error) {
	imgConfigFile, err := base.ConfigFile()
	if err != nil {
		log.Println(err)
		return
	}
	workDir := imgConfigFile.Config.WorkingDir

	return containermodifier.CreateFunctionConfigLayer(workDir, runtime, functions)
}

func (c *containerModifierController) createFunctionLayers(base v1.Image, invokeEvent event.ContainerModifyEvent) (functionLayers []v1.Layer, err error) {
	s3Gateway, err := gateway.NewAwsS3GatewayWithoutConfig(invokeEvent.ImageFiles.Bucket, "us-west-2")
	if err != nil {
		log.Println(err)
		return
	}

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

	modifier.PushImage(newImg, newTag)

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
