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
	"encoding/json"
	"errors"
	"fmt"
	"github.com/anchore/syft/syft/sbom"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
	"io/ioutil"
	"lunasec/lunatrace/inventory/syftmodel"
	"lunasec/lunatrace/pkg/command"
	"lunasec/lunatrace/pkg/util"
)

func writeCloudScanOutput(sboms []syftmodel.Document, output string) (err error) {
	depOutput := InventoryOutput{
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

func getSbomModels(sboms []*sbom.SBOM) (models []syftmodel.Document) {
	for _, appSbom := range sboms {
		docModel := ToSyftJsonFormatModel(appSbom)
		models = append(models, docModel)
	}
	return
}

func InventoryCommand(c *cli.Context, globalBoolFlags map[string]bool) (err error) {
	command.EnableGlobalFlags(c, globalBoolFlags)

	searchDirs := c.Args().Slice()

	if len(searchDirs) == 0 {
		err = errors.New("no search dirs provided")
		log.Error().
			Msg("No search directories provided. Please provide at least one search directory as an argument to this command.")
		return
	}

	output := c.String("output")
	email := c.String("email")
	applicationId := c.String("application-id")
	excludedDirs := c.StringSlice("excluded")
	skipUpload := c.Bool("skip-upload")
	uploadUrl := c.String("upload-url")

	if email == "" {
		err = errors.New("email required when performing cloud scan")
		log.Error().
			Err(err).
			Msg("Invalid arguments passed to command.")
		return
	}

	repoRemote, err := util.GetRepoRemote()
	if err != nil {
		if applicationId == "" {
			err = fmt.Errorf("unable to automatically detect application name")
			log.Error().
				Err(err).
				Msg("Unable to get application id. Please manually specify `--application-id` or run this command inside of a git repo.")
			return
		}
	}

	if applicationId == "" {
		applicationId = repoRemote
	}

	sboms, err := CollectSbomsFromSearchDirs(searchDirs, excludedDirs)
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

	if uploadUrl != "" {
		err = UploadCollectedSbomsToUrl(email, applicationId, sbomModels, uploadUrl, map[string]string{})
		return
	}
	err = UploadCollectedSboms(email, applicationId, sbomModels)
	return
}
