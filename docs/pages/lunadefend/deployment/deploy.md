---
id: "deploy-with-aws"
title: "Deploy with AWS"
sidebar_label: "Deploy with AWS"
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
<!-- ## Deploy with AWS -->
:::info
Currently, LunaDefend is designed to run on AWS. It may be possible (but non-trivial) to adapt LunaDefend to other providers.
If you and your organization are interested in a cloud provider being natively supported, contact us.  
:::
In order to deploy LunaDefend into your infrastructure, you are going to need two things:

1. AWS credentials with permissions to deploy resources via Cloud Formation
2. The LunaDefend CLI tool

The CLI can be installed via NPM, as described in the [getting started guide](/pages/lunadefend/getting-started/dedicated-tokenizer/introduction/#cli). 

The LunaDefend CLI tool needs a configuration file which reflects your infrastructure. To do this, create the file (or add to your existing) `lunadefend.js`
and put this as its contents:
```js
module.exports = {
    development: {
        // ...
    },
    production: {
        applicationFrontEnd: "<deployed application's front end url>",
        applicationBackEnd: "<deployed application's back end url>"
    }
}
```

The LunaDefend stack will need to know the URL's of both your deployed front end and back end in order to function correctly.

Docker will need credentials to login to your AWS account's ECR registry, to do this run the following:

```shell
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account id>.dkr.ecr.<region>.amazonaws.com
```

And finally to deploy all required LunaDefend resources to your AWS account, run:
```shell
lunasec deploy
```

Let's find the URL that the tokenizer is deployed to:
```shell
$ lunasec resources
Tokenizer URL: https://<gateway id>.execute-api.us-west-2.amazonaws.com/prod/
...
```

This URL will be used when configuring LunaDefend in your backend application:

```typescript
export const lunaSec = new LunaSec({
  tokenizerURL: "https://<gateway id>.execute-api.us-west-2.amazonaws.com/prod/",
  ...
});
```

Once you have done this and performed the required integration steps for your front end and back end applications, your data will be secured in production.
