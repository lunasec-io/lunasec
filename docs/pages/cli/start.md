---
id: "start"
title: "lunasec start"
sidebar_label: "LunaSec Start Stack"
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
# lunasec start

The `lunasec start --env <environment>` command brings up the LunaSec stack in the provided environment configuration. 

To test out the LunaSec stack in demo mode, use the command `lunasec start --env demo`. This is a complete example which 
includes the local development configuration, as well as a example front end and back end which use the secure LunaSec 
components to protect their data.

By default, when not provided an environment, `lunasec start` brings up the LunaSec stack in the local development configuration, which consists of: the
tokenizer backend, Localstack, a https proxy to Localstack, and the Secure Frame iFrame. Every time the stack gets brought up,
the state of the stack gets reset, and the mocked AWS resources in Localstack are reinitialized by the LunaSec cli, which is
run in a container.

If your system does not require docker to be invoked by the root user (ie. if you have setup rootless docker or have 
[dangerously added your user to the docker group](https://docs.docker.com/engine/install/linux-postinstall/)). You must
pass `--no-sudo` to the start command in order to have docker-compose run without prepending `sudo`.

To build the LunaSec stack from source, pass `--local-build` from the root of the repository monorepo. 