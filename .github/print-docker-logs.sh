#!/bin/bash

docker logs "$(docker ps -a | grep "lunasec-node-monorepo_customer-front-end" | cut -c1-12)"
