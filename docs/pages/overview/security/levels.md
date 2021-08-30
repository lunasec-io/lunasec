---
id: "levels"
title: "Levels"
sidebar_label: "Levels"
sidebar_position: 3
---

## LunaSec Security Levels

| Level | Tokenizer | Authentication | Authorization | Cryptographic Environment |
| --- | --- | --- | --- | --- |
| 1 | Embedded | App | App | None |
| 2 | [Dedicated](../features.md#dedicated-tokenizer) | App | App | Tokenizer |
| 3 | [Dedicated](../features.md#dedicated-tokenizer) | [Auth Provider](../features.md#lunasec-secure-auth-proxy) | App | Tokenizer |
| 4 | [Dedicated](../features.md#dedicated-tokenizer) | [Auth Provider](../features.md#lunasec-secure-auth-proxy) | [Secure Functions](../features.md#secure-function) | Tokenizer |

### Level 1: Small Project

![level 1 config](/img/level-1-config.svg)

#### Pros

Security - Sensitive plaintext is no longer being passed around by the application. Tokens are used to identify information and the content is only resolved when explicitly needed.

Developer Experience - Almost no changes are needed to the code base.

#### Cons

Security - In the case of RCE in the application, the attacker will be able to have access to all sensitive information.

### Level 2: Small Team

![level 2 config](/img/level-2-config.svg)

#### Pros

Security - LunaSec Secure Frame is an iFrame served from another domain. It becomes very difficult for an attacker to exfiltrate the sensitive information entered and displayed in the secure components.

Developer Experience - Minimal configuration needed for significant security guarantees

#### Cons

Developer Experience - Another service is needed to be deployed and managed.

### Level 3: Business

![level 3 config](/img/level-3-config.svg)

#### Pros

Security - Auth Provider hardens the authentication for your existing application to access plaintext directly, a much more complicated attack scenario is required.

Developer experience - User management code is no longer needed to be maintained. A secure authentication provider manages identify of users on your platform.

#### Cons

Developer Experience - An additional service must be deployed and maintained

### Level 4: Enterprise

![level 4 config](/img/level-4-config.svg)

#### Pros

Security - Secure Functions are ephemeral virtual machines which, aside from a user&#39;s browser, will be the only other place that sensitive data can be accessed. These functions exist in isolated environments which greatly reduce the attack surface the code which interacts with sensitive information. Additionally, a specialized Secure Function can be created which will control authorization decisions for whether or not a user is able to access the plaintext for a given token.

Developer Experience - Centralized authorization greatly simplifies compliance requirements. Individual teams do not need to create and maintain authorization code outside of a single location.

#### Cons

Developer Experience - Depending on how authorization is currently implemented for your application, it can take some effort to onboard to a centralized authorization function.