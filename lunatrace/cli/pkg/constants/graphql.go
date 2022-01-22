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
package constants

const (
	UpsertInstanceQuery = `
mutation UpsertInstance($instance_id: uuid, $agent_access_token: uuid) {
  insert_instances_one(object: {instance_id: $instance_id, agent_access_token: $agent_access_token}, on_conflict: {constraint: instances_pkey, update_columns: last_heartbeat}) {
    last_heartbeat
  }
}`

	InsertNewBuildQuery = `
mutation InsertNewBuildQuery($project_id: uuid, $s3_url: String) {
  insert_builds_one(object: {sbom: {data: {s3_url: $s3_url}}, project_id: $project_id}) {
    id
	agent_access_token
  }
}`

	GetProjectInfoQuery = `
query GetProjectInfoQuery($access_token: uuid) {
  project_access_tokens() {
    project {
      organization_id
      id
    }
  }
}`
)
