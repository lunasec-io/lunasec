#!/bin/bash

# nohup makes it so that the process will return after starting and this lets IntelliJ continue along to then attach to the process.
nohup env $(cat ../.env.host | xargs) dlv --listen=:2345 --headless=true --api-version=2 --accept-multiclient exec ./build/secureframe_dev &

# Just in case the process takes a sec to start.
sleep 0.2

