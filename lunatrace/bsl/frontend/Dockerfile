FROM repo-bootstrap as frontend-build

WORKDIR /usr/repo/lunatrace/bsl/frontend

ARG REACT_APP_BASE_URL
ARG REACT_APP_DATADOG_RUM_PROXY_URI
ARG REACT_APP_GITHUB_APP_LINK
ARG REACT_APP_GRAPHQL_URL
ARG REACT_APP_KRATOS_URL

RUN yarn run build:docker

FROM flashspys/nginx-static
RUN apk update && apk upgrade
COPY --from=frontend-build /usr/repo/lunatrace/bsl/frontend/build /static

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
