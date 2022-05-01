---
id: "install"
title: "Installing and Using the CLI"
sidebar_label: "Installation"
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

The LunaDefend CLI makes development, testing, and deployment easier.  It can bring up the services we need to use LunaDefend locally.

The CLI is available as an NPM module. Add it to your `package.json` along with the aws cdk packages that it depends on:

`yarn add @lunasec/cli --dev`

or

`npm install @lunasec/cli --save-dev`

Make sure the CLI stays at the same version as the `@lunasec` packages we install in this guide.

:::tip
You can also install the CLI package globally with `yarn global add @lunasec/cli` to make manual commands easier - it will automatically use the locally installed copy if you are in your app folder. Call `lunasec --version` to try it out.
:::

### Prerequisites
Your system must have `docker-compose`, `docker`, and `node >= 14` installed.
