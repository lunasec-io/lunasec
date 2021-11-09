---
title: How to build an Open Source Business in 2021 (Part 1)
description: A step-by-step guide to build an Open Source Business from scratch. slug:
how-to-build-an-open-source-business-in-2021-part-1 authors:

- name: Free Wortley title: Founder of LunaSec url: https://github.com/freeqaz
  image_url: https://github.com/freeqaz.png
  tags: [open-source, business, startup, 2021]

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

In this post, I will be sharing my journey with how I came up with the approach we used to build the business
behind [LunaSec](https://github.com/lunasec-io/lunasec).

There are a number of different ways to build a business, and none of them are a one-size-fits-all solution. For
LunaSec, I chose to use an [Open Source](https://en.wikipedia.org/wiki/Open_source)
approach to distributing our product and reaching our customers.

In this series, I'm going to work through my thought process about Open Source business and the steps I followed to
build LunaSec. My goal is to help teach others about Open Source businesses by helping you understand the steps
involved, the tradeoffs you make by choosing Open Source, and by overall giving you an intuition to help evaluate if
Open Source is the right approach for your business.

The series will be split up into a series of different posts, each one focusing on a different part of the process.

<!--truncate-->

## Part 1: Software Pricing Models

Over the years, the software industry has evolved and the simple distribution models of yesterday have evolved along
with it. Gone are the days of simple brick-and-mortar software purchases, instead having been replaced by more complex
pricing models like by-the-hour cloud-based software, per-seat subscriptions, and custom "Enterprise" contracts.

Open Source represents one of the modern shifts in software pricing by bringing a more flexible, more adaptable approach
to address the complexity of modern software development practices. It's not all rainbows and unicorns though. There are
real tradeoffs to be aware of when choosing to use Open Source for a business.

To help understand the tradeoffs, I will be breaking down the pricing models into a few categories:

- **Brick-and-Mortar**: The traditional approach to software development, where you purchase a license and pay for the
  software. Old school and rarely used anymore.
- **License-Based**: A more flexible approach where you buy a license and, optionally, pay for specific features you
  use. Often combined with the Shareware or Freemium distribution models.
- **Custom/Enterprise**: A top-down sales model for software that requires very custom integration work that is unique
  per customer, requires a lot of upfront or custom work, and that is not easily repeatable.
- **Cloud-Based**: The approach to software development where you purchase a license and pay for the software, but also
  pay for the infrastructure that powers the software. You don't manage the software or the infrastructure.
- **Open Source**: Distributed for free, with no licensing or payment required, but also without any support or
  maintenance guarantees. Software may be modified, improved upon, and resold by anyone and is not locked to a specific
  customer.

Below, I will walk through a brief history of the evolution of software pricing from the early days of the software
industry to today. It's not a complete history, nor is it 100% accurate, but it's a good starting point to understand the
different pricing models and to help build your intuition for developing your own pricing model.

### The First Software Companies

Many years ago, before the internet, when you wanted to start a software business, you followed a simple set of steps:

* You wrote some code and compiled it into a binary,
* You printed it to a physical CD-ROM disk using an expensive machine,
* And then you sold individual copies of it on the shelf at a store or via the mail.

Sales were usually on a fixed-price basis: Your physical copy represented your license to use the software. It wasn't
possible to duplicate the software disks without specialized hardware ($1,000+), so piracy wasn't a major concern.
Physical possession was a sufficiently difficult challenge to overcome, so companies just sold boxes of software in
stores.

Because of this, software businesses were simple and closely represented traditional business models. Software purchases
happened like they would for physical goods. You bought a hammer just like you bought a copy of Microsoft Word by simply
visiting a store and grabbing it off of the shelf.

This approach is simple and easy to understand, but it has a few downsides.

*First*: It's expensive. You have to pay to build a hammer every time you want to sell one. That means, to sell 10,000
copies of your software, you also have to create, package, and distribute 10,000 copies. That's a non-trivial amount of
work.

*Second*: Piracy started becoming an issue for companies. It became simple for your friend to give you a copy of their
software, thereby hurting the company's sales.

Some companies were able to combat this by adding in copy-protection mechanisms (early DRM), but these would eventually
be circumvented by skilled individuals. It was an uphill battle for companies to try to overcome this problem.

*Third*: Customer Support. It's impossible to authorize users that call in for support when you can't verify that the
user paid for the software.

As a company, it's expensive to give phone support to a user because it requires a human to be present. You simply
couldn't afford to pay for phone support for a user that didn't pay for the software.

### The Creation of Software Licenses
Over time, these became problems with the physical "Brick-and-Mortar" method of selling software forced a new pricing
model to be adopted. This new model is often referred to as the "Software Licensing" pricing model.

The idea is still fairly simple: Instead of selling software on the shelf, software companies now started selling codes
that allowed you to use the software. Possession of the code was all that a user requires to authorize them as the owner
of the software. If a code was shared too many times the code be considered "stolen" and the license would be revoked,
and companies could leverage the moment to sell copies of the software to any customers calling in without a valid
license.

This license-based model, coupled with the advent of the internet, created new ideas for software distribution like
[Shareware](https://en.wikipedia.org/wiki/Shareware) and [Freemium](https://en.wikipedia.org/wiki/Freemium). You could
download software from the internet, try software for free, and only buy a license if you liked or needed more features.

This didn't get rid of all piracy -- consumers could just use their friend's keys and call in as in their friend -- but
it did remove most of the financial burden for them to provide support to pirate. And, as a second order effect, it also
made it harder for companies to get away with buying only one copy of the software for all of their employees to use.
Now, for any companies purchasing software, they would have to purchase one copy of the software for each employee or
for each computer. They could no longer just buy one copy for everybody to use.

Switching to the License-based model also helped to solve the distribution problem: Businesses could install software on
computers using a single disk or downloaded copy, and then they could purchase license keys directly from the software
company via the phone. No more physical copies of the software had to be produced every time another copy of the
software was purchased, and, because physical copies cost money, the software companies benefited from increased
software profit margins.

### Price Segmentation
As companies continued to grow, and relied more heavily on technology, their needs became more complex too. The software
companies selling the software had to manage the needs of varying types of customers, ranging from individual
sole-proprietors, small businesses, large enterprises, and government agencies.

Their customer's demands were not always the same, and the software companies had to adapt their pricing model
accordingly. A blanket policy would no longer suffice. The software companies would simply be leaving too much revenue
on the table. Features that were expensive to implement, or that were not commonly used, would be priced higher than
features that were more common.

Large Enterprises, for example, would be able to afford to pay for features like custom integrations with their existing
software, a faster turnaround time in the event of a software bug, or a more hands-on onboarding and training process.
Even if these features required development cycles from an engineer to implement, they would be able to afford to pay
the fees for these features.

This divide in different users' needs, coupled with using nearly-free digital software distribution software, lead
software companies to become some of the most profitable companies in the world.

### Enterprise Software
Over time, for many industries, software companies would begin exist to fill every niche. Some of these companies would
cater on to a small number of very large customers, often referred to as "Enterprise" customers. They would create
specialized sales teams and onboarding processes that would be tailored to the Enterprise customer's needs. For any
companies _below_ a certain size, they would simply be turned away if they were unable to pay the exorbitantly high
price.

This posed a problem for smaller companies like startups. They wanted to use the software, but the Enterprise Software
companies couldn't justify the expenses of onboarding them or supporting them. It was simply unprofitable to offer
support to a small company.

Around the beginning of the internet era, a new company named "[Red Hat](https://en.wikipedia.org/wiki/Red_Hat)" would
be founded. Their solution to this divide -- of wanting to only sell to large customers -- was to publish their software
as Open Source. Anybody would be able to use their software, and they would sell custom support, features, and training
to the Enterprise customers separately.

Red Hat went on to become a very large played in this space, and is one of the pioneers of building a business around Open Source
software.

### The Evolution of the Internet
Fast-forward to the start of the internet era, and the needs of software continued to grow increasingly complex. With the scale of
internet traffic becoming larger, there became a need for more specialized software to run along with specialized
hardware. No longer would a company just purchase the software, but they would also purchase the hardware that is needed
to run it. This hardware was often expensive to produce, setup, and maintain, so buyers would often end up renting it
from the software companies instead.

The companies who wrote the software, managed the hardware to run it, and sold it together would become known as the
"Cloud" companies. They would sell their software as an internet service, and their customers would be able to use their
software on any computer that is connected to the internet. The Cloud companies would often be called "*-as-a-service"
companies to describe what "Cloud service" they sold. Companies selling Cloud Software became "Software as a Service"
(SaaS) companies. Companies selling access to managed servers, providing the "Platform" for others, become known as
"Platform as a Service" (PaaS) companies.

Modern software licensing became no longer just selling software, but also selling hardware, and led to a new class of software
consumption. No longer did it make sense to simply purchase a license for software, instead you only "rent" the software
based on your usage of it. When licensing Cloud software, you might pay by the hour, pay by the second, or pay per API request.
The price of the software license, if any, would be baked into the price you pay.

This model of software consumption has been a powerful tool for licensing software. Many companies, like Netflix and
Snapchat, have been using cloud services to scale to meet consumption needs that vary over time. This consumption-based
model works well for many companies, but it comes at a premium. The cloud services are very expensive, and not all
companies have changing consumption needs that require the flexible pricing model. Any companies that don't want to use
the Cloud services, such as those with strict security requirements that require data to be onsite, are left without
many options.

### The Proliferation of Open Source
Since the earliest days of computer, there has always been a contingent of software professionals that advocated for Open Source software.
Much of the software that is run today dates back to these professionals. Most are small tools, libraries, and scripts, but
some are large applications that are used by many people. One of the most successful projects is the [GNU/Linux](https://en.wikipedia.org/wiki/GNU/Linux)
project, which is the Linux operating system.

Systems like Linux power the vast majority of computers in the world. It is the most widely used operating system, and is
entirely Open Source. By itself, Linux is not directly sold. It is a community of developers, and the community is willing to
contribute to the project to continue building it. Cloud companies, like Amazon and Microsoft, are able to run Linux on their servers, and then their customers are able to run any software
that runs on Linux against the rented server.

### The Evolution of Open Source
By itself, Linux is not a product. It is a language. It is a tool. It is a community. It is a way for companies to build and to run software.

Linux is not unique in this way. Many large Open Source projects have taken on similar roles, with projects such as
Nginx, Git, and PostgreSQL growing in popularity until the point where they become a foundation for others to build on top of.
This approach flies in the face of the traditional belief held about software. That is, for the majority of software 
history, there has been an assumption that Source Code is what is valuable and that you must protect your Source Code.

Companies like Red Hat were the early pioneers that began to break this assumption by building a business model around Open Source.
They showed that it's possible to be worth billions of dollars, even when you freely give away the software that you create.
Projects like Linux were never designed to be commercial projects, but the Open Source work that Red Hat did was designed to make money.

They realized, and subsequently taught the world, that Source Code behind the software was not what was valuable, 
but that it was instead the deep knowledge possessed by the people that created it.
That deep knowledge was necessary to fix bugs in the software quickly, to save time setting up and maintaining the software, 
and to continue developing the software to make it better over time by identifying the patterns across the many ways the software was used.

This insight, that the "secret sauce" was not the Source Code, but instead the knowledge of those that created it, was a 
powerful tool for the software companies that wielded it. They were able to create a business model that was not only profitable, 
but that also greatly simplified adoption of the software. Companies leveraging Open Source would be able to distribute
their Source Code for free on websites like GitHub, and never have to worry about supporting the usage of the software.

In exchange for giving away their software for free, they would be able to grow the usage of their software more easily by
catering their software directly to developers working at companies. These developers would no longer have to deal with
a lengthy sales process involving signing [NDAs](https://en.wikipedia.org/wiki/Non-disclosure_agreement), being given 
non-editable binary files that they couldn't modify or extend, or getting approval from the Finance department and other stakeholders.
When the software was Open Source, they could simply use it more easily than they could other proprietary software.

This was a huge win for Open Source adoption. Companies that used Open Source would be able to build their software more easily,
and eventually they would rely on that software to be happy to pay for it whenever something went wrong, they needed a feature,
or they needed support to ensure the software was working as expected.

## Where are we now? 
In 2021, the number of software companies using Open Source is nearly 100%. It's simply too difficult to develop all software
in house anymore. At some point, you have to rely on software built by somebody else, and the only way to do that is to rely on
Open Source (in some capacity).

Since the days of Red Hat, there have been a number of companies that have been using Open Source to build their business.
Companies like MongoDB, HashiCorp, and Elastic proved that Open Source was a viable way to build a business worth billions of dollars.
Open Source was no longer a niche belief held by software purists, but it was also a reliable way to acquire customers and grow your mind share.

## "Source Available" Software Licenses
Open Source isn't perfect -- Cloud companies like Amazon have been known to exploit Open Source software projects to earn a profit without contributing back either
source code or sharing revenue. It's legal and fully within the bounds of Open Source for companies to do this -- that's just the risk of choosing
an Open Source software licensing model. You do not have control, and sometimes that hurts your business.

In order to mitigate that risk though, there are a number of approaches that attempt to bridge the gap between the proprietary and Open Source.
These approaches are generally referred to as "Source Available" software licenses. Licenses like [BSL](https://itsfoss.com/making-the-business-source-license-open-source-compliant/)
are designed to let their software be used as Open Source software would, but with a few additional restrictions to prevent
other companies like Amazon from deriving value purely from hosting a managed version the software.

While it's great to see innovation in the software licensing industry, it's also important to understand that using a Source Available license
is not a catch-all solution. You still have to think about how you're going to structure the pricing for your business.
It's not enough to just think "We're going to be Open Source, grow, and then figure it out later" because many companies, like
[Docker](https://www.infoworld.com/article/3632142/how-docker-broke-in-half.html), tried to use Open Source and failed to
every build a profitable business even after achieving explosive growth.

## When to use Open Source for your pricing model 
There is honestly no way to know if Open Source is the right solution for your business's pricing model. You have to think about it, do your own research,
and come up with your own conclusion. That's just the unfortunate reality of building a business: There is seldom a one-size-fits-all solution.

Beyond that cautionary note though, I think there are a few places where Open Source really shines:
- **Software Infrastructure**: If you're building software that's going to be the "backbone" of somebody's software stack, you probably
  want to consider using Open Source or a Source Available license. When you're in the "critical path" of somebody's production software,
  you will win points with developers by being Open Source. Nobody wants to be stuck debugging proprietary software or dealing with an
  outage because your PaaS is down. If they can self-host it, that's a big win for adoption (even if you end up hosting a PaaS anyway).
- **Developer Tooling**: If you're building a tool that will be used by developers, you probably want to use Open Source.
  Developers are a tricky market to sell to because they're often happy to build their own solution instead if something is proprietary
  (sometimes due to natural curiosity, but also due to debugging requirements for production software).
  I've run a startup in this industry before, and it taught me some painful lessons. I'll write a post about that soon, if anybody is interested.
- **Sensitive Data**: I've spoken with enough startups and companies to realize that people are often fearful about trusting others with
  their sensitive data. It already takes a lot of trust to get somebody to share their data with you, and it takes exponentially more when its sensitive data.
  If you're building a product that touches sensitive data, you probably want to use Open Source to help earn trust. 
- **Security or Compliance**: These areas are a bit hairier to understand what the right choice is. In general, if you're a security or compliance
  company, you might want to consider going Open Source. You'll be able to build a more secure product by having people easily vet it, and you'll be able to more easily comply
  with your customer's compliance requirements by allowing them to self-host it. For HIPAA, for example, it's a lot easier to self-host than to buy a proprietary solution.
- **You offer a free-tier**: Depending on your business, if you offer a free tier, you might want to consider being Open Source for the functionality in the free tier.
  With that path, you can still choose to slap on proprietary features for your higher tiers. You might find that certain large customers have different needs, and that
  their needs are best served by a proprietary solution.

If you don't fall into any of those buckets, then I'll ask you a few questions to help you decide.
- **How do you make money?**: If you're planning to host the software for your customers, then you probably only want to be Source Available.
  If you're not hosting the software, then you should consider being Open Source. Even if a Cloud picks up your software and starts hosting it,
  if you're not losing out on any profits, then does it matter? You might find that you actually gain more value by being available as a Cloud service, so being Open Source is a good choice.
- **Is Open Source your only customer acquisition strategy?**: If the answer is yes, then you're in for a world of hurt. Open Source is frequently _more_ work than a proprietary solution in
  order to get your first paying customers. It takes months of effort to polish up your API, [set up your CI/CD pipeline](./2021-11-02-our-ci-setup.md), and write enough docs to get people to use it.
  If you choose Open Source, you should make sure you have other ideas about how you're actually going to drive adoption.

## Closing Thoughts
In this post, I've talked about the history of Software Licensing, and I've tried to build up your intuition to determine if Open Source is the right choice for your business's pricing model.

Like I said before, there is no clear answer here. I'd recommend doing your own research on the internet, consulting with other people that have done it before,
and reviewing the business models of existing companies that have made Open Source work for them successfully. This space is
rapidly evolving, and there is a lot of nuance to it.

I'll be writing more posts in the series soon. Please email me if you found this useful (free at lunasec.io), and while I have your attention, please throw us a star on
[GitHub](https://github.com/lunasec-io/lunasec). It really helps us out!

Cheers, good luck, and thanks for reading!

_Free Wortley, Founder of LunaSec_

<br/><br/>
