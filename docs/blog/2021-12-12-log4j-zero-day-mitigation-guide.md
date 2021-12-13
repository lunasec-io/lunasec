---
title: "Guide: How To Detect and Mitigate the Log4Shell Vulnerability (CVE-2021-44228)" 
description: If you're using log4j 2 in your infrastructure, this guide will help you understand how to check if you're impacted and show you how to quickly and securely mitigate the issue.
slug: log4j-zero-day-mitigation-guide
date: 2021-12-13
image: https://www.lunasec.io/docs/img/log4shell-logo.png
keywords: [log4shell, log4j, log4j2, rce, java, zero-day, mitigation]
authors:
- name: Free Wortley
  title: CEO at LunaSec
  url: https://github.com/freeqaz
  image_url: https://github.com/freeqaz.png
  tags: [zero-day, security, data-security, data-breaches, guides]
- name: Chris Thompson
  title: Developer at Lunasec
  url: https://github.com/breadchris
  image_url: https://github.com/breadchris.png
- name: Forrest Allison
  title: Developer at LunaSec
  url: https://github.com/factoidforrest
  image_url: https://github.com/factoidforrest.png

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

A few days ago, a serious new vulnerability was identified and published as 
[CVE-2021-44228)(https://cve.mitre.org/cgi-bin/cvename.cgi?name=2021-44228). 
We were one of the first security companies to write about it, and we named it "Log4Shell".

This guide will help you:
1. [Determine if you are impacted by Log4Shell](#determine-if-you-are-impacted-by-log4shell)
2. [How to Mitigate the Issue](#how-to-mitigate-the-issue)

:::info
If you're just trying to understand the Log4Shell vulnerability and the impact of it, please [refer to our 
earlier blog post](https://www.lunasec.io/docs/blog/log4j-zero-day/).
:::
<!--truncate-->

## Determine if you are impacted by Log4Shell

This vulnerability affects anybody who's using the log4j packages (`log4j-core`, `log4j-api`, etc). That means it's
primarily Java, but other languages like Scala, Groovy, or Clojure are also impacted.

### Automatically Scanning Your Package

We've built a command line utility that can check `.jar` and `.war` files and report if any are vulnerable. 
It works by scanning for hashes of [known vulnerable log4j classes](https://github.com/mubix/CVE-2021-44228-Log4Shell-Hashes).
If you have a vulnerable version of a log4j in your built Java project, the hash will match a one
of the hashes in the list.

**[Download from GitHub](https://github.com/lunasec-io/lunasec/releases/tag/v1.0.0-log4shell)**

_Make sure you download the right version for your Operating System and CPU architecture._

Once downloaded, you can extract that and run the `log4shell` command in your terminal.

**Extract Package*
```shell
$ tar -xvf lunasec_1.0.0-log4shell_Linux_x86_64.tar.gz 
README.md
log4shell
```

**Installing the Package (optional)**
```shell
$ sudo cp log4shell /usr/local/bin
$ log4shell
```

**Help Text**
```shell
$ log4shell
NAME:
   log4shell - A new cli application

USAGE:
   log4shell [global options] command [command options] [arguments...]

VERSION:
   1.0.0

DESCRIPTION:
   Identify code dependencies that are vulnerable to the log4shell vulnerability. Read more at log4shell.com.

COMMANDS:
   scan, s  Scan directories, passed as arguments, for archives (.jar, .war) which contain class files that are vulnerable to the log4shell vulnerability.
   help, h  Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --verbose      Display verbose information when running commands. (default: false)
   --json         Display findings in json format. (default: false)
   --debug        Display helpful information while debugging the CLI. (default: false)
   --help, -h     show help (default: false)
   --version, -v  print the version (default: false)
```

**Scanning a Java JAR file (vulnerable log4j detected)**
```shell
$ log4shell scan your-java-project.jar
8:08AM INF identified vulnerable path fileName=org/apache/logging/log4j/core/net/JndiManager$1.class path=test/struts-2.5.28-all/struts-2.5.28/apps/struts2-rest-showcase.war::WEB-INF/lib/log4j-core-2.12.1.jar versionInfo="log4j 2.8.2-2.12.0"
8:08AM INF identified vulnerable path fileName=org/apache/logging/log4j/core/pattern/MessagePatternConverter.class path=test/struts-2.5.28-all/struts-2.5.28/apps/struts2-rest-showcase.war::WEB-INF/lib/log4j-core-2.12.1.jar versionInfo="log4j 2.12"
8:08AM INF identified vulnerable path fileName=org/apache/logging/log4j/core/net/JndiManager$JndiManagerFactory.class path=test/struts-2.5.28-all/struts-2.5.28/apps/struts2-rest-showcase.war::WEB-INF/lib/log4j-core-2.12.1.jar versionInfo="log4j 2.12.0-2.12.1"
8:08AM INF identified vulnerable path fileName=org/apache/logging/log4j/core/net/JndiManager.class path=test/struts-2.5.28-all/struts-2.5.28/apps/struts2-rest-showcase.war::WEB-INF/lib/log4j-core-2.12.1.jar versionInfo="log4j 2.12.0-2.12.1"
8:08AM INF identified vulnerable path fileName=org/apache/logging/log4j/core/net/JndiManager$1.class path=test/struts-2.5.28-all/struts-2.5.28/apps/struts2-showcase.war::WEB-INF/lib/log4j-core-2.12.1.jar versionInfo="log4j 2.8.2-2.12.0"
8:08AM INF identified vulnerable path fileName=org/apache/logging/log4j/core/pattern/MessagePatternConverter.class path=test/struts-2.5.28-all/struts-2.5.28/apps/struts2-showcase.war::WEB-INF/lib/log4j-core-2.12.1.jar versionInfo="log4j 2.12"
8:08AM INF identified vulnerable path fileName=org/apache/logging/log4j/core/net/JndiManager$JndiManagerFactory.class path=test/struts-2.5.28-all/struts-2.5.28/apps/struts2-showcase.war::WEB-INF/lib/log4j-core-2.12.1.jar versionInfo="log4j 2.12.0-2.12.1"
8:08AM INF identified vulnerable path fileName=org/apache/logging/log4j/core/net/JndiManager.class path=test/struts-2.5.28-all/struts-2.5.28/apps/struts2-showcase.war::WEB-INF/lib/log4j-core-2.12.1.jar versionInfo="log4j 2.12.0-2.12.1"
```

:::note

Please make sure that you're running this command on your fully built `.jar` or `.war` file. If you are
using vendor software that you think might be vulnerable, but you can't get the `.jar` or `.war` files to scan yourself (or it is obfuscated), then you'll need to check out the [section on
vendor software](#checking-vendor-software-versions) advisories instead.

:::

The source code for this is available on our GitHub 
[here](https://github.com/lunasec-io/lunasec/tree/master/tools/log4shell/).

### Manually Scanning Your Dependencies

The above CLI tool automatically looks for hashes of vulnerable classes.  Read this if you'd like to build your own tool or scan manually.

#### Scanning for vulnerable .class files

Our automated tool above implements this functionality, but if you need to do this yourself then
[our Go source code](https://github.com/lunasec-io/lunasec/tree/master/tools/log4shell/constants/vulnerablehashes.go)
has a list of hashes that you can use to scan with. (Thank you, [hillu](https://github.com/hillu/local-log4j-vuln-scanner/)!)

#### Scanning for the log4j JAR file

You may want to simply scan the filesystem for vulnerable copies of the log4j `.jar` file.  We wrote a small shell script to accomplish
that before writing the above CLI.

This is a less accurate method of detection versus our automated scanner tool above because rather an inspecting inside your code,
it requires the log4j `.jar` file to be present on your filesystem (not inside your built package). It _does not_ recursively unpack `.jar` files. This 
works best if your dependencies are committed into your Repo, or if you're using a tool like Maven that downloads the 
`.jar` files for you.  

**If you're using Maven:** The default directory that `.jar` files are downloaded to is `~/.m2`. You may want to clear
your cache, and _then_ rebuild your project in order to limit false positives.

**Setup**
```shell
git clone https://github.com/lunasec-io/lunasec.git
cd lunasec/tools/log4shell-scripts
./setup.sh
```

**Run Scan**
```shell
./find-bad-deps.sh /path/to/folder/to/scan
```

### Checking Package Version

If you can check what versions of log4j2 are being used, you can check for any below the recently published 
`2.15.0`.

#### log4j v2

Almost all versions of log4j version 2 are affected.

`2.0-beta9 <= Apache log4j <= 2.14.1`

In other words, if you're using any version of log4j that is _older_ than `2.15.0`, you are most likely vulnerable.

#### log4j v1

Version 1 of log4j is vulnerable to other RCE attacks (like 
[CVE-2019-17571](https://www.cvedetails.com/cve/CVE-2019-17571/)), and if you're using it you need to
[migrate](https://logging.apache.org/log4j/2.x/manual/migration.html) to `2.15.0`.

### Checking Vendor Software Versions
The above scanning tool might not work for vendor's packages because of obfuscation, and in any case, you'll likely need to contact the vendor for mitigation.

Luckily, many vendors have created their own documents to explain the impact of Log4Shell on their products, and an extensive list
of those advisories is being compiled [here](https://gist.github.com/SwitHak/b66db3a06c2955a9cb71a8718970c592).

If a vendor has not created an advisory for this, there currently does not exist a succinct list of which Vendor 
software has been affected. There is an effort by Kevin Beaumont to create a spreadsheet that attempts to capture this
being worked on, but at this time of this post that effort is still a [work in progress](https://twitter.com/GossiTheDog/status/1470181063980896262).

## How to Mitigate the Issue

Now that you know where you're vulnerable, the following sections will help you to figure out how to patch it.

This diagram created by the [Swiss Government](https://www.govcert.ch/blog/zero-day-exploit-targeting-popular-java-library-log4j/) is an excellent
visualization of the Log4Shell exploit.  Take note of the possible solutions (shown in red) as we go over mitigation strategies.  

![log4shell 0day diagram](/img/log4j-attack-and-mitigations.png)


### Option 1: Upgrading to 2.15.0

Apache log4j has released a version that fixes the Log4Shell vulnerability as of version `2.15.0`.

**[Apache log4j Download Page](https://logging.apache.org/log4j/2.x/download.html)**

We recommend you upgrade, if possible.  For most people, this is the final and correct solution to the issue.

### Option 2: Enable `formatMsgNoLookups` 
The above release of log4j hardcodes the `formatMsgNoLookups` flag to true, preventing the attack.  If you are using log4j
version `2.10.0` to version `2.14.0` and can't yet update, you can still set the flag manually.

Set `formatMsgNoLookups=true` when you configure log4j by performing one of the following:

#### Pass as a JVM Flag

You can pass this as an argument when you invoke `java`.

`java -Dlog4j2.formatMsgNoLookups=true ...`

#### Set Environment Variable

Alternatively, this feature may be set via Environment Variable.

`LOG4J_FORMAT_MSG_NO_LOOKUPS=true java ...`

Or you can set this using the JVM arguments environment variable.

`JAVA_OPTS=-Dlog4j2.formatMsgNoLookups=true`

### Option 3: JNDI patch
It's possible to [modify the JNDI in place](https://news.ycombinator.com/item?id=29507263) to stop the attack at the language level.
It can even be done while the server is running.  Please note this is a last resort, and should only be done if the above options aren't possible.

The easy to use tool [Log4jHotPatch](https://github.com/corretto/hotpatch-for-apache-log4j2) will apply the JNDI patch automatically.

For those using Kubernetes that can't perform any of the above mitigations, a new feature called "Ephemeral Containers" allows applying the hot patch
to a running container. This could be useful for containerized vendor software.
[This guide](https://medium.com/@edeNFed/patching-log4shell-in-one-command-without-downtime-using-ephemeral-containers-c69a9155ab1e) explains how to apply the patch.


### Option 4: Remote hot patch / LogOut4Shell
Because of the extensive control Log4Shell gives an attacker, it's actually possible to use the bug against itself to patch a running server.
This isn't the recommended strategy for various reasons, but it could be a last resort for systems that you can't easily restart or modify.  Note that doing this on a system 
you don't have permission to is most likely illegal. The fix will only work until the server (or the JVM) is restarted.

How to accomplish this is explained in [this guide](https://github.com/Cybereason/Logout4Shell). We are also currently building a small SASS to
apply the patch remotely.

## What not to do

Because of the impact from this vulnerability, there has been a lot of discussion. **Some of this information is outdated
or wrong and _will_ leave you vulnerable if you follow it!**

In contrast, this guide has been written by a team of professional Security Engineers at LunaSec. Everything here has
been peer-reviewed by multiple security experts, and where possible our sources will be linked for other Security
professionals to verify against. (If you need security help, go read the bottom of this post.)

### Be careful what Log4Shell advice you trust online

We're making an effort to keep this post up-to-date as new information comes out. If you have any questions or you're
confused about our advice, please [file an Issue](https://github.com/lunasec-io/lunasec/issues) on GitHub.

If you would like to contribute, or notice any errors, this post is an Open Source Markdown file on
[GitHub](https://github.com/lunasec-io/lunasec/blob/master/docs/blog/2021-12-12-log4j-zero-day-mitigation-guide.md).

### Known Bad Advice

The following are all pieces of advice we've seen thrown around online that are misguided and dangerous. If you see
advice online that contains any of the following, we please ask you to share this post with the authors to help limit
the fallout from Log4Shell.

#### A WAF will not save you from Log4Shell

The Log4Shell vulnerability can _not_ be entirely mitigated by using a WAF (Web Application Firewall) because it _does not_
require your usage of it to be *publicly accessible*. Internal Data Pipelines, like Hadoop and Spark, and Desktop apps
like the [NSA's Ghidra](https://twitter.com/NSA_CSDirector/status/1469305071116636167) will still be vulnerable.

In addition, there is no simple way to "filter out" malicious requests with a simple WAF rule because Log4Shell payloads
may be nested. (See [this GitHub](https://github.com/Puliczek/CVE-2021-44228-PoC-log4j-bypass-words) for examples)

If you are using a vulnerable version of log4j, the only secure way to mitigate Log4Shell is through one of the
strategies detailed above.

#### Updating Java is insufficient

There are many reports online that only certain Java versions are affected and that you're safe if you're on a newer
Java version.  Even on newer versions, it's still possible for an attacker to instantiate local classes on the
server.

We believe it's likely only a matter of time before all current Java versions are impacted when
running a vulnerable version of log4j. Just upgrading your Java version is insufficient, and you should not rely on this
as a long-term defense against exploitation.

#### Updating individual log statements isn't a complete fix

Some people online are suggesting updating your logging statements from `%m` to `%m{nolookupzz}` to mitigate this**.

We do not recommend you follow this strategy.  Even if you manage to patch your application 100%
today, you will still likely accidentally add a `%m` again in the future and _then you will be vulnerable again_.

In addition, it's possible to miss a line in your logging statements or if have a dependency that
is using log4j with `%m` without you realizing. If either happens _you will still be vulnerable_.

We're strong advocates of a "Secure by Default" mentality with software, and we recommend you follow one of the other
mitigations instead.

_**: The string is intentionally wrong here to prevent blind copy-pasting._


## How to protect yourself from future 0-days

It's becoming increasingly apparent that Log4Shell is not going to be the last vulnerability of its kind. Any trusted dependency
can have security flaws or be malicious, and there is always the risk of accidentally introducing vulnerabilities into your own system.

The only way to implement software that is truly resilient to future security vulnerabilities like Log4Shell is to implement a
"Secure by Default" architecture. This is what companies, and
[the federal government](https://www.nextgov.com/cybersecurity/2021/09/biden-administration-releases-draft-zero-trust-guidance/185166/),
are migrating to now because it's the only strategy that protects you long-term.

### What is "Secure by Default"?

We've written about this before in our post on 
[Why Data Breaches Happen](https://www.lunasec.io/docs/blog/how-data-breaches-happen-and-why-secure-by-default-software-is-the-future/),
but the short version is: **Accept that you're going to be hacked**, and that the outer walls of your system will eventually be breached.

Build security into the parts of your system that specifically need it. Secure by Default
software is designed to fail predictably under attack, so that the most sensitive data remains secure.

We've made implementing that as easy as possible with our Open Source security framework [LunaSec](https://www.lunasec.io/docs/pages/overview/introduction/).
It works inside web apps, embedding an additional layer of isolation around the most sensitive data.  Please leave us a star [on GitHub](https://github.com/lunasec-io/lunasec-monorepo).

### Resources

#### [OWASP Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/)

This is a design framework that's being developed by the Open Web Application Security Project (OWASP) to help 
standardize the levels of security that applications achieve. It's not directly "Secure by Default", but it provides a 
solid baseline for setting up a roadmap for yourself.

#### [LunaSec Secure by Default Framework](https://github.com/lunasec-io/lunasec/)

_Spoiler: Maintained by us._

An Open Source development framework that enables you to easily add a "Secure by Default" architecture to your existing
software with only a few lines of code. It's loosely based on the OWASP Application Security Verification Standard 
(above) and is also designed to be implemented in [multiple levels](https://www.lunasec.io/docs/pages/how-it-works/security/introduction/).

#### [Acra Database Protection](https://github.com/cossacklabs/acra)

An Open Source database encryption library that helps you prevent data leaks by adding a layer of encryption to your 
data. It's designed and maintained by Cossack Lab's, which also offers it as a commercial offering.

#### [FullHunt log4j Scanner](https://github.com/fullhunt/log4j-scan)

Not a "Secure by Default" tool, but this is a CLI tool to help you identify vulnerable log4j endpoints in your 
infrastructure. (Note: It's a new tool, so it might have bugs. Please file an issue if you find any!)

### Stay In Touch

If you're currently scrambling to deal with Log4Shell and you'd like some help, please follow us on 
[Twitter](https://twitter.com/LunaSecIO) or [drop your email](https://mailchi.mp/2e67fecbc157/log4j-updates) to receive 
updates as we post them.

#### Limited Offer: Free Security Assistance

We're also currently offering a free 30 minute consulation with one of our Security Engineers. If you're interested,
please [book some time with us here](https://lunasec.youcanbook.me/).

## Good Luck!

The last few days have been a painful experience for nearly every tech company out there. We hope that this guide helps
your day be a little better.

If this post helped you, please share it with others to help them with Log4Shell too.

### Social Media Links

Feel free to join the discussion on this post on any of the following websites:
- **[Reddit](https://www.reddit.com/r/programming/comments/rfcw6j/guide_how_to_detect_and_mitigate_the_log4shell/)**
- **[Hacker News](https://news.ycombinator.com/item?id=29538372)**
- **[Twitter](https://twitter.com/LunaSecIO/status/1470331859166846976?s=20)**

### Updates

1. Fixed some weird grammar.
2. Added social links
