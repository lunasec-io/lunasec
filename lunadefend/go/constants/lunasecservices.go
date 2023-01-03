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
package constants

import (
	"errors"
	"fmt"
)

// LunaSecServices
// Stores a list of valid LunaSec services.
type LunaSecServices string

// NOTE: To actually add an enum value, you must also add it to the validServices list below.
const (
	LunaSecServicesTokenizerBackend      LunaSecServices = "tokenizer-backend"
	LunaSecServicesSecureFrameFrontend                   = "secure-frame-frontend"
	LunaSecAnalyticsCollectorServiceName                 = "analytics-collector"
)

// Add your new enum value here in order to ensure it is validated at parse time.
var validServices = []LunaSecServices{
	LunaSecServicesTokenizerBackend,
	LunaSecServicesSecureFrameFrontend,
}

func parseLunaSecServiceEnum(input string) (LunaSecServices, bool) {
	for _, validService := range validServices {
		if input == string(validService) {
			return validService, true
		}
	}
	return LunaSecServicesTokenizerBackend, false
}

// UnmarshalText
// This function is used by Yaml and maps the input string into an enum value
func (x *LunaSecServices) UnmarshalText(text []byte) error {
	name := string(text)
	tmp, valid := parseLunaSecServiceEnum(name)
	if !valid {
		return errors.New(fmt.Sprintf("invalid service name specified, must be: %v", validProviders))
	}
	*x = tmp
	return nil
}
