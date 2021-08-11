#!/bin/bash

docker ps -a | grep "lunasec-monorepo_customer-front-end" | cut -c1-12

docker logs "$(docker ps -a | grep "lunasec-monorepo_customer-front-end" | cut -c1-12)"
