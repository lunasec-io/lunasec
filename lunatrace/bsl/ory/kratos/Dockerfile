FROM oryd/kratos:v0.9.0

USER root

ADD config.yaml /config/config.yaml
ADD config.production.yaml /config/config.production.yaml

ADD identity_v0.schema.json /config/
ADD identity_v1.schema.json /config/
ADD oidc.github.jsonnet /config/oidc.github.jsonnet
ADD oidc.hook.jsonnet /config/oidc.hook.jsonnet
