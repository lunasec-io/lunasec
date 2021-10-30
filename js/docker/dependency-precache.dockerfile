FROM node:14-bullseye as lunasec-precached-dependencies

RUN apt-get update && apt-get install --yes openjdk-17-jre curl sqlite3 jq docker

RUN curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && chmod +x /usr/local/bin/docker-compose

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install

RUN aws --version

ENV NODE_OPTIONS "--unhandled-rejections=strict"

RUN yarn global add lerna

COPY . /repo

WORKDIR /repo

RUN lerna bootstrap --ignore-scripts --ci

WORKDIR ../

RUN rm -rf /repo

