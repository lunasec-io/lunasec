---
id: "overview"
title: "Demo App Overview"
sidebar_label: "Overview and Startup"
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
# Demo Applications

The demo applications show how to integrate LunaSec into a modern web application.  The frontend uses React with MaterialUi
and the backend server demonstrates both Express and GraphQL.

![demo screenshot](/img/demo-app-homepage.png)

As you can see in the top right corner, the app can switch between several modes to test how LunaSec works with different systems.

## Running it
You can start the demo app on your machine easily using our CLI.  First make sure you have `docker`, `docker-compose`, and `node >= v14` installed.  

Then install it(and the aws CDK) and run the CLI
```shell
npm i -g @lunasec/cli cdk aws-cdk-local
lunasec start --env demo
``` 
Depending on your internet speed, this might take a minute.
Once done, the demo app should now be running at [http://localhost:3000](http://localhost:3000).  

Please see [Code Walkthrough](/pages/overview/demo-app/walkthrough) for an explanation of how the demo app code is structured.