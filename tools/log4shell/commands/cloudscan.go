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
	"bytes"
	"crypto"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/anchore/syft/syft/artifact"
	"github.com/anchore/syft/syft/file"
	"github.com/anchore/syft/syft/sbom"
	"github.com/anchore/syft/syft/source"
	"github.com/go-git/go-git/v5"
	"github.com/lunasec-io/lunasec/tools/log4shell/constants"
	"github.com/lunasec-io/lunasec/tools/log4shell/types/model"
	"github.com/lunasec-io/lunasec/tools/log4shell/util"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
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

func getRepoRemote() (name string, err error) {
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
	name = remote.String()
	return
}

func CloudScanCommand(c *cli.Context, globalBoolFlags map[string]bool) (err error) {
	enableGlobalFlags(c, globalBoolFlags)

	searchDirs := c.Args().Slice()

	output := c.String("output")
	email := c.String("email")
	applicationName := c.String("application-name")

	if email == "" {
		err = errors.New("email required when performing cloud scan")
		log.Error().
			Err(err).
			Msg("Invalid arguments passed to command.")
		return
	}

	repoRemote, err := getRepoRemote()
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

	var sboms []model.Document

	for _, searchDir := range searchDirs {
		s, err := packagesExecWorker(searchDir)
		if err != nil {
			log.Error().
				Str("searchDir", searchDir).
				Err(err).
				Msg("Unable to create SBOM from directory.")
		}
		doc := util.ToSyftJsonFormatModel(s)
		sboms = append(sboms, doc)
	}

	if output != "" {
		err = writeCloudScanOutput(sboms, output)
		if err != nil {
			return
		}
	}

	serializedOutput, err := json.Marshal(sboms)
	if err != nil {
		log.Error().Err(err).Msg("unable to marshall dependencies output")
		return err
	}

	metadata := map[string]string{
		"name": applicationName,
	}

	metadataBytes, err := json.Marshal(metadata)

	values := url.Values{}
	values.Set("email", email)
	values.Set("metadata", string(metadataBytes))

	uploadUrl := "https://lunatrace.lunasec.io/api/upload-sbom"

	baseUrl, err := url.Parse(uploadUrl)
	if err != nil {
		fmt.Println("Malformed URL: ", err.Error())
		return
	}

	baseUrl.RawQuery = values.Encode()

	data, err := util.HttpRequest(http.MethodGet, baseUrl.String(), map[string]string{}, nil)
	if err != nil {
		log.Error().
			Err(err).
			Msg("Unable to get SBOM upload URL.")
		return
	}

	type UploadSbomUrl struct {
		Url     string            `json:"url"`
		Headers map[string]string `json:"headers"`
	}

	type UploadSbomResponse struct {
		Error     bool          `json:"error"`
		Message   string        `json:"message"`
		UploadURL UploadSbomUrl `json:"uploadUrl"`
	}

	var uploadSbomResp UploadSbomResponse

	err = json.Unmarshal(data, &uploadSbomResp)
	if err != nil {
		log.Error().
			Err(err).
			Msg("Unable to parse upload sbom response.")
		return
	}

	if uploadSbomResp.Error {
		err = errors.New(uploadSbomResp.Message)
		log.Error().
			Err(err).
			Str("requestUrl", baseUrl.String()).
			Msg("Error when attempting to get upload url.")
		return
	}

	data, err = util.HttpRequest(http.MethodPut, uploadSbomResp.UploadURL.Url, uploadSbomResp.UploadURL.Headers, bytes.NewBuffer(serializedOutput))
	if err != nil {
		log.Error().
			Err(err).
			Str("response data", string(data)).
			Str("uploadUrl", uploadSbomResp.UploadURL.Url).
			Interface("headers", uploadSbomResp.UploadURL.Headers).
			Msg("Unable to upload SBOM data.")
		return
	}

	return nil
}

func packagesExecWorker(searchDir string) (s sbom.SBOM, err error) {
	userInput := fmt.Sprintf("dir:%s", searchDir)

	log.Info().
		Str("searchDir", searchDir).
		Msg("Scanning search directory for dependencies.")

	src, cleanup, err := source.New(userInput, nil, []string{})
	if err != nil {
		err = fmt.Errorf("failed to construct source from user input %q: %w", userInput, err)
		return
	}
	if cleanup != nil {
		defer cleanup()
	}

	log.Info().
		Str("searchDir", searchDir).
		Msg("Completed scanning in search directory.")

	s = sbom.SBOM{
		Source: src.Metadata,
		Descriptor: sbom.Descriptor{
			Name:    "LunaTrace",
			Version: constants.Version,
		},
	}
	return
}

func collectRelationships(searchDir string, s sbom.SBOM, src *source.Source) {
	log.Info().
		Str("searchDir", searchDir).
		Msg("Collecting relationships between dependencies and files.")

	tasks, err := getTasks()
	if err != nil {
		return
	}

	var relationships []<-chan artifact.Relationship
	for _, task := range tasks {
		c := make(chan artifact.Relationship)
		relationships = append(relationships, c)

		err = runTask(task, &s.Artifacts, src, c)
	}
	s.Relationships = append(s.Relationships, mergeRelationships(relationships...)...)

	log.Info().
		Str("searchDir", searchDir).
		Msg("Completed collecting relationships between dependencies and files.")

}

func runTask(t task, a *sbom.Artifacts, src *source.Source, c chan<- artifact.Relationship) (err error) {
	defer close(c)

	relationships, err := t(a, src)
	if err != nil {
		return
	}

	for _, relationship := range relationships {
		c <- relationship
	}
	return
}

func mergeRelationships(cs ...<-chan artifact.Relationship) (relationships []artifact.Relationship) {
	for _, c := range cs {
		for n := range c {
			relationships = append(relationships, n)
		}
	}

	return relationships
}

type task func(*sbom.Artifacts, *source.Source) ([]artifact.Relationship, error)

func getTasks() ([]task, error) {
	var tasks []task

	generators := []func() (task, error){
		generateCatalogFileDigestsTask,
	}

	for _, generator := range generators {
		task, err := generator()
		if err != nil {
			return nil, err
		}

		if task != nil {
			tasks = append(tasks, task)
		}
	}

	return tasks, nil
}

func generateCatalogFileDigestsTask() (task, error) {
	hashes := []crypto.Hash{
		crypto.SHA256,
	}

	digestsCataloger, err := file.NewDigestsCataloger(hashes)
	if err != nil {
		return nil, err
	}

	task := func(results *sbom.Artifacts, src *source.Source) ([]artifact.Relationship, error) {
		resolver, err := src.FileResolver(source.UnknownScope)
		if err != nil {
			return nil, err
		}

		result, err := digestsCataloger.Catalog(resolver)
		if err != nil {
			return nil, err
		}
		results.FileDigests = result
		return nil, nil
	}

	return task, nil
}
