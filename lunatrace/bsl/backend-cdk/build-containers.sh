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

echo "NOTE: The backend must be running for migrations to be applied successfully"

# Not working, use docker-compose up to apply metadata
#change-dir ../hasura
#if ! hasura migrate --database-name lunatrace apply ; then
#	echo "unable to apply database migrations"
#	exit 1
#fi
#if ! hasura metadata apply ; then
#	echo "unable to apply metadata to hasura"
#	exit 1
#fi
#if ! hasura metadata reload ; then
#	echo "unable to reload metadata in hasura"
#	exit 1
#fi
#reset-dir

# Make sure generated code is up to date before building Docker containers
change-dir ../frontend
if ! yarn run generate ; then
	echo "unable to generate code for frontend"
	exit 1
fi
reset-dir

change-dir ../backend
if ! yarn run generate ; then
	echo "unable to generate code for backend"
	exit 1
fi
reset-dir

# Build Docker containers
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
