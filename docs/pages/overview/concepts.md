---
id: "concepts"
title: "Concepts"
sidebar_label: "Core Concepts"
---

# Core Concepts

## Tokenization
At its core, LunaSec is a toolkit that keeps data secure in the front and back end of web applications by replacing the sensitive 
fields in your application and database with tokens.  When LunaSec is fully integrated sensitive data never enters
your system.  On the front end, cross-domain iFrames dubbed **Secure Frames** handle the creation and display of sensitive fields, 
and on the backend sensitive data is handled inside isolated code blocks dubbed **Secure Functions**.  Both of these communicate with a backend to store 
sensitive data, called the **Dedicated Tokenizer**.  Everything from small strings to large files can be **tokenized**.

### Secure Frame
A secure sandbox that is embedded in your front-end React app. It handles sensitive data inside an iFrame and returns only tokens.
Because iFrames run in a separate, isolated process in the browser, sensitive data is protected even if your web application is compromised.
Your data is protected against Cross-Site Scripting(XSS), and the parts of the application that need to be audited for security are much smaller.

The `react-sdk` provides a suite of "Secure Form" components that follow this pattern. 
Onboarding is simply replacing your `<form>` and `<input>` elements with our drop-in replacement components.  Your styling and most other DOM features 
will continue to work normally, even though the element is now isolated on what is effectively a different website.

### Secure Function Enclave
An ephemeral, sandboxed virtual machine you can use from your backend to work with encrypted data in a safe environment.
To use it just decorate a function with `@lunasec-secure-function`.  Our deployment system will handle the creation of the necessary
infrastructure whenever your app deploys.

### Dedicated Tokenizer
The Secure Frame and Secure Functions are backed by a hardened and highly performant server that handles creating, reading, and working with tokens.  
When data is tokenized and sent to Token Storage,
it is encrypted with a unique storage key based on the token(which your application stores) and other secret keys, ensuring that the token
can only be used by someone who both has a copy of the token and has been granted permission by your application to retrieve it.

### Token Storage
AWS S3 was chosen as a storage system for tokens because of its low cost, high performance, built-in encryption, and 
ability to work with large files.  The Dedicated Tokenizer creates S3 pre-signed-URLs, and your web application uses them to store and retrieve
sensitive data from S3 directly.

### LunaSec Secure Authorizers
An "Access Control" service to define centralized authorization rules for decrypting data.
This enables you to tightly control access to sensitive data all from one place instead of in every endpoint or service.

### LunaSec Secure Auth Proxy
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
alongside your own is surprisingly easy.  

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
