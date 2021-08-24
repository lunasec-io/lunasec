---
id: "introduction"
title: "Dedicated Setup Introduction"
sidebar_label: "Introduction"
---

# Setting up LunaSec

For now, LunaSec has native support for applications that use React on the frontend and Express or Apollo-Graphql on the backend.  Other frontend frameworks are on the development roadmap, including Vue. Java support is in alpha.  

To see a full demonstration while you follow this guide, you can look at our [demo app's source](https://github.com/refinery-labs/lunasec-monorepo/tree/master/js/demo-apps/packages).  

Before we start changing code, let's get LunaSec's services running.  The main dependencies we need are:
* Dedicated Tokenizer server
* AWS (we recommend localstack)

We have containerized these and written a docker compose to streamline launching them.  CHRIS COULD YOU DOCUMENT THE LAUNCH COMMANDS HERE THANKS I LOVE YOU

Alright, now that the services are running, let's add LunaSec to the code.  [Backend setup](./backend.md)