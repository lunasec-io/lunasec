#!/bin/bash
make tokenizerbackend
r=$?
if [ $r -ne 0 ]; then
    echo "Unable to compile the tokenizer backend"
		exit -1
fi

env $(cat ../.env.host | xargs) ./build/tokenizerbackend_dev
