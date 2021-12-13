---
title: "Guide: How To Detect and Mitigate the Log4Shell Vulnerability (CVE-2021-44228)" 
description: If you're using log4j 2 in your infrastructure, this guide will help you understand how to migitate the issue quickly.
slug: log4j-zero-day-migitation-guide
image: https://www.lunasec.io/docs/img/log4shell-logo.png
keywords: [log4shell, log4j, log4j2, rce, java, zero-day, mitigation]
authors:
- name: Free Wortley
  title: CEO at LunaSec
  url: https://github.com/freeqaz
  image_url: https://github.com/freeqaz.png
  tags: [zero-day, security, data-security, data-breaches, guides]

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

![Log4Shell Logo](https://www.lunasec.io/docs/img/log4shell-logo.png)

If you're trying to figure out if you're vulnerable to the recent Log4Shell vulnerability 
(published as [CVE-2021-44228](https://cve.mitre.org/cgi-bin/cvename.cgi?name=2021-44228)), then this is the right guide
for you.

:::info 

If you're just trying to understand the Log4Shell vulnerability and understand the impact of it, please refer to our 
earlier blog post about it first.

:::

<!--truncate-->

## 1. Determine if you're impacted

This vulnerability affects anybody who's using the log4j packages (`log4j-core`, `log4j-api`, etc). That means it's
primarily Java, but other languages like Scala, Groovy, or Clojure are also impacted.

### By Checking Package Hashes

:::note

This section only applies if you're consuming log4j directly in your code. If you're running Vendor software with a 
vulnerable version of log4j, then you'll need to check out the section on Vendor software in this guide instead.

:::

You can identify if you're using a vulnerable package version by checking your dependencies for hashes of known 
vulnerable versions. If you have a vulnerable version of a log4j Java JAR files on your filesystem, the hash will match a one of the
hashes in the list.

A list of package hashes has been published to GitHub [here](https://github.com/mubix/CVE-2021-44228-Log4Shell-Hashes).
(Thank you, mubix!)

For actually using those hashes, please check out the following 2 methods below. 

:::note

Before you run these commands, please make sure that
you've installed your dependencies first (ie, pulling them from Maven to your system somewhere).

:::

#### Option #1: Using the Log4Shell CLI Tool (Easiest)

We've built a command line utility that will check files and tell you which ones are vulnerable. This is effectively 
what Option #2 is, but automated.

**Installation via NPM:**
```shell
npm install -g @lunasec/log4shell
```

Once that completes, you can now run the `log4shell` command in your terminal.

To check the current directory (where you run `log4shell`), just run this command:
```shell
log4shell scan-deps
```

Alternatively, you can specify a path to check for dependencies in:
```shell
log4shell scan-deps /path/to/folder/to/scan
```

The source code for this is available on our GitHub 
[here](https://github.com/lunasec-io/lunasec/js/sdks/packages/log4shell/).

##### Example Output

With vulnerable packages (in current directory):
```
$ cd /home/user/code/packages/
$ log4shell scan-deps                                                    

> @lunasec/log4shell@1.0.0 scan-deps
> ./find-bad-deps.sh "/home/user/code/packages/"

Found Vulnerable Package At: ./log4j-core-2.14.1.jar
```

If no vulnerable packages were found:
```
$ cd /home/user/code/packages/
$ log4shell scan-deps                                                    

> @lunasec/log4shell@1.0.0 scan-deps
> ./find-bad-deps.sh "/home/user/code/packages/"

No bad packages were found with known any hashes.
```

#### Option #2: Download Hashes from GitHub Manually (More flexible)

These steps are basically the same as the automated `log4shell` tool above, but we'll break down the steps that it's 
doing for you. It's all Open Source and available on GitHub, so feel free to peek at the code 
[there](https://github.com/lunasec-io/lunasec/js/sdks/packages/log4shell/).

**Setup*
```shell
git clone https://github.com/lunasec-io/lunasec.git
cd lunasec/js/sdks/packages/log4shell
./setup.sh
```

**Run Scan**
```shell
./find-bad-deps.sh /path/to/folder/to/scan
```

The output should be similar to the example output from the previous section because it's the same script.

### By Checking Package Version

If you know what versions of log4j are being used, you can use the following information to determine if your version
is vulnerable. If you're trying to check if your Vendor software is vulnerable, please see the next section.

#### log4j v2

Almost all versions of log4j version 2 are affected.

`2.0-beta9 <= Apache log4j <= 2.14.1`

In other words, if you're using any version of log4j that is _older_ than `2.15.0`, you're almost 100% using a vulnerable 
version!

#### log4j v1

Version 1 of log4j is vulnerable to other RCE attacks, and if you're using it you need to
[migrate](https://logging.apache.org/log4j/2.x/manual/migration.html) to `2.15.0`.

### By Checking Vendor Software Versions

There currently does not exist a succinct list of which Vendor software has been affected. There is an effort by 
Kevin Beaumont to create a spreadsheet that can be referenced for this. At this time of this post; however, that effort 
is still a WIP.

You can check for updates yourself by following the thread 
[here](https://twitter.com/GossiTheDog/status/1470181063980896262) (there is some information already).

## 2. Mitigating the Issue

STUB