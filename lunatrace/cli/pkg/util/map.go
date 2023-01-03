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
package util

import (
	"fmt"

	"github.com/pkg/errors"
	"go.uber.org/multierr"
)

func Map[T any, M any](a []T, f func(T) M) []M {
	n := make([]M, len(a))
	for i, e := range a {
		n[i] = f(e)
	}
	return n
}

func MapErr[T any, M any](a []T, f func(T) (M, error)) ([]M, error) {
	n := make([]M, len(a))
	for i, e := range a {
		var err error
		n[i], err = f(e)
		if err != nil {
			return nil, errors.Wrap(err, fmt.Sprintf("while processing \"%v\"", e))
		}
	}
	return n, nil
}

func MapMultiErr[T any, M any](a []T, f func(T) (M, error)) ([]M, error) {
	var errs error
	n := make([]M, len(a))
	for i, e := range a {
		var err error
		n[i], err = f(e)
		if err != nil {
			errs = multierr.Append(errs, errors.Wrap(err, fmt.Sprintf("while processing \"%v\"", e)))
		}
	}
	return n, errs
}
