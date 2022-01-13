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
package util

import (
	"fmt"
	"github.com/go-git/go-git/v5"
	"github.com/rs/zerolog/log"
	"os"
	"path/filepath"
)

func findClosestGitDir() (gitDir string, err error) {
	currentDir, err := os.Getwd()
	if err != nil {
		return
	}

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

func GetRepoRemote() (name string, err error) {
	gitDir, err := findClosestGitDir()
	if err != nil {
		log.Error().Msg("Unable to locate git folder. Started in the current directory and searched parent folders.")
		return
	}

	repo, err := git.PlainOpen(gitDir)
	if err != nil {
		log.Error().Msg("Unable to open git repo")
		return
	}

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
