#!/bin/bash

export DOCKER_BUILDKIT=1

docker_build() {
  docker build -f "$1" . --target "$2" -t "$3:${VERSION}"
}

docker_push() {
  docker push "$1:${VERSION}"
}

if [ "$1" == "build" ]; then
  # docker build -f lunadefend/js/docker/dependency-precache.dockerfile . -t "lunasec/cached-npm-dependencies:${VERSION}"

  if ! docker_build lunadefend/js/docker/demo.dockerfile application-front-end "lunasec/application-front-end-demo" ; then
    echo "unable to build application front end"
    exit 1
  fi

  if ! docker_build lunadefend/js/docker/demo.dockerfile application-back-end "lunasec/application-back-end-demo" ; then
    echo "unable to build application back end"
    exit 1
  fi

  if ! docker_build lunadefend/js/docker/demo.dockerfile secure-frame-iframe "lunasec/secure-frame-iframe-demo" ; then
    echo "unable to build secure frame iframe"
    exit 1
  fi

  if ! docker_build lunadefend/js/docker/demo.dockerfile lunasec-cli "lunasec/lunasec-cli-demo" ; then
    echo "unable to build lunasec cli"
    exit 1
  fi

  if ! docker_build lunadefend/js/docker/httpsproxy.dockerfile localstack-proxy "lunasec/localstack-proxy-demo" ; then
    echo "unable to build localstack proxy"
    exit 1
  fi
  exit 0
fi

if [ "$1" == "publish" ]; then
  # docker push "lunasec/cached-npm-dependencies:${VERSION}"

  if ! docker_push "lunasec/application-back-end-demo" ; then
    echo "unable to push application back end"
    exit 1
  fi

  if ! docker_push "lunasec/application-front-end-demo" ; then
    echo "unable to push application front end"
    exit 1
  fi

  if ! docker_push "lunasec/secure-frame-iframe-demo" ; then
    echo "unable to push secure frame iframe"
    exit 1
  fi

  if ! docker_push "lunasec/lunasec-cli-demo" ; then
    echo "unable to push lunasec cli"
    exit 1
  fi

  if ! docker_push "lunasec/localstack-proxy-demo" ; then
    echo "unable to push localstack proxy"
    exit 1
  fi
  exit 0
fi

echo "unrecognized command $1"
exit 1
