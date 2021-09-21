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
---

# Setting up LunaSec

For now, LunaSec has native support for applications that use React on the frontend and Express or Apollo-GraphQL 
on the backend. Other frontend frameworks are on the development roadmap, including Vue. Java support is in alpha.  

To see a full demonstration while you follow this guide, you can look at our 
[demo app's source](https://github.com/refinery-labs/lunasec-monorepo/tree/master/js/demo-apps/packages).  

Before we start changing code, let's get LunaSec's services running. The main dependencies we need are:
* Dedicated Tokenizer server
* AWS (we recommend localstack)

We have containerized these and written a docker compose to streamline launching them. 

```shell
npm run start:services
```

Alright, now that the services are running, let's add LunaSec to the code. [Backend setup](./backend.md)