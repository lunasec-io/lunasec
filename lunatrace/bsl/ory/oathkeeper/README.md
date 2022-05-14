<!--
  ~ Copyright by LunaSec (owned by Refinery Labs, Inc)
  ~
  ~ Licensed under the Creative Commons Attribution-ShareAlike 4.0 International
  ~ (the "License"); you may not use this file except in compliance with the
  ~ License. You may obtain a copy of the License at
  ~
  ~ https://creativecommons.org/licenses/by-sa/4.0/legalcode
  ~
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  ~
-->
# Oathkeeper

`./build-config.sh` will take the templates defined in `./templates/` and substitute their
defined environment variables. The resulting files will be written to `./generated/`.

If you add a new environment variable to a file in `templates/` it must be added to the `.env` file in this directory
(used for running locally, outside of docker), the `lunatrace/bsl/docker-compose.yaml` under the `oathkeeper` service (most common local dev flow),
and `lunatrace/bsl/backend-cdk/lib/lunatrace-backend-stack.ts` under the `oathkeeper` image (production).

## Production 
To add additional environment variables for oathkeeper in production, add them to `lunasec/lunatrace/bsl/backend-cdk/lib/lunatrace-backend-stack.ts`.

## Docker
When using docker-compose, oathkeeper will be intelligent enough to regenerate the config files on startup if the `/config` directory is mounted into the container.

## Local
```bash
# prod is used because it uses `localhost` to refer to resources which is needed if you are running outside of oathkeeper.
env $(xargs < .env) ./build-config.sh
oathkeeper --config generated/config.yaml serve
```
