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
package cloudscan

import (
	"crypto"
	"fmt"
	"github.com/anchore/syft/syft"
	"github.com/anchore/syft/syft/artifact"
	"github.com/anchore/syft/syft/file"
	"github.com/anchore/syft/syft/pkg/cataloger"
	"github.com/anchore/syft/syft/sbom"
	"github.com/anchore/syft/syft/source"
	"lunasec/log4shell/constants"
	"github.com/rs/zerolog/log"
)

func getSbomForSearchDir(searchDir string, excludedDirs []string) (s *sbom.SBOM, err error) {
	userInput := fmt.Sprintf("dir:%s", searchDir)

	log.Info().
		Str("searchDir", searchDir).
		Msg("Scanning search directory for dependencies.")

	src, cleanup, err := source.New(userInput, nil, excludedDirs)
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

	s = &sbom.SBOM{
		Source: src.Metadata,
		Descriptor: sbom.Descriptor{
			Name:    constants.ApplicationName,
			Version: constants.Version,
		},
	}

	err = collectRelationships(searchDir, s, src)
	if err != nil {
		return
	}

	return
}

func collectRelationships(searchDir string, s *sbom.SBOM, src *source.Source) (err error) {
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
		if err != nil {
			return
		}
	}
	s.Relationships = append(s.Relationships, mergeRelationships(relationships...)...)

	log.Info().
		Str("searchDir", searchDir).
		Msg("Completed collecting relationships between dependencies and files.")
	return
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
		results.Distro = theDistro

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

func generateCatalogFileClassificationsTask() (task, error) {
	// TODO: in the future we could expose out the classifiers via configuration
	classifierCataloger, err := file.NewClassificationCataloger(file.DefaultClassifiers)
	if err != nil {
		return nil, err
	}

	task := func(results *sbom.Artifacts, src *source.Source) ([]artifact.Relationship, error) {
		resolver, err := src.FileResolver(source.UnknownScope)
		if err != nil {
			return nil, err
		}

		result, err := classifierCataloger.Catalog(resolver)
		if err != nil {
			return nil, err
		}
		results.FileClassifications = result
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
