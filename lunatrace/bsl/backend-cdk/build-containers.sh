#!/bin/bash

saved_dir=$PWD

change-dir() {
  saved_dir=$PWD
  if ! cd "$1" ; then
    echo "Unable to cd to $1"
    exit 1
  fi
}

reset-dir() {
  change-dir "$saved_dir"
}

# Make sure generated code is up to date before building Docker containers
echo "Making sure generated code is up to date before building Docker containers"

#echo "frontend generation start"
#change-dir ../frontend
#if ! yarn run generate ; then
#	echo "unable to generate code for frontend"
#	exit 1
#fi
#reset-dir
#echo "done"

#echo "backend generation start"
#change-dir ../backend
#if ! yarn run generate ; then
#	echo "unable to generate code for backend"
#	exit 1
#fi
#reset-dir
#echo "done"

echo "starting container build"

echo "building root docker file for repo"
change-dir ../../..
if ! docker build . -f lunatrace/bsl/repo-bootstrap.dockerfile -t repo-bootstrap ; then
	echo "unable to build repo-bootstrap"
	exit 1
fi
reset-dir
echo "done"

echo "building lunatrace-cli"
change-dir ../../..
if ! docker build . -f lunatrace/cli/docker/lunatrace.dockerfile -t lunatrace-cli ; then
	echo "unable to build lunatrace-cli"
	exit 1
fi
reset-dir
echo "done"
