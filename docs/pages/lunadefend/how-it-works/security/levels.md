---
id: "levels"
title: "Levels"
sidebar_label: "Levels"
sidebar_position: 3
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
## LunaDefend Security Levels

| Level | Tokenizer | Authentication | Authorization | Cryptographic Environment |
| --- | --- | --- | --- | --- |
| 1 | Embedded | App | App | None |
| 2 | [Dedicated](/pages/lunadefend/how-it-works/features#dedicated-tokenizer) | App | App | Tokenizer |
| 3 | [Dedicated](/pages/lunadefend/how-it-works/features#dedicated-tokenizer) | [Auth Provider](/pages/lunadefend/how-it-works/features#lunasec-secure-auth-proxy) | App | Tokenizer |
| 4 | [Dedicated](/pages/lunadefend/how-it-works/features#dedicated-tokenizer) | [Auth Provider](/pages/lunadefend/how-it-works/features#lunasec-secure-auth-proxy) | [Secure Functions](/pages/lunadefend/how-it-works/features#secure-function) | Tokenizer |

### Level 1: Simple Tokenizer

![level 1 config](/img/level-1-config.svg)

#### Pros

Security - Sensitive plaintext is no longer being passed around by the application. Tokens are used to identify information and the content is only resolved when explicitly needed.

Developer Experience - Almost no changes are needed to the code base.  Compatible with any frontend framework.

#### Cons

Security - In the case of a Remote Code Execution(RCE) in the frontend or backend, the attacker will have access to sensitive information.

#### Suitable For
Small team, compliance focused security.

### Level 2: Dedicated Tokenizer and Existing Auth

![level 2 config](/img/level-2-config.svg)

#### Security
 LunaDefend Secure Frame is an iFrame served from another domain. It becomes very difficult for an attacker to exfiltrate the sensitive information entered and displayed in the secure components.
 Your application's session management is a point of attack because LunaDefend has to trust it.

#### Developer Experience 
Deployment of a dedicated tokenization server and replacement of frontend components with secure components, only certain frontend frameworks supported.

#### Suitable For
Small to mid-size team in need of hardened security.

### Level 3: Dedicated Tokenizer with Authentication Provider

![level 3 config](/img/level-3-config.svg)

#### Security
Auth Provider hardens the authentication and session management for your existing application to access plaintext directly, very difficult to attack.  

#### Developer Experience
User management code such as signup pages and session management is no longer needed, it comes from the auth provider. 
The auth provider is an additional service that must be configured and deployed.

#### Suitable For
Enterprises and government organizations in need of very robust security

### Level 4: All of the above with Secure Function support 

![level 4 config](/img/level-4-config.svg)

#### Security 
Secure Functions are ephemeral virtual machines which allow serverside access to secure data. 
These functions exist in isolated environments which greatly reduce the attack surface the code which interacts with sensitive information. 
Additionally, a specialized Secure Function can be created which will control authorization decisions for frontend detokenization.

#### Developer Experience 
Centralized authorization greatly simplifies compliance requirements. 
Individual teams do not need to create and maintain authorization code outside of a single location.  
Security auditors can quickly audit just the small pieces of code that run in the Secure Function.

#### Suitable For
Enterprises and government organizations in need of the most robust security solution, especially where serverside processing of sensitive data is required
