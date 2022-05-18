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
package main

import (
	"asset-engine/pkg/npm"
	"encoding/json"
	"io/ioutil"
	"os"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

type NpmPackages struct {
	Packages []string `json:"packages"`
}

type PackageJson struct {
	Dependencies map[string]string `json:"dependencies"`
}

type AllThePackageRepos map[string]string

func loadAndArchivePackages() {
	scanType := os.Args[1]
	packagesSource := os.Args[2]

	onlyPullMetadata := false
	if len(os.Args) == 4 {
	 	onlyPullMetadata = true
	}

	var packages []string
	if scanType == "package-manifest" {
		content, err := ioutil.ReadFile(packagesSource)
		if err != nil {
			panic(err)
		}

		var npmPackages NpmPackages

		err = json.Unmarshal(content, &npmPackages)
		if err != nil {
			panic(err)
		}
		packages = npmPackages.Packages
	} else if scanType == "package" {
		packages = []string{packagesSource}
	} else {
		log.Error().Str("scanType", scanType).Msg("scan type not supported")
		return
	}

	npm.ArchiveNpmPackages(packages, onlyPullMetadata)
	//npm.CreatePackageGraph(packages)
}

func main() {
	zerolog.SetGlobalLevel(zerolog.InfoLevel)
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})

	loadAndArchivePackages()
}
