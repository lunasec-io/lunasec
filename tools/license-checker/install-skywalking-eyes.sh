#!/bin/bash

echo "Fetching Apache Skywalking Eye source code..."
#wget https://apache.osuosl.org/skywalking/eyes/0.1.0/skywalking-license-eye-0.1.0-bin.tgz

git clone https://github.com/apache/skywalking-eyes
cd skywalking-eyes

echo "Checking out specific release..."
git checkout 2cfd5a18c0d4b03cb8b69f3412d4d53737d831a6

echo "Building from source..."
make build

echo "Success!"

