#!/bin/bash
OUT_DIR=build

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

echo "frontend generation start"
change-dir ../frontend
if ! yarn run generate ; then
	echo "unable to generate code for frontend"
	exit 1
fi
reset-dir
echo "done"

echo "backend generation start"
change-dir ../backend
if ! yarn run generate ; then
	echo "unable to generate code for backend"
	exit 1
fi
reset-dir
echo "done"

echo "starting container build. NOTE=You will be asked for your password "

echo "building root docker file for repo"
change-dir ../../..
if ! sudo docker build . -f lunatrace/bsl/repo-bootstrap.dockerfile -t repo-bootstrap ; then
	echo "unable to build repo-bootstrap"
	exit 1
fi
reset-dir
echo "done"

echo "building lunatrace-cli"
change-dir ../../..
if ! sudo docker build . -f lunatrace/cli/docker/lunatrace.dockerfile -t lunatrace-cli ; then
	echo "unable to build lunatrace-cli"
	exit 1
fi
reset-dir
echo "done"

echo "building docker file for frontend"
change-dir ../frontend
if ! sudo docker build . -t lunatrace-frontend ; then
	echo "unable to build lunatrace-frontend"
	exit 1
fi
reset-dir
echo "done"

echo "building docker file for backend express server"
change-dir ../backend
if ! sudo docker build --target backend-express-server . -t lunatrace-backend ; then
	echo "unable to build lunatrace-backend"
	exit 1
fi
reset-dir
echo "done"

echo "building docker file for backend queue processor"
change-dir ../backend
if ! sudo docker build --target backend-queue-processor . -t lunatrace-backend-queue-processor ; then
	echo "unable to build lunatrace-backend-queue-processor"
	exit 1
fi
reset-dir
echo "done"

echo "Saving docker containers to output dir: $OUT_DIR"

mkdir -p $OUT_DIR
sudo docker save -o $OUT_DIR/lunatrace-frontend.tar lunatrace-frontend
sudo docker save -o $OUT_DIR/lunatrace-backend.tar lunatrace-backend
sudo docker save -o $OUT_DIR/lunatrace-backend-queue-processor.tar lunatrace-backend-queue-processor

sudo chown -R "$USER:$USER" build

