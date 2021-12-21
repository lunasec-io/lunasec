#!/bin/bash

# Clean up the folder before checkout
rm -rf skywalking-eyes

# TODO: Replace the cloned version with the "main" Apache version from here:
# https://github.com/apache/skywalking-eyes
# Currently waiting for a new Docker release to be cut with the TypeScript fixes.

echo "Fetching Apache Skywalking Eye source code..."
git clone https://github.com/freeqaz/skywalking-eyes --depth 1

cd skywalking-eyes || exit 1

echo "Checking out specific release..."
git checkout 5d4d5bc

# TODO: Make this work on multiple platforms. For now, run `make build` to build for all OSes.
# You can then invoke on Mac, for example, the binary at `./skywalking-eyes/bin/darwin/license-eye`

echo "Building from source..."
make linux

echo "Success!"

