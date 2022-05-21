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
I find myself scouring documentation, source code, and blog posts only to discover the "RCE" `npm audit` told me I had
doesn't matter.

<!--truncate-->

Sifting through the list of false positives, looking
for the slim possibility of an actually impactful vulnerability isn't how any of us want to spend our time. I always
assumed
that there was no better way. The infrastructure just didn't exist to eliminate that tedious job.

At LunaSec,
we've been taking on this type of work for a few select companies, and taking notes. We realized something a little mind-blowing.

:::info
By the way, if you'd like to hire us for a dependency review, 
please [send us an email](mailto:deps@lunasec.io) and we'll manually comb through your dependency tree 
and help you patch what we find. We're using this experience to improve our own scanners. More on that below.
:::

## Scanners could do a lot better

Vulnerabilities are usually tied to a library or a package, at least the ones that end up in an official database and
show up in your scan report.
Typically, the [CPEs (packages)](https://nvd.nist.gov/products/cpe) that are vulnerable are written right into the
[CVE (the official report)](https://www.cve.org/).

Most scanners consume this database. If they find you have a vulnerable package, they notify
you. Full stop.

We've reviewed thousands of these notifications. We wrote down the reasons results could be ignored, and in the end
realized that the vast majority of these false
positives fell into one of a few categories.
Many of them could be eliminated by relatively simple code.

## Common false positive scenarios

Here are some common reasons why a reported "vulnerable package" might not be exploitable:

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

Take [this vulnerability](https://nvd.nist.gov/vuln/detail/CVE-2021-24033) in one of React's utilities from just a few
days ago:

![screenshot of vulnerability description showing that most users arent vulnerable because of react-scripts usage](/img/react-vuln.png)

The critical information most people need is right there in the CVE description for you to read, but that's not
machine-readable and so it isn't going to help a scanner.

### Language version or operating system not vulnerable

Often, especially with languages like Java, a vulnerability will only matter for some versions of the language. We have
seen plenty of vulnerabilities that are only relevant
to [apps running on Java 9 or higher](https://www.lunasec.io/docs/blog/spring-rce-vulnerabilities). With somewhere
around two-thirds of
projects [still using Java 8](https://www.jetbrains.com/lp/devecosystem-2021/java/),
we can stop notifying of those vulnerabilities two-thirds of the time!

The same goes for operating systems. If a [Javascript package has a command injection vulnerability that only affects
Windows systems](https://nvd.nist.gov/vuln/detail/CVE-2021-42740), you should only get a notification on Windows.

### Vulnerable function not called

Sometimes you'll have a vulnerable library installed, (or one of your dependencies has it installed) but the vulnerable
function
isn't being used. This one is a little harder to search for, but thanks to tools like [Semgrep](https://semgrep.dev/),
it's easier than you'd think to validate that you
aren't using these vulnerable functions in your code.

The description of a CVE will [sometimes](https://github.com/advisories/GHSA-2gwj-7jmv-h26r) sometimes
contain potentially problematic functions that you can watch out for. With SemGrep, those usages
could be codified and scanned for.

### Tracking these common scenarios

We need to come up with a machine-readable way to capture the above information, before we can scan for it.

The National Vulnerability Database (NVD) was established 17 years ago, and at the time it was
groundbreaking. But, it wasn't built for use with automated scanners.
Now we need a more structured standard to catch up with the much larger quantity of Open Source packages.
We also need much more of a focus on machine-readable data.

At LunaSec, we more-or-less owned the early discourse around Log4Shell and some other high-profile vulnerabilities
through our blog posts, and in doing so we saw just how eager
people were to submit details and provide information. A structured format would have made those blog posts much easier
for us to maintain. When a major vulnerability hits, the abundance of blog posts, POCs exploits and vulnerable repositories, discussions on
Twitter, are all proof that the effort and interest
is there.

For now, we're thinking of simple Yaml files in a GitHub repository to capture the highest-severity
vulnerabilities. [Here's](https://github.com/lunasec-io/lunasec/blob/master/guides/LUNATOPIC-20220422-1-TEST-TOPIC/metadata.yaml)
our take at codifying Log4Shell as structured information. We call them "guides" because they capture more information
about a vulnerability than a simple report.

### Building a graph of ALL dependencies

That's right, all of them. We think.

We're in the process of cloning *every* NPM and Maven package, and that's just to start.
With this we will be able to graph out the relationships between dependencies. Within those relationships we can begin
to add the context needed to eliminate false positives.
We could, for instance, flag all denial-of-service type vulnerabilities that occur in sub-dependencies of popular
testing frameworks, such as Jest.

It also will open up other supply-chain security approaches, such as hosting a repository mirror (
like [Artifactory](https://jfrog.com/artifactory/)),
detecting / preempting dependency hijacking, and license scanning. The sky is the limit.

### Building a more contextually-aware scanner

All of these scenarios have one thing in common, and it's that they require more context. Being able to scan someone's
full source-code is already a step up
from just scanning a package inventory like a manifest or [SBOM](https://www.ntia.gov/SBOM). The best case scenario,
though, is scanning an entire system, and that means scanning docker containers.

When you scan a container you get the full system context including what language version is installed, what system
packages are present, what the Linux distribution is, and so on. Collecting container information and using this
to supplement code scanning will help remove false positives.

At the moment, we've written a CLI that can scan and upload data about built containers (or any file or folder) from a
CI job, but eventually
we would like to host a container repository (think DockerHub) where people can push their containers to be scanned.

## What we have done so far

Our dependency scanning tool, [LunaTrace](https://lunatrace.lunasec.io/), is live **and you can try
out today for free**. It has a [GitHub Integration](https://github.com/marketplace/lunatrace-by-lunasec),
[CLI support](https://github.com/lunasec-io/lunasec/releases) to add it to your CI job, or you can even drag and drop a 
file, folder, or zipped container right into
the web app to see instant results.

The groundwork is there to start building these false-positive elimination strategies.
Our plan is to start with the lowest hanging fruit and work our way up to a quiet tool that only asks for a human when
one is truly needed. We see plenty of work to be done.

Perhaps we are being overly optimistic, and we can maybe only eliminate half or two thirds of the false positives. Even
so, that seems like a tool we'd prefer to use.

### Limited Offer: We'll manually review your dependencies
 
We need your feedback to help prioritize what
features to build next and doing some manual work is the fastest way for us to get it. For a limited number of companies,
we are offering to manually review dependencies, eliminate the false positives, and send a report on what needs to be addressed and why.

Having some _very_ experienced security engineers take a look is great peace of mind. Please send an email to [deps@lunatrace.io](mailto:deps@lunasec.io) if you're interested.
