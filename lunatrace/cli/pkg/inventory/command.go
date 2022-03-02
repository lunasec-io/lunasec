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
	"lunasec/lunatrace/inventory/syftmodel"
	"lunasec/lunatrace/pkg/command"
	"lunasec/lunatrace/pkg/types"
)

func writeInventoryOutput(sbom syftmodel.Document, output string) (err error) {
	depOutput := InventoryOutput{
		Sbom: sbom,
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

type zerologLogger struct{}

func (l *zerologLogger) Errorf(format string, args ...interface{}) {
	log.Error().Msg(fmt.Sprintf(format, args))
}
func (l *zerologLogger) Error(args ...interface{}) {
	log.Error().Msg(fmt.Sprintf("%v", args))
}
func (l *zerologLogger) Warnf(format string, args ...interface{}) {
	log.Warn().Msg(fmt.Sprintf(format, args))
}
func (l *zerologLogger) Warn(args ...interface{}) {
	log.Warn().Msg(fmt.Sprintf("%v", args))
}
func (l *zerologLogger) Infof(format string, args ...interface{}) {
	log.Info().Msg(fmt.Sprintf(format, args))
}
func (l *zerologLogger) Info(args ...interface{}) {
	log.Info().Msg(fmt.Sprintf("%v", args))
}
func (l *zerologLogger) Debugf(format string, args ...interface{}) {
	log.Debug().Msg(fmt.Sprintf(format, args))
}
func (l *zerologLogger) Debug(args ...interface{}) {
	log.Debug().Msg(fmt.Sprintf("%v", args))
}

func CreateCommand(c *cli.Context, globalBoolFlags map[string]bool, appConfig types.LunaTraceConfig) (err error) {
	var (
		source   string
		useStdin bool
	)

	command.EnableGlobalFlags(globalBoolFlags)

	syft.SetLogger(&zerologLogger{})

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

	if skipUpload {
		log.Info().Msg("Skipping upload of SBOM")
		return
	}

	log.Info().Msg("Uploading generated SBOM")

	projectId, s3Url, err := uploadSbomToS3(appConfig, sbomModel)
	if err != nil {
		return
	}

	agentSecret, err := insertNewBuild(appConfig, projectId, s3Url)
	if err != nil {
		return
	}

	if configOutput != "" {
		err = writeLunaTraceAgentConfigFile(agentSecret, configOutput)
	} else {
		log.Info().
			Str("Agent Secret", agentSecret).
			Msg("Set the agent secret as environment variable (LUNASEC_AGENT_SECRET) or in config file (.lunatrace_agent.yaml) in deployment.")
	}
	return
}

func readSbomFromFile() (sbom string, err error) {
	return
}

func ScanCommand(c *cli.Context, globalBoolFlags map[string]bool, appConfig types.LunaTraceConfig) (err error) {
	command.EnableGlobalFlags(globalBoolFlags)

	sbomFilename := c.String("sbom")

	var sbom string
	if sbomFilename != "" {
		sbom, err = readSbomFromFile()
	} else {
		err = errors.New("neither 'sbom' or 'stdin' were provided, please specify at least one")
		return
	}

	if err != nil {
		return
	}

	log.Debug().Str("sbom", sbom).Msg("got sbom")
	return
}
