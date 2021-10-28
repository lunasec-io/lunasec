---
id: "deploy"
title: "lunasec deploy"
sidebar_label: "LunaSec Deploy Stack"
sidebar_position: 1
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
# lunasec deploy
LunaSec can be deployed to AWS using the LunaSec CLI, available in the @lunasec/cli npm package.  More information on installing and using the CLI can be 
found in the [Getting Started Guide](/pages/getting-started/dedicated-tokenizer/introduction)

Deploy the LunaSec stack to AWS using the provided config (defaults to `config.yaml` in the working directory).

The CLI reads from a `config.yaml` file found in the working directory from which the CLI was called.  It has the following options:

```yaml
lunasec:
  stack_version: <version of the LunaSec stack that you would wish to pin to>
  application_front_end: <URL to your application's front end>
  application_back_end: <URL to your application's back end>
  session_public_key: <public key that was used to sign the session>
  session_jwks_endpoint: <url for serving the jwks keys used for signing the session>
  localstack_url: <url used to point to the local aws mock server, Localstack>
  service_versions:
    <name of service>: <version to pin service to>
```

Most of these are optional.  For a standard deployment of LunaSec, you may only need:

```yaml
lunasec:
  application_front_end: <url of your front end application>
  application_back_end: <url of your back end application>
```


Once the stack is built, the generated AWS Cloudformation template will be present at `~/.lunasec/builds/build_<time of build>`.