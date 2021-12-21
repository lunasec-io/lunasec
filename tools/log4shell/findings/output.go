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
package findings

import (
	"encoding/json"
	"github.com/lunasec-io/lunasec/tools/log4shell/types"
	"github.com/rs/zerolog/log"
	"io/ioutil"
)

func SerializeToFile(outputFile string, findings []types.Finding) error {
	findingsOutput := types.FindingsOutput{
		VulnerableLibraries: findings,
	}
	serializedOutput, err := json.MarshalIndent(findingsOutput, "", "\t")
	if err != nil {
		log.Error().Err(err).Msg("unable to marshall findings output")
		return err
	}

	err = ioutil.WriteFile(outputFile, serializedOutput, 0644)
	if err != nil {
		log.Error().Err(err).Msg("unable to write findings to output file")
		return err
	}
	return nil
}
