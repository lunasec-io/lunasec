---
id: "introduction"
title: "Introduction"
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

## What is LunaTrace

LunaTrace is an Open Source supply chain security and auditing tool. At its heart is a web console the tracks your projects and
their dependencies, looking for vulnerabilities and other issues. This console is provided as a SAAS ([available here and
currently for free](https://lunatrace.lunasec.io)) or you can deploy it and manage it yourself. 

### What it scans

LunaTrace can scan a variety of artifacts, such as project folders, zip files, and built artifacts such as Jar files and
docker containers. It identifies the dependencies used by projects written in a wide variety of languages.

### What it outputs

LunaTrace shows detected vulnerabilities in your projects dependencies in a clean, fast interface. 
It can also produce official reports like SBOMs which may be required by enterprise customers or
government regulators. If using the GitHub integration, it can automatically comment detected issues directly on your Pull Requests.

### How to add it to your workflow
There are two main ways to add LunaTrace to your projects. 

The first and easiest is GitHub integration. By installing
the GitHub application your projects can automatically be scanned during pull requests and during commits to the main
branch. LunaTrace can comment directly on pull requests if any issues are found. The [web app](https://lunatrace.lunasec.io) will walk you through this process.  It takes about a minute to get up and running.

The second way to integrate LunaTrace is with the [LunaTrace CLI](https://github.com/lunasec-io/lunasec/releases). By adding this CLI to your CI scripts, you get more
fine-grain control and additional capability, such as the ability to scan built artifacts such as containers, and built
files that wouldn't usually be committed to git. Scanning a container gives LunaTrace the most complete picture possible of your code and how it is being run. Simply go to "Secrets and Keys" in your project on LunaTrace and follow the instructions to pass the secret into the CLI. 

### Roadmap
Lunatrace is built on an open source foundation, and we are rapidly adding features to make LunaTrace a complete
supply chain control center. Features such as:
* Much better false-positive elimination / quieter reports3
* VEX in addition to SBOM support
* License Checking
* Live Instance Tracking

are right around the corner.
