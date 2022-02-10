define HELP

Usage:

make build                          - Build
make deploy                        - Deploy

endef

export HELP

EXECUTION_DATE:=$(shell date +'%Y%m%d%H%M')

include .env

all help:
	@echo "$$HELP"

dependencies:
	cd actions; npm install
	cd cdk; npm install

build: dependencies build-actions build-cdk

build-actions:
	cd actions; npm run build

build-cdk:
	cd cdk; npm run build

deploy: build deploy-cdk post-deploy-cdk

deploy-cdk:
	cd cdk; AWS_ACCOUNT_ID=${AWS_ACCOUNT_ID} AWS_REGION=${AWS_REGION} HOSTED_ZONE_NAME=${HOSTED_ZONE_NAME} HOSTED_ZONE_ID=${HOSTED_ZONE_ID} HASURA_HOSTNAME=${HASURA_HOSTNAME} ACTIONS_HOSTNAME=${ACTIONS_HOSTNAME} APP_NAME=${APP_NAME} npx cdk deploy '*'  --profile ${AWS_PROFILE} --outputs-file cdk.outputs.json

post-deploy-cdk:
	@cd cdk; AWS_PROFILE=${AWS_PROFILE} AWS_REGION=${AWS_REGION} APP_NAME=${APP_NAME} HASURA_ADMIN_SECRET=${HASURA_ADMIN_SECRET} HASURA_JWT_SECRET=${HASURA_JWT_SECRET} npx ts-node bin/post-deploy.ts

deploy-schema:
	cd hasura; hasura migrate apply