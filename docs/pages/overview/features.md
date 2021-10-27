---
id: "features"
title: "Features"
sidebar_label: "Features"
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
# Core Features

## Tokenization
LunaSec replaces the sensitive 
fields in your application and database with tokens.  When LunaSec is fully integrated, sensitive data never enters
your application.  On the front end, cross-domain iFrames dubbed **Secure Frames** handle the creation and display of sensitive fields, 
and on the backend sensitive data is handled inside isolated code blocks dubbed **Secure Functions**. LunaSec is not a proxy: those tools communicate directly with a backend server called the **Dedicated Tokenizer**, which is served on a different domain than your application. 
Everything from small strings to large files can be **tokenized**.  

### Secure Frame
A secure sandbox that is embedded in your front-end React app. It handles sensitive data inside an iFrame and returns only tokens.
This is similar to how payment processors like Stripe and PayPal collect credit card information, except that Secure Frames work with
any type of data and copy their styling information from your application.
Because iFrames loaded from a different domain run in a separate, isolated process in the browser, sensitive data is protected even if your web application is compromised.
Your data is protected against Cross-Site Scripting(XSS), and the parts of the application that need to be audited for security are much smaller.

The `react-sdk` provides a suite of "Secure Form" components that follow this pattern. 
Onboarding is simply replacing your `<form>` and `<input>` elements with drop-in replacement components which handle creating and communicating with the iFrame.
Your styling and most other DOM features 
will continue to work normally, even though the element is now securely isolated.  It even works with MaterialUi 
and other component libraries.

### Secure Function
_NOTE: This feature is in development, but will work as described._

An ephemeral, sandboxed virtual machine you can use from your backend to work with encrypted data in a safe environment.
To use it just decorate a function with `@lunasec-secure-function`. Our deployment system will handle the creation of the necessary
infrastructure whenever your app deploys.

### Dedicated Tokenizer
The Secure Frame and Secure Functions are backed by a hardened and highly performant server that handles creating, reading, and working with tokens.  
When data is tokenized and sent to Token Storage,
it is encrypted with a unique storage key based on the token (which your application stores) and other secret keys, ensuring that the token
can only be used by someone who both has a copy of the token and has been granted permission by your application to retrieve it.
:::tip Tokenizer Performance
The dedicated tokenizer is extremely fast (thanks to GoLang), inexpensive to host, and practically infinitely scalable.
In a standard deployment, it runs as a containerized Lambda.
:::

### Token Storage
AWS S3 was chosen as a storage system for tokens because of its low cost, high performance and scalability, built-in encryption, and 
ability to work with large files. The Dedicated Tokenizer creates S3 pre-signed-URLs, and your web application uses them to store and retrieve
sensitive data from S3 directly.  Metadata is stored in DynamoDB.

### LunaSec Secure Authorizers
_NOTE: This feature is in development, but will work as described._

An "Access Control" service to define centralized authorization rules for decrypting data.
This enables you to tightly control access to sensitive data all from one place instead of in every endpoint or service.

### LunaSec Secure Auth Proxy
_NOTE: This feature is in development, but will work as described._

An optional authentication service that sits between the browser and your backend.
This service centralizes and simplifies user session management,
hardens backend applications by adding request verification with cryptographic signatures,
and provides a secure "gateway" to access other LunaSec services automatically. While optional, using an Auth Proxy creates 
the strongest security guarantees.

### LunaSec CLI
A command line utility that provides a number of functions. You can use this to manually decrypt data for a given token for testing purposes,
set up development environments, and deploy infrastructure to production.

### Deployment
The CLI uses the AWS CDK to deploy a copy of the LunaSec infrastructure into your AWS account.  This means that deploying LunaSec infrastructure
alongside your own is surprisingly easy.  If your application is already using the CDK, LunaSec's CDK script can be merged into your own.  

### LunaSec Enterprise
We offer commercial support for companies interested in getting extra features, professional support, and access to other tooling we offer.

With our Enterprise service, you get:
- Managed support (onboarding, on-prem deployments, and automatic security patches),
- Advanced disaster recovery tooling and audit tooling,
- Tooling for supporting larger organizations with LDAP integration, a centralized admin dashboard, and other features,
- Support for high availability, high performance, and multi-datacenter use cases,
- Features to further reduce compliance costs and scope (PCI, SOC2, HIPAA, GDPR, etc),
- Additional advanced security modules for ultra-secure data storage,
- Hardware Security Module integrations with FIPS certification.
