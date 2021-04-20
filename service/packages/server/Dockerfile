FROM node:14 as builder

COPY . /service
WORKDIR /service

RUN npm install
RUN npm run compile

FROM amazon/aws-lambda-nodejs:14

COPY --from=builder /service/packages/server/package.json ${LAMBDA_TASK_ROOT}
COPY --from=builder /service/node_modules ${LAMBDA_TASK_ROOT}/node_modules
COPY --from=builder /service/packages/server/views ${LAMBDA_TASK_ROOT}/views
COPY --from=builder /service/packages/server/build ${LAMBDA_TASK_ROOT}/src

CMD ["main.handler"]
