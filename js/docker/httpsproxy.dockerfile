FROM node:14

RUN apt update && apt install curl

RUN npm install -g local-ssl-proxy

COPY ./js/docker/proxy /proxy

WORKDIR /

ENTRYPOINT local-ssl-proxy -s 4568 -n localhost -t 4566 -c /proxy/cert.pem -k /proxy/key.pem