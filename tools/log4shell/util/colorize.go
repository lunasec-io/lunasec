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
	"fmt"
	"github.com/lunasec-io/lunasec/tools/log4shell/constants"
)

// colorize returns the string s wrapped in ANSI code c, unless disabled is true.
func Colorize(c constants.TerminalColor, s interface{}) string {
	return fmt.Sprintf("\x1b[%dm%v\x1b[0m", c, s)
}