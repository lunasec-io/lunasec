---
id: "owasp-top-10"
title: "OWASP Top 10"
sidebar_label: "OWASP Top 10"
sidebar_position: 6
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
[OWASP Top 10](https://owasp.org/www-project-top-ten/) (2017)

| Vulnerability | Description | LunaDefend Mitigation |
| --- | --- | --- |
| Injection | Injection flaws, such as SQL, NoSQL, OS, and LDAP injection, occur when untrusted data is sent to an interpreter as part of a command or query. The attacker&#39;s hostile data can trick the interpreter into executing unintended commands or accessing data without proper authorization. | (See [SQLi](/pages/lunadefend/how-it-works/security/vulns-and-mitigations#sql-injection) and [Code Injection](/pages/lunadefend/how-it-works/security/vulns-and-mitigations#code-injection) Mitigation |
| Broken Authentication | Application functions related to authentication and session management are often implemented incorrectly, allowing attackers to compromise passwords, keys, or session tokens, or to exploit other implementation flaws to assume other users&#39; identities temporarily or permanently. | See Improper Authentication on this list |
| Sensitive Data Exposure | Many web applications and APIs do not properly protect sensitive data, such as financial, healthcare, and PII. Attackers may steal or modify such weakly protected data to conduct credit card fraud, identity theft, or other crimes. Sensitive data may be compromised without extra protection, such as encryption at rest or in transit, and requires special precautions when exchanged with the browser. | [Information Disclosure Mitigation](/pages/lunadefend/how-it-works/security/vulns-and-mitigations#information-disclosure) |
| XML External Entities (XXE) | Many older or poorly configured XML processors evaluate external entity references within XML documents. External entities can be used to disclose internal files using the file URI handler, internal file shares, internal port scanning, remote code execution, and denial of service attacks. | See Insecure Deserialization on this list |
| Broken Access Control | Restrictions on what authenticated users are allowed to do are often not properly enforced. Attackers can exploit these flaws to access unauthorized functionality and/or data, such as access other users&#39; accounts, view sensitive files, modify other users&#39; data, change access rights, etc. | [Improper Access Control Mitigation](/pages/lunadefend/how-it-works/security/vulns-and-mitigations#improper-access-control) |
| Security Misconfigurations | Security misconfiguration is the most commonly seen issue. This is commonly a result of insecure default configurations, incomplete or ad hoc configurations, open cloud storage, misconfigured HTTP headers, and verbose error messages containing sensitive information. Not only must all operating systems, frameworks, libraries, and applications be securely configured, but they must be patched/upgraded in a timely fashion. | The LunaDefend Stack is designed to be as secure as possible for each level of configuration. Higher security levels provide more security guarantees by default, therefore decreasing the risk of a vulnerable default configuration. |
| Cross-Site Scripting XSS | XSS flaws occur whenever an application includes untrusted data in a new web page without proper validation or escaping, or updates an existing web page with user-supplied data using a browser API that can create HTML or JavaScript. XSS allows attackers to execute scripts in the victim&#39;s browser which can hijack user sessions, deface web sites, or redirect the user to malicious sites. | [Cross Site Scripting Mitigation](/pages/lunadefend/how-it-works/security/vulns-and-mitigations#cross-site-scripting-xss) |
| Insecure Deserialization | Insecure deserialization often leads to remote code execution. Even if deserialization flaws do not result in remote code execution, they can be used to perform attacks, including replay attacks, injection attacks, and privilege escalation attacks. | In a large codebase with different instances where deserializing data is performed, it can be very difficult to protect against this vulnerability. LunaDefend Secure Functions can sandbox potentially insecure operations such as deserializing files into memory. In the case that a vulnerability exists, an attacker would find themselves in an isolated environment with next to no additional attack surface to attempt to further exploit. |
| Using Components with Known Vulnerabilities | | [Using Components with Known Vulnerabilities Mitigation](/pages/lunadefend/how-it-works/security/vulns-and-mitigations#using-components-with-known-vulnerabilities) |
| Insufficient Logging &amp; Monitoring | Insufficient logging and monitoring, coupled with missing or ineffective integration with incident response, allows attackers to further attack systems, maintain persistence, pivot to more systems, and tamper, extract, or destroy data. Most breach studies show time to detect a breach is over 200 days, typically detected by external parties rather than internal processes or monitoring. | Storing sensitive data with LunaDefend makes it simple to observe all activity associated with your application&#39;s sensitive data. LunaDefend logs all actions related to tokenization and detokenization making it easy to investigate any incident regarding sensitive information. |
