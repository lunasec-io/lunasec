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
### Services
Before we start changing code, let's get LunaSec's services running. The main dependencies we need are:
* Dedicated Tokenizer Backend
* AWS (preferably running locally using LocalStack)

We have containerized these and written a docker compose to make launching them easy.  Clone the LunaSec repository and run:

```shell
yarn start:services
```

Soon these images will be in dockerhub and cloning the repository will no longer be necessary, it will all be handled by the CLI.  

### CLI
The LunaSec CLI makes development, testing, and deployment easier. 

The CLI is available as an NPM module. Add it to your `package.json`:

`yarn add @lunasec/cli --dev`

or

`npm install @lunasec/cli --save-dev`

Make sure the CLI stays at the same version as the `@lunasec` packages we install in this guide. 

:::tip
You can also install the CLI package globally with `yarn global add @lunasec/cli` to make manual commands easier - it will automatically use the locally installed copy if you are in your app folder. Call `lunasec --version` to try it out.
:::
The CLI is also available as a binary from the GitHub releases page if you would like to commit it to your repository directly.  Again, make sure the version stays consistent.


Now that the services are running, let's add LunaSec to the code. [Backend setup](./backend.md)