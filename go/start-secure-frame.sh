#!/bin/bash

nohup env $(cat ../.env.host | xargs) dlv --listen=:2345 --headless=true --api-version=2 --accept-multiclient exec ./build/secureframe_dev &
sleep 1

