FROM node:14 as lunasec-precached-dependencies

RUN apt-get update && apt-get install --yes openjdk-8-jre curl sqlite jq

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
