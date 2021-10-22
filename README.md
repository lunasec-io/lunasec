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
# LunaSec 
LunaSec is a suite of security tools designed to protect sensitive data in applications by only adding a few lines of code.

LunaSec was built by Security Engineers and is designed to be easy to use for anybody. You don't need to understand security to get started.

The LunaSec stack spans from the front-end to the back-end of your application and works alongside your existing code to keep your data encrypted and secure. To get started, please check out the steps below ("Trying LunaSec in 1 minute").

If you're a company looking for security expertise, we also offer paid, professional support for LunaSec. Just send us a message [here](https://www.lunasec.io/contact) and we'll be happy to work with you to help you level up your security!

## How does it work?
LunaSec is a bit like a [safety deposity box](https://en.wikipedia.org/wiki/Safe_deposit_box) that holds your sensitive data. Each piece of data gets it's own box, it's own key to unlock it, and a unique number to identify each box by. These boxes are then securely stored deep inside within a bank vault that only a banker with special permissions has access to. Accessing the box requires proof of ownership and the key to unlock the box. 

The boxes that the data is stored in are unable to be opened without the key. That means that even if the bank is evil, they can't open the box. Even if the box is stolen by a theif, the theif can't open the box without the keys. Only you are able to open the box.

Even if a theif steals the keys, they still have to get access the box either through the banker or by breaking into the bank. One is useless without the other.

That's the core value that LunaSec provides for you. LunaSec runs the bank, hires the bankers, and keeps your boxes secure. You just have to provide the data and keep track of the keys to access it.

## Okay, but what is LunaSec _really_?
LunaSec is a dedicated database, several back-end services, front-end and back-end SDKs, a CLI for manually accessing data, and a tool that deploys the LunaSec stack into your infrastructure. See the diagram below for context. We've documented the components of the stack [here](https://www.lunasec.io/docs/pages/overview/features/).

We've designed LunaSec to mitigate many common security vulnerabilities that developers face. Each component of the LunaSec stack is designed to provide protection against specific attack scenarios. Please read more about the security of LunaSec [here](https://www.lunasec.io/docs/pages/overview/security/levels/).

### LunaSec Components
![LunaSec Architecture Diagram](https://www.lunasec.io/docs/assets/images/security-model-overview-89b08cc6b46f3f86fc981b9ddf30e567.svg)

## Trying LunaSec in 1 minute
We've made it very easy for you to get familiar with LunaSec by running our example app locally.

If you have Node and Docker installed, you can try it out with one command:

```
npx lunasec up
```

That will pull all of the Docker containers and start the LunaSec demo app on your computer. It's a simple web app that you can play with in your browser.

To see LunaSec in action, just sign up for a new account and then submit some fake data in the app. All data in the app is transparently encrypted and stored in the LunaSec database in the app (take a look at the elements on the page and the network requests for proof).

For a deeper dive into the Demo App, please see this [page](https://www.lunasec.io/docs/pages/overview/demo-app/walkthrough/) for a walkthrough of everything. All of the source code is available [here](https://github.com/lunasec-io/lunasec/tree/master/js/demo-apps/packages).

## [Documentation](https://www.lunasec.io/docs/)
For more information about LunaSec including tutorials, examples, and technical information, please visit
our [documentation](https://www.lunasec.io/docs/).  For marketing information, sales, or to get in touch, visit our website: [https://www.lunasec.io/](https://www.lunasec.io/).

The rest of this ReadMe explains how to work on LunaSec itself.  If you simply want to use LunaSec, please see the documentation.

## Professional Services
Backing LunaSec is a team of Security Engineers. We offer paid support, onboarding, and additional enterprise features for LunaSec. We're very flexible and happy to work with you to reach your security or compliance milestones. If you're interested, please send us a message [here](https://www.lunasec.io/contact). Thank you!

## What's in this Repo?
This repo contains all public LunaSec code: the LunaSec SDKs, backend services, demo applications, documentation, and supporting scripts.

# MonoRepo Folder Structure
We have split code first by language, and then by purpose.

Our backend services and CLI tools are all written in Golang and live in `/go`.

Our web components and NPM modules are all written in TypeScript and live in `/js/sdks/packages`.

Our Demo Apps are also written in typescript and live in `/js/demo-apps/packages`.

Docs live in `docs`, and the OpenAPI Spec for our internal REST API lives in `api-spec`.

### Demo Apps
Path: `/js/demo-apps/packages`

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
inside of the `build` folder like: `./build/tokenizerbackend_dev`.

# Contributing
Please read our [contributor instructions](https://github.com/lunasec-io/lunasec-monorepo/blob/master/CONTRIBUTING.md)
before forking and submitting a pull request.  It's short and it's very helpful if you're going to be working on LunaSec.

## How to launch LunaSec for development
To launch and use LunaSec to help you develop your application, see the documentation.  To work on LunaSec itself, follow these steps:

Install all dependencies by running `lerna bootstrap` and being patient.

Then, install `tmuxp` and run `tmuxp load ./start-with-tmuxp.yaml` in the root directory. 
You can inspect that file to see what commands are all being run if you'd like to start the cluster without tmuxp.

_Note: You'll have to provide your password for the `sudo docker-compose` command to start._

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

## Feedback
Our goal is to build a sustainable business to support LunaSec and finding the right balance to enable us to build a
community while also enabling our business is our primary motivation. If you have thoughts on how we can improve our
approach, we would love to hear from you.

Please send us an email at developer-feedback at lunasec dot io *or* file an issue on this repository.

## Release Process
The release process will be handled automatically by our CI/CD system.   

Under the hood, the release process is split up into four parts:
1. Version bump
1. Compile artifacts
1. Publish artifacts
1. Push version tag to repository

Breaking this process up ensures that every part completes without error before moving onto the next step. This greatly reduces the event that some artifacts get published and others do not, leading to a headache of a time debugging a release.

Deployment of the releases is done by Github Actions.
## Version
Versioning for releases is done by lerna.
## Compile
Since the monorepo has both go and node code, compilation happens in multiple places. For the node sdks, every package has their own compilation package.json script which gets run. The entrypoint which calls into each package’s script is here. For the go code, all compilation code exists within the Makefile under the release target.
## Publish
For node artifacts, everything is handled by lerna. For go, publishing is handled by the publish target of the Makefile. Artifacts end up in NPM, DockerHub, and Github.
## Push
The version tag that gets pushed contains the version changes for the bumped monorepo version. Here is an example commit.
