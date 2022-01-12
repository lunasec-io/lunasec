---
title: BuildKit intermediate caching in CI
description: BuildKit intermediate caching in CI
slug: buildkit
authors:
- name: Forrest Allison 
  title: Developer at Lunasec 
  url: https://github.com/factoidforrest
  image_url: https://github.com/factoidforrest.png
tags: [docker, buildkit, cache, github-actions]
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

#### ...and why it didn't make our builds any faster

Part 2 of a series on optimizing our build system. I explain how our build system is laid out
in [Part 1](/blog/lunasec-ci).

### Docker Buildkit

Our CI builds and runs a lot of containers, and takes around 30 minutes. In an attempt to make it faster, I did a deep
dive into the experimental and semi-documented world of Docker's Buildkit.
<!--truncate-->

Buildkit is an alternative way of building docker containers, mainly focused on enabling higher performance through
strategies like
**parallel building** of multi-stage dockerfiles and **intermediate caching** where every layer of a container is stored
and can be reused in a subsequent build. It does all those fancy things by keeping track of a dependency graph of your
build. You can read more about how it works on [Buildkit's Github](https://github.com/moby/buildkit#exploring-llb).

If you just want to enable Buildkit in hopes of speeding up your builds a bit, you can set `DOCKER_BUILDKIT=1` in your
ENV, and that will enable what is called "docker integrated buildkit", meaning your docker commands will start using
Buildkit by default.  

Just enabling buildkit on our CI machine saved around 5 minutes, so that's an easy win for us. You can keep on using
docker normally and stop reading this blog post.

### Intermediate Caching

The main feature I was after with Buildkit was saving and restoring those fancy intermediate caches from disk, so that
we could reuse them between CI builds. This is possible with a command like:

```bash
docker buildx build --cache-to type=local,dest=/tmp/.buildx-cache,mode=max --cache-from type=local,src=/tmp/.buildx-cache .
```

Pretty spiffy, except fancy caching like that isn't supported by docker-integrated Buildkit, which is used by default.

### Integrated mode doesn't support all Buildkit features

Before we can use that command with those cache settings, we have to tell Buildkit to use a different "builder".

```bash
docker buildx create --driver docker-container --name my-builder --use
```

This tells buildkit to use a builder that itself runs in a container. Yeah. Unfortunately, I wasn't able to find a list
of what features were only supported by this more fully-featured builder. I guess integrated mode is more like
Buildkit "Light".

:::note
`docker build` will still use the integrated builder, but now `docker buildx build` will use the new builder we just
created.
:::
Now if you try to run the build again, you'll see

```bash
WARN[0000] No output specified for docker-container driver. Build result will only remain in the build cache. 
To push result image into registry use --push or to load image into docker use --load 
```

The trouble is that now the image we built with that command is only **inside** the container, which is useless except
to populate the cache of the builder itself.

### Docker Buildkit doesn't run containers, it just builds them.

To run any images built inside the "docker-container" builder, you have to use the argument `--load` which will spend a
long time transferring the image into the host's docker. In my case, that cancelled out any speed gains from the
intermediate caching.  Between transferring the cache files out of the docker-container with `--cache-to` and transferring the image
into the docker engine with `--load`, the process was **much slower** than just building the normal way.
At that point, I realized Buildkit wasn't the solution to our slow builds, but clearly it has
some other advantages that might be useful to us in the future.

### If that's not going to work, what else can docker-container be used for?

#### Pushing containers

One thing the docker-container builder *is* excellent at is pushing containers to a remote repository, which it can do
directly from the builder. That's what
this [github action plugin](https://github.com/marketplace/actions/build-and-push-docker-images) does under the hood.

#### Buildkit can read docker-compose files

Like most projects with multiple containers, we use docker-compose. I was surprised to see that `docker buildx bake`
can read and build all the images from a docker-compose.yaml file. It won't be able to run them like docker-compose can,
but pre-building the containers before running docker-compose is possible.

#### The builder can be on a different machine

Similar to setting `DOCKER_HOST` to a remote docker daemon, buildkit can connect to a remote builder over TCP.

```bash
docker buildx create --name my-remote-builder tcp://my-docker-host:2375 --use
```

I haven't tried it, but it should be possible to host a builder on a fast machine on AWS and reuse it between runs. That
way, the cache would stay populated without the slow --cache-to and --cache-from steps. Exporting the images with --load
would still take several minutes, but speed gains would probably be worth it. Keep an eye out for a blog post about that
in the future.

### Final thoughts

Buildkit is a big and complicated part of docker. I only scratched the surface of what it can do. I also came away with
the sense that while it might be the future of docker, at the moment (2021) it's still an optional and somewhat
experimental feature.  
Documentation for the average developer is somewhat lacking and the halfway integration of Buildkit into the docker CLI
has a steep learning curve.

If Buildkit someday becomes the standard way to build docker containers, perhaps things will be more straightforward.
