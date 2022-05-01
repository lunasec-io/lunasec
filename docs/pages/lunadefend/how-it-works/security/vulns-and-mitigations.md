---
id: "vulns-and-mitigations"
title: "Vulnerabilities and Mitigations"
sidebar_label: "Vulnerabilities and Mitigations"
sidebar_position: 4
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
## LunaDefend Mitigations for Common Security Vulnerabilities

The LunaDefend Stack not only provides a compliant data storage solution, but also an answer for common security vulnerabilities attacker will attempt to use against your web application.

### Cross Site Scripting (XSS)

#### Description

&quot;XSS vulnerabilities are extremely common and hard to eliminate, even for organizations with the most mature application security. XSS vulnerabilities are often embedded in code that can impact your production pipeline.&quot; - [HackerOne](https://www.hackerone.com/top-ten-vulnerabilities)

#### Mitigation

The biggest concern with XSS in terms of sensitive data is when an attacker is able to exfiltrate the data from a page that the user loads. Modern applications are constantly growing with new pages being added to them every day, making it challenging to fully &quot;trust&quot; a web page, even if it is one that your company owns. Starting with LunaDefend&#39;s Level 2 security model, even if an attacker is able to execute an XSS attack in the context of a page, exfiltrating the actual sensitive information becomes virtually impossible as the information is isolated from the page in a secure iFrame.

### Improper Access Control

#### Description

An access control is a security rule which, based on the requesting identity, restricts usage of a resource. When the rule is too permissive, a calling identity, who should not be able to have access to the resource, will successfully be able to access the resource.

#### Mitigation

LunaDefend provides a system for creating **grants** to allow different calling identities to interact with tokenized information. In the security Levels 1-3, tokens must be manually granted access to. However, with LunaDefend&#39;s Level 4 configuration and up, an isolated, centralized authorization server is available to abstract this requirement away and provide proper authorization checks by default in an application.

### Information Disclosure

#### Description

An application which allows a calling identity being able to successfully access information not intended to be accessible as defined in desired business logic.

#### Mitigation

LunaDefend, at its core, uses tokenization. An application which stores tokens instead of sensitive information **will not leak sensitive data** in the event of an information disclosure vulnerability. Instead, the attacker will only gain access to the tokens which are meaningless by themselves. The attacker will have to further compromise the LunaDefend Stack in order to gain access to the token&#39;s sensitive information.

### Server-Side Request Forgery

#### Description

&quot;In a Server-Side Request Forgery (SSRF) attack, the attacker can abuse functionality on the server to read or update internal resources.&quot; - owasp

Modern cloud infrastructure is particularly vulnerable to SSRF attacks due to the fact that the attack surface of a company&#39;s internal network is ever growing. Without proper service to service authorization, an SSRF could result in a critical vulnerability.

#### Mitigation

A SSRF is generally a lesser known vulnerability among developers which can spell disaster when modern cloud infrastructure means an internal network of a company is constantly growing. LunaDefend services are hardened on the network by allowing the least possible permissions and rooting their trust in the authentication server. With such protections for sensitive data stored in the LunaDefend Stack, in the case that an SSRF vulnerability exists, the sensitive data will be protected.

### Insecure Direct Object Reference (IDOR)

#### Description

A form of Improper Access Control where a user input is used to directly access an object from an application. Typically, the provided value is an identifier which points to some object the user does not have authorization to view.

#### Mitigation

IDORs become abundant in code when authorization code becomes fragmented and not enforced at a higher level in an application (ex. route middleware). When using a LunaDefend Secure Authorizer, authorization decisions are performed at the time of detokenization. This in turn greatly decreases the possible code locations where your access controls can be misconfigured.

### SQL Injection

#### Description

User controlled input is placed into an SQL query without any sanitization. Without differentiating the attacker&#39;s data from the query itself, the executed query&#39;s operations are influenced by the attacker. The queried data could include data the user is not authorized to view. In some cases, the attacker can execute SQL statements to modify the state of the database.

#### Mitigation

LunaDefend mitigates the impact of SQL injection just as it does with **Information Disclosure**. By using tokens to represent sensitive information, gaining access to the tokens themselves is not sufficient for an attacker to actually view the sensitive information.

### Improper Authentication

#### Description

When authentication is not enforced at a higher level of application, it can become fragmented leading to different approaches to verifying the identity of a user. Authentication can be mistakenly omitted from sensitive parts of an application leading to other vulnerabilities such as **Information Disclosure** or **IDORs**.

#### Mitigation

With the Level 3 and up LunaDefend security configuration, an Authentication Provider setup in front of your application easily enforces proper authentication. Additionally, to be able to detokenize sensitive data, an authenticated session is required.

### Code Injection

#### Description

User controlled input being passed into an executable context can influence what operations are performed by an application. Code Injection can lead to Remote Code Execution, which is typically considered the highest severity vulnerability. **SQLi** is a specific type of **Code Injection**.

#### Mitigation

Each level of the LunaDefend Stack **increases security by decreasing scope of your application**. By separating out the parts your application dealing with authentication and authorization, code injection in the application itself would still not be sufficient in gaining access to be able to detokenize sensitive data.

### Cross Site Request Forgery (CSRF)

#### Description

Consider two websites: a Company site and Attacker site. A CSRF vulnerability exists when a component on the Company&#39;s site can be included on the Attacker&#39;s site and a victim loads the Attacker&#39;s site resulting in some unintended action being performed on the Company&#39;s site. The action being performed on the Company&#39;s site is said to be _forged_, as the victim did not intend for it to happen.

#### Mitigation

The properties of the LunaDefend Secure Frame make CSRFs not possible. Since the Secure Frame is the only way to view protected content, even if a CSRF exists in the application, it will not be able to affect the Secure Frame.

### Using Components with Known Vulnerabilities

#### Description

Components, such as libraries, frameworks, and other software modules, run with the same privileges as the application. If a vulnerable component is exploited, such an attack can facilitate serious data loss or server takeover. Applications and APIs using components with known vulnerabilities may undermine application defenses and enable various attacks and impacts.

#### Mitigation

Vulnerabilities in third party libraries are of great concern to any organization. Not having visibility into the nested web of code that powers your applications is a breach waiting to happen. Sandboxing the execution of third party code as much as possible is a method for significantly reducing security risk. LunaDefend Secure Functions isolate execution of code into ephemeral virtual machines with a configurable network ruleset to only allow specific inbound and outbound traffic.