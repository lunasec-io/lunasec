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
package npm

import "encoding/json"

type NpmPackageMetadata struct {
	Attachments Attachments `json:"_attachments"`
	ID          string      `json:"_id"`
	Rev         string      `json:"_rev"`
	// either Author or string
	Author         json.RawMessage `json:"author"`
	Description    string          `json:"description"`
	DistTags       DistTags        `json:"dist-tags"`
	License        json.RawMessage `json:"license"`
	Maintainers    []Author        `json:"maintainers"`
	Name           string          `json:"name"`
	Readme         string          `json:"readme"`
	ReadmeFilename string          `json:"readmeFilename"`
	Time           Time            `json:"time"`
}

type NpmPackageMetadataWithRawVersions struct {
	NpmPackageMetadata
	VersionsRaw map[string]json.RawMessage `json:"versions"`
}

type NpmPackageMetadataWithParsedVersions struct {
	NpmPackageMetadata
	Versions map[string]Version `json:"versions"`
}

type Attachments struct {
}

type Author struct {
	Email string `json:"email"`
	Name  string `json:"name"`
}

type DistTags struct {
	Latest string `json:"latest"`
}

// either string or
// {"_id":"dsr-rollback-parry-virid-vespa-kiley","name":"dsr-rollback-parry-virid-vespa-kiley","time":{"created":"2021-12-14T08:24:16.841Z","1.0.0":"2021-12-14T08:24:17.035Z","modified":"2021-12-14T08:24:37.596Z","unpublished":{"time":"2021-12-14T08:24:37.596Z","versions":["1.0.0"]}}}
type Time map[string]json.RawMessage

//type Time struct {
//	The100   string `json:"1.0.0"`
//	Created  string `json:"created"`
//	Modified string `json:"modified"`
//}

type Version struct {
	Name            string                     `json:"name"`
	Version         string                     `json:"version"`
	Description     string                     `json:"description"`
	Main            json.RawMessage            `json:"main"`
	Files           []string                   `json:"files"`
	Dependencies    map[string]string          `json:"dependencies"`
	DevDependencies map[string]string          `json:"devDependencies"`
	Scripts         map[string]json.RawMessage `json:"scripts"`
	Repository      json.RawMessage            `json:"repository"`
	Standard        Standard                   `json:"standard"`
	Keywords        json.RawMessage            `json:"keywords"`
	// Can be either Author or set to an empty string
	Author       json.RawMessage `json:"author"`
	Contributors json.RawMessage `json:"contributors"`
	License      json.RawMessage `json:"license"`
	Engine       json.RawMessage `json:"engine"`
	GitHead      string          `json:"gitHead"`
	Bugs         json.RawMessage `json:"bugs"`
	Homepage     json.RawMessage `json:"homepage"`
	ID           string          `json:"_id"`
	Shasum       string          `json:"_shasum"`
	From         string          `json:"_from"`
	NpmVersion   string          `json:"_npmVersion"`
	NodeVersion  string          `json:"_nodeVersion"`
	NpmUser      Author          `json:"_npmUser"`
	Dist         Dist            `json:"dist"`
	Maintainers  []Author        `json:"maintainers"`
	Directories  json.RawMessage `json:"directories"`
}

type Engine struct {
	Node string `json:"node"`
}

type Bugs struct {
	URL string `json:"url"`
}

type Repository struct {
	Type string `json:"type"`
	URL  string `json:"url"`
}

type Standard struct {
	Ignore  json.RawMessage `json:"ignore"`
	Globals []string        `json:"globals"`
}

type Dist struct {
	Shasum  string `json:"shasum"`
	Tarball string `json:"tarball"`
}

type Scripts map[string]string
