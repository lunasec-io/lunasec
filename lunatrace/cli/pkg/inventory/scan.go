// Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
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
package inventory

import (
	"fmt"
	"github.com/anchore/syft/syft/sbom"
	"github.com/rs/zerolog/log"
	"lunasec/lunatrace/pkg/types"
	"path/filepath"
)

func CollectSbomFromFiles(searchDir string, excludedDirs []string) (sbom *sbom.SBOM, err error) {
	var (
		searchPath string
	)

	searchPath, err = filepath.Abs(searchDir)
	if err != nil {
		return
	}

	sourceName := fmt.Sprintf("dir:%s", searchPath)

	sbom, err = getSbomForSyft(sourceName, excludedDirs)
	if err != nil {
		log.Error().
			Str("searchPath", searchPath).
			Err(err).
			Msg("Unable to create SBOM from directory.")
		return
	}
	return
}

func CollectSbomFromContainer(container string, containerType types.ContainerType, excludedDirs []string) (sbom *sbom.SBOM, err error) {
	sourceName := fmt.Sprintf("%s:%s", containerType, container)

	sbom, err = getSbomForSyft(sourceName, excludedDirs)
	if err != nil {
		log.Error().
			Str("container", container).
			Str("containerType", string(containerType)).
			Err(err).
			Msg("Unable to create SBOM from container.")
		return
	}
	return
}
