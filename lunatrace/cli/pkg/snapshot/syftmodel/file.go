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
package syftmodel

import (
	"github.com/anchore/syft/syft/file"
	"github.com/anchore/syft/syft/source"
)

type File struct {
	ID              string                `json:"id"`
	Location        source.Coordinates    `json:"location"`
	Metadata        *FileMetadataEntry    `json:"metadata,omitempty"`
	Contents        string                `json:"contents,omitempty"`
	Digests         []file.Digest         `json:"digests,omitempty"`
	Classifications []file.Classification `json:"classifications,omitempty"`
}

type FileMetadataEntry struct {
	Mode            int             `json:"mode"`
	Type            source.FileType `json:"type"`
	LinkDestination string          `json:"linkDestination,omitempty"`
	UserID          int             `json:"userID"`
	GroupID         int             `json:"groupID"`
	MIMEType        string          `json:"mimeType"`
}
