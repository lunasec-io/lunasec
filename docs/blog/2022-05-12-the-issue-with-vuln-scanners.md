---
title: "False Positives in Vulnerability Scanning: Why We Think We Can Do Better"
description: The current issues with vulnerability scanning and what we think we can do about it
slug: the-issue-with-vuln-scanners
image: https://www.lunasec.io/docs/img/false-positives.png
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

![False Positive Vulnerabilities](https://www.lunasec.io/docs/img/false-positives.png)

## False Positives Everywhere

As a web developer, I've learned to ignore vulnerability scan results and that's a **big** problem.

Most of the results aren't *relevant*. Sometimes I find it easy to figure out what's safe to ignore from the findings.
Other times
I find myself scouring documentation, source code, and blog posts only to discover the "RCE" npm audit told me I had
doesn't matter.

<!--truncate-->

Sifting through the list of false positives, looking
for the slim possibility of an actually impactful vulnerability isn't how any of us want to spend our time. I always
assumed
that there was no better way. The infrastructure just didn't exist to eliminate that tedious job.

At LunaSec,
we've been taking on this type of work for a few select companies, and taking notes. When diving in deeper to this
problem we realized something a little mind-blowing.

## There isn't enough data to tell you a vulnerability matters

Vulnerabilities are usually tied to a library or a package, at least the ones that end up in the official [CVE (Common Vulnerabilities and Exposures)
database](https://www.cve.org/) and show up in the scan report for your code.

The vast majority of vulnerability scanners use [CPEs (Common Platform Enumeration)](https://nvd.nist.gov/products/cpe) defined for a CVE to check if you
are using a package that matches a known vulnerable version range. If a match is found, then you are notified as having 
the vulnerability.

A vulnerability match found with this method does not guarantee a meaningful vulnerability was actually found. 
Findings produced by these scanners are littered with false positives and misleading severities.

Operating on information published to a CVE isn't enough, a scanner _must_ understand more about the context of a vulnerability
before alerting someone. Having reviewed thousands of vulnerabilities ourselves, we have identified a number of ways
to reduce the number of false positives that are shown to a developer.

For the most part, we aren't talking about advanced heuristics and static-analysis.
We're talking about simple, yes or no checks.

## Common false positive scenarios

Here are some common reasons why a reported "vulnerable package" might not affect your code:

### Transitive dependency eliminates vulnerabilities

Most dependencies installed in our projects aren't the direct dependencies that we've asked for at the top level. Most
are the dependencies of those dependencies, and so on.
They're deeper in the tree. Since this is where most dependencies are, this is where most vulnerabilities tend to occur
as well.

Often the relationship of a vulnerable package in connection to its parent, helps us to identify unrealistic
vulnerabilities.
Maybe the parent package doesn't call the vulnerable code or pass in the un-sanitized input needed to trigger it. Other
times,
you identify it as moot due to its relationship in the dependency tree. Wow, a Regexp Denial of Service vulnerability
found in a sub-dependency of my testing
library? I don't care! Why are you showing me this?!

Take [this vulnerability](https://nvd.nist.gov/vuln/detail/CVE-2021-24033) in one of React's utilities from just a few days ago:

![screenshot of vulnerability description showing that most users arent vulnerable because of react-scripts usage](/img/react-vuln.png)

The critical information most people need is right there in the CVE description for you to read, but that's not
machine-readable.

### Language version or operating system not vulnerable

Often, especially with languages like Java, a vulnerability will only matter for some versions of the language. We have
seen plenty
of vulnerabilities that are only relevant to [apps running on Java 9 or higher](https://www.lunasec.io/docs/blog/spring-rce-vulnerabilities).
Even though most developers [still using Java 8](https://www.jetbrains.com/lp/devecosystem-2021/java/), a vulnerability scanner
will still report their code having this vulnerability.

The same goes for operating systems. If a [Javascript package has a command injection vulnerability that only affects
Windows systems](https://nvd.nist.gov/vuln/detail/CVE-2021-42740), the CPE will not tell you that you are not affected by
this vulnerability if you are deploying your code to a server running Linux.

### Vulnerable function not called

Sometimes you'll have a vulnerable library installed, (or one of your dependencies has it installed) but the vulnerable
function
isn't being used. This one is a little harder to search for, but thanks to tools like [Semgrep](https://semgrep.dev/),
it's easier than you'd think to validate that you
aren't using these vulnerable functions in your code.

Semgrep is essentially a fancier grep tool that is intelligent about the way that code is structured (it lets you search
the [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree)). The rules are trivial, intuitive to write, and 
can quickly identify if the library function is ever actually being used. 

CPEs only match on the library's name and version, but the description of a CVE will [sometimes](https://github.com/advisories/GHSA-2gwj-7jmv-h26r)
contain potentially problematic functions that you can watch out for.

## What we are doing
At LunaSec, we are not just passionate about security, but also making security _meaningful_ to everyone involved. We have 
many ideas for how to improve the status quo for vulnerability scanning and management.

### Tracking these common scenarios

We need to come up with a machine-readable way to capture the above information, before we can scan for it.
We want to make a schema that is complete enough to capture the scenarios outlined above. 

The National Vulnerability Database (NVD) was established 17 years ago, and at the time it was
groundbreaking. But, it wasn't built for use with automated scanners.
Now we need a more structured standard to catch up with the much larger quantity of Open Source packages.

It's only useful if you have the data, of course. But, we've seen that there *is* a community out there to help populate
this information. Blog posts, POCs exploits and vulnerable repositories, discussions on Twitter, are all proof that the effort 
is being made. However, after all is said and done, the only information that has actually been collected to be reused by
the masses of developers is a package name and  version range (that are still prone to false positives).

Taking what we have learned from being security researchers, we have created a standardized `guide` schema which we will
use to capture details for vulnerabilities that we review. We have turned our [Log4Shell blog post](https://www.lunasec.io/docs/blog/log4j-zero-day/)
into the guide format
[here](https://github.com/lunasec-io/lunasec/blob/master/guides/LUNATOPIC-20220422-1-TEST-TOPIC/metadata.yaml) to demonstrate
what this will look like.

### Building a graph of ALL dependencies

That's right, all of them.

We're in the process of cloning *every* NPM and Maven package.
With this we will be able to graph out the relationships between dependencies. Within those relationships we can begin
to add the context needed to eliminate false positives.
We could, for instance, flag all denial-of-service type vulnerabilities that occur in sub-dependencies of popular
testing frameworks, such as Jest.

It also will open up other supply-chain security approaches, such as hosting a repository mirror (like [Artifactory](https://jfrog.com/artifactory/)),
detecting / preempting dependency hijacking, and license scanning. The sky is the limit.

### Building a more contextually-aware scanner

All of these scenarios have one thing in common, and it's that they require more context. Being able to scan someone's
full source-code is already a step up
from just scanning a package inventory like a manifest or [SBOM](https://www.ntia.gov/SBOM). The best case scenario,
though, is scanning an entire system, and that means scanning docker containers.

When you scan a container you get the full system context including what language version is installed, what system
packages are present, what the Linux distribution is, and so on. Collecting container information and using this
to supplement code scanning will help remove false positives.

## What we have done so far

Our dependency scanning tool, [LunaTrace](https://lunatrace.lunasec.io/), is currently in beta **and you can try
out**. It has GitHub integration,
CLI support to integrate with your CI job, and you can even drag and drop a file, folder, or zipped container right into
the web app to see instant results.

Existing solutions, are not held accountable for reporting false positive findings, and so little progress is actually 
being made to fix this problem. As security professionals who care about developers, we see plenty of work to be done.
Our plan is to start with the lowest hanging fruit and work our way up to a quiet tool that only asks for a human when
one is truly needed.
