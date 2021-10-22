#!/bin/bash

export DOCKER_BUILDKIT=1

if [ "$1" == "build" ]; then
  # docker build -f js/docker/dependency-precache.dockerfile . -t "lunasec/cached-npm-dependencies:${VERSION}"
  docker build -f js/docker/demo.dockerfile . --target application-front-end -t "lunasec/application-front-end-demo:${VERSION}"
  docker build -f js/docker/demo.dockerfile . --target application-back-end -t "lunasec/application-back-end-demo:${VERSION}"
  docker build -f js/docker/demo.dockerfile . --target secure-frame-iframe -t "lunasec/secure-frame-iframe-demo:${VERSION}"
  docker build -f js/docker/demo.dockerfile . --target lunasec-cli -t "lunasec/lunasec-cli-demo:${VERSION}"
  docker build -f js/docker/httpsproxy.dockerfile . -t "lunasec/localstack-proxy-demo:${VERSION}"
  exit 0
fi

if [ "$1" == "publish" ]; then
  # docker push "lunasec/cached-npm-dependencies:${VERSION}"
  docker push "lunasec/application-back-end-demo:${VERSION}"
  docker push "lunasec/application-front-end-demo:${VERSION}"
  docker push "lunasec/secure-frame-iframe-demo:${VERSION}"
  docker push "lunasec/lunasec-cli-demo:${VERSION}"
  docker push "lunasec/localstack-proxy-demo:${VERSION}"
  exit 0
fi

echo "unrecognized command $1"
exit 1