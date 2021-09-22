#!/bin/bash

# TODO: Replace the cloned version with the "main" Apache version from here:
# https://github.com/apache/skywalking-eyes
# Currently waiting for a new Docker release to be cut with the TypeScript fixes.

echo "Fetching Apache Skywalking Eye source code..."
git clone https://github.com/freeqaz/skywalking-eyes --depth 1

cd skywalking-eyes

echo "Checking out specific release..."
git checkout 06b2db34bb45c2c61c6c2c4e0263da9c5db4db79

echo "Building from source..."
make build

echo "Success!"

