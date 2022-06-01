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
	"encoding/json"
	"errors"
	_ "expvar"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"path"
	"sync"
	"time"

	"github.com/jpillora/backoff"
	"github.com/rs/zerolog/log"
)

const maxWorkers = 10

type job struct {
	name             string
	packageName      string
	onlyPullMetadata bool
}

func GetLatestNpmPackageVersion(packageManifest NpmPackageMetadata) (version Version, err error) {
	latestDistTag := packageManifest.DistTags.Latest
	latestVersion, ok := packageManifest.Versions[latestDistTag]
	if !ok {
		err = errors.New("no latest version for package")
		log.Error().
			Err(err).
			Str("latestDistTag", latestDistTag).
			Str("packageName", packageManifest.Name).
			Msg("unable to get latest dist version")
		return
	}
	version = latestVersion
	return
}

func PullNpmPackageMetadata(packageName, packageDir string) (packageManifest NpmPackageMetadata, err error) {
	url := NpmRegistry + "/" + packageName
	r, err := http.Get(url)
	if err != nil {
		log.Error().
			Err(err).
			Str("url", url).
			Str("packageName", packageName).
			Msg("unable to request package metadata")
		return
	}
	defer r.Body.Close()

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Error().
			Err(err).
			Str("url", url).
			Str("packageName", packageName).
			Msg("unable to read package metadata body")
		return
	}

	packageJsonFilepath := path.Join(packageDir, packageMetadataFilename)

	err = ioutil.WriteFile(packageJsonFilepath, body, fsPerm)
	if err != nil {
		log.Error().
			Err(err).
			Str("packageName", packageName).
			Msg("unable to save package metadata")
		return
	}

	err = json.Unmarshal(body, &packageManifest)
	if err != nil {
		log.Error().
			Err(err).
			Str("packageName", packageName).
			Msg("unable to decode package metadata")
		return
	}
	return
}

func savePackageInformation(packageName string, onlyPullMetadata bool) (retry bool, err error) {
	packageDir := path.Join(npmPackageDir, packageName)
	err = os.MkdirAll(packageDir, fsPerm)
	if err != nil {
		log.Error().
			Err(err).
			Str("packageName", packageName).
			Msg("unable to create package dir")
		return
	}

	packageMetadata, err := PullNpmPackageMetadata(packageName, packageDir)
	if err != nil {
		return
	}

	if onlyPullMetadata {
		log.Info().
			Str("packageName", packageMetadata.Name).
			Msg("downloaded metadata for package")
		return
	}

	latestVersion, err := GetLatestNpmPackageVersion(packageMetadata)
	if err != nil {
		return
	}

	tarballUrl, err := url.Parse(latestVersion.Dist.Tarball)
	if err != nil {
		log.Error().
			Err(err).
			Str("tarball", latestVersion.Dist.Tarball).
			Str("packageName", packageMetadata.Name).
			Msg("unable to parse tarball url")
		return
	}

	tarballFilename := path.Base(tarballUrl.Path)
	tarFile := path.Join(packageDir, tarballFilename)

	if _, err = os.Stat(tarFile); err != nil {
		log.Info().
			Str("tarFile", tarFile).
			Str("packageName", packageMetadata.Name).
			Msg("skipping download, file already downloaded")
		return
	}

	err = DownloadFile(tarFile, latestVersion.Dist.Tarball)
	if err != nil {
		log.Error().
			Err(err).
			Str("tarFile", tarFile).
			Str("url", latestVersion.Dist.Tarball).
			Msg("unable to download tarball")
		return
	}
	log.Info().
		Str("tarFile", tarFile).
		Msg("saved package version tarball")
	return
}

func doWork(id int, j job, b *backoff.Backoff) {
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

	var (
		err     error
		attempt = true
	)

	for attempt {
		attempt, err = savePackageInformation(j.packageName, j.onlyPullMetadata)
		if attempt {
			duration := b.Duration()
			log.Warn().
				Err(err).
				Float64("duration (in seconds)", duration.Seconds()).
				Msg("encountered retriable error, backing off")
			time.Sleep(duration)
		}
	}

	if err != nil {
		log.Error().
			Err(err).
			Str("packageName", j.packageName).
			Msg("unable to archive package information")
	}
	b.Reset()
}

func ArchiveNpmPackages(packages []string, onlyPullMetadata bool) {
	// channel for jobs
	jobs := make(chan job)

	// start workers
	wg := &sync.WaitGroup{}
	wg.Add(maxWorkers)
	for i := 1; i <= maxWorkers; i++ {
		go func(i int) {
			defer wg.Done()

			b := &backoff.Backoff{
				Max: time.Minute,
			}
			for j := range jobs {
				doWork(i, j, b)
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
		jobs <- job{name, packageName, onlyPullMetadata}
	}
	close(jobs)

	// wait for workers to complete
	wg.Wait()
}
