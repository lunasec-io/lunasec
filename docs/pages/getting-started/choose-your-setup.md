---
id: "choose-your-setup"
title: "Setup Choice"
sidebar_label: "Choose Your Setup"
---

# Choose your Setup

There are two main ways to use LunaSec tokenization in your app:

* **[Dedicated Tokenizer](../full-setup/getting-started.md)** - Full security with a deployed service
* **[Simple Tokenizer](../simple-tokenizer/guide.md)** - Limited security with an embedded typescript library

Most of LunaSec's modules(like the React SDK) are designed to work with the Dedicated Tokenizer server. It provides the strongest security guarantees and the most features.  Using it is recommended.

### Who should use the simple tokenizer?
The full tokenizer requires deployed infrastructure, and 
while we've made that as [simple as possible for you TODO: LINK TO DEPLOYMENT DOCS](link.to.deploy.docs), it may be more than 
some users need.  So, we extracted the core functionality of creating and retrieving tokens into a small express plugin
that adds two routes to your server, and a small library to access them from the browser.  Unlike the Dedicated Tokenizer, 
sensitive data is handled in the same process as your app, offering far less security guarantees. This is comparable to many
of the other tokenization solutions on the market, and is enough to meet many compliance regulations.

