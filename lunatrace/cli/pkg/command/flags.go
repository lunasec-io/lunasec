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
package command

import (
	"fmt"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/constants"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/types"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/util"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"os"
	"strings"
)

func EnableGlobalFlags(flags *types.LunaTraceGlobalFlags) {
	zerolog.SetGlobalLevel(zerolog.InfoLevel)

	if flags.Verbose || flags.Debug {
		zerolog.SetGlobalLevel(zerolog.DebugLevel)
	}
	if flags.IgnoreWarnings {
		zerolog.SetGlobalLevel(zerolog.ErrorLevel)
	}

	outStream := os.Stdout
	if flags.LogToStderr {
		outStream = os.Stderr
	}

	if flags.Json {
		log.Logger = zerolog.New(os.Stderr).With().Timestamp().Logger()
	} else {
		// pretty print output to the console if we are not interested in parsable output
		consoleOutput := zerolog.ConsoleWriter{Out: outStream}
		consoleOutput.FormatFieldName = func(i interface{}) string {
			return fmt.Sprintf("\n\t%s: ", util.Colorize(constants.ColorBlue, i))
		}
		consoleOutput.FormatFieldValue = func(i interface{}) string {
			switch t := i.(type) {
			case string:
				return fmt.Sprintf("%s", util.FixStringSlashes(t))
			case []string:
				return fmt.Sprintf("[%s]", strings.Join(util.FixStringSliceSlashes(t), ", "))
			default:
				return fmt.Sprintf("%s", i)
			}
		}

		consoleOutput.FormatLevel = func(i interface{}) string {
			if i == nil {
				return util.Colorize(constants.ColorBold, "Scan Result:")
			}

			level := i.(string)

			var formattedLevel string
			switch level {
			case "warn":
				formattedLevel = util.Colorize(constants.ColorYellow, level)
			case "error":
				formattedLevel = util.Colorize(constants.ColorRed, level)
			case "info":
				formattedLevel = util.Colorize(constants.ColorBlue, level)
			case "debug":
				formattedLevel = util.Colorize(constants.ColorGreen, level)
			default:
				formattedLevel = util.Colorize(constants.ColorWhite, level)
			}
			return fmt.Sprintf("| %s |", formattedLevel)
		}

		log.Logger = log.Output(consoleOutput)
	}

	// TODO (cthompson) this should be behind a config value
	// include file and line number when logging
	log.Logger = log.Logger.With().Caller().Logger()
}
