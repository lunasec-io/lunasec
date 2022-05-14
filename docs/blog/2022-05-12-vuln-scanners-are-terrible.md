---
title: "Vulnerability Scanners are ..."
description: The issue with vulnerability scanning and what we think we can do about it
slug: the-issue-with-vuln-scanners
date: 2022-05-12
keywords: [vulnerability-scanning, snyk, grype, tidelift]
tags: [vulnerability-scanning, snyk, grype, tidelift]
authors: [forrest]
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

And why we think we can do better.
## False Positives Everywhere
As a web developer, I've learned to ignore vulnerability scan results and that's a **big** problem.

Most of the results aren't *relevant*. Sometimes I find it easy to figure out what's safe to ignore from the findings. Other times
I find myself scouring documentation, source code, and blog posts only to discover the "RCE" npm audit told me I had
requires someone to guess a random number from 1 to 1,000,000. Most impactful vulnerabilities require indepth knowledge 
of both your code and the library it exists in. I care about the vulnerabilities that can be trivially exploited by anyone
who might be looking at my site and poking it with their security stick.

<!--truncate-->

Sifting through the list of false positives, looking
for the slim possibility of an actually impactful vulnerability isn't how any of us want to spend our time. I always assumed
that there was no better way. The infrastructure just didn't exist to eliminate that tedious job. At LunaSec,
we've been taking on this type of work for a few select companies, and taking note.

When diving in deeper to this problem we realized something a little mind-blowing.

## Existing scanners don't have the data they need

Vulnerabilities are usually tied to a library or a package, at least the ones that end up in an official database and show up in your scan report.
Typically, the CPEs (packages) that are vulnerable are written right into the CVE (the official vulnerability notice).

*INSERT IMAGE OF CPE IN CVE*

In the current ecosystem vulnerability scanners check if your setup contains a flagged package and if so it will send some form of a notification. Full stop, that's it.
The rest is up to you to figure out. You know your setup contains a flagged package but are you actually vulnerable? Often times having a package present 
in a project is not a real vulnerability, this can make discerning real threats from flagged alerts a big problem. Apart from numbing 
the end user to urgency in their vulnerability scans it can often times obfuscate real threats. There are plenty of reasons why 
a flagged package often doesn't leave you vulnerable, and we'll elaborate on some of the most common reasons below.


When looking at our vulnerability scans we came across many repeating false positive scan results. They actually had enough similarities between them for us to categorize them.
Many of these false flags could be eliminated by relatively simple code.

For the most part, we aren't talking about advanced heuristics and static-analysis.
We're talking about simple, yes or no checks. If the CVEs contained more structured information and if the scanners knew what to
look for, they *could* do it. They'd be saving thousands of developers countless hours of drudgery.

## Common scenarios

Here are some common reasons why a vulnerable package might not matter:

### Transitive dependency eliminates vulnerabilities

Most dependencies installed in our projects aren't the direct dependencies that we've asked for at the top level. Most are the dependencies of those dependencies, and so on.
They're deeper in the tree. Since this is where most dependencies are, this is where most vulnerabilities tend to occur as well.

Often the relationship of a vulnerable package in connection to its parent, helps us to identify unrealistic vulnerabilities.
Maybe the parent package doesn't call the vulnerable code or pass in the un-sanitized input needed to trigger it. Other times,
you identify it as moot due to its relationship in the dependency tree. Wow, a Regexp Denial of Service vulnerability found in a sub-dependency of my testing
library? I don't care! Why are you showing me this?!

Take [this vulnerability](https://nvd.nist.gov/vuln/detail/CVE-2021-24033)
in one of React's utilities from just a few days ago:

![screenshot of vulnerability description showing that most users arent vulnerable because of react-scripts usage](/img/react-vuln.png)

The critical information most people need is right there in the CVE description for you to read, but that's not machine-readable.

### Language version or operating system not vulnerable

Often, especially with languages like Java, a vulnerability will only matter for some versions of the language.  We have seen plenty 
of vulnerabilities that are only relevant to apps running on Java 9 or higher. With something like two-thirds of everyone still using Java 8,
we can stop blasting out those vulnerabilities two-thirds of the time! 

The same goes for operating systems. We have seen vulnerabilities only exploitable on OSX, while next-to-nobody is using OSX
for production hosting.

### Vulnerable function not called

Sometimes you'll have a vulnerable library installed, (or one of your dependencies has it installed) but the vulnerable function
isn't being used.  This one is a little harder to search for, but thanks to tools like [Semgrep](https://semgrep.dev/), it's easier than you'd think to validate that you
aren't using these vulnerable functions in your code. 

## Capturing these common scenarios

We need to come up with a machine-readable way to capture the above information, before we can scan for it.
We want to make a schema that is complete enough to capture the scenarios outlined above. Think of this like a bigger, more relevant, 
CVE. 

It's only useful if you have the data, of course. But, we've seen that there *is* a community out there to help populate this information. 
We more-or-less owned the early discourse around Log4Shell and some other high-profile vulnerabilities, and in doing so we saw just how eager 
people were to submit details and provide information. A structured format in a central repository would have made things much easier.

For now, we're thinking of simple Yaml in a GitHub repository to capture the highest-severity vulnerabilities. [Here's](https://github.com/lunasec-io/lunasec/blob/master/guides/LUNATOPIC-20220422-1-TEST-TOPIC/metadata.yaml) our early take
at codifying Log4Shell. 

## Building a graph of ALL dependencies
That's right, all of them. We think. 

We're in the process of cloning *every* NPM and Maven package.
With this we will be able to graph out the relationships between dependencies. Within those relationships we can begin generating the false-positive elimination information.
We could, for instance, flag all denial-of-service type vulnerabilities that occur in sub-dependencies of popular testing frameworks, such as Jest.

It also enables a lot of other exciting security ideas around supply-chain security. Such as, hosting repository mirrors (like artifactory), 
detecting / preempting dependency hijacking, and implementing out license scanning. The sky is the limit.


## Building a more contextually-aware scanner

All of these scenarios have one thing in common, and it's that they require more context. Being able to scan someone's full source-code is already a step up
from just scanning a package inventory like a manifest or [SBOM](https://www.ntia.gov/SBOM).  The best case scenario, though, is scanning an entire system, and that means scanning docker containers.  

When you scan a container you get the full system context including, what language version is installed, what system packages are present, what the linux distribution is, and so on.
At the moment, we've written a CLI that can scan and upload data about built containers (or any file or folder) from a CI job, but eventually
we would like to host a container repository (think DockerHub). A place where people can push their containers to be fully and contextually scanned. 

## What we have done so far
We already have a dependency scanning tool called [LunaTrace](https://lunatrace.lunasec.io/) currently in beta **that you can try out**.  It's a GitHub integration, 
with CLI support to integrate into your CI job. You can even drag and drop a file, folder, or zipped container right into the web page UI and get instant results. 

The groundwork is there to start our quest on these false-positive elimination strategies. For whatever reason, existing solutions 
have left this job on the table, as security professionals we see plenty of work to be done.
Our plan is to start with the lowest hanging fruit and work our way up to an automated quiet tool that only asks for a human when one is truly needed. 

Perhaps we are being overly optimistic, and we can maybe only eliminate half or two thirds of the false positives. Even so, when everyone on our team can see
the real world benefit as security engineers we know we're headed in the right direction. 
