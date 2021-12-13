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

A few days ago, a new vulnerability was identified 
([CVE-2021-44228](https://cve.mitre.org/cgi-bin/cvename.cgi?name=2021-44228)) and it has since spread across the 
internet rapidly.

We were one of the first security companies to write about it, and since then the name we gave it, "Log4Shell", has 
caught on. This guide will help you figure out how to deal with Log4Shell by identifying and fixing the vulnerabilities 
it introduces by walking you through the current available options.

:::info
If you're just trying to understand the Log4Shell vulnerability and understand the impact of it, please [refer to our 
earlier blog post](https://www.lunasec.io/docs/blog/log4j-zero-day/) about it first.
:::
<!--truncate-->

## 1. Be careful what Log4Shell advice you trust online

Because of the severe impact from this vulnerability, there has been a lot of discussion on the internet
about it. **Some of this information is outdated or wrong and _will_ leave you vulnerable if you follow it!**

In contrast, this guide has been written by a team of professional Security Engineers at LunaSec. Everything here has 
been peer-reviewed by multiple security experts, and where possible our sources will be linked for other Security 
professionals to verify against. (If you need security help, go read the bottom of this post.)

We're making an effort to keep this post up-to-date as new information comes out. If you have any questions or you're
confused about our advice, please [file an Issue](https://github.com/lunasec-io/lunasec/issues) on GitHub.

If you would like to contribute, or notice any errors, this post is an Open Source Markdown file on 
[GitHub](https://github.com/lunasec-io/lunasec/blob/master/docs/blog/2021-12-12-log4j-zero-day-mitigation-guide.md).

## 2. Known Bad Advice

The following are all pieces of advice we've seen thrown around online that are misguided and dangerous. If you see
advice online that contains any of the following, we please ask you to share this post with the authors to help limit
the fallout from Log4Shell.

### A WAF will not save you from Log4Shell

The Log4Shell vulnerability can _not_ be mitigated by using a WAF (Web Application Firewall) because it _does not_
require your usage of it to be *publicly accessible*. Internal Data Pipelines, like Hadoop and Spark, and Desktop apps
like the [NSA's Ghidra](https://twitter.com/NSA_CSDirector/status/1469305071116636167) are affected by this.

In addition, there is no simple way to "filter out" malicious requests with a simple WAF rule because Log4Shell payloads
may be nested. (See [this GitHub](https://github.com/Puliczek/CVE-2021-44228-PoC-log4j-bypass-words) for examples)

If you are using a vulnerable version of log4j, the only secure way to mitigate Log4Shell is through one of the 
strategies detailed below.

### Simply updating Java isn't (likely) sufficient long-term

There are many reports online that only certain Java versions are affected and that you're safe if you're on a newer
Java version.

We believe it's likely only a matter of time before all Java versions, even current Java 11 versions, are impacted when 
running a vulnerable version of log4j. Just upgrading your Java version is insufficient, and you should not rely on this
as a long-term defense against exploitation.

(Technical explanation: The reports we've received state that it's still possible to instantiate local classes on the 
server, versus remote classes which are how current exploits function. See our last [post on this](https://www.lunasec.io/docs/blog/log4j-zero-day).)

### Simply Updating Your Log Statements Is Dangerous

Some people online are suggesting updating your logging statements from `%m` to `%m{nolookupzz}` to mitigate this**.

This is bad advice, and we _do not_ recommend that you follow it. Even if you manage to patch your application 100% 
today, you will still likely accidentally add a `%m` again in the future and _then you will be vulnerable again_.

In addition, it's possible to miss a line in your logging statements or if have a dependency that
is using log4j with `%m` without you relizing. If either happens _you will still be vulnerable_.

We're strong advocates of a "Secure by Default" mentality with software, and we recommend you follow one of the other
mitigations instead.

_**: The zz is intentionally wrong here to prevent blind copy-pasting._

## 3. Determine if you are impacted by Log4Shell

This vulnerability affects anybody who's using the log4j packages (`log4j-core`, `log4j-api`, etc). That means it's
primarily Java, but other languages like Scala, Groovy, or Clojure are also impacted.

### By Automatically Scanning Your Package

:::note

If you're running Vendor software with a vulnerable version of log4j, then you'll need to check out the section on 
Vendor software in this guide instead.

:::

We've built a command line utility that will check files and tell you which ones are vulnerable.

**[Download from GitHub](https://github.com/lunasec-io/lunasec/releases/tag/v1.0.0-log4shell)**

_Make sure you download the right version for your Operating System and CPU architecture._

Once that completes, you can extract that and run `log4shell` command in your terminal.

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

Please make sure that you're running this command on your fully built `.jar` or `.war` file.

:::

The source code for this is available on our GitHub 
[here](https://github.com/lunasec-io/lunasec/tree/master/tools/log4shell/).

### By Manually Scanning Your Dependencies

You can identify if you're using a vulnerable package version by checking your dependencies for hashes of known
vulnerable versions. If you have a vulnerable version of a log4j in your built Java project, the hash will match a one 
of the hashes in the list.

#### Scanning for vulnerable .class files

Alternatively, you can also scan for known vulnerable `.class` files. This is more accurate, but more complicated
also.

Our automated tool above implements this functionality, but if you need to do this yourself then
[our Go source code](https://github.com/lunasec-io/lunasec/tree/master/tools/log4shell/constants/vulnerablehashes.go)
has a list of hashes that you can use to scan with. (Thank you, [hillu](https://github.com/hillu/local-log4j-vuln-scanner/)!)

#### Scanning for vulnerable JAR files

We're going to be using a list of JAR package hashes has been published to GitHub 
[here](https://github.com/mubix/CVE-2021-44228-Log4Shell-Hashes). (Thank you, mubix!)

This is a less accurate method of detection versus our automated scanner tool because it requires the `.jar` file to be
present on your disk (not inside of your built package). This tool _does not_ recursively unpack `.jar` files. This 
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

### By Checking Package Version

If you know what versions of log4j are being used, you can use the following information to determine if your version
is vulnerable. If you're trying to check if your Vendor software is vulnerable, please see the next section.

#### log4j v2

Almost all versions of log4j version 2 are affected.

`2.0-beta9 <= Apache log4j <= 2.14.1`

In other words, if you're using any version of log4j that is _older_ than `2.15.0`, you're almost 100% using a vulnerable 
version!

#### log4j v1

Version 1 of log4j is vulnerable to other RCE attacks (like 
[CVE-2019-17571](https://www.cvedetails.com/cve/CVE-2019-17571/)), and if you're using it you need to
[migrate](https://logging.apache.org/log4j/2.x/manual/migration.html) to `2.15.0`.

### By Checking Vendor Software Versions

- **Log4Shell Security Advisories:** [GitHub Gist](https://gist.github.com/SwitHak/b66db3a06c2955a9cb71a8718970c592)

Many vendors have created their own documents to explain the impact of Log4Shell on their products.

- **Vendor Software By Version:** WIP

If a vendor has not created an advisory for this, there currently does not exist a succinct list of which Vendor 
software has been affected. There is an effort by Kevin Beaumont to create a spreadsheet that attempts to capture this
being worked on, but at this time of this post that effort is still a WIP.

You can check for updates yourself by following the thread 
[here](https://twitter.com/GossiTheDog/status/1470181063980896262) (there is some information already).

## 4. How to Mitigate the Issue

If you're certain that you're vulnerable to this issue, then the following sections will help you to figure out how to
go about patching the vulnerability.

### Upgrading to 2.15.0

Apache log4j has released a version that fixes the Log4Shell vulnerability as of version `2.15.0`.

**[Apache log4j Download Page](https://logging.apache.org/log4j/2.x/download.html)**

We recommend you upgrade, if possible, or to follow one of the other mitigation strategies.

### Enable `formatMsgNoLookups` 

:::note

This mitigation only applies to log4j versions `2.10.0` and newer.

In log4j `2.15.0`, this flag is set by default.

:::

Set `formatMsgNoLookups=true` when you configure log4j by performing one of the following:

#### Pass as a JVM Flag

You can pass this as an argument when you invoke `java`.

`java -Dlog4j2.formatMsgNoLookups=true ...`

#### Set Environment Variable

Alternatively, this feature may be set via Environment Variable.

`LOG4J_FORMAT_MSG_NO_LOOKUPS=true java ...`

Or you can set this using the JVM arguments environment variable.

`JAVA_OPTS=-Dlog4j2.formatMsgNoLookups=true`

### Modify your log4j `.jar` manually

This is more advanced, and should only be done if the other options aren't possible.

From [Hacker News](https://news.ycombinator.com/item?id=29507263):

> Substitute a non-vulnerable or empty implementation of the
> class org.apache.logging.log4j.core.lookup.JndiLookup, in a way that your classloader uses your
> replacement instead of the vulnerable version of the class. Refer to your application's or
> stack's classloading documentation to understand this behavior.

## 5. Other ways to Protect Yourself from Log4Shell (and the next one)

The only way to implement software that is truly resilient to security vulnerabilities like Log4Shell is to implement a
"Secure by Default" architecture. This is what companies, and
[the federal government](https://www.nextgov.com/cybersecurity/2021/09/biden-administration-releases-draft-zero-trust-guidance/185166/),
are migrating to now because it's the only strategy that protects you long-term.

Log4Shell is not going to be the last major vulnerability that you need to deal with. Any dependency you trust could 
also leave you vulnerable or unknowingly be malicious.  

Or your next commit adds a bug that leads to an exploit.

The list goes on.

The reasons hacks happen is because real-world software isn't perfect. The best lesson we've learned in our careers is 
that preventing every bug is an _impossible task_ for companies. After all, even the
[federal government](https://en.wikipedia.org/wiki/2020_United_States_federal_government_data_breach) has been hacked before. How do
you think your security compares to what the NSA had when they were breached last year?

### What is "Secure by Default"?

Short version: When you accept that you're eventually going to be hacked, and building software with multiple walls to prevent a 
single hole from giving an attacker the keys to your all of your data. Secure by Default software is designed to fail
predictably under attack.

Long version: We've written about this before in our post on 
[Why Data Breaches Happen](https://www.lunasec.io/docs/blog/how-data-breaches-happen-and-why-secure-by-default-software-is-the-future/).

We'd recommend giving that a read if you'd like to understand how to proactively protect yourself instead of panicing
whenever a security alert pops up. (And, if you're like us, you'll probably sleep better at night too.)

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

Thank you!

### Updates

1. Fixed some weird grammar.
