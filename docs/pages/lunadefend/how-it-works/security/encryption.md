---
id: "encryption"
title: "Encryption"
sidebar_label: "Encryption"
sidebar_position: 2
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
## How LunaDefend Tokens are encrypted

Inside the Dedicated Tokenizer, storage keys are generated for every record stored.  The Token that your system sees is just
part of what's needed to decrypt that data.

The cryptographic system for encrypting sensitive records was designed to be as simple as possible for someone to use without compromising
on security.

One of the most important attributes of a secure system is not having a single source of failure. This can be challenging when 
the goal of the design is to be simple. In other words, it would not be acceptable for the design to send the encryption key used to 
encrypt the ciphertext back to the caller to avoid having the ciphertext and encryption key stored in the same system.

In the LunaDefend Token crypto system, information for looking up a ciphertext and encryption key given a token is _deterministically generated_ using the token itself. 
A signed S3 URL configured to use [AWS's Server Side Encryption](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerSideEncryptionCustomerKeys.html) is used
for when uploading and downloading the ciphertext from S3.

At a high level, the ciphertext and corresponding encryption key are stored in separate databases, both encrypted.
When a token is to be detokenized, the token and a secret (only known to the tokenizer) are used to generate deterministic
values which are used to lookup the ciphertext and encrypted encryption key. The encrypted encryption key is decrypted with
a deterministically generated key.

![encryption](/img/encryption.svg)

With this design, an attacker, even with both ciphertext and encryption key databases, would not be able to determine a
ciphertext's corresponding encryption key without additionally having a database with all the tokens. Requiring multiple
points of compromise greatly reduces the likelihood of a data compromise.
