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
package util

import (
	"crypto/sha256"
	"encoding/hex"
	"io"
)

func HexEncodedSha256FromReader(reader io.Reader) (hash string, err error) {
	sha256Hash := sha256.New()
	_, err = io.Copy(sha256Hash, reader)
	if err != nil {
		return
	}

	hashSum := sha256Hash.Sum(nil)
	hash = hex.EncodeToString(hashSum)
	return
}
