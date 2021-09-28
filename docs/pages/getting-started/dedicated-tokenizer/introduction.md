---
id: "introduction"
title: "Dedicated Setup Introduction"
sidebar_label: "Introduction"
sidebar_position: 1
---

# Setting up LunaSec

For now, LunaSec has native support for applications that use React on the frontend and Express or Apollo-GraphQL 
on the backend. Other frontend frameworks are on the development roadmap, including Vue. Java backend support is in alpha.  

:::info
To see a full demonstration while you follow this guide, you can follow along in [the demo app](/pages/overview/demo-app/walkthrough).  
:::
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