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
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/anchore/grype/grype/presenter/models"
	"github.com/anchore/syft/syft/sbom"
	"github.com/go-git/go-git/v5"
	"github.com/go-git/go-git/v5/plumbing"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
	"gopkg.in/yaml.v3"
	"io"
	"io/ioutil"
	"lunasec/lunatrace/pkg/types"
	"lunasec/lunatrace/pkg/util"
	"lunasec/lunatrace/snapshot/scan"
	"lunasec/lunatrace/snapshot/syftmodel"
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

func writeSnapshotOutput(sbom syftmodel.Document, output string) (err error) {
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

func createSbomForContainer(container string, excluded []string, isArchive bool) (*sbom.SBOM, error) {
	if isArchive {
		return getSbomFromFile(
			container,
			excluded,
			false,
		)
	}

	return getSbomFromContainer(container, excluded)
}

func ContainerCommand(c *cli.Context, appConfig types.LunaTraceConfig) (err error) {
	containers := c.Args().Slice()
	if len(containers) != 1 {
		err = errors.New("please provide exactly one container to snapshot")
		log.Error().
			Err(err).
			Msg("unable to snapshot container")
		return
	}
	container := containers[0]

	snapshotOptions := types.NewSnapshotOptions(c)
	containerOptions := types.NewShapshotContainerOptions(c)

	collectedSbom, err := createSbomForContainer(container, snapshotOptions.Excluded, containerOptions.Archive)
	if err != nil {
		log.Error().
			Err(err).
			Str("container", container).
			Msg("unable to collect sbom for container")
		return
	}

	repoMeta := types.RepoMetadata{}
	repoMeta.Merge(
		snapshotOptions.GitRemote,
		snapshotOptions.GitBranch,
		snapshotOptions.GitCommit,
	)

	err = processSbom(c, appConfig, snapshotOptions, collectedSbom, repoMeta)
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

func RepositoryCommand(c *cli.Context, appConfig types.LunaTraceConfig) (err error) {
	repos := c.Args().Slice()
	if len(repos) != 1 {
		err = errors.New("please provide exactly one repository to snapshot")
		return
	}

	snapshotOptions := types.NewSnapshotOptions(c)

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

	cloneOptions := getGitCloneOptions(parsedRepo.String(), snapshotOptions.GitBranch, progressBuffer)

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

	collectedSbom, err := getSbomFromDirectory(repoTmpDir, snapshotOptions.Excluded)
	if err != nil {
		log.Error().
			Err(err).
			Str("repo", repos[0]).
			Msg("unable to collect sbom for repository")
		return
	}

	err = processSbom(c, appConfig, snapshotOptions, collectedSbom, repoMeta)
	return
}

func DirectoryCommand(c *cli.Context, appConfig types.LunaTraceConfig) (err error) {
	dirs := c.Args().Slice()
	if len(dirs) != 1 {
		err = errors.New("please provide exactly one directory to snapshot")
		return
	}
	dir := dirs[0]

	snapshotOptions := types.NewSnapshotOptions(c)

	collectedSbom, err := getSbomFromDirectory(dir, snapshotOptions.Excluded)
	if err != nil {
		log.Error().
			Err(err).
			Str("dir", dir).
			Msg("unable to collect sbom for repository")
		return
	}
	repoMeta := util.CollectRepoMetadata(dir)
	repoMeta.Merge(
		snapshotOptions.GitRemote,
		snapshotOptions.GitBranch,
		snapshotOptions.GitCommit,
	)

	err = processSbom(c, appConfig, snapshotOptions, collectedSbom, repoMeta)
	return
}

func FileCommand(c *cli.Context, appConfig types.LunaTraceConfig) (err error) {
	cliOptions, err := types.NewSnapshotFileOptions(c)
	if err != nil {
		return
	}

	snapshotOptions := types.NewSnapshotOptions(c)

	dir, err := os.Getwd()
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to get working dir")
		return
	}

	repoMeta := util.CollectRepoMetadata(dir)
	repoMeta.Merge(
		snapshotOptions.GitRemote,
		snapshotOptions.GitBranch,
		snapshotOptions.GitCommit,
	)

	collectedSbom, err := getSbomFromFile(
		cliOptions.Filename,
		snapshotOptions.Excluded,
		cliOptions.UseStdin,
	)
	if err != nil {
		return
	}

	err = processSbom(c, appConfig, snapshotOptions, collectedSbom, repoMeta)
	return
}

func ScanCommand(c *cli.Context, appConfig types.LunaTraceConfig) (err error) {
	var (
		sbomFile         *os.File
		findingsDocument models.Document
	)

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
