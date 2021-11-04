---
title: End-to-End testing a MonoRepo
description: How we got CI working with Lerna, docker-compose, docker.sock, and cypress
slug: lunasec-ci
authors:
- name: Forrest Allison
  title: Developer at Lunasec
  url: https://github.com/factoidforrest
  image_url: https://github.com/factoidforrest.png
  tags: [releases, ci, github-actions, docker.sock]
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

This post explores our journey to build a Continuous Integration (CI) pipeline for our Open Source project, 
[LunaSec](https://github.com/lunasec-io/lunasec), and how we used a MonoRepo to help enable it. 

## We have a big project...
... and this is going to be a long post.

We're going to cover:
* Why CI is critical for Open Source projects,
* Our container setup in a Lerna monorepo,
* Generating a `docker-compose.yaml` file dynamically using TypeScript (which is great, actually),
* Using Docker-in-Docker to have one container launch a bunch of other containers,
* Getting it all going in GitHub Actions.

## Why is CI important?
If you just want the technical details, you can skip to the [next section](#building-the-ci-pipeline).  

This section is meant to give you context about why we spent so much time on this (and why we assume we're idiots). 

### The 100x Engineer 
Modern software requirements are brutal.  Not only does software need to support a long list of features, but it also 
needs to support millions of users, keep their data secure, and also be built (and fixed) as quickly as possible.

Fortunately, for the modern developer, they don't have to start from scratch.  Resources are available and better than 
ever to build software rapidly.

No more physical servers. You have cloud providers!

Stop writing algorithms from scratch. Just import a library!

What used to require an entire company to achieve is now possible to build as a single individual.  
Compared to 20 years ago, we're living in the future.

### Ignorance is bliss...
Unfortunately, it's not always daisies.  By depending on the work of others, you're also entrusting that they did it properly.

For the modern developer, libraries are effectively APIs powered by a magical black box.
What you gain in productivity, you trade for in headaches when the magic runs out.

Debugging dependencies sucks.  After all, you didn't write the code, you only used it.  Find a bug in AWS somewhere?  Good luck!

Using tools is bliss, until it isn't.

### Testing is the key
That's why it's so important for us to ensure that the software we publish as LunaSec is high quality.
With great power comes great responsibility for developers building libraries.

To respect our users, our software must be well-designed, documented, and tested before every release. We 
_really_ don't want to be the reason for that bug in your software!

Achieving that means that we need to replicate, as closely as possible, the environment where our software would be used by others.
We need to find the bugs in our code, and fix them, before our users do. 

### Coming to terms with being an idiot 
Even if you're a good programmer most of the time, you're still an idiot sometimes.  As a former colleague once said...

"You can't remember not to forget!" - A former colleague

If we wanted to live up to our goals of shipping high quality software, we needed to ensure we never skipped a step in our release process.
We needed to automate the process to make it idiot-proof.

And that's how we started building our CI pipeline. Sounds easy, right?

## Building the CI pipeline

### Components of our MonoRepo
Our system is made up of a lot of parts:
* Services that we deploy
* Services that our users deploy,
* NPM modules and Go binaries that we publish, 
* Upstream dependencies that we rely on, 
* This blog post...
 
You get the picture.

To simplify wrangling together the components, thereby ensuring that they all the pieces play nicely with each other,
we chose a Git MonoRepo. A MonoRepo adds complexity to tooling, but it's a great way to manage a large project with many moving parts.

Getting the MonoRepo working took a ton of work, but using it for our entire project has paid dividends 
(especially for local development).  From setting up development tools like Lerna and Eslint, keeping microservice APIs 
in sync, to setting up end-to-end tests and running them in CI, we've saved countless hours of effort by using a MonoRepo.

But it isn't enough to just have a MonoRepo.  As it turns out, to test everything in CI, the entire system 
(including AWS) actually needed to _run_ in CI. We couldn't just run some Unit Tests and call it a day. We had to get 
every service running in CI, and only then run the tests.

### Container Setup
Since we want to actually test a running copy of our system, we launch our React testing app and all our services in 
their own containers. Afterwards, a container running Cypress loads the web app and presses some buttons to makes sure things work.  

Before we can run Cypress though, we actually have to have our app running, and that means having all dependencies installed.   

Here are the containers we build, with each container based on the one before:
* **Precached Dependencies** - A prebuilt container with static dependencies that we want to avoid building every job. 
  We push this to Dockerhub.
* **Lerna Bootstrap** - The first step of our CI build, where we call `lerna bootstrap` and it installs all NPM
  dependencies and links our project's modules to each other, and compiles all our TypeScript.
* **Runtime Containers** - Containers that run a part of the app, all based on the bootstrap container above. 
  For us, this is our CLI, our React App, and some other servers.

And because we want to run Cypress in there too:
* **Cypress** A container based on the official Cypress container that copies over the repo folder from the **Lerna Bootstrap** container
  in order to read and run the integration tests.  We found 
  this *much* easier than getting Cypress installed on our own container.

You can find these dockerfiles in our repo [here](https://github.com/lunasec-io/lunasec/tree/master/js/docker), mostly in `demo.dockerfile`.

### Docker Compose
The standard way to launch a cluster of containers is via Docker Compose.  For our project, we want to control which containers come
up based on what we are trying to do.  We have a `dev` mode for local development, a `test` mode for CI or local testing, and so on.  

We looked around at other big projects like ours and saw that some of them use multiple `docker-compose.yaml` files, one for each mode.  

That's okay, but we wanted more programmatic control over Docker Compose, so we wrote a script that generates the YAML file.  

We (okay, it was my very smart coworker) even generated
[typescript types](https://github.com/lunasec-io/lunasec/blob/master/js/sdks/packages/cli/src/docker-compose/docker-compose-types.ts) 
for the YAML file from the official JSON Schema definition.

[Here's the code](https://github.com/lunasec-io/lunasec/blob/master/js/sdks/packages/cli/src/docker-compose/lunasec-stack.ts) 
that handles generating the `docker-compose.yaml`.  As you can see, it's pretty darn clean, with each container represented as a function that returns
a config object.  I work with some smart folks.  Hopefully someday Docker Compose (or something similar) is going to 
expose a JS SDK we can call to set up the cluster programmatically,
but in the meantime, this works very well.  Maybe we will even turn this generator into a library eventually?

### Docker.sock - Launching containers from containers
Because our Docker Compose config is dynamically generated and depends on the above scripts being built, we wanted to containerize it.
That means that rather than calling `docker-compose` directly on the CI machine, we call it in a container and then that container launches 
the other containers. 🤯 Let's call this super-container the `job-runner`.

![inception meme](/img/deeper-meme.jpg)

At this point we had two choices:  We could run Docker IN Docker (abbreviated "dind") and start containers inside the job-runner **or** 
connect the job-runner to the host machine's Docker engine
to run containers on the host(which I call Docker *from* Docker).

We read [this really fantastic blog post](https://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/)
from the person who helped write Docker-in-Docker and went with the Docker *from* Docker option, 
explained at the bottom of that blog, for exactly the reasons they outlined.

Namely: We wanted simplicity and caching.

### How to use docker.sock and Docker Compose together
We added docker-compose and docker packages to our job-runner, and added this flag to the run command...
```shell
docker run -v /var/run/docker.sock:/var/run/docker.sock job-runner
```

...just like in the blog post. And it just about worked right off the bat, except for this error:
```shell
failed to solve with frontend dockerfile.v0: failed to read dockerfile:
 open /var/lib/docker/tmp/buildkit-mount3865249966/demo.dockerfile: no such file or directory
```

The volume mount paths in our Docker Compose file were broken, because these were expanding to absolute paths *inside* 
the job-runner, but we were running *outside* on the host machine.
We couldn't just fix it by hardcoding the paths because everyone's machines (plus CI) are all different!  

As a workaround we pass the base-path, aka the working directory, as an environment variable into the job-runner when we start it up like this:
```shell
docker run -e HOST_MACHINE_PWD=$(pwd) -v /var/run/docker.sock:/var/run/docker.sock job-runner
```

Then we read that in our script that generates the Docker Compose file and use it as the base path for mounting those volumes.  

The fact that we were already generating our Docker Compose config dynamically made it easier, and if you're using a static config,
you may have to try your luck with `sed` or some other way of overwriting the Docker Compose path.

### Shout out to GitHub 
We use GitHub Actions for our CI environment, and we really recommend it!
It's free for the most part, generally pretty simple to use, and really powerful.
Miles beyond Jenkins or Circle (in our opinion). 

### Adding in GitHub Actions
Because we had taken the time to everything running in Docker (ie, we tested all of it on our local machines)
it's not hard to take that and move it into a GitHub Actions workflow.
We're able to build the job-runner container in one step and then call it in the next step,
triggering the script that generates the Docker Compose and run everything.  

We do some other cool things in our CI like using GitHub's `matrix` setting to run the PR CI job twice in parallel. 
The CI runs once with the code on its own, and it runs once with it merged to master to make sure that the app is still 
going to, you know, work once we merge the PR.  (Remember: We're still idiots scared of bugs!)

You can see all of our workflows [here](https://github.com/lunasec-io/lunasec/tree/master/.github/workflows).

### Speeding up the CI
CI takes around 30 minutes currently, but we think we could cut that time in half when we get Docker BuiltKit caching working.
We really 
wish GitHub would let us pay for a faster box with more than 4gb of cache storage. 

We're guessing we're not the only ones who feel that way.

(GitHub, if you're reading this, please take our money!)

![take my money meme](/img/take-my-money-meme.jpg)

##: Conclusion and takeaway
Figuring this out was pretty hard. It took months of work. But, I think we are nearing CI nirvana.  Our builds are very reliable,
we can reproduce them locally when things break, and we're able to iterate faster with less fear of bugs falling through the cracks.  

I just want to say how much better this ecosystem is today than it was even 3 years ago.  I built a similar system to the above
in Jenkins using Groovy (and an earlier Lerna) and, uh, let's just say we have come a _long_ way.  Just about
every tool we used was a joy to use from Lerna to Docker to GitHub Actions, it's just getting them to work together that's the challenge.

Using Lerna and going the MonoRepo route is still a lot more difficult to build tooling for than a one-off web-app or backend. 
Companies that have the MonoRepo thing figured out tend to be pretty tight-lipped about their secret DevOps sauce,
so we wanted to share what we learned from building and releasing a medium size product this way.

Thanks for reading... (And if you haven't already, please leave a star on our [repo](https://github.com/lunasec-io/lunasec)!)