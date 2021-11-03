---
title: MonoRepo CI, to What Great Lengths We Go
description: Celebrating the release of the first fully Open Source data security platform
slug: lunasec-v1-public-release
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

## We have a big project...
... and this is going to be a long post.  We're going to cover:
* our container setup in a Lerna monorepo
* generating a docker-compose.yaml file dynamically using typescript (which is great, actually)
* using a mounted docker.sock to have one container launch a bunch of other containers
* Getting it all going in GitHub Actions

At LunaSec, our system is made up of a lot of parts.  Some of them are servers we deploy, some of them are
servers that our users deploy, some of them are npm modules, Go binaries, these docs... You get the picture.

Using a monorepo with Lerna for our entire project has been an absolute lifesaver, especially for local dev, but getting CI to a place
we're happy with has been a months long effort. As it turns out, to test in CI, our system actually needs to _run_ in CI.
Here are some of the main things we've figured out.


## Container Layout
Since we want to actually test a running
copy of our system, we launch our React app in one container and then query it from a container using cypress.  First, we have to actually 
get our app running and that means having all dependencies installed.   

Our containers are like this, with each container based on the last one:
* **Precached Dependencies** - A prebuilt container with static dependencies that we want to avoid building every job. 
  We push this to Dockerhub.
* **Lerna Bootstrap** - The first step of our CI build, where we call `lerna bootstrap` and it installs all NPM
  dependencies and links our project's modules to each other, and compiles all our TypeScript.
* **Runtime Containers** - Containers that run a part of the app, all based on the bootstrap container above. 
For us, this is our CLI, our React App, and some other servers.

And because we want to run Cypress in there too:
* **Cypress** A container based on the official Cypress container that copies over the repo folder from the **Lerna Bootstrap** container
  so it can read and run the integration tests.  We found 
this *much* easier than getting cypress installed on our own container.

You can find these dockerfiles in our repo [here](https://github.com/lunasec-io/lunasec/tree/master/js/docker).

## Docker Compose
The standard way to launch a cluster of containers is docker-compose.  For our project, we want to control what containers come
up based on what we are trying to do.  We have a `dev` mode for local development, a `test` mode for CI or local testing, and so on.  
We looked around at other big projects like ours and saw that some of them use multiple `docker-compose.yaml` files, one for each mode.  

That's okay, but we wanted more programmatic control over docker-compose, so we wrote a script that generates the yaml file.  
We (okay, it was my very smart coworker) even generated
[typescript types](https://github.com/lunasec-io/lunasec/blob/master/js/sdks/packages/cli/src/docker-compose/docker-compose-types.ts) 
for the yaml file from the official JSON Schema definition.

[Here's our code](https://github.com/lunasec-io/lunasec/blob/master/js/sdks/packages/cli/src/docker-compose/lunasec-stack.ts) 
that handles generating the schema.  As you can see, it's pretty darn clean, with each container represented as a function that returns
a config object.  I work with some smart folks.  Hopefully someday docker-compose (or something similar) is going to expose a JS SDK we can call to set up the cluster programmatically,
but in the meantime, this works very well.  Maybe we will even turn this generator into a library eventually.

## Docker.sock - Launching containers from containers
Because the way we launch our containers is programmatic and depends on the above scripts being built, we wanted to containerize it.
That means that rather than calling `docker-compose` directly on the CI machine, we call it in a container and then that container launches 
the other containers. 🤯 Let's call this super-container the `job-runner`.

![inception meme](/img/deeper-meme.jpg)
At this point we had two choices:  We could run docker IN docker(dind) and start containers inside the job-runner **or** 
connect the job-runner to the host machine's docker engine
to run containers on the host(which I call docker *from* docker).  We read [this really fantastic blog post](https://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/)
from the person who helped write Docker in Docker and went with the docker *from* docker option, explained at the bottom of that blog, for exactly the reasons they outlined,
namely that we want simplicity and caching.  

So, we added docker-compose and docker packages to our `job-runner`, and added this flag to the run command
```shell
docker run -v /var/run/docker.sock:/var/run/docker.sock job-runner
```
just like in the blog post, and it just about worked right off the bat, except for this error:
```shell
failed to solve with frontend dockerfile.v0: failed to read dockerfile:
 open /var/lib/docker/tmp/buildkit-mount3865249966/demo.dockerfile: no such file or directory
```

The volume mount paths
in our docker-compose file broke, because these were expanding to absolute paths *inside* the `job-runner` but were running *outside* on the
host machine.  We couldn't just fix it by hardcoding the paths because everyone's machine and CI are all different.  

As a workaround we pass the base-path aka working directory as an environment variable into the `job-runner` when we start it up like this:
```shell
docker run -e HOST_MACHINE_PWD=$(pwd) -v /var/run/docker.sock:/var/run/docker.sock job-runner
```
Then we read that in our script that generates the docker-compose file and use it as the base path for mounting those volumes.  
The fact that we were already generating our dock-compose config dynamically made it easier, and if you're using a static config,
you may have to try your luck with `sed` or some other way of overwriting the docker-compose path.

## GitHub Actions
We use github actions for our CI environment, and you probably should too.  It's free, generally pretty simple to use, and really powerful.
Miles beyond Jenkins or Circle or the others.  

Since we took care of 
## Conclusion
I just want to say how much better all of this is today than it was even 3 years ago.  In a past job I built a similar system to the above
in Jenkins using Groovy and, uh, let's just say we have come a _long_ way.  Just about
every tool we used was a joy to use from Lerna to Docker to Github Actions, it's just getting them to work together that's the challenge.