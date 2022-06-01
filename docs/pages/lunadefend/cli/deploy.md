---
id: "deploy"
title: "Deploying LunaDefend"
sidebar_label: "Deploy"
sidebar_position: 3
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

## lunasec deploy

LunaDefend can be deployed to AWS using the LunaDefend CLI, available in the `@lunasec/cli` npm package.  More information on installing and using the CLI can be 
found in the [Getting Started Guide](/pages/lunadefend/getting-started/dedicated-tokenizer/introduction)

The deploy command configures a deployment by reading the closest `lunadefend.js` file to the current directory. The CLI tool will
recursively search in parent directories for this file until it gets to the root of the file system.

For a standard deployment of LunaDefend, you will only need to specify:
```js
module.exports = {
    production: {
        applicationFrontEnd: "<deployed application's front end url>",
        applicationBackEnd: "<deployed application's back end url>"
    }
}
```

For additional configuration options, please refer to [CLI Configuration](/pages/lunadefend/cli-config/interfaces/DeploymentConfigOptions).

Once the stack is built, the generated AWS Cloudformation template will be present at `~/.lunasec/builds/build_<time of build>`.
