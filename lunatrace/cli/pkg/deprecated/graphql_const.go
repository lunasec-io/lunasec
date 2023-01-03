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

const (
	UpsertInstanceQuery = `
mutation UpsertInstance($instance_id: uuid, $agent_access_token: uuid) {
  insert_instances_one(object: {instance_id: $instance_id, agent_access_token: $agent_access_token}, on_conflict: {constraint: instances_pkey, update_columns: last_heartbeat}) {
    last_heartbeat
  }
}`

	InsertNewBuildQuery = `
mutation InsertNewBuildQuery($project_id: uuid, $s3_url: String, $git_remote: String, $git_branch: String, $git_hash: String) {
  insert_builds_one(object: {project_id: $project_id, s3_url: $s3_url, git_remote: $git_remote, git_branch: $git_branch, git_hash: $git_hash}) {
    id
	agent_access_token
  }
}`

	DeleteBuildQuery = `
mutation DeleteBuild($id: uuid!) {
  delete_builds_by_pk(id: $id){
   id 
  }
}
`

	SetBuildS3UrlQuery = `
mutation SetBuildS3Url($id: uuid!, $s3_url: String!) {
  update_builds_by_pk(pk_columns: {id: $id}, _set: {s3_url: $s3_url}) {
    id
  }
}
`

	PresignSbomQuery = `
query PresignSbom($orgId: uuid!, $buildId: uuid!) {
  presignSbomUpload(orgId: $orgId, buildId: $buildId) {
    uploadUrl {
      url
      headers
    }
    error
  }
}
`
	GetProjectInfoQuery = `
query GetProjectInfoQuery {
  project_access_tokens {
    project {
      organization_id
      id
    }
  }
}`
)
