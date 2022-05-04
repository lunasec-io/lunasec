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
## LunaDefend

LunaDefend is a suite of security tools designed to protect sensitive data in web applications by adding just a few
lines of code.

_This section on LunaDefend is moving into its own folder, as soon as we finish reorganizing everything into folders._

- [What is LunaDefend?](#what-is-lunadefend)
- [Live Demo](#live-demo)
- [Documentation](https://www.lunasec.io/docs/)
- [System Architecture](#system-architecture)
- [Who is LunaSec for?](#who-is-lunasec-for)
- [How does LunaSec work?](#how-does-lunasec-work)
- [Custom Support from the LunaSec Team](#custom-support-from-the-lunasec-team)
- [Deploying LunaSec](#deploying-lunasec)
- [Need Help?](#need-help)
- [Contributing](#contributing)
- [See Also](#see-also)

## What is LunaDefend?

LunaDefend is an end-to-end security system designed to protect your application by transparently encrypting sensitive
data, from browser to database. It works seamlessly by storing your sensitive data and then giving you back a Token (a UUID) to retrieve data with
later. LunaDefend builds on that concept to offer many security and compliance features.

### Features

- **Secure By Default**: Prevents data leaks by making your software resistant
  to [many security issues](https://www.lunasec.io/docs/pages/lunadefend/overview/security/vulns-and-mitigations/) like SQL
  Injection, XSS, and even RCE.
- **Best-In-Class Compliance Software**: Decrease your compliance overhead by 90%+ with centralized *access control
  logic*, *audit logs*, and *automatic compliance validation*.
- **Simple Onboarding**: [Get started in minutes](https://www.lunasec.io/docs/pages/lunadefend/overview/example-usage/) by adding *
  only a few lines of code* anywhere that sensitive data enters or exits your system.
- **Built By Security Experts**: Designed to bring leading security practices to your applications *without requiring
  advanced security knowledge*.
- **Self-Hosted And Open**: You retain control over your data by hosting LunaSec yourself. It's open source software
  licensed under a permissive Apache2.0 license.
- **Zero Trust Architecture**: All records
  are [encrypted with a unique key](https://www.lunasec.io/docs/pages/lunadefend/overview/security/encryption/) that even LunaSec
  can't access. Decryption only happens when you need it to.
- **Scales Automatically**: Supports even the largest loads by leveraging cloud-scale database services like AWS S3 and
  DynamoDB.
- **Enterprise Grade**: We offer warranties, managed deployments, and custom support via
  our [Premium Support packages](#custom-support-from-the-lunasec-team).

You can read more [here](https://www.lunasec.io/docs/pages/lunadefend/overview/features/) about what features LunaSec provides.

## Live Demo

[Try the live demo.](https://app.lunasec.dev/) It's a simple web app that you
can play with in your browser. Sign up for a new account and then submit some fake data in the secure inputs.
Right-click and inspect secure elements on the page and watch network traffic to see LunaDefend working
behind-the-scenes to protect private data.

Alternatively, you may also launch it locally with one command **if you have Node and Docker installed**:

```
npx @lunasec/cli start --env demo
```

That will pull all the Docker containers and start the LunaDefend demo app on your computer.  There are a lot of
containers to run, so it may take a few minutes to finish starting up.

For a deeper dive into the Demo App, please see
this [page](https://www.lunasec.io/docs/pages/lunadefend/overview/demo-app/walkthrough/) for a walkthrough of everything. All the
source code is available [here](https://github.com/lunasec-io/lunasec/tree/master/lunadefend/js/demo-apps/packages) for you to
view.

If you run into any issues, please open up a GitHub issue or chat with us on
our [GitHub Discussions page](https://github.com/lunasec-io/lunasec/discussions).

## [Documentation](https://www.lunasec.io/docs/)

For more information about LunaSec including tutorials, examples, and technical information, please review
our [documentation](https://www.lunasec.io/docs/). For technical questions or help, please reach out via
our [GitHub Discussions board](https://github.com/lunasec-io/lunasec/discussions)
or open a new GitHub issue if you have a bug or feature to request.

Please visit our [website](https://www.lunasec.io/) for marketing or sales information, or
to [get in contact](https://www.lunasec.io/contact).

## System Architecture
LunaSec works across the components of your web stack to provide end-to-end data security.
We've documented the components of the stack [here](https://www.lunasec.io/docs/pages/lunadefend/overview/features/) and in the diagram below.

![LunaSec Architecture Diagram](docs/static/img/security-model-overview.svg)

## Who is LunaDefend for?
LunaDefend is designed to be used by anyone that needs to collect and store sensitive text or files in a production web
application.
Despite being built by Security Engineers, **LunaDefend does not require security expertise to get started**.
It's designed to be used by ordinary Software Engineers and Developers.

Reasons to use LunaSec:
- **Security & Data Privacy Compliance**: [GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation) defines sensitive data include
  Name, Email, Phone Number, IP Address, Credit Cards, and [more](https://www.gdpreu.org/the-regulation/key-concepts/personal-data/#Examples_of_Personal_Information).
  If you are subject to data privacy regulations and store any of that data, then LunaDefend will help you achieve compliance more easily.
- **Data Leak Protection**: If you store data that needs to remain securely stored and private, then LunaSec will greatly
  increase your defenses against unauthorized data leaks.
- **Data Inventory**: The centralized nature of LunaDefend makes it easy to track and monitor what data you're storing,
  who and when it's used, and help you enforce access controls around that data.

The LunaSec stack spans from the front-end to the back-end of your application and works alongside your existing code to
keep your data encrypted and secure. To get started, please check out the steps below
(["Trying LunaDefend in 1 minute"](#trying-lunadefend-in-1-minute)).

## How does LunaDefend work?
LunaDefend is similar to a [safety deposit box](https://en.wikipedia.org/wiki/Safe_deposit_box) that holds your sensitive data.
Each piece of data gets a unique box, a unique key to unlock it, and a unique number to identify each box by. These
boxes are then securely stored inside a bank vault that only a banker with special permissions has access to.
Accessing the box requires proof of ownership and the key to unlock the box.

The boxes that the data is stored in are unable to be opened without the key. That means that even if the bank is evil,
they can't open the box. Even if the box is stolen by a thief, the thief can't open the box without the keys. Only you
are able to open the box.

Even if a thief steals the keys, they still have to get access the box either through the banker or by breaking into the
bank. One is useless without the other.

That's the core value that LunaSec provides for you. LunaSec runs the bank, hires the bankers, and keeps your boxes
secure. You just have to provide the data and keep track of the keys to access it.

We've designed LunaDefend to mitigate many common security vulnerabilities that developers face. Each component of the
LunaDefend stack is designed to provide protection against specific attack scenarios. Please read more about the security
of LunaDefend [here](https://www.lunasec.io/docs/pages/lunadefend/overview/security/levels/).

## Deploying LunaDefend 
LunaDefend is _self hosted_. In order to use LunaDefend in your production environment, you will need to host a copy yourself. We built a
deployment CLI tool to make this easy. Currently, LunaSec only deploys to AWS. LunaSec will work with an app that is hosted on other platforms, you just need to have an AWS account for LunaSec to deploy to.

To get started deploying LunaDefend, please see our docs [here](https://www.lunasec.io/docs/pages/lunadefend/deployment/deploy-with-aws/).

## Where LunaDefend lives in the Repo

This repo is a little slice-and-dice until we finish moving LunaDefend into a dedicated folder.
Currently, the root folder contains all public LunaDefend code: the LunaDefend SDKs, backend services, demo 
applications, documentation, and supporting scripts.

Eventually everything will move to `/lunadefend` and a PR is open to track that effort 
[here](https://github.com/lunasec-io/lunasec/pull/470).

# MonoRepo Folder Structure
We have split LunaDefend's code first by language, and then by purpose.

Our backend services and CLI tools are all written in Golang and live in `/go`.

Our web components and NPM modules are all written in TypeScript and live in `/js/sdks/packages`.

Our Demo Apps are also written in typescript and live in `/lunadefend/js/demo-apps/packages`.

Docs live in `docs`, and the OpenAPI Spec for our internal REST API lives in `api-spec`.

### Demo Apps
Path: `/lunadefend/js/demo-apps/packages`

Demo apps that use our toolkit for testing and demonstration.  The react-app and node-app are the one's currently being developed.
These are our only SDK supported frameworks currently.

### TypeScript/JavaScript SDKs
Path: `/js/sdks/packages`

Contains front and backend SDKs.

They're all written in Typescript and outputs to a few different formats:
- ES5 build (polyfills ES2016 modules)
- ESNext build (uses ES2016 modules)
- Browser build (concatenated into one file that's loaded into browser global namespace)

### Secure Frame Front-End
Path: `/js/sdks/packages/secure-frame-iframe`

This holds the SDK frontend components which load into the iframe. The React SDK uses this to isolate sensitive data
from front-end apps by using the iframe as an isolated "sandbox". We've hardened this iFrame by adding a very strict
Content Security Policy (CSP) that limits the impact of any security issues by heavily restricting network access.

### Tokenizer, Secure Frame Back-End, and CLI
Path: `/go`

These are the back-end components of the LunaSec stack. They share a common codebase and are built into separate binaries
by the entrypoints defined in the `/go/cmd` folder, the most important being the `tokenizerbackend`.

You can build each entrypoint by using the Makefile like: `make tokenizerbackend` and then invoking the generated binary
inside the `build` folder like: `./build/tokenizerbackend_dev`.

## How to launch LunaDefend for development

_Note: We apologize if these steps are broken. We've made some changes to the package management recently._

To launch and use LunaDefend to help you develop your application, see the documentation.  To work on LunaDefend itself, follow these steps:

Install all dependencies by running `yarn`.

Configure the LunaSec CLI tool to be used locally by running `yarn run lunasec:setup`. The `lunasec` command will not be accessible on your path.

Then, install `tmuxp` and run `tmuxp load ./start-with-tmuxp.yaml` in the root directory.
You can inspect that file to see what commands are all being run if you'd like to start the cluster without tmuxp.

_Note: You'll have to provide your password for the `./go/scripts/start-tokenizerbackend-dependencies.sh` command to start._

Open your browser and navigate to `http://localhost:3000` to see the demo application.

When you want to shut down the cluster, hit `ctrl+b` and type `:kill-session`. (It's just tmux)

### Using the CLI to generate test data
A CLI has been written in go to enable the creation of test data. Build the cli via:
```shell
cd go
make tokenizer tag=cli
```

and use it by running
```shell
./build/tokenizer_cli COMMAND
```

### How to manage and install packages
We use Lerna to manage the monorepo, and we use yarn as the package manager.
Because yarn doesn't know about local packages like Lerna, we can't use `yarn add` to install dependencies.
To add a dependency to a package, either edit it manually into the `package.json` and run `lerna bootstrap`,
or use `lerna add <dependencyname> <path/to/package/youre/working/on>`.

## Our API spec and OpenAPI

Our Tokenizer API is defined by the OpenAPI standard (previously named Swagger) and can be found in the folder `/api-spec` in the project root.
If the spec changes, the generated code that relies on the spec will need to be regenerated.
For example, in the tokenizer-sdk package, run `yarn openapi:generate` to regenerate the API client.
A similar pattern can be used (check the package.json) to generate an api client in any language you wish,
by simply specifying the OpenAPI generator name when calling the `openapi-generator` NPM package .
