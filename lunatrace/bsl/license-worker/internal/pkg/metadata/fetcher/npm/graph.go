// Copyright by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Business Source License v1.1 
// (the "License"); you may not use this file except in compliance with the
// License. You may obtain a copy of the License at
//
// https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
//
// See the License for the specific language governing permissions and
// limitations under the License.
//
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
package npm

import (
	//. "asset-engine/.gen/assets/public/table"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"path"
	"strings"
	"sync"
	"time"

	whoisparser "github.com/likexian/whois-parser"
	"github.com/rs/zerolog/log"
	whois "github.com/undiabler/golang-whois"
)

var (
	db *sql.DB
)

// func init() {
// 	var err error

// 	db, err = sql.Open("postgres", "postgres://postgres:postgrespassword@localhost:5431/assets?sslmode=disable")
// 	if err != nil {
// 		log.Error().Err(err).Msg("unable to open database")
// 		panic(err)
// 	}
// }

type packageGraphJob struct {
	name        string
	packageName string
}

func LoadNpmPackageMetadata(packageName, packageDir string) (packageManifest NpmPackageMetadata, err error) {
	packageJsonFilepath := path.Join(packageDir, packageMetadataFilename)

	content, err := ioutil.ReadFile(packageJsonFilepath)
	if err != nil {
		log.Error().
			Err(err).
			Str("packageName", packageName).
			Msg("unable to save package metadata")
		return
	}

	err = json.Unmarshal(content, &packageManifest)
	if err != nil {
		log.Error().
			Err(err).
			Str("packageName", packageName).
			Msg("unable to decode package metadata")
		return
	}
	return
}

func parseEmail(email string) (username, domain string, err error) {
	at := strings.LastIndex(email, "@")
	if at >= 0 {
		username, domain = email[:at], email[at+1:]
	} else {
		err = errors.New("unable to parse email address")
	}
	return
}

func generatePackageGraph(packageName string) (err error) {
	packageDir := path.Join(npmPackageDir, packageName)
	meta, err := LoadNpmPackageMetadata(packageName, packageDir)
	if err != nil {
		return
	}

	for _, author := range meta.Maintainers {
		_, domain, err := parseEmail(author.Email)
		if err != nil {
			continue
		}
		whoisResult, err := whois.GetWhois(domain)
		if err != nil {
			continue
		}

		result, err := whoisparser.Parse(whoisResult)
		if err == nil {
			// Print the domain status
			// fmt.Println(result.Domain.Status)

			// // Print the domain created date
			// fmt.Println(result.Domain.CreatedDate)

			// Print the domain expiration date
			// fmt.Println(result.Domain.ExpirationDate)

			RFC3339local := "2006-01-02T15:04:05Z"

			loc, err := time.LoadLocation("America/New_York")
			if err != nil {
				continue
			}

			t1, _ := time.ParseInLocation(RFC3339local, result.Domain.ExpirationDate, loc)
			if time.Now().After(t1) {
				log.Info().
					Str("package", meta.Name).
					Str("email", author.Email).
					Str("expired", result.Domain.ExpirationDate).
					Err(err).
					Msg("email returned error")
			}

			// if result.Registrar != nil {
			// 	// Print the registrar name
			// 	fmt.Println(result.Registrar.Name)
			// }

			// if result.Registrant != nil {
			// 	// Print the registrant name
			// 	fmt.Println(result.Registrant.Name)

			// 	// Print the registrant email address
			// 	fmt.Println(result.Registrant.Email)
			// }
		}
	}

	// latest, err := GetLatestNpmPackageVersion(meta)
	// if err != nil {
	// 	return
	// }
	// for depName, depVersion := range latest.Dependencies {
	// 	stmt := Packages.
	// 		INSERT(Packages.From, Packages.FromSemver, Packages.To, Packages.ToSemver).
	// 		VALUES(latest.Name, latest.Version, depName, depVersion).
	// 		ON_CONFLICT(Packages.From, Packages.FromSemver, Packages.To, Packages.ToSemver).
	// 		DO_NOTHING()
	// 	_, err = stmt.Exec(db)
	// 	if err != nil {
	// 		log.Error().Err(err).Msg("unable to insert into db")
	// 	}
	// }
	return
}

func generatePackageGraphWorker(id int, j packageGraphJob) {
	log.Debug().
		Int("worker", id).
		Str("job", j.name).
		Str("packageName", j.packageName).
		Msg("worker started job")

	defer log.Debug().
		Int("worker", id).
		Str("job", j.name).
		Str("packageName", j.packageName).
		Msg("worker completed job")

	err := generatePackageGraph(j.packageName)
	if err != nil {
		log.Error().
			Err(err).
			Str("packageName", j.packageName).
			Msg("unable to generate package graph")
	}
}

func CreatePackageGraph(packages []string) {
	// channel for jobs
	jobs := make(chan packageGraphJob)

	// start workers
	wg := &sync.WaitGroup{}
	wg.Add(maxWorkers)
	for i := 1; i <= maxWorkers; i++ {
		go func(i int) {
			defer wg.Done()

			for j := range jobs {
				generatePackageGraphWorker(i, j)
			}
		}(i)
	}

	// add jobs
	for i := 0; i < len(packages); i++ {
		packageName := packages[i]
		name := fmt.Sprintf("job-%d", i)
		log.Debug().
			Int("worker", i).
			Str("job", name).
			Str("packageName", packageName).
			Msg("adding job to worker")
		jobs <- packageGraphJob{name, packageName}
	}
	close(jobs)

	// wait for workers to complete
	wg.Wait()
}
