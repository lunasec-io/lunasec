---
id: "analytics"
title: "CLI Analytics"
sidebar_label: "Analytics"
sidebar_position: 5
---
<!--
  ~ Copyright by LunaSec (owned by Refinery Labs, Inc)
  ~
  ~ Licensed under the Creative Commons Attribution-ShareAlike 4.0 International
  ~ (the "License"); you may not use this file except in compliance with the
  ~ License. You may obtain a copy of the License at
  ~
  ~ https://creativecommons.org/licenses/by-sa/4.0/legalcode
  ~
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  ~
-->

LunaDefend uses analytics collected from the CLI command in order to improve its performance for 
all developers. The metrics that are collected by the CLI look like: 

```js
{
  command: 'deploy', // or start, or eject, etc
  version: '1.0.7', // The CLI version was used
  env: 'demo', // The environment the CLI is setting up. 
  success: true, // or false if it fails
  error_message: 'some-error-message-that-only-happens-when-success-is-false',
  // UUID that persists in `~/.lunasec/metadata.json`. This help us filter noise of metrics reports coming to us.
  user_id: '1234-1234-1234-1234',
  // versions of different tools depeneded on by the CLI and what the host system is
  system_info: {
    docker_version: '2.0.0',
    docker_compose_version: '2.0.0',
    node_version: '16.0.0',
    host_platform: 'mac',
    host_release: '10.5'
  }
}
```

If you wish to disable these metrics when running the CLI, enable the environment variable: `LUNASEC_DISABLE_CLI_METRICS=true`.
