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
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/anchore/grype/grype/presenter/models"
	"github.com/anchore/syft/syft"
	"github.com/anchore/syft/syft/sbom"
	"github.com/go-git/go-git/v5"
	"github.com/go-git/go-git/v5/plumbing"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
	"gopkg.in/yaml.v3"
	"io"
	"io/ioutil"
	"lunasec/lunatrace/inventory/scan"
	"lunasec/lunatrace/inventory/syftmodel"
	"lunasec/lunatrace/pkg/command"
	"lunasec/lunatrace/pkg/types"
	"lunasec/lunatrace/pkg/util"
	"net/url"
	"os"
	"path"
	"path/filepath"
)

func serializeSbom(sbom syftmodel.Document) (serializedOutput []byte, err error) {
	serializedOutput, err = json.MarshalIndent(sbom, "", "\t")
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

func getGitCloneOptions(gitUrl, gitBranch string, progress io.Writer) *git.CloneOptions {
	cloneOptions := git.CloneOptions{
		URL:      gitUrl,
		Progress: progress,
		Depth:    1,
	}

	if gitBranch != "" {
		cloneOptions.ReferenceName = plumbing.NewBranchReferenceName(gitBranch)
		cloneOptions.SingleBranch = true
	}
	return &cloneOptions
}

func RepositoryCommand(c *cli.Context, globalBoolFlags map[string]bool, appConfig types.LunaTraceConfig) (err error) {
	command.EnableGlobalFlags(globalBoolFlags)

	repos := c.Args().Slice()

	if len(repos) != 1 {
		err = errors.New("please provide exactly one repository to inventory")
		return
	}

	inventoryOptions := types.NewInventoryOptionsFromCli(c)

	parsedRepo, err := url.Parse(repos[0])
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to parse repository url")
		return
	}

	dirname := util.RepoNameToDirname(path.Clean(parsedRepo.Path))

	repoTmpDir, err := os.MkdirTemp("", dirname)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to create temporary directory")
		return
	}
	defer util.CleanupTmpFileDirectory(repoTmpDir)

	log.Info().
		Str("url", parsedRepo.String()).
		Msg("cloning repository")

	progressBuffer := bytes.NewBufferString("")

	cloneOptions := getGitCloneOptions(parsedRepo.String(), inventoryOptions.GitBranch, progressBuffer)

	repo, err := git.PlainClone(repoTmpDir, false, cloneOptions)
	if err != nil {
		log.Error().
			Err(err).
			Str("repo", repos[0]).
			Str("progress", progressBuffer.String()).
			Msg("unable to clone git repo")
		return
	}

	repoMeta := util.CollectRepoMetadataFromObj(repo)

	log.Debug().
		Str("remote", repoMeta.RemoteUrl).
		Str("branch", repoMeta.BranchName).
		Str("commit", repoMeta.CommitHash).
		Msg("collected repo information")

	collectedSbom, err := getSbomFromRepository(repoTmpDir, []string{})

	err = processSbom(c, appConfig, inventoryOptions, collectedSbom, repoMeta)
	return
}

func getInventoryManifestFilename(c *cli.Context) (filename string, err error) {
	filenames := c.Args().Slice()
	if len(filenames) == 0 {
		err = errors.New("no filenames provided")
		log.Error().
			Msg("No filename provided. Please provide one filename as an argument to this command.")
		return
	}

	if len(filenames) > 1 {
		err = errors.New("too many filenames provided")
		log.Error().
			Msg("Please provide only one filename as an argument to this command.")
		return
	}

	filename = filenames[0]
	return
}

func NewInventoryManifestOptionsFromCli(c *cli.Context) (options types.InventoryManifestOptions, err error) {
	useStdin := c.Bool("stdin")

	filename, err := getInventoryManifestFilename(c)
	if err != nil {
		return
	}

	options = types.InventoryManifestOptions{
		UseStdin: useStdin,
		Filename: filename,
	}
	return
}

func ManifestCommand(c *cli.Context, globalBoolFlags map[string]bool, appConfig types.LunaTraceConfig) (err error) {
	command.EnableGlobalFlags(globalBoolFlags)

	syft.SetLogger(&types.ZerologLogger{})

	cliOptions, err := NewInventoryManifestOptionsFromCli(c)
	if err != nil {
		return
	}

	inventoryOptions := types.NewInventoryOptionsFromCli(c)

	dir, err := os.Getwd()
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to get working dir")
		return
	}

	repoMeta := util.CollectRepoMetadata(dir)
	repoMeta.Merge(
		inventoryOptions.GitRemote,
		inventoryOptions.GitBranch,
		inventoryOptions.GitCommit,
	)

	collectedSbom, err := getSbomFromStdinFile(
		cliOptions.Filename,
		inventoryOptions.Excluded,
		cliOptions.UseStdin,
	)
	if err != nil {
		return
	}

	err = processSbom(c, appConfig, inventoryOptions, collectedSbom, repoMeta)
	return
}

func processSbom(
	c *cli.Context,
	appConfig types.LunaTraceConfig,
	options types.InventoryOptions,
	sbom *sbom.SBOM,
	repoMeta types.RepoMetadata,
) (err error) {
	sbomModel := ToFormatModel(*sbom)

	printToStdout := c.Bool("stdout")
	outputFile := c.String("output-file")
	err = outputSbom(sbomModel, printToStdout, outputFile)

	skipUpload := c.Bool("skip-upload")

	if skipUpload {
		log.Info().Msg("Skipping upload of SBOM")
		return
	}

	agentSecret, err := uploadSbom(appConfig, sbomModel, repoMeta)
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
		err = writeInventoryOutput(sbom, outputFile)
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

func uploadSbom(appConfig types.LunaTraceConfig, sbom syftmodel.Document, repoMeta types.RepoMetadata) (agentSecret string, err error) {
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
	agentSecret, buildId, err = insertNewBuild(appConfig, projectId, repoMeta)
	if err != nil {
		return
	}
	log.Info().Msg("Uploading generated SBOM")

	s3Url, err = uploadSbomToS3(appConfig, sbom, buildId, orgId, projectId)
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

func ScanCommand(c *cli.Context, globalBoolFlags map[string]bool, appConfig types.LunaTraceConfig) (err error) {
	var (
		sbomFile         *os.File
		findingsDocument models.Document
	)

	command.EnableGlobalFlags(globalBoolFlags)

	printToStdout := c.Bool("stdout")
	readFromStdin := c.Bool("stdin")

	if readFromStdin {
		sbomFile, err = util.GetFileFromStdin("sbom.json")
		defer func() {
			tmpDir := filepath.Dir(sbomFile.Name())
			util.CleanupTmpFileDirectory(tmpDir)
		}()

		if err != nil {
			return
		}
	}

	if sbomFile == nil {
		err = errors.New("SBOM file is not provided")
		return
	}

	findingsDocument, err = scan.GrypeSbomScanFromFile(sbomFile.Name())
	if err != nil {
		return
	}

	if printToStdout {
		var serializedFindings []byte

		serializedFindings, err = json.Marshal(findingsDocument)
		if err != nil {
			return
		}

		fmt.Println(string(serializedFindings))
	}
	log.Debug().
		Int("findingsCount", len(findingsDocument.Matches)).
		Msg("completed scanning for vulnerabilities")
	return
}
