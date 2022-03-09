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
	"github.com/anchore/syft/syft"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
	"gopkg.in/yaml.v3"
	"io/ioutil"
	"lunasec/lunatrace/inventory/scan"
	"lunasec/lunatrace/inventory/syftmodel"
	"lunasec/lunatrace/pkg/command"
	"lunasec/lunatrace/pkg/types"
	"lunasec/lunatrace/pkg/util"
	"os"
)

func serializeSbom(sbom syftmodel.Document) (serializedOutput []byte, err error) {
	depOutput := InventoryOutput{
		Sbom: sbom,
	}

	serializedOutput, err = json.MarshalIndent(depOutput, "", "\t")
	if err != nil {
		log.Error().Err(err).Msg("unable to marshall dependencies output")
		return
	}
	return
}

func writeInventoryOutput(sbom syftmodel.Document, output string) (err error) {
	serializedOutput, err := serializeSbom(sbom)
	if err != nil {
		return
	}

	err = ioutil.WriteFile(output, serializedOutput, 0644)
	if err != nil {
		log.Error().Err(err).Msg("unable to write dependencies to output file")
		return
	}
	return
}

func writeLunaTraceAgentConfigFile(agentSecret, generateConfig string) (err error) {
	lunaTraceAgentConfig := types.LunaTraceAgentConfigFile{
		Namespace: types.LunaTraceAgentConfig{
			AgentAccessToken: agentSecret,
		},
	}

	out, err := yaml.Marshal(lunaTraceAgentConfig)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to marshal lunatrace agent config")
		return
	}

	err = ioutil.WriteFile(generateConfig, out, 0644)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to write lunatrace agent config file")
		return
	}
	return
}

func CreateCommand(c *cli.Context, globalBoolFlags map[string]bool, appConfig types.LunaTraceConfig) (err error) {
	var (
		source   string
		useStdin bool
	)

	command.EnableGlobalFlags(globalBoolFlags)

	syft.SetLogger(&types.ZerologLogger{})

	sources := c.Args().Slice()

	stdinFilename := c.String("stdin-filename")
	useStdin = stdinFilename != ""

	if useStdin {
		source = stdinFilename
	} else {
		if len(sources) == 0 {
			err = errors.New("no source provided")
			log.Error().
				Msg("No source provided. Please provide one source as an argument to this command.")
			return
		}

		if len(sources) > 1 {
			err = errors.New("too many sources provided")
			log.Error().
				Msg("Please provide only one source as an argument to this command.")
			return
		}
		source = sources[0]
	}

	output := c.String("output")
	excludedDirs := c.StringSlice("excluded")
	skipUpload := c.Bool("skip-upload")
	printToStdout := c.Bool("stdout")
	configOutput := c.String("config-output")

	sbom, err := getSbomForSyft(source, excludedDirs, useStdin)
	if err != nil {
		return
	}

	sbomModel := ToFormatModel(*sbom)

	if output != "" {
		err = writeInventoryOutput(sbomModel, output)
		if err != nil {
			return
		}
	}

	if printToStdout {
		var serializedSbom []byte

		serializedSbom, err = serializeSbom(sbomModel)
		if err != nil {
			return
		}

		fmt.Println(string(serializedSbom))
	}

	if skipUpload {
		log.Info().Msg("Skipping upload of SBOM")
		return
	}

	log.Info().Msg("Retrieving org and project ID using access token")
	orgId, projectId, err := getOrgAndProjectFromAccessToken(
		appConfig.GraphqlServer,
		appConfig.ProjectAccessToken,
	)

	log.Info().Msg("Creating build in LunaTrace database")
	agentSecret, buildId, err := insertNewBuild(appConfig, projectId)
	if err != nil {
		return
	}
	log.Info().Msg("Uploading generated SBOM")

	s3Url, err := uploadSbomToS3(appConfig, sbomModel, buildId, orgId, projectId)
	if err != nil {
		log.Info().Msg("Upload failed, attempting to delete record")
		deleteErr := deleteBuild(appConfig, buildId)
		if deleteErr != nil {
			return
		}
		return
	}
	err = setBuildS3Url(appConfig, buildId, s3Url)
	if err != nil {
		return
	}

	if configOutput != "" {
		err = writeLunaTraceAgentConfigFile(agentSecret, configOutput)
	} else {
		log.Info().
			Str("Agent Secret", agentSecret).
			Msg("Set this agent secret as an environment variable (LUNASEC_AGENT_SECRET) or in the config file (.lunatrace_agent.yaml) in your deployed service to use live monitoring:")
	}
	return
}

func ScanCommand(c *cli.Context, globalBoolFlags map[string]bool, appConfig types.LunaTraceConfig) (err error) {
	var (
		sbomFile *os.File
	)

	command.EnableGlobalFlags(globalBoolFlags)

	readFromStdin := c.Bool("stdin")

	if readFromStdin {
		sbomFile, err = util.GetFileFromStdin("sbom.json")
		defer func() {
			util.CleanupTmpFileDirectory(sbomFile)
		}()

		if err != nil {
			return
		}
	}

	if sbomFile != nil {
		err = scan.GrypeSbomScanFromFile(sbomFile.Name())
		if err != nil {
			return
		}
	}
	return
}
