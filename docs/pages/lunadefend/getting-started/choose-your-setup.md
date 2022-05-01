---
id: "choose-your-setup"
title: "Setup Choice"
sidebar_label: "Choose Your Setup"
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
## Choose your Setup

There are two main ways to use LunaDefend tokenization in your app:

* **[Dedicated Tokenizer](./dedicated-tokenizer/introduction.md)** - Full security with a deployed backend service
* **[Simple Tokenizer](./simple-tokenizer/guide.md)** - Limited security with an embedded Typescript library

Most of LunaDefend's modules(like the React SDK) are designed to work with the Dedicated Tokenizer Backend. It provides the strongest security guarantees and the most features.  Using it is recommended.

### Who should use the simple tokenizer?
The full tokenizer requires deployed infrastructure, and 
while we've made that as [simple as possible](../deployment/deploy.md), it may be more than 
some users need.  So, we extracted the core functionality of creating and retrieving tokens into a small express plugin
that adds the `/tokenize` and `/detokenize` routes to your server, and a small library to access them from the browser. 

Like the Dedicated Tokenizer, sensitive 
data is still stored separate from your application in S3.  Unlike the Dedicated Tokenizer, 
control over that data is handled in the same process as your app, offering far less security guarantees. This is comparable to many
of the other tokenization solutions on the market, and is enough to meet many compliance regulations.  

The Simple Tokenizer is really a 
separate system than the rest of the LunaDefend Stack.  Most of the concepts covered elsewhere in this documentation don't apply to it,
it's just a small and simple pair of libraries(client and server) to do basic tokenization.  

