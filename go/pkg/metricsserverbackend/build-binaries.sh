#!/bin/bash

cd ../../

make metricsserverbackend

mkdir -p ./pkg/metricsserverbackend/build

cp ./build/metricsserverbackend* ./pkg/metricsserverbackend/build/

echo "Copied built binaries to build folder"

