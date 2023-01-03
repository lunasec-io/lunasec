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
package util

import (
	"io/ioutil"
	"log"
	"os"
	"path"

	"github.com/google/go-containerregistry/pkg/crane"
	v1 "github.com/google/go-containerregistry/pkg/v1"
)

func LoadRuntimeLayers() (runtimeLayers []v1.Layer, err error) {
	refineryRuntimeRepo := os.Getenv("REFINERY_CONTAINER_RUNTIME_REPOSITORY")
	log.Println("Pulling Refinery container runtime from:", refineryRuntimeRepo)

	runtimeImage, err := crane.Pull(refineryRuntimeRepo)
	if err != nil {
		log.Println(err)
		return
	}

	log.Println("Getting runtime image layers...")
	return runtimeImage.Layers()
}

func LoadRuntimeLayersFromTar() (runtimeLayers []v1.Layer, err error) {
	// TODO (cthompson) add some logic for checking for "updates"
	contentRoot := os.Getenv("LUNASEC_CONTENT_ROOT")
	runtimeContainerPath := path.Join(contentRoot, "refinery-container-runtime.tar")
	img, err := crane.Load(runtimeContainerPath)
	if err != nil {
		return
	}
	return img.Layers()
}

func LoadRuntimeHandler(handlerName string) (content string, err error) {
	// TODO (cthompson) add some logic for checking for "updates"
	contentRoot := os.Getenv("LUNASEC_CONTENT_ROOT")
	runtimeHandler := path.Join(contentRoot, handlerName)
	contentBytes, err := ioutil.ReadFile(runtimeHandler)
	if err != nil {
		return
	}
	content = string(contentBytes)
	return
}
