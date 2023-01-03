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
package patch

import (
	"fmt"
	"github.com/rs/zerolog/log"
)

func AskIfShouldSkipPatch(msg string) (shouldSkip, forcePatch bool) {
	var (
		patchPromptResp string
	)

	for {
		fmt.Printf("Are you sure you want to patch: %s? (y)es/(n)o/(a)ll: ", msg)
		_, err := fmt.Scan(&patchPromptResp)
		if err != nil {
			log.Error().
				Err(err).
				Msg("Unable to process response.")
			return true, false
		}
		fmt.Println()

		switch patchPromptResp {
		case "y":
			shouldSkip = false
		case "n":
			shouldSkip = true
		case "a":
			forcePatch = true
		default:
			fmt.Printf("Option %s is not valid, please enter 'y', 'n', or 'a'.\n", patchPromptResp)
			continue
		}
		break
	}
	return
}
