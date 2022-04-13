#!/bin/bash
OUT_DIR=build/

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

change-dir ../../..
if ! docker build . -f lunatrace/bsl/repo-bootstrap.dockerfile -t repo-bootstrap ; then
	echo "unable to build repo-bootstrap"
	exit 1
fi
reset-dir

change-dir ../frontend
if ! docker build . -t lunatrace-frontend ; then
	echo "unable to build lunatrace-frontend"
	exit 1
fi
reset-dir

change-dir ../backend
if ! docker build --target backend-express-server . -t lunatrace-backend ; then
	echo "unable to build lunatrace-backend"
	exit 1
fi
reset-dir

change-dir ../backend
if ! docker build --target backend-queue-processor . -t lunatrace-backend-queue-processor ; then
	echo "unable to build lunatrace-backend-queue-processor"
	exit 1
fi
reset-dir

mkdir -p $OUT_DIR
docker save -o $OUT_DIR/lunatrace-frontend.tar lunatrace-frontend
docker save -o $OUT_DIR/lunatrace-backend.tar lunatrace-backend
docker save -o $OUT_DIR/lunatrace-backend-queue-processor.tar lunatrace-backend-queue-processor
