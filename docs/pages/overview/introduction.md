---
id: "introduction"
title: "Introduction"
sidebar_label: "Introduction"
---
## What is LunaSec?
The LunaSec Stack makes it easy and secure to work with sensitive data in web applications.

At its core, LunaSec tokenizes your data, allowing the data to be encrypted at rest while the token is passed throughout your application.
The LunaSec Stack provides libraries, services, and tools which build upon the secure properties of tokenization to allow fine-grained control over when
and where your sensitive data _is capable of ever being accessed_. 

LunaSec products are designed to drop in to existing apps with minimal code changes. By reducing friction to include secure LunaSec components,
it becomes trivial to prevent a single vulnerability from compromising your entire system.

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
Most security tools are hard to use, closed source, or both.

We designed LunaSec to be simple to use for normal developers without an advanced understanding of software security or cryptography.
LunaSec does its best to provide clean and easy APIs, ship with plenty of examples and docs, and will always be _open source_ so that you can debug or fix problems yourself.

Most of the security vendor software we've used takes months to get onboarded with due to a lengthy sales process.
After signup, you can be blocked when the black box VM image they give you ships with bugs.
You can't patch the bugs because you don't have the source code. You're stuck.

We've seen some security vendors move away from VM images towards "hosted SaaS" solutions instead.
Unfortunately, these solutions are often worse because they don't live in your infrastructure.
You can't run it on your laptop or in your CI for testing. And, if they have downtime or bad performance, your software inherits those problems too.
They're still black boxes.

We believe that open source is the right choice for production software.

#### No Proxy Required
No more dealing with "security proxies" that require manually updating HTTP request schemas in a Web UI every time a new field is added to an endpoint.
LunaSec works as a "sidecar" in your front-end _and_ backend to provide security.
That means, if your LunaSec instance is down, it won't instantly break your entire app. It will gracefully degrade. (Like real production software should!)

#### Your configuration lives in your code
Store all configuration files in source control so that you can perform meaningful code reviews + track history.
This also lets you test your changes in CI _before_ they roll out to production.
You don't need to tweak any dashboard settings when deploy rolls out, the changes go with your code.

#### Development === Production
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