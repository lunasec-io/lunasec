---
id: "introduction"
title: "Introduction"
sidebar_label: "Introduction"
sidebar_position: 1
---

## What is LunaSec?
LunaSec makes it easy and secure for applications to process and store sensitive data through a process
known as "Tokenization". 

When data is "Tokenized" it is exchanged for a non-sensitive "Token". By itself, a token is a meaningless value.
It is a random identifier only used to reference the encrypted data that is stored by LunaSec. You need to exchange
a token with an API call in a process called "Detokenization".

This process isn't new. It's commonly used by companies for compliance purposes and there are many tokenization 
products on the market. But, where most products stop at using tokenization for compliance, LunaSec goes further by 
leveraging tokenization as a "primitive" for adding additional layers of security.

Tokenization provides a means to "bootstrap" the rest of the LunaSec Stack. This enables you to gradually harden 
the rest of your system's security over time by onboarding additional LunaSec components when you need them. 
Read more about what features we offer [here](https://www.lunasec.io/docs/pages/overview/features/).

## How does LunaSec work with my app?
LunaSec products were designed by Security Engineers to drop in to existing apps with minimal code changes.
That way you don't need to rewrite everything from scratch in order to meet your security goals.

We've designed onboarding with LunaSec to happen in levels. You can add basic tokenization
today by just [adding a few lines](https://www.lunasec.io/docs/pages/overview/libraries-services/), and our 
additional [enterprise-grade security modules](https://www.lunasec.io/docs/pages/overview/security/levels/) can be
layered on top based on your security requirements. You pick what level of security you need today _or_ tomorrow.

If you're unsure of what level of security you need, please [contact us](https://www.lunasec.io/contact) and we'll be 
happy to help you! We offer paid, professional support to accelerate onboarding time and to ensure your deployment
meets your security goals.

## Example: Building an eCommerce App
Let's say you were building a website where you sold goods to users. A user would need to upload information like their
home address, their credit card number, or (for age restricted products) a copy of their photo ID.

By directly storing this information in your database, without any encryption, you put all of your customers at risk.
Any single security issue that results in your database being exposed is now, by default, exposing sensitive customer data.

Examples of possible security issues:
- Any SQL injection attack,
- Misconfigured database access,
- Database backups are stolen,
- A malicious library is added,
- A vulnerability in the database, the operating system, or any other code you depend on,
- Any user with database access shares data (intentionally or unintentionally).

With Tokenization, you would mitigate these security issues by replacing a value in your database with a token
like this: `lunasec-351d1033-0e9f-4a1b-bbb6-adec04837a5c`. This is all an attacker would see. The data is meaningless.

Now, in order to gain access to the sensitive data, you must go through the "detokenization" flow. By default,
any individual security issue no longer directly "leaks" data. You must _also_ be able to call the Tokenizer.

But, you might ask, what about if an attacker just calls the Tokenizer directly? Isn't this all moot?

That's where the LunaSec Stack really shines:
On the front end, cross-domain iFrames dubbed **Secure Frames** handle the creation and display of
sensitive field. Then, on the backend, sensitive data is handled inside of secure enclaves known as **Secure Resolvers**
(these are hardened containers running without network access by default).

Okay, but what if the Tokenizer gets hacked? Isn't this _still_ all moot?

In order to answer that question, please go read through our [Security Documentation](https://www.lunasec.io/docs/pages/overview/security/introduction/).
(Spoiler: The Tokenizer can be completely hacked and still not leak data because detokenization requires tokens.)

We're a team of Security Engineers and we've spent months directly debating amongst ourselves (and working with early users)
to make this all possible. If this is exciting for you, please throw us a GitHub star and share your thoughts with us at
developer-feedback at lunasec dot io -- We'd love to hear from you!

## Who is LunaSec for? 
LunaSec is designed for developers building software that needs to store sensitive data and operate in real-world, production environments.

Our open source software can be used to enhance the security of new or existing applications, and is designed for production
use cases that require high availability and scalability by default.

Software security is often overlooked or deemed too difficult/expensive to implement properly. By isolating sensitive parts of the application, LunaSec
helps developers protect sensitive information without having to worry about the security of every line
they write or library they import.

If you've ever struggled with lengthy security reviews, painful compliance requirements, or otherwise jumped through
hoops for "data security" or "compliance", then you'll likely be interested in what LunaSec offers.

## Why is LunaSec better?
Most security tools are hard to use, closed source, or both. We believe that open source is the best choice for production software.

We designed LunaSec to be simple to use for normal developers without an advanced understanding of software security or cryptography.
LunaSec does its best to provide clean and easy APIs, ship with plenty of examples and docs, and will always be _open source_ so that you can debug or fix problems yourself.

Most of the security vendor software we've used takes months to get onboarded with due to a lengthy sales process.
After signup, you can be blocked when the black box VM image they give you ships with bugs.
You can't patch the bugs because you can't change the source code. You're stuck.

We've seen some security vendors move away from VM images towards "hosted SaaS" solutions instead.
Unfortunately, these solutions are often worse because they don't live in your infrastructure.
You can't run it on your laptop or in your CI for testing. And, if they have downtime or bad performance, your software inherits those problems too.
They're still black boxes.

#### No Proxy Required
No more dealing with "security proxies" that require manually updating HTTP request schemas in a Web UI every time a new field is added to an endpoint.
LunaSec works as a "sidecar" in your front-end _and_ backend to provide security.
That means, if your LunaSec instance is down, it won't instantly break your entire app. It will gracefully degrade. (Like real production software should!)

#### Your configuration lives in your code
Store all configuration files in source control so that you can perform meaningful code reviews + track history.
This also lets you test your changes in CI _before_ they roll out to production.
You don't need to tweak any dashboard settings when deploy rolls out, the changes go with your code.

#### Development == Production
Your development environment will be one-to-one with your production environment, because LunaSec runs in both.  Our scripts 
will set up AWS Localstack automatically, meaning the whole system can run on your development machine with next to no setup, 
you don't even need internet access.
No more chasing bugs that only exist in production, or tunneling your dev instance to production because you can't host locally.

#### Works with GraphQL and Express natively (or gRPC)
Our library integrates with Express and GraphQL natively, and can be extended to work with any protocol.

## Who wrote it?
All software is supported by the LunaSec company. We are a Venture-funded, YCombinator-backed company founded in 2019 and based in Seattle, WA.

The LunaSec Stack is composed of many Open Source products that are designed and maintained by the Security Engineers at LunaSec.  We built them using the lessons we learned working as Security Engineers at Uber, Snapchat, Capital One,
and from our experience helping 50+ other YCombinator startups level up their security.