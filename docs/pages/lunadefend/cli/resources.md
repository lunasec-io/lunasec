---
id: "resources"
title: "LunaDefend Stack Resources"
sidebar_label: "Resources"
sidebar_position: 4
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

Print out the resources which have been deployed to the LunaDefend stack. 

```shell
$ lunasec resources
Tokenizer URL: https://<gateway id>.execute-api.us-west-2.amazonaws.com/prod/
Tokenizer Secret ARN: arn:aws:secretsmanager:us-west-2:000000000000:secret:lunasec-tokenizersecret-xxx

Tables:
  Keys Table: lunasec-keystable-xxx
  Grants Table: lunasec-grantstable-xxx
  Metadata Table: lunasec-metadatatable-xxx
```

You can supply `--json` to get a serialized dump of these resources:
```shell
$ lunasec resources --json
{
  "metadatatableOutput": "lunasec-metadatatable-xxx",
  "keystableOutput": "lunasec-keystable-xxx",
  "sessionstableOutput": "lunasec-sessionstable-xxx",
  "grantstableOutput": "lunasec-grantstable-xxx",
  "tokenizersecretOutput": "arn:aws:secretsmanager:us-west-2:000000000000:secret:lunasec-tokenizersecret-xxx"
}
```
