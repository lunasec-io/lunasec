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
package commands

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/anchore/syft/syft/sbom"
	"github.com/lunasec-io/lunasec/tools/log4shell/cloudscan"
	"github.com/lunasec-io/lunasec/tools/log4shell/types/model"
	"github.com/lunasec-io/lunasec/tools/log4shell/util"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
	"io/ioutil"
)

type CloudScanOutput struct {
	Sboms []model.Document `json:"sboms"`
}

func writeCloudScanOutput(sboms []model.Document, output string) (err error) {
	depOutput := CloudScanOutput{
		Sboms: sboms,
	}

	serializedOutput, err := json.MarshalIndent(depOutput, "", "\t")
	if err != nil {
		log.Error().Err(err).Msg("unable to marshall dependencies output")
		return err
	}

	err = ioutil.WriteFile(output, serializedOutput, 0644)
	if err != nil {
		log.Error().Err(err).Msg("unable to write dependencies to output file")
		return err
	}
	return
}

func getSbomModels(sboms []*sbom.SBOM) (models []model.Document) {
	for _, appSbom := range sboms {
		docModel := util.ToSyftJsonFormatModel(appSbom)
		models = append(models, docModel)
	}
	return
}

func CloudScanCommand(c *cli.Context, globalBoolFlags map[string]bool) (err error) {
	enableGlobalFlags(c, globalBoolFlags)

	searchDirs := c.Args().Slice()

	if len(searchDirs) == 0 {
		err = errors.New("no search dirs provided")
		log.Error().
			Msg("No search directories provided. Please provide at least one search directory as an argument to this command.")
		return
	}

	output := c.String("output")
	email := c.String("email")
	applicationName := c.String("application-name")
	excludedDirs := c.StringSlice("excluded")
	skipUpload := c.Bool("skip-upload")

	if email == "" {
		err = errors.New("email required when performing cloud scan")
		log.Error().
			Err(err).
			Msg("Invalid arguments passed to command.")
		return
	}

	repoRemote, err := util.GetRepoRemote()
	if err != nil {
		if applicationName == "" {
			err = fmt.Errorf("unable to automatically detect application name")
			log.Error().
				Err(err).
				Msg("Unable to get application name. Please manually specify `--application-name` or run this command inside of a git repo.")
			return
		}
	}

	if applicationName == "" {
		applicationName = repoRemote
	}

	sboms, err := cloudscan.CollectSbomsFromSearchDirs(searchDirs, excludedDirs)
	if err != nil {
		return
	}

	sbomModels := getSbomModels(sboms)

	if output != "" {
		err = writeCloudScanOutput(sbomModels, output)
		if err != nil {
			return
		}
	}

	if skipUpload {
		log.Info().Msg("Skipping upload of SBOM")
		return
	}

	err = cloudscan.UploadCollectedSboms(email, applicationName, sbomModels)
	return
}
