---
id: "grants"
title: "Grants"
sidebar_label: "Grants"
sidebar_position: 5
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

 When permission has been given to a certain user to operate on a Token, we say that the Token is `granted`.
The Dedicated Tokenizer keeps a record of the short-lived `grants` that have been created.

When a Token is going to be _Detokenized_, your backend creates a _Detokenization Grant_ and passes the along to LunaSec.

When a plaintext value is going to _Tokenized_, the Tokenizer creates a _Token Store Grant_, stores it, and your
application _must_ verify that the _Token Store Grant_ is valid. (If it's not verified, it creates an attack oracle
which is outside the scope of this document.)
