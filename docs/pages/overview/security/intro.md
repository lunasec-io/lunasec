---
id: "introduction"
title: "Introduction"
sidebar_label: "Introduction"
sidebar_position: 1
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
![security model overview](/img/security-model-overview.svg)

The LunaSec Stack creates trusted contexts in which sensitive data can be stored and/or processed. This is achieved through
libraries and services, which are integrated into your application, working together through secure communication channels.

To understand how data is encrypted at rest with the LunaSec Tokenizer, you can check out [How LunaSec Tokens are encrypted](./encryption.md).

There are multiple configurations of the stack which allow for a flexible onboarding experience based on your organization's needs.
To understand the different levels available and what their advantages are, check out [LunaSec Security Levels](./levels.md).

Each component of the LunaSec Stack assists in protecting against common security vulnerabilities. To understand how the stack
works together to achieve this, check out [LunaSec Mitigations for Common Security Vulnerabilities](./vulns-and-mitigations.md).