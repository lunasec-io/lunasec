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

mkdir -p config/tokenizerbackend/outputs
cp ../outputs/aws_resources.json config/tokenizerbackend/outputs

_term() {
  echo "Caught SIGTERM signal!"
  kill -TERM "$child" 2>/dev/null
}

trap _term SIGTERM SIGINT SIGHUP SIGQUIT

env $(cat < ../.env.host | xargs) ./build/tokenizerbackend_dev &

child=$!
wait "$child"