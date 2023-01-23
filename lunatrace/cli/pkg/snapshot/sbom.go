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
	"crypto"
	"fmt"
	"github.com/anchore/syft/syft"
	"github.com/anchore/syft/syft/artifact"
	"github.com/anchore/syft/syft/file"
	"github.com/anchore/syft/syft/pkg/cataloger"
	"github.com/anchore/syft/syft/sbom"
	"github.com/anchore/syft/syft/source"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/constants"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/util"
	"github.com/rs/zerolog/log"
	"os"
	"path/filepath"
)

func newSource(userInput string, excludeDirs []string) (src *source.Source, cleanup func(), err error) {
	sourceInput, err := source.ParseInput(userInput, "", true)
	if err != nil {
		err = fmt.Errorf("failed to parse source from user input %q: %w", sourceInput, err)
		return
	}

	src, cleanup, err = source.New(*sourceInput, nil, excludeDirs)
	if err != nil {
		err = fmt.Errorf("failed to construct source from user input %q: %w", sourceInput, err)
		return
	}
	return
}

func getSyftSourceForFile(sourceName string, excludeDirs []string, useStdin bool) (src *source.Source, cleanup func(), err error) {
	if useStdin {
		var (
			tmpSourceFile *os.File
		)

		tmpSourceFile, err = util.GetFileFromStdin(sourceName)
		if err != nil {
			return
		}

		syftSrc, cleanupFunc := source.NewFromFile(tmpSourceFile.Name())
		src = &syftSrc

		cleanup = func() {
			tmpDir := filepath.Dir(tmpSourceFile.Name())
			util.CleanupTmpFileDirectory(tmpDir)
			cleanupFunc()
		}
		return
	}

	userInput := "file:" + sourceName
	return newSource(userInput, excludeDirs)
}

func getSbomFromFile(sourceName string, excludeDirs []string, useStdin bool) (s *sbom.SBOM, err error) {
	log.Info().
		Str("source", sourceName).
		Msg("Scanning source for dependencies.")

	src, cleanup, err := getSyftSourceForFile(sourceName, excludeDirs, useStdin)
	if cleanup != nil {
		defer cleanup()
	}

	log.Info().
		Str("source", sourceName).
		Msg("Completed scanning source.")

	s = &sbom.SBOM{
		Source: src.Metadata,
		Descriptor: sbom.Descriptor{
			Name:    constants.LunaTraceName,
			Version: constants.LunaTraceVersion,
		},
	}

	err = collectRelationships(s, src)
	if err != nil {
		return
	}
	return
}

func NewSbom(src *source.Source) (s *sbom.SBOM, err error) {
	s = &sbom.SBOM{
		Source: src.Metadata,
		Descriptor: sbom.Descriptor{
			Name:    constants.LunaTraceName,
			Version: constants.LunaTraceVersion,
		},
	}
	err = collectRelationships(s, src)
	return
}

func getSbomFromContainer(container string, excludeDirs []string) (s *sbom.SBOM, err error) {
	log.Info().
		Str("container", container).
		Msg("Scanning container for dependencies.")

	src, cleanup, err := newSource("docker:"+container, excludeDirs)
	if err != nil {
		err = fmt.Errorf("failed to construct source from container %s: %w", container, err)
		return
	}
	defer cleanup()

	log.Info().
		Str("container", container).
		Msg("Completed scanning source.")

	return NewSbom(src)
}

func getSbomFromDirectory(repoDir string, excludeDirs []string) (s *sbom.SBOM, err error) {
	log.Info().
		Str("repoDir", repoDir).
		Msg("Scanning directory for dependencies.")

	src, cleanup, err := newSource("dir:"+repoDir, excludeDirs)
	if err != nil {
		err = fmt.Errorf("failed to construct source from repo %s: %w", repoDir, err)
		return
	}
	defer cleanup()

	log.Info().
		Str("repoDir", repoDir).
		Msg("Completed scanning source.")

	return NewSbom(src)
}

func collectRelationships(s *sbom.SBOM, src *source.Source) (err error) {
	log.Info().
		Msg("Collecting relationships between dependencies and files.")

	tasks, err := getTasks()
	if err != nil {
		return
	}

	var relationships []artifact.Relationship
	for _, task := range tasks {
		var taskRelations []artifact.Relationship

		taskRelations, err = task(&s.Artifacts, src)
		if err != nil {
			return
		}
		relationships = append(relationships, taskRelations...)

	}
	s.Relationships = append(s.Relationships, relationships...)

	log.Info().
		Msg("Completed collecting relationships between dependencies and files.")
	return
}

type task func(*sbom.Artifacts, *source.Source) ([]artifact.Relationship, error)

func getTasks() ([]task, error) {
	var tasks []task

	generators := []func() (task, error){
		generateCatalogPackagesTask,
		//generateCatalogFileMetadataTask,
		//generateCatalogFileClassificationsTask,
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
func generateCatalogPackagesTask() (task, error) {
	task := func(results *sbom.Artifacts, src *source.Source) ([]artifact.Relationship, error) {
		packageCatalog, relationships, theDistro, err := syft.CatalogPackages(src, cataloger.DefaultConfig())
		if err != nil {
			return nil, err
		}

		results.PackageCatalog = packageCatalog
		results.LinuxDistribution = theDistro

		return relationships, nil
	}

	return task, nil
}

func generateCatalogFileMetadataTask() (task, error) {
	metadataCataloger := file.NewMetadataCataloger()

	task := func(results *sbom.Artifacts, src *source.Source) ([]artifact.Relationship, error) {
		resolver, err := src.FileResolver(source.UnknownScope)
		if err != nil {
			return nil, err
		}

		result, err := metadataCataloger.Catalog(resolver)
		if err != nil {
			return nil, err
		}
		results.FileMetadata = result
		return nil, nil
	}

	return task, nil
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
