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
	"github.com/anchore/syft/syft/sbom"
	"github.com/rs/zerolog/log"
	"path/filepath"
)

func CollectSbomsFromSearchDirs(searchDirs, excludedDirs []string) (sboms []*sbom.SBOM, err error) {
	for _, searchDir := range searchDirs {
		var (
			s          *sbom.SBOM
			searchPath string
		)

		searchPath, err = filepath.Abs(searchDir)
		if err != nil {
			return
		}

		s, err = getSbomForSearchDir(searchPath, excludedDirs)
		if err != nil {
			log.Error().
				Str("searchPath", searchPath).
				Err(err).
				Msg("Unable to create SBOM from directory.")
			return
		}
		sboms = append(sboms, s)
	}
	return
}
