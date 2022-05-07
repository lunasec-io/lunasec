#!/usr/bin/env bash
set -euox pipefail

# This script hydrates the vulnerability database. It may be run ad-hoc or on a schedule.

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
pushd "$SCRIPT_DIR"

pushd ../../logger
yarn compile
popd

pushd ../../common
yarn compile
popd

GRYPE_DATABASE_BUCKET="none" yarn run start:job:update-vulns
