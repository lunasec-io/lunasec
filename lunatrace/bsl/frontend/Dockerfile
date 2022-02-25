FROM node:14-alpine
WORKDIR /usr/src/app

COPY yarn.lock-workspace /usr/src/app/
COPY package.json /usr/src/app/
RUN mv yarn.lock-workspace yarn.lock
RUN yarn install

COPY . /usr/src/app
RUN yarn run build:docker

FROM flashspys/nginx-static
RUN apk update && apk upgrade
COPY --from=0 /usr/src/app/build /static

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
