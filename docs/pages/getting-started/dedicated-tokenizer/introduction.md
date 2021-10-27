---
id: "introduction"
title: "Dedicated Setup Introduction"
sidebar_label: "Introduction"
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
# Setting up LunaSec

For now, LunaSec has native support for applications that use React on the frontend and Express or Apollo-GraphQL 
on the backend. Other frontend frameworks are on the development roadmap, including Vue. Java backend support is in alpha.  

:::info
To see a full demonstration while you follow this guide, you can follow along in [the demo app](/pages/overview/demo-app/walkthrough).  
:::

### CLI
The LunaSec CLI makes development, testing, and deployment easier.  It can bring up the services we need to use LunaSec locally.

The CLI is available as an NPM module. Add it to your `package.json` along with the aws cdk packages that it depends on:

`yarn add @lunasec/cli cdk aws-cdk-local --dev`

or

`npm install @lunasec/cli cdk aws-cdk-local --save-dev`

Make sure the CLI stays at the same version as the `@lunasec` packages we install in this guide.

:::tip
You can also install the CLI package globally with `yarn global add @lunasec/cli` to make manual commands easier - it will automatically use the locally installed copy if you are in your app folder. Call `lunasec --version` to try it out.
:::

### Prerequisites
Your system must have `docker-compose`, `docker`, and `node >= 14` installed.

### Starting LunaSec

Now that the CLI is installed we can run:
```shell
lunasec --version
```
and we should see that the CLI is installed.

LunaSec depends on your backend to be running when it starts so that it can query it for signing keys. Once we install the LunaSec plugin into the backend (covered on the next page), we can run:
```shell
lunasec start
``` 
 which will start the LunaSec stack.  Depending on your internet speed, this might take a minute.


`lunasec start` brings up the parts of LunaSec you will need for local development, which consists of:
* the Tokenizer Backend 
* Localstack 
* HTTPS proxy to Localstack
* Secure Frame iFrame server  
  
LunaSec will start with a clean database on every launch.

If you'd like to also launch a demo app to try out LunaSec, instead run `lunasec start --env demo`, as described in the [Demo Application](/pages/overview/demo-app/overview) docs.

:::info Password Prompt
You'll be prompted for your password because the cli launches docker as root.  
You can pass `--no-sudo` to the start command in order to have docker-compose run without `sudo`.
True rootless docker isn't yet supported, but if you have
[dangerously added your user to the docker group](https://docs.docker.com/engine/install/linux-postinstall/) it will work without sudo.  This is not recommended for security reasons.
:::

Now that the CLI is installed, let's add LunaSec to the code. [Backend setup](./backend.md)