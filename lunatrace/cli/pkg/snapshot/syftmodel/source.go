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
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/anchore/syft/syft/source"
)

// Source object represents the thing that was cataloged
type Source struct {
	Type   string      `json:"type"`
	Target interface{} `json:"target"`
}

// sourceUnpacker is used to unmarshal Source objects
type sourceUnpacker struct {
	Type   string          `json:"type"`
	Target json.RawMessage `json:"target"`
}

// UnmarshalJSON populates a source object from JSON bytes.
func (s *Source) UnmarshalJSON(b []byte) error {
	var unpacker sourceUnpacker
	if err := json.Unmarshal(b, &unpacker); err != nil {
		return err
	}

	s.Type = unpacker.Type

	switch s.Type {
	case "directory":
		if target, err := strconv.Unquote(string(unpacker.Target)); err == nil {
			s.Target = target
		} else {
			s.Target = string(unpacker.Target[:])
		}

	case "image":
		var payload source.ImageMetadata
		if err := json.Unmarshal(unpacker.Target, &payload); err != nil {
			return err
		}
		s.Target = payload

	default:
		return fmt.Errorf("unsupported package metadata type: %+v", s.Type)
	}

	return nil
}
