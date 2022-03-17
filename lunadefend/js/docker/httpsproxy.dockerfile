FROM node:14 as localstack-proxy

RUN apt update && apt install -y curl

RUN npm install -g local-ssl-proxy

COPY ./lunadefend/js/docker/proxy /proxy
COPY ./tools/service-scripts/wait-for-it.sh /wait-for-it.sh

RUN chmod +x /wait-for-it.sh

WORKDIR /

ENTRYPOINT /wait-for-it.sh "$DEPENDENCIES__LOCALSTACK_PROXY" -q -t 60 -- local-ssl-proxy -s 4568 -n localstack -t 4566 -c /proxy/cert.pem -k /proxy/key.pem
