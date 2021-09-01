# LunaSec Monorepo 
This project holds the LunaSec SDKs, servers, and demo application together in a monorepo. 

## Getting Started
For more information about LunaSec including tutorials, examples, and technical information, please visit
our [developer documentation](https://www.lunasec.io/docs/). 

## What is LunaSec?
LunaSec makes it easy and secure for applications to process and store sensitive data.

How is that achieved? At it's core LunaSec encrypts and replaces your sensitive data through a process 
known as "Tokenization". This process allows only the non-sensitive token to be passed through your 
application while the sensitive data is safely encrypted and stored by LunaSec. 

This process is reversible by passing a token to the LunaSec Tokenizer in a process called "Detokenization" and serves
as the "primitive" through which LunaSec adds additional layers of security.

By tightly controlling access to the Tokenizer, that is how LunaSec enables you to add security to your application.
LunaSec gives you the tools to restrict access to detokenize data in only specific, controlled contexts and it does so
without requiring you to rewrite your entire application from scratch.

LunaSec is not just a single library or service. LunaSec Stack provides libraries, services, and tools which build upon
the secure properties of tokenization to provide fine-grained control over _when, where, and how_ your sensitive data
is accessed.

LunaSec products are designed by Security Engineers to drop in to existing apps with minimal code changes. 
By reducing the work required to add LunaSec to your applications, it becomes trivial to prevent a single 
vulnerability from compromising your entire system.

## Example: Building an eCommerce App
Let's say you were building a website where you sold goods to users. A user would need to upload information like their 
home address, their credit card number, or (for age restricted products) a copy of their photo ID. 

By directly storing this information in your database, without any encryption, you put all of your customers at risk.
Any single security issue that results in your database being exposed is now, by default, exposing sensitive customer data.

Examples of possible security issues:
- An SQL injection attack,
- Misconfigured database access,
- Database backups are stolen,
- A malicious library is added,
- A vulnerability in the database, the operating system, or any other code you depend on,
- Any user with database access shares data (intentionally or unintentionally).

With Tokenization, you would mitigate these security issues by replacing a value in your database with a token
like this: `lunasec-351d1033-0e9f-4a1b-bbb6-adec04837a5c`. This is all an attacker would see. The data is meaningless.

Now, in order to gain access to the sensitive data, you must go through the "detokenization" flow. By default,
any individual security issue no longer directly "leaks" data. You must _also_ be able to call the Tokenizer.

But, you might ask, what about if an attacker just calls the Tokenizer directly? Isn't this all moot?

That's where the LunaSec Stack really shines: 
On the front end, cross-domain iFrames dubbed **Secure Frames** handle the creation and display of
sensitive field. Then, on the backend, sensitive data is handled inside of secure enclaves known as **Secure Resolvers** 
(these are hardened containers running without network access by default).

Okay, but what if the Tokenizer gets hacked? Isn't this _still_ all moot?

In order to answer that question, please go read through our [Security Documentation](https://www.lunasec.io/docs/pages/overview/security/introduction/).
(Spoiler: The Tokenizer can be completely hacked and still not leak data because detokenization requires tokens.)

We're a team of Security Engineers and we've spent months directly debating amongst ourselves (and working with early users)
to make this all possible. If this is exciting for you, please throw us a GitHub star and share your thoughts with us at
developer-feedback at lunasec dot io -- We'd love to hear from you!

## Try our Demo App
To run the demo application, you will need to install docker and make sure it works without root(rootless).  On OSX, simply install
docker for mac. 

For arch, install docker and docker-rootless-extras-bin from AUR and follow the setup instructions printed in the install log to enable rootless.

Then run this command from the project root directory to launch the entire system, including the demo app:

```shell
git clone git@github.com:lunasec-io/lunasec-monorepo.git
cd lunasec-monorepo
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose up -d
```

Once running, go to `http://localhost:3000` to use the demo application.

## Monorepo Components
All of our code lives in a handful of top level folders. We've split code up by language and purpose.

Our backend services and CLI tools are all written in Golang and live in the `go` folder.

Our web components and NPM modules are all written in TypeScript and live in the `js` folder.

Docs live in `docs`, and our OpenAPI Spec lives in `api-spec`.

### Demo Apps
Path: `/js/demo-apps/packages`

Demo apps that use our toolkit for testing and demonstration.  The react-app and node-app are the one's currently being developed.  These are our only SDK supported frameworks currently.

### TypeScript/JavaScript SDKs
Path: `/js/sdks`

Contains front and backend SDKs. 

`js-sdk` and `react-sdk` packages support different frontend frameworks, and get most of their business logic from the `common` module.  

It's all written in Typescript and outputs to a few different formats:
- ES5 build (polyfills ES2016 modules)
- ESNext build (uses ES2016 modules)
- Browser build (concatenated into one file that's loaded into browser global namespace)

### Secure Frame Front-End
Path: `/js/sdks/packages/secure-frame-iframe`

This holds the SDK frontend components which load into the iframe. The React SDK uses this to remove sensitive data 
from front-end apps by using the iframe as an isoalted "sandbox". We've hardened this component by adding a very strict 
Content Security Policy that limits the impact of any security issues by heavily restricting network access.
This component is only able to be loaded from an `<iframe>` context in order to prevent attacks from other websites.

### Tokenizer, Secure Frame Back-End, and CLI
Path: `/go`

These are the back-end components of the LunaSec stack. They share a common codebase and are built into separate binaries
by the entrypoints defined in the `/go/cmd` folder. 

You can build each entrypoint by using the Makefile like: `make secureframe` and then invoking the generated binary 
inside of the `build` folder like: `./build/secureframe_dev`.

# Contributing
Please review our [contributor document](https://github.com/lunasec-io/lunasec-monorepo/blob/master/CONTRIBUTING.md)
before submitting a pull request.

## How to launch the cluster and get the app running
To install all dependencies, run `lerna bootstrap`. 

Then, install `tmuxp` and run `tmuxp load ./start-with-tmuxp.yaml` in the root directory. 
You can inspect that file to see what commands are all being run if you'd like to start the cluster without tmuxp.

_Note: You'll have to provide your password for the `sudo docker-compose` command to start._

Open your browser and navigate to `http://localhost:3000`. 
When you first start the app click "login" which will set the cookie "id_token".

Your page will be refreshed, and then you can access the demo application.

When you want to shut down the cluster, hit `ctrl+b` and type `:kill-session`. (It's just tmux)

### Using the CLI to generate test data
A CLI has been written in go to enable the creation of test data. Build the cli via:
```shell
cd go
BUILT_TAG=cli make tokenizer
```

and use it by running 
```shell
./build/tokenizer_cli COMMAND
```

### How to manage and install packages
We use lerna to manage the monorepo, and yarn as the package manager.  Since yarn doesn't know about 
local packages like lerna, we can't use `yarn add` to install dependencies. To add a dependency to a
package, either edit it manually into the package.json and run `lerna bootstrap`, or use 
`lerna add <dependencyname> <path/to/package/youre/working/on>`.

## Our API spec and OpenAPI
Our tokenizer API is defined by the openAPI standard(previously named swagger) and can be found in the 
folder `/api-spec` in the project root. If the spec changes, the generated code that relies on the spec 
will need to be regenerated. For example, in the tokenizer-sdk package, run `yarn openapi:generate` 
to regenerate the API client. A similar pattern can be used (check the package.json) to generate an 
api client in any language you wish, by simply specifying the openapi generator name when calling the 
openapi-generator npm package.

## Feedback
Our goal is to build a sustainable business to support LunaSec and finding the right balance to enable us to build a
community while also enabling our business is our primary motivation. If you have thoughts on how we can improve our
approach, we would love to hear from you.

Please send us an email at developer-feedback at lunasec dot io
