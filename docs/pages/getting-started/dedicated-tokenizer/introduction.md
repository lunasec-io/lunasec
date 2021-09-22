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
---
id: "introduction"
title: "Dedicated Setup Introduction"
sidebar_label: "Introduction"
sidebar_position: 1
---

# Setting up LunaSec

For now, LunaSec has native support for applications that use React on the frontend and Express or Apollo-GraphQL 
on the backend. Other frontend frameworks are on the development roadmap, including Vue. Java backend support is in alpha.  

To see a full demonstration while you follow this guide, you can follow along in [the demo app](/pages/overview/demo-app/walkthrough).  

### Services
Before we start changing code, let's get LunaSec's services running. The main dependencies we need are:
* Dedicated Tokenizer Backend
* AWS (preferably running locally using LocalStack)

We have containerized these and written a docker compose to make launching them easy.  Clone the LunaSec repository and run:

```shell
npm run start:services
```

Soon these images will be in dockerhub and cloning the repository will no longer be necessary.

Now that the services are running, let's add LunaSec to the code. [Backend setup](./backend.md)