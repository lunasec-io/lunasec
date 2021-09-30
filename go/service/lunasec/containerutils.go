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
	"fmt"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/service/ecr"
	"github.com/google/go-containerregistry/pkg/crane"
	v1 "github.com/google/go-containerregistry/pkg/v1"
	"github.com/gosimple/slug"
	"github.com/refinery-labs/loq/gateway"
	"github.com/refinery-labs/loq/service"
	"io/ioutil"
	"log"
	"os"
)

// TODO (cthompson) pull latest tag from remote and check against semver. raise notification about upgrading CLI if incompatible version is latest, abort if major version is incompatible
func pullContainer(containerURL string) (containerImg v1.Image, err error) {
	dockerHubManager := service.NewDockerManager()

	containerImg, err = dockerHubManager.PullImage(containerURL)
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

func mirrorRepoToEcr(accountID, containerName, newImageName string, containerIsLocal bool) (tag string, err error) {
	ecrGateway := gateway.NewAwsECRGateway()

	ecrRegistry := fmt.Sprintf("%s.dkr.ecr.us-west-2.amazonaws.com", accountID)
	ecrRepository := fmt.Sprintf("%s/%s", ecrRegistry, newImageName)

	var (
		file         *os.File
		containerImg v1.Image
	)

	if containerIsLocal {
		log.Printf("loading image from local docker: %s", containerName)

		containerNameSlug := slug.Make(containerName)
		file, err = ioutil.TempFile(os.TempDir(), fmt.Sprintf("%s.*.tar", containerNameSlug))
		if err != nil {
			log.Println(err)
			return
		}
		defer os.Remove(file.Name())

		containerImagePath := file.Name()

		cmd := "sudo"
		args := []string{"docker", "save", "-o", containerImagePath, containerName}

		executor := service.NewExecutor(cmd, args, map[string]string{}, "", nil, true)
		_, err = executor.Execute()
		if err != nil {
			log.Println(err)
			return
		}

		cmd = "sudo"
		args = []string{"chmod", "755", containerImagePath}

		executor = service.NewExecutor(cmd, args, map[string]string{}, "", nil, true)
		_, err = executor.Execute()
		if err != nil {
			log.Println(err)
			return
		}

		containerImg, err = crane.Load(containerImagePath)
	} else {
		log.Printf("pulling image from dockerhub: %s", containerName)
		containerImg, err = pullContainer(containerName)
	}

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
