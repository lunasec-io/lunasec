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
package util

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/go-git/go-git/v5"
	"github.com/rs/zerolog/log"

	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/deprecated"
)

func RepoNameToDirname(repoName string) string {
	return strings.Replace(repoName, "/", "", -1)
}

func findClosestGitDir(currentDir string) (gitDir string, err error) {
	maxSearchDepth := 20

	for i := 0; i < maxSearchDepth && currentDir != "/"; i += 1 {
		possibleGitDir := filepath.Join(currentDir, ".git")

		if _, err = os.Stat(possibleGitDir); err != nil && !os.IsNotExist(err) {
			return
		}

		if err == nil {
			gitDir = currentDir
			return
		}

		currentDir = filepath.Dir(currentDir)
	}
	return
}

func getRepo(dir string) (repo *git.Repository, err error) {
	gitDir, err := findClosestGitDir(dir)
	if err != nil {
		log.Warn().Msg("Unable to locate git project. Please pass git information via command line if you would like to track it")
		return
	}

	repo, err = git.PlainOpen(gitDir)
	if err != nil {
		log.Error().Msg("Unable to open git repo")
		return
	}
	return
}

func getRepoHead(repo *git.Repository) (branchName, branchHash string, err error) {
	head, err := repo.Head()
	if err != nil {
		return
	}

	branchName = head.Name().Short()
	branchHash = head.Hash().String()
	return
}

func getRepoRemote(repo *git.Repository) (name string, err error) {
	remotes, err := repo.Remotes()
	if err != nil {
		log.Error().Msg("Unable to get repo remotes")
		return
	}

	if len(remotes) == 0 {
		err = fmt.Errorf("no remotes in git repo")
		log.Error().Msg("Repo has no remotes")
		return
	}

	remote := remotes[0]
	urls := remote.Config().URLs

	if len(urls) == 0 {
		err = fmt.Errorf("no urls in git repo")
		log.Error().Msg("Repo has no remote urls")
		return
	}

	name = urls[0]
	return
}

func CollectRepoMetadata(dir string) (metadata deprecated.RepoMetadata) {
	repo, err := getRepo(dir)
	if err != nil {
		return
	}
	return CollectRepoMetadataFromObj(repo)
}

func CollectRepoMetadataFromObj(repo *git.Repository) (metadata deprecated.RepoMetadata) {
	remote, err := getRepoRemote(repo)
	if err == nil {
		metadata.RemoteUrl = remote
	}

	branchName, branchHash, err := getRepoHead(repo)
	if err == nil {
		metadata.BranchName = branchName
		metadata.CommitHash = branchHash
	}
	return
}
