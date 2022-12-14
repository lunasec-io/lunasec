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


<p align="center">
  <img src='docs/static/img/logo-black-text.svg' width='60%'>
</p>

# LunaTrace

LunaTrace is an Open Source supply chain security and auditing tool. At its heart is a web console the tracks your projects and their dependencies, looking for vulnerabilities and other issues. This console is provided as a SAAS ([available here for free](https://lunatrace.lunasec.io/)) or you can deploy it and manage it yourself.

Please see our [LunaTrace documentation](https://www.lunasec.io/docs/pages/lunatrace/overview/introduction/) for more information.

## Short Introduction Video

<p align="center">
  <a href="https://www.youtube.com/watch?v=ugdSyR2L6sY">
    <img alt="LunaTrace Introduction Video" src="https://img.youtube.com/vi/ugdSyR2L6sY/maxresdefault.jpg" width="70%">
  </a>
</p>

## Repo Structure

We're a team of Security Engineers on a mission to make awesome Open Source Application Security tooling. It all lives
in this monorepo and here's a breakdown of where everything we've built lives.

- **[LunaTrace](./lunatrace)**: A free alternative to services like GitHub Dependabot or [Snyk](https://snyk.io) that 
automatically monitors for your dependencies for vulnerabilities. It automatically integrates with GitHub Pull Requests
to notify you of new CVEs _before_ you deploy to production. Try it out in one-click via our [GitHub App](https://github.com/apps/lunatrace-by-lunasec/). 
    - **Status**: Production ready and under active development (our primary focus).
- **[Log4Shell CLI](./tools/log4shell)**: A small command line utility to scan for Log4Shell. Also supports patching JAR files against
  Log4Shell, scanning running processes on your system, and more. Follow our
  [Mitigation Guide](https://www.lunasec.io/docs/blog/log4j-zero-day-mitigation-guide/) for more context.
    - **Status**: Production ready and used by thousands of companies. Superseded by LunaTrace.
- **[Our Security Blog](https://www.lunasec.io/docs/blog/)**: Our ramblings to the internet. This is where we broke the news about the log4j vulnerability and gave it the name [Log4Shell](https://www.lunasec.io/docs/blog/tags/log-4-shell).  The blog lives in this repo under `/docs/blog` if you feel 
 like contributing!
    - **Status**: Continuously updated and any requests for us to write about topics is encouraged.
- **[LunaDefend](./lunadefend)**: An end-to-end suite of security software built 
 around Tokenization designed to _proactively_ protect your sensitive data from being hacked, as well as providing an 
 easier path towards compliance (SOC2, GDPR, PCI-DSS, etc).
    - **Status**: Unmaintained (but feel free to open issues).

## Support

If you find yourself stuck, you're missing a feature, or you just want to clear up some confusion, then please
[join our Discord Community](https://discord.gg/2EbHdAR5w7) to speak with us.

We're a small team and we're always looking for more feedback about what problems we can help solve, so we'd love if you took a moment to [try out LunaTrace](https://lunatrace.lunasec.io) and, if you like it, share it with your colleagues and friends. The hardest part of our mission to build better security tools is simply getting people to realize that they exist!

## Contributing
We welcome community contributions and we've documented the requirements for contributions [here](CONTRIBUTING.md).

If you'd like to contribute ideas or feedback, you can do so by either [opening a GitHub issue](https://github.com/lunasec-io/lunasec/issues/new) or [speaking with us on Discord](https://discord.gg/2EbHdAR5w7).

## See Also

For more information about LunaSec including tutorials, examples, and technical information, please visit
our [documentation](https://www.lunasec.io/docs/).  
For marketing information, sales, or to get in touch, visit our website: [https://www.lunasec.io/](https://www.lunasec.io/).

The rest of this ReadMe explains how to work on LunaSec itself.  If you simply want to use LunaSec, please see the documentation.

# Contributing
Please read our [contributor instructions](https://github.com/lunasec-io/lunasec-monorepo/blob/master/CONTRIBUTING.md)
before forking and submitting a pull request.  It's short and it's very helpful if you're going to be working on LunaSec.

## Feedback
Our goal is to create a sustainable business to support LunaSec, while also building an Open Source community. If you have thoughts on how we can improve our
approach, we would love to hear from you.

Please email us at `developer-feedback at lunasec dot io` *or* file an issue on this repository.

## Release Process
The release process will be handled automatically by our CI/CD system.   

Under the hood, the release process is split up into four parts:
1. Version bump
1. Compile artifacts
1. Publish artifacts
1. Push version tag to repository

Breaking this process up ensures that every part completes without error before moving onto the next step. This greatly reduces the event that some artifacts get published and others do not, leading to a headache of a time debugging a release.

Deployment of the releases is done by GitHub Actions.
## Version
Versioning for releases is done by lerna.
## Compile
Since the monorepo has both go and node code, compilation happens in multiple places. For the node sdks, every package has their own compilation package.json script which gets run. The entrypoint which calls into each package’s script is here. For the go code, all compilation code exists within the Makefile under the release target.
## Publish
For node artifacts, everything is handled by lerna. For go, publishing is handled by the publish target of the Makefile. Artifacts end up in NPM, DockerHub, and Github.
## Push
The version tag that gets pushed contains the version changes for the bumped monorepo version. Here is an example commit.
