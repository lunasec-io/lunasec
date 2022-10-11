FROM node:16-slim

COPY . /code

WORKDIR /code

RUN npm install

ENTRYPOINT ["npm", "run", "serve-production"]
