#!/bin/bash
rm -f config/tokenizerbackend/aws_resources.yaml

sudo COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose up --remove-orphans -d local-dependencies
r=$?
if [ $r -ne 0 ]; then
    echo "Unable to bring up local dependencies for the tokenizer"
		exit -1
fi

until [ -f config/tokenizerbackend/aws_resources.yaml ];
do
	echo "waiting for aws_resources.yaml, please wait...";
	sleep 0.5;
done
