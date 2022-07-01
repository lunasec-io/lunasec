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
package snapshot

import (
	"fmt"

	"github.com/anchore/syft/syft/sbom"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"

	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/deprecated"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/snapshot/syftmodel"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/types"
)

// prefer the branch name from the cli arg if available
func getBranchName(fromCliArg string, fromGit string) string {
	if fromCliArg != "" {
		return fromCliArg
	}
	if fromGit == "HEAD" {
		return ""
	}
	return fromGit
}

func processSbom(
	c *cli.Context,
	appConfig types.LunaTraceConfig,
	options types.SnapshotOptions,
	sbom *sbom.SBOM,
	repoMeta deprecated.RepoMetadata,
) (err error) {
	sbomModel := ToFormatModel(*sbom)

	printToStdout := c.Bool("stdout")
	outputFile := c.String("output")
	// TODO: Should we be exiting here?  Is this why we sometimes get empty sboms?
	err = outputSbom(sbomModel, printToStdout, outputFile)

	skipUpload := c.Bool("skip-upload")

	if skipUpload {
		log.Info().Msg("Skipping upload of SBOM")
		return
	}

	branchName := getBranchName(options.GitBranch, repoMeta.BranchName)

	agentSecret, err := uploadSbom(appConfig, sbomModel, repoMeta, branchName)
	if err != nil {
		log.Error().
			Err(err).
			Msg("Failed to upload sbom")
		return
	}

	if options.AgentOutput != "" {
		err = writeLunaTraceAgentConfigFile(agentSecret, options.AgentOutput)
	} else {
		log.Info().
			Str("Agent Secret", agentSecret).
			Msg("Set this agent secret as an environment variable (LUNASEC_AGENT_SECRET) or in the config file (.lunatrace_agent.yaml) in your deployed service to use live monitoring")
	}
	return
}

func outputSbom(sbom syftmodel.Document, printToStdout bool, outputFile string) (err error) {
	if outputFile != "" {
		err = writeSnapshotOutput(sbom, outputFile)
		if err != nil {
			return
		}
	}

	if printToStdout {
		var serializedSbom []byte

		serializedSbom, err = serializeSbom(sbom)
		if err != nil {
			return
		}

		fmt.Println(string(serializedSbom))
	}
	return
}

func uploadSbom(appConfig types.LunaTraceConfig, sbom syftmodel.Document, repoMeta deprecated.RepoMetadata, branchName string) (agentSecret string, err error) {
	var (
		orgId, projectId, buildId, s3Url string
	)

	log.Info().Msg("Retrieving org and project ID using access token")
	orgId, projectId, err = getOrgAndProjectFromAccessToken(
		appConfig.GraphqlServer,
		appConfig.ProjectAccessToken,
	)
	if err != nil {
		return
	}

	log.Info().Msg("Creating build in LunaTrace database")
	agentSecret, buildId, err = insertNewBuild(appConfig, projectId, repoMeta, branchName)
	if err != nil {
		return
	}
	log.Info().Msg("Uploading generated SBOM")

	s3Url, err = uploadSbomToS3(appConfig, sbom, buildId, orgId)
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
	return
}
