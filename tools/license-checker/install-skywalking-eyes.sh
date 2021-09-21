#!/bin/bash

echo "Fetching Apache Skywalking Eye source code..."
git clone https://github.com/freeqaz/skywalking-eyes

cd skywalking-eyes

echo "Checking out specific release..."
git checkout 06b2db34bb45c2c61c6c2c4e0263da9c5db4db79

echo "Building from source..."
make build

echo "Success!"

