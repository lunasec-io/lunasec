// Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
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
package types

import (
	"io"
)

type ResolveArchiveFile func(path string) (io.ReadCloser, error)

type ProcessArchiveFile func(resolveFile ResolveArchiveFile, reader io.Reader, path, file string) (finding *Finding)

type Finding struct {
	Path               string `json:"path"`
	FileName           string `json:"file_name"`
	Hash               string `json:"hash"`
	JndiLookupFileName string `json:"jndi_lookup_file_name"`
	JndiLookupHash     string `json:"jndi_lookup_hash"`
	Version            string `json:"version"`
	CVE                string `json:"cve"`
	Severity           string `json:"severity"`
}

type FindingsOutput struct {
	VulnerableLibraries []Finding `json:"vulnerable_libraries"`
}
