---
id: "introduction"
title: "Introduction"
sidebar_label: "Introduction"
sidebar_position: 1
---

## What is LunaSec?
LunaSec makes it easy and secure for applications to process and store sensitive data through *Tokenization*. 

Sensitive data is exchanged for a non-sensitive token that is meaningless by itself.  It must be exchanged
for the real data with API call in a process called *Detokenization*.

This isn't new. It's commonly used by companies for compliance purposes and there are many tokenization 
products on the market. LunaSec is more secure, offers more features, and the core of the system is free and open source.

LunaSec can quickly help an app become secure and compliant with regulations.

A list of features can be found [here](../features).

## How does LunaSec work with my app?
LunaSec provides simple-to-use libraries and a backend server to keep sensitive data out of your app.
These were designed by security engineers to drop in to existing apps with minimal code changes.
That way you don't need to audit or rewrite everything from scratch to become secure and compliant.  The parts of the system
that touch sensitive data will have already been secured and audited by our team.

We've designed onboarding with LunaSec to happen in levels. You can add basic tokenization
today by just [adding a few lines](../libraries-services), and 
additional [enterprise-grade security modules](../security/levels) can be added to the system later.

If you're unsure of what level of security you need, please [contact us](https://www.lunasec.io/contact) and we'll be 
happy to help you! We offer paid, professional support to accelerate onboarding time and to ensure your deployment
meets your security goals.

## Example: Building a site that stores sensitive information
A user on your site might need to upload information like their Social Security Number, a copy of their photo ID, or maybe a PDF containing both.

Now, let's say a ransomware hacker gets some of that secret information through any of these common vulnerabilities:
- SQL injection attack,
- Misconfigured database access,
- Database backups are stolen,
- A malicious library module is added,
- A vulnerability in the database, the operating system, or any other code you depend on
- Cross Site Scripting(XSS)
- Any user with database access shares data (intentionally or unintentionally).

Using LunaSec the data is entered and stored separately from your main application, even on the frontend.  You store in the database a token
like this: `lunasec-351d1033-0e9f-4a1b-bbb6-adec04837a5c`.  Instead of the sensitive text or file, the attacker gets that token, 
and there's not much they can do with it. The token is not the full decryption key, only part of it.  The other required pieces can
only be accessed from within the Dedicated Tokenizer Service, where authentication for the user can be checked, audit logs can be produced, 
and keys can be rotated if necessary.  

LunaSec provides controls for where and by whom those tokens can be exchanged for sensitive data.  An attacker with the token can't get
past those unless they compromise multiple parts of the system which been designed by our team to be hardened against attack.

## Who is LunaSec for? 
LunaSec is designed for developers building software that needs to store sensitive data and operate in real-world, production environments.

Our open source software can be used to enhance the security of new or existing applications, and is designed for production
use cases that require high availability and scalability by default.

Software security is often overlooked or deemed too difficult/expensive to implement properly. By isolating sensitive parts of the application, LunaSec
helps developers protect sensitive information without having to worry about the security of every line
they write or library they import.

If you've ever been hacked or struggled with lengthy security reviews, painful compliance requirements, or otherwise jumped through
hoops for "data security" or "compliance", then it's likely that LunaSec can help you.

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

LunaSec is a largely open-source piece of software that you can host, change, and extend as needed.

#### No Proxy Required
LunaSec is not a proxy. There is no schema of sensitive fields to maintain, that configuration is in your code.

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