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
# Deploy with AWS
:::info
Currently, LunaSec is designed to run on AWS. It may be possible (but non-trivial) to adapt LunaSec to other providers.
If you and your organization are interested in a cloud provider being natively supported, contact us.  
:::
In order to deploy LunaSec into your infrastructure, you are going to need two things:

1. AWS credentials with permissions to deploy resources via Cloud Formation
2. The LunaSec CLI tool

The CLI can be installed via NPM or binary, as described in the [getting started guide](/pages/getting-started/dedicated-tokenizer/introduction/#cli). 

Now let's create a folder where we will manage our LunaSec deployment. It is important to note that this folder will contain
the deployment state of all LunaSec resources.  These files should be committed to revision control.
```shell
mkdir lunasec_deployment
cd lunasec_deployment
```

The LunaSec CLI tool needs a configuration file which reflects your infrastructure. To do this, create the file `config.yaml`
and put this as its contents:
```shell
lunasec:
  stack_version: 1.0.3
  application_front_end: <URL to your application's front end'>
  application_back_end: <URL to your application's back end'>
```

And finally to deploy all required LunaSec resources to your AWS account, run:
```shell
lunasec deploy
```

This command will create the file `aws_resources.yaml`. This file will contain the ARNs for the resources that have been deployed to AWS.

Among the resources in the file will be a URL which points to the Tokenizer Backend:

```yaml
tokenizer:
  gateway_endpoint: https://<gateway_id>.execute-api.us-west-2.amazonaws.com/prod/
```

This URL will be used when configuring Lunasec in your backend application:

```typescript
export const lunaSec = new LunaSec({
  tokenizerURL: "<tokenizer backend url>",
  ...
});
```

Once you have done this and performed the required integration steps for your front end and back end applications, your data will be secured in production.