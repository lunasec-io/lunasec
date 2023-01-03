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
package util

import (
	"archive/tar"
	"bytes"
)

type InMemoryFile struct {
	Name, Body string
}

func BuildInMemoryTarFile(files []InMemoryFile) (buf bytes.Buffer, err error) {
	tw := tar.NewWriter(&buf)
	for _, file := range files {
		hdr := &tar.Header{
			Name: file.Name,
			Mode: 0600,
			Size: int64(len(file.Body)),
		}
		if err = tw.WriteHeader(hdr); err != nil {
			return
		}
		if _, err = tw.Write([]byte(file.Body)); err != nil {
			return
		}
	}
	if err = tw.Close(); err != nil {
		return
	}
	return
}
