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
package gql

import (
	"net/http"

	"github.com/Khan/genqlient/graphql"

	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/httputil"
)

type HeadersTransport struct {
	RT      http.RoundTripper
	Headers map[string]string
}

func (t *HeadersTransport) RoundTrip(req *http.Request) (*http.Response, error) {
	if t.RT == nil {
		t.RT = http.DefaultTransport
	}
	for header, value := range t.Headers {
		req.Header.Add(header, value)
	}
	return t.RT.RoundTrip(req)
}

// TODOClient is bad. Remove it. it is todo.
// todo auth headers?
var TODOClient = func() graphql.Client {
	// make sure the config is loaded first or use dependency injection.
	return nil
}()

var LocalClient = graphql.NewClient("http://localhost:8080/v1/graphql", &http.Client{
	Transport: &httputil.HeadersTransport{Headers: map[string]string{
		"x-hasura-admin-secret": "myadminsecretkey", "x-hasura-role": "service",
	}},
})
