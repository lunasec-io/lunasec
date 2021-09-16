---
id: "deploy-with-aws"
title: "Deploy with AWS"
sidebar_label: "Deploy with AWS"
sidebar_position: 1
---

# Deploy with AWS

Currently, LunaSec only supports deploying to AWS. However, LunaSec is designed to easily support other cloud providers.
If you and your organization are interested in a cloud provider being supported, contact us, and we can help you out.

In order to deploy LunaSec into your infrastructure, you are going to need two things:

1. AWS credentials with permissions to deploy resources via Cloud Formation
2. The LunaSec CLI tool

You can get the latest LunaSec CLI tool by going to the [releases page](https://github.com/lunasec-io/lunasec-monorepo/releases)
and downloading the CLI tool for your system.

Let's create a folder where we will manage our LunaSec deployment. It is important to note that this folder will contain
the deployment state of all LunaSec resources the files should be backed up.
```shell
mkdir lunasec_deployment
cd lunasec_deployment
```

The LunaSec CLI tool needs a configuration file which reflects your infrastructure. To do this, create the file `config.yaml`
and put this as its contents:
```shell
lunasec:
  stack_version: 0.0.1-alpha.10
  application_front_end: <URL to your application's front end'>
  application_back_end: <URL to your application's back end'>
```

And finally to deploy all required LunaSec resources to your AWS account, run:
```shell
lunasec --dir state --build
```

TODO add command out
This command will generate a URL which needs to be provided to your back end application as the environment variable: TOKENIZER_URL.

Once you have done this and performed the required integration steps for your front end and back end applications, you
will be ready to start protecting your data with LunaSec!