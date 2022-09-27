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
//
package util

import (
	"github.com/rs/zerolog/log"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type GraphqlLogContext struct {
	Key   string
	Value string
}

func LogGraphqlError(err error, message string, context ...GraphqlLogContext) {
	event := log.Error()
	for _, c := range context {
		event = event.Str(c.Key, c.Value)
	}

	switch t := err.(type) {
	case gqlerror.List:
		for _, e := range t {
			event.
				Str("msg", e.Message).
				Interface("extensions", e.Extensions).
				Msg(message)
		}
	default:
		event.
			Err(err).
			Msg(message)
	}
}
