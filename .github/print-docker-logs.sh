#!/bin/bash

sleep 2

echo "# Docker Container Info"

docker ps -a

docker logs "$(docker ps -a | grep "lunasec-monorepo_customer-front-end" | cut -c1-12)"

echo "# Current Directory Info"

pwd

ls -lisah
