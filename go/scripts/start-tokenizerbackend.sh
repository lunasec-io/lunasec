#!/bin/bash
make tokenizerbackend
r=$?
if [ $r -ne 0 ]; then
    echo "Unable to compile the tokenizer backend"
		exit 1
fi

until [ -f ./outputs/aws_resources.yaml ];
do
	echo "waiting for aws_resources.yaml, please wait...";
	sleep 0.5;
done

env $(cat < ../.env.host | xargs) ./build/tokenizerbackend_dev
