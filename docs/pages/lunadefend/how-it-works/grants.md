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

Grants are a way of locking the permission to use a token to a user's session.

When permission has been given to a certain user to read or store a token, we say that the Token is "granted".
The Dedicated Tokenizer keeps a record of the short-lived `grants` that have been created, and what session they are connected to.

### Granting
Grants are created by your application server when tokens are request by the client.  For instance, if your browser is trying to load a
`user` object and one of the fields is a token, you must create a grant for that token as explained in a the [Getting Started guide](/pages/lunadefend/getting-started/dedicated-tokenizer/backend-setup/#checking-grants).

Tokens grants must also be checked when tokens are uploaded, because otherwise an attack could steal a token and upload one to their own session,
then download it and have permission to read it.  

### Short Duration
The short expiration of the grant is critical to security.  The default expiration time is 15 minutes.  This can cause issues with
applications that might need to detokenize a token more than 15 minutes after it was loaded from your server.  Grant duration 
[can be customized](/pages/lunadefend/node-sdk/classes/Grants/)
during creation if you find that you need a longer duration, up to your configured maximum.

The default duration and maximum duration can be configured in your `lunadefend.js` [config file](/pages/lunadefend/cli-config/interfaces/DeploymentConfigOptions/), 
in the grants options. 

### Alternatives
Grants are simple to use but have some drawbacks, because they place trust in the security of your backend server.  
[Secure Authorizers](/pages/lunadefend/how-it-works/features/#lunasec-secure-authorizers)
are in development, which will be small lambdas that deploy along with your code that are responsible for granting token permissions, just-in-time.
