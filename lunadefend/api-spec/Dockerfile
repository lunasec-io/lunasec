 # syntax=docker/dockerfile:1
 FROM swaggerapi/swagger-codegen-cli
 RUN apk add --no-cache python g++ make
 COPY . .
 RUN yarn install --production
 CMD ["node", "src/index.js"]