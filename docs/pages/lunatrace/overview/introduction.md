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

LunaTrace connects to GitHub repositories. It automatically scans PRs and the main branch.

### What languages are supported

Many languages are supported, however most advanced features only support JavaScript at the moment. Enhanced 
dependency tree information, false positive elimination, and static analysis are currently JavaScript-only in 
our custom engine. You will see this when enhanced analysis is enabled:

![enhanced analysis enabled](/img/enhanced-tree-data-icon.png)

For other languages, LunaTrace is still able to list vulnerabilities at a level more comparable to 
other 
vulnerability scanners.

### What it outputs

LunaTrace shows detected vulnerabilities in your
project's dependencies in a clean, fast interface.  It eliminates all the
vulnerabilities it that can, based on situational information passed and our powerful analysis engine. It lets you
know if this vulnerability is only in your `dev` dependencies, why the vulnerable package was included, and other 
information you need to make a quick decision about the vulnerability.

![a sample vuln](/img/vuln-result-hover.png)

Vulnerable packages are shown with enhanced information about the dependency tree when available.

![tree data display](/img/tree.png)


LunaTrace also let's you know if a vulnerable package can be 
trivially updated to a non-vulnerable version.

![updatable](/img/trivially-updatable.png)


It can also produce official reports like SBOMs which may be required by enterprise customers or
government regulators. If using the GitHub integration, it can automatically comment detected issues directly on your Pull Requests.

### How to add it to your workflow
 By installing
the GitHub application your projects can automatically be scanned during pull requests and during commits to the main
branch. LunaTrace can comment directly on pull requests if any issues are found. The web app will walk you through 
 this process.  It takes about a minute to get up and running. Don't hesitate to [give it a try](https://lunatrace.lunasec.io).

[//]: # (The second way to integrate LunaTrace is with the [LunaTrace CLI]&#40;https://github.com/lunasec-io/lunasec/releases&#41;. By adding this CLI to your CI scripts, you get more)

[//]: # (fine-grain control and additional capability, such as the ability to scan built artifacts such as containers, and built)

[//]: # (files that wouldn't usually be committed to git. Scanning a container gives LunaTrace the most complete picture possible of your code and how it is being run. Simply go to "Secrets and Keys" in your project on LunaTrace and follow the instructions to pass the secret into the CLI. )

### Roadmap
Lunatrace is built on an open source foundation, and we are rapidly adding features to make LunaTrace a complete
supply chain control center. Features such as:
* Much better false-positive elimination / quieter reports. Read [our blog post](/docs/blog/the-issue-with-vuln-scanners/) about this.
* Enhanced support for more languages. Python is probably the next language we will build tree-analysis for.
* VEX in addition to SBOM support
* License Checking
* Live Instance Tracking

are right around the corner.
