FROM amazon/aws-lambda-nodejs:12

COPY . /var/task

RUN npm install
RUN npm run build:browser

CMD ["main.handler"]