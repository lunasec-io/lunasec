#!/bin/bash
make tokenizerbackend
r=$?
if [ $r -ne 0 ]; then
    echo "Unable to compile the tokenizer backend"
    cd ..
		exit 1
fi

until [ -f ../outputs/aws_resources.json ];
do
	echo "waiting for aws_resources.json, please wait...";
	sleep 0.5;
done

cp ../outputs/aws_resources.json config/tokenizerbackend/

env $(cat < ../.env.host | xargs) ./build/tokenizerbackend_dev
