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
package snapshot

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/anchore/grype/grype"
	"github.com/anchore/grype/grype/db"
	"github.com/urfave/cli/v2"
	"io"
	"io/ioutil"
	"net/url"
	"os"
	"path"
	"path/filepath"

	"github.com/anchore/grype/grype/presenter/models"
	"github.com/anchore/syft/syft/sbom"
	"github.com/go-git/go-git/v5"
	"github.com/go-git/go-git/v5/plumbing"
	"github.com/rs/zerolog/log"
	"gopkg.in/yaml.v3"

	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/deprecated"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/snapshot/scan"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/snapshot/syftmodel"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/types"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/util"
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

func createSbomForContainer(container string, exclude []string, isArchive bool) (*sbom.SBOM, error) {
	if isArchive {
		return getSbomFromFile(
			container,
			exclude,
			false,
		)
	}

	return getSbomFromContainer(container, exclude)
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

	repoMeta := deprecated.RepoMetadata{}
	repoMeta.Merge(
		snapshotOptions.GitRemote,
		snapshotOptions.GitBranch,
		snapshotOptions.GitCommit,
	)

	err = processSbom(c, appConfig, snapshotOptions, collectedSbom, repoMeta)
	return
}

func getGitCloneOptions(gitUrl string, snapshotOptions types.SnapshotOptions, progress io.Writer) *git.CloneOptions {
	cloneOptions := git.CloneOptions{
		URL:        gitUrl,
		Progress:   progress,
		NoCheckout: true,
	}
	// If a branch is specified but no specific commit for checkout is specified, we can go ahead and checkout that branch and only the latest commit
	// if a commit is specified, we are going to go into a detached HEAD on some unknown branch in a later step, so clone everything for now
	if snapshotOptions.GitBranch != "" && snapshotOptions.GitCommit == "" {
		cloneOptions.ReferenceName = plumbing.NewBranchReferenceName(snapshotOptions.GitBranch)
		cloneOptions.SingleBranch = true
		cloneOptions.Depth = 1
		cloneOptions.NoCheckout = false
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

	repoDir := snapshotOptions.Workspace
	if repoDir == "" {
		// if a provided workspace directory has not been provided, then create a new temporary directory
		repoDir, err = os.MkdirTemp("", dirname)
		if err != nil {
			log.Error().
				Err(err).
				Msg("unable to create temporary directory")
			return
		}
		defer util.CleanupTmpFileDirectory(repoDir)
	}

	log.Info().
		Str("url", parsedRepo.String()).
		Str("repoDir", repoDir).
		Msg("cloning repository")

	progressBuffer := bytes.NewBufferString("")

	cloneOptions := getGitCloneOptions(parsedRepo.String(), snapshotOptions, progressBuffer)

	repo, err := git.PlainClone(repoDir, false, cloneOptions)
	if err != nil {
		log.Error().
			Err(err).
			Str("repo", repos[0]).
			Str("progress", progressBuffer.String()).
			Msg("unable to clone git repo")
		return
	}

	if snapshotOptions.GitCommit != "" {
		worktree, innerErr := repo.Worktree()
		if innerErr != nil {
			log.Error().
				Err(innerErr).
				Str("repo", repos[0]).
				Msg("unable to access git work tree for checkout")
			return innerErr
		}
		innerErr = worktree.Checkout(&git.CheckoutOptions{
			Hash: plumbing.NewHash(snapshotOptions.GitCommit),
		})
		// TODO: This error never seems to throw if a bad commit is passed, and we end up just scanning the latest commit on master.  Not great
		if innerErr != nil {
			log.Error().
				Err(innerErr).
				Str("repo", repos[0]).
				Msg("unable to checkout commit from cloned git repo")
			return innerErr
		}

		log.Info().
			Str("repo", repos[0]).
			Str("commit", snapshotOptions.GitCommit).
			Msg("Checked out a specific commit")
	}

	repoMeta := util.CollectRepoMetadataFromObj(repo)

	log.Info().
		Str("remote", repoMeta.RemoteUrl).
		Str("branch", repoMeta.BranchName).
		Str("commit", repoMeta.CommitHash).
		Msg("collected repo information")

	collectedSbom, err := getSbomFromDirectory(repoDir, snapshotOptions.Excluded)
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

	logger := &types.ZerologLogger{}

	grype.SetLogger(logger)

	if readFromStdin {
		sbomFile, err = util.GetFileFromStdin("sbom.json")

		defer func() {
			tmpDir := filepath.Dir(sbomFile.Name())
			log.Info().Str("dir", tmpDir)
			//util.CleanupTmpFileDirectory(tmpDir)
		}()

		if err != nil {
			return
		}
	} else {
		sboms := c.Args().Slice()
		if len(sboms) != 1 {
			err = errors.New("please provide exactly one sbom to scan")
			return
		}
		sbomFile, err = os.Open(sboms[0])
		if err != nil {
			log.Error().Err(err).Msg("unable to open sbom file")
			return
		}
	}

	err = sbomFile.Close()
	if err != nil {
		log.Error().Err(err).Msg("unable to close sbom file")
		return
	}

	if sbomFile == nil {
		err = errors.New("SBOM file is not provided")
		return
	}

	multiStore, err := scan.GetVulnerabilityStore(appConfig)
	if err != nil {
		log.Error().Err(err).Msg("unable to create vulnerability store")
		return
	}

	vulnerabilityProvider, _ := db.NewVulnerabilityProvider(multiStore)
	vulnerabilityMetadataProvider := db.NewVulnerabilityMetadataProvider(multiStore)

	findingsDocument, err = scan.GrypeSbomScanFromFile(
		vulnerabilityProvider,
		vulnerabilityMetadataProvider,
		sbomFile.Name(),
	)
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
	log.Info().
		Int("findingsCount", len(findingsDocument.Matches)).
		Msg("completed scanning for vulnerabilities")
	return
}
