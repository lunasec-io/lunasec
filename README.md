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
LunaSec makes it easy and secure for applications to process and store sensitive data through Tokenization.

## [Documentation](https://www.lunasec.io/docs/)
For information about LunaSec including tutorials, examples, and technical information, please visit
our [documentation](https://www.lunasec.io/docs/).  For marketing information, sales, or to get in touch, visit our website: [https://www.lunasec.io/](https://www.lunasec.io/).

The rest of this ReadMe explains how to work on LunaSec itself.  If you simply want to use LunaSec, please see the documentation.

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
