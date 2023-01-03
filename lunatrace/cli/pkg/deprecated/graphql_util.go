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
package deprecated

import (
	"errors"
	"strings"
)

func formatGraphqlErrors(graphqlErrors GraphqlErrors) error {
	var errs []string
	for _, respErr := range graphqlErrors.Errors {
		errs = append(errs, respErr.Message)
	}
	return errors.New(strings.Join(errs, ", "))
}

func GetGraphqlError(err error, graphqlErrors GraphqlErrors) error {
	if err != nil {
		return err
	}
	if len(graphqlErrors.Errors) != 0 {
		err = formatGraphqlErrors(graphqlErrors)
		return err
	}
	return nil
}
