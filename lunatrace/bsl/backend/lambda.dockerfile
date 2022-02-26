FROM node:16-slim AS builder

WORKDIR /app

COPY package.json /app
COPY yarn.lock-workspace /app/yarn.lock

RUN yarn install

COPY . /app

RUN yarn run compile

FROM amazon/aws-lambda-nodejs:14

COPY --from=builder /app/build ${LAMBDA_TASK_ROOT}
COPY --from=builder /app/node_modules ${LAMBDA_TASK_ROOT}

ENV LAMBDA_ENV prod

CMD [ "handler.handler" ]
