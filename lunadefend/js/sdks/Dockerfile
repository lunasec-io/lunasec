FROM node:14

RUN npm install -g npm@^7

RUN mkdir /work

COPY . /work

WORKDIR /work

RUN npm install

ENTRYPOINT ["npm", "run", "compile"]


