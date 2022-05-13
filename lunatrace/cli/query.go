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
package cli

import (
	"context"
	"time"

	"github.com/google/uuid"

	"github.com/lunasec-io/lunasec/lunatrace/cli/gql"
)

var _ = `# @genqlient
mutation MyMutation($object: builds_insert_input!) {
  insert_builds_one(object: $object) {
    id
  }
}
`

func _() {
	gql.MyMutation(context.Background(), gql.TODOClient, &gql.Builds_insert_input{
		Agent_access_token:        uuid.New(),
		Build_number:              0,
		Created_at:                time.Time{},
		Existing_github_review_id: "",
		Findings:                  nil,
		Git_branch:                "",
		Git_hash:                  "",
		Git_remote:                "",
		Id:                        uuid.New(),
		Manifests:                 nil,
		Project:                   nil,
		Project_id:                uuid.New(),
		Pull_request_id:           "",
		S3_url:                    "",
		Scans:                     nil,
		Source_type:               "",
	})
}
