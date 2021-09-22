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
---
id: "hackerone-top-10-vuln-types"
title: "HackerOne Top 10 Vulnerability Types"
sidebar_label: "HackerOne Top 10 Vulnerability Types"
sidebar_position: 5
---

[HackOne Top 10 Most Impactful and Rewarded Vulnerability Types](https://www.hackerone.com/top-ten-vulnerabilities) (2020)

| Vulnerability | Description | LunaSec Mitigation |
| --- | --- | --- |
| Cross Site Scripting (XSS) | | [Cross Site Scripting](./vulns-and-mitigations.md#cross-site-scripting-xss) |
| Improper Access Control - Generic | | [Improper Access Control Mitigation](./vulns-and-mitigations.md#improper-access-control) |
| Information Disclosure | | [Information Disclosure Mitigation](./vulns-and-mitigations.md#information-disclosure) |
| Server-Side Request Forgery (SSRF) | | [Server Side Request Forgery Mitigation](./vulns-and-mitigations.md#server-side-request-forgery) |
| Insecure Direct Object Reference (IDOR) | | [Insecure Direct Object Reference Mitigation](./vulns-and-mitigations.md#insecure-direct-object-reference-idor) |
| Privilege Escalation | Increasing the identity&#39;s scope of permissions to be greater than they are allowed to be, as determined by the normal operation of the system. | The LunaSec Stack is designed to be tolerant of individual compromises, meaning privilege escalation in one component of the stack is not sufficient to gain access to sensitive information. |
| SQL Injection (SQLi) | | [SQLi Mitigation](./vulns-and-mitigations.md#sql-injection) |
| Improper Authentication - Generic | | [Improper Authentication Mitigation](./vulns-and-mitigations.md#improper-authentication) |
| Code Injection | | [Code Injection Mitigation](./vulns-and-mitigations.md#code-injection) |
| Cross-Site Request Forgery (CSRF) | | [CSRF Mitigation](./vulns-and-mitigations.md#cross-site-request-forgery-csrf) |
