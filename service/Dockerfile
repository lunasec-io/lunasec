FROM node:14 as builder

COPY . /service
WORKDIR /service

RUN npm install
RUN npm run build:server

FROM amazon/aws-lambda-nodejs:14

COPY --from=builder /service/package.json ${LAMBDA_TASK_ROOT}
COPY --from=builder /service/node_modules ${LAMBDA_TASK_ROOT}/node_modules
COPY --from=builder /service/views ${LAMBDA_TASK_ROOT}/views
COPY --from=builder /service/build/server ${LAMBDA_TASK_ROOT}

CMD ["main.handler"]
