---
title: "LunaSec Threat Model"
description: How to realistically think about web security and protect sensitive data.
slug: lunasec-threat-model
image: 
authors:
- name: Chris Thompson
  title: Developer at Lunasec
  url: https://github.com/breadchris
  image_url: https://github.com/breadchris.png
  tags: [zero-day, security, data-security, data-breaches]

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

## Why are websites so needlessly complicated?

In its simplest form, a website is designed to let a user interact with data in a way that is meaningful to them.

If you had proper authorization controls, you could effectively just have the user directly connect to the database.
(graphql, hasura). Historically this has been the case for software (SABRE), but as end users have felt, the learning
curve to use technologies like this in a meaningful way was simply too high.

Most of the time, a user doesn't need access to all of their data, and seeing all of their data all at once all the time
can be overwhelming. Reducing the complexity of an SQL query into a single button click is a huge improvement to UX, and
so the idea of a "Frontend" is born. The Frontend is a magical place as the code runs on the user's computer and takes
the data from the database and displays it in a visually appealing way which makes sense to the user who is viewing it 
(theoretically, sometimes this isn't the case).

This is great, however due to limitations of what code you can run inside a browser, you often can't create a direct
connection to a database from the user's computer. Additionally, what if the data the user is accessing spans many different
databases? What if you want to perform asynchronous mutations of the user's data when their browser isn't open?

So something that resembles a "Backend" comes into the picture. A Backend acts as the single place that a Frontend needs
to know about and retrieves data from the wide variety of data sources that a Frontend might need.

Now, the code that goes
into a Backend is written by individuals, and their time costs money and time also costs opportunity. With the ever growing
pressure to ship products as fast as humanly possible, sometimes development teams make the decision to integrate an external
(or internal) Backend into their stack (what we call a SAAS) so they do not have to write and maintain a feature. This comes
at the cost of complexity. The number of different Backends you call into can quickly grow and local development might 
turn into a nightmare as no one actually understands where data is coming from or how to access it.

Most modern software stacks at the very least have the idea of a Frontend and Backend component. Now, how these two services
are implemented varies greatly. From what language these services are written in to the shear scale they operate on,
their variability is what has made software development a [trillion dollar industry]? as there is a great amount of effort
needed to let a user interact with their data in a meaningful way.

## What about security?
If our website's job is to store data, sometimes the data that is being stored is information associated with the identity
of the user. With what the countless data breaches [have shown us], it is very difficult to protect this data from being 
accessed by someone who isn't the user the data belongs to. It is also important to mention that the "attacker" is not
always someone from outside the company, as a company grows, so do the number of people who have access to the data.

In our modern stack, data flows from the Data Source to the Backend and then ends up on the Frontend. Even if the Data Source
contains data which has been encrypted and stored in a vault in the heart of the ocean, for it to be meaningful to the user,
it will have to flow through the Backend. It is in this transition that an avenue for compromise exists. When data flows
from a Source, it will end up in some other destination, or what is referred to as a Sink.

When the security of a system is being properly addressed, every possible transition of data from Source to Sink is enumerated
and considered. Once this connected graph of Backends, Data Sources, and any other asset which is relevant to these hand-offs
of data is outlined, the next question is: "Who is trusting who?". When modeling potential
ways an attacker can steal data, each node in this graph is put under a microscope and considered for what would happen
if it were compromised? What type of data would the attacker have access to? How much of that data?
Maybe there is no data that an attacker could immediately access, but perhaps this service could be leveraged as a foothold
for further exploitation.

In a perfect world, we would make every node in this graph [provably secure]. Every Source has a well defined Sink and any 
security issues would appear as essentially compilation errors when going to deploy the system. We can try, however this
is simply an unrealistic end goal. As a system grows, expands, and changes, simply inventorying what servers actually
belong to the system becomes a difficult task, let along what code is actually running in each of your Frontends or Backends.
Do any of the libraries that you include in your Backend contain vulnerabilities? Is each cell in your database properly
protected by authorization logic? Can you 100% guarantee that there is no publicly accessible endpoint, Data Source,
secret, or document that is just waiting to be stumbled upon?

To truly protect data in the real world, it needs exist in the least number of places. The most secure data is data that
has never 

Somewhere a root of trust must exist. In iPhones, the [Secure Enclave] is a physical chip which provides this trust.
For SSL, we have root Certificate Authorities. This root of trust

## What is a tangible solution to secure data in the modern stack?