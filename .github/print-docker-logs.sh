#!/bin/bash
# Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

sleep 2

echo "# Node version info"
node --version
npm --version
yarn --version
yarn run lerna --version

docker_container() {
  docker ps | grep $1 | awk '{print $1}'
}
docker_health() {
  echo "$1: $(docker_container $1)"
  docker inspect --format "{{json .State.Health }}" "$(docker_container $1)" | jq '.Log[].Output'
}


echo "# Docker Container Info"

docker ps -a

docker_health secure-frame-iframe
docker_health application-front-end
docker_health application-back-end
docker_health tokenizerbackend

echo "# Current Directory Info"

pwd

ls -lisah
