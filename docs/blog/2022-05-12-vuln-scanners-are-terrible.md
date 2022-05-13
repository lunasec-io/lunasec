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
---
title: "Vulnerability Scanners are Terrible"
description: The issue with vulnerability scanning and what we think we can do about it
slug: the-issue-with-vuln-scanners
date: 2022-05-12
keywords: [vulnerability-scanning, snyk, grype, tidelift]
tags: [vulnerability-scanning, snyk, grype, tidelift]
authors: [forrest]
---

And why we think we can do better.
## False Positives Everywhere
As a web developer, I've learned to ignore vulnerability scan results. And that's a **big** problem. Because it only takes one.

Most of the results just aren't
*relevant*. When I actually bother to go through them, sometimes it's easy to figure out what it's safe to ignore.
Other times, it can be a massive amount of research and head-scratching to figure out how relevant the result is. After all, vulnerabilities are
usually complex, accidental, messy things. Rarely, in the end, do I have a real vulnerability to deal with.

<!--truncate-->

Sifting through the list of false positives, looking
for the slim possibility of an actually impactful vulnerability isn't how any of us want to spend our time. I always assumed
that there was no better way. Computers just aren't smart enough to eliminate that tedious job. At LunaSec,
we've been taking on that work for a few select companies, and taking notes.

We figured out something a little mind-blowing.

## Existing scanners are completely half-*ssed

Vulnerabilities are usually tied to a library or a package, at least the ones that end up in an official database and show up in your scan report.
Typically, the CPEs (packages) that are vulnerable are written right into the CVE (the official vulnerability notice).

So, the scanners check if you have that package or not, and they notify you if you do.  Full stop. The rest is up to you
to figure out if you're vulnerable, and as mentioned above, you usually aren't, for any number of reasons that we get into below.

We wrote these reasons down, again and again, and in the end realized that the vast majority of these false positives fell into one of a few categories.
Many of them could be eliminated by relatively simple code.

For the most part, we aren't talking about advanced heuristics and static-analysis.
We're talking about simple, yes or no checks. If the CVEs contained more structured information and if the scanners were smarter and knew what to
look for, they *could* do it. And save thousands of developers countless hours of drudgery.

## Common scenarios

Here are some common reasons a vulnerable package might not matter:

### Transitive dependency eliminates vulnerability
Most dependencies installed in our projects aren't direct dependencies that we've asked for at the top level. Most are the dependencies of those dependencies, and so on.
They're deeper in the tree. Since this is where most dependencies are, this is where most vulnerabilities occur as well.

Often the relationship of a vulnerable package with its parent means that we aren't going to care about the vulnerability.
Maybe the parent package doesn't call the vulnerable code or pass in the un-sanitized input needed to trigger it. Other times,
you can tell that you just don't care because of the part of the tree included it. Regexp Denial of Service vulnerability in a sub-dependency of my testing
library? I don't care! Why are you showing me?!

Take [this vulnerability](https://nvd.nist.gov/vuln/detail/CVE-2021-24033)
in one of React's utilities from just a few days ago:

![screenshot of vulnerability description showing that most users arent vulnerable because of react-scripts usage](/img/react-vuln.png)

The critical information most people need is there in the CVE description for you to read, but it's not machine-readable.

### Language version or operating system not vulnerable
Often, especially with languages like Java, a vulnerability will only matter for some versions of the language.  We have seen plenty 
of vulnerabilities only relevant to apps running on Java 9 or higher. With something like two-thirds of everyone still using Java 8,
we can skip blasting out those vulnerabilities two-thirds of the time! 

The same goes for operating systems. We have seen vulnerabilities only exploitable on OSX, while next-to-nobody is using OSX
for production hosting.

### Vulnerable function not called
Sometimes you'll have a vulnerable library installed, (or one of your dependencies has it installed) but the vulnerable function
isn't being used.  This one is a little harder to search for, but thanks to tools like [Semgrep](https://semgrep.dev/), it's easier than you'd think.

## Capturing these common scenarios

We need to come up with a machine-readable way to capture the above information, before we can scan for it.
We want to make a schema that is complete enough to capture the above relatively simple scenarios. Think of this like a bigger, smarter 
CVE. 

It's only useful if you have the data, of course. We've seen that there *is* a community to help populate this information. 
We more-or-less owned the early discourse around Log4Shell and some other high-profile vulnerabilities, and we saw just how eager 
people were to submit details and provide information. A structured format in a central repository would have made things much easier.

For now, we're thinking of simple Yaml in a GitHub repository to capture the highest-severity vulnerabilities. [Here's](https://github.com/lunasec-io/lunasec/blob/master/guides/LUNATOPIC-20220422-1-TEST-TOPIC/metadata.yaml) our early take
at codifying Log4Shell. 

## Building a graph of ALL dependencies
That's right, all of them. We think. 

We're in the process of cloning *every* NPM and Maven package. Having more information about all dependencies is going to be massively useful.
We will be able to graph out the relationships between dependencies and begin to build in false-positive elimination information that we need.
We could, for instance, ban all denial-of-service type vulnerabilities that occur in sub-dependencies of popular testing frameworks, such as Jest.

It also enables a lot of other exciting security ideas around supply-chain security, such as hosting repository mirrors (like artifactory), 
detecting and even preempting dependency hijacking, and license scanning.  The sky is the limit here, but as far as scanning goes,
we mainly just need nodes in the graph that we can pin data to.

## Building a more contextually-aware scanner

All of these scenarios have one thing in common, and it's that they require more context. Being able to scan full source-code is already a step up
from just scanning a package inventory like a manifest or [SBOM](https://www.ntia.gov/SBOM).  The best case scenario, though, is scanning an entire system, and that means scanning docker containers.  

When you scan a container you get the full system context including what language version is installed, what system packages, what linux distribution, and so on.
At the moment, we've written a CLI that can scan and upload data about built containers (or any file or folder) from a CI job, but eventually
we would like to host a container repository (think DockerHub) where people can push their containers to be scanned. 

## What we have done so far
We have a dependency scanning tool called [LunaTrace](https://lunatrace.lunasec.io/) currently in beta that you can try out.  It has GitHub integration, 
CLI support to integrate with your CI job, and you can even drag and drop a file, folder, or zipped container right into the web page and get instant results. 

The groundwork is there to start doing the false-positive elimination strategies we've discussed. For whatever reason, existing solutions 
have left this job on the table and we are hoping to take it up.
We plan to start with the lowest hanging fruit and work our way up to a very quiet tool that only asks for a human when one is truly needed. 

Perhaps we are being overly optimistic, and we can maybe only eliminate half or two thirds of the false positives. Even so, that seems 
like a tool we'd prefer to use.

