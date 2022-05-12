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

This allows us to use different environments defined in `.env.*` files. 

## Docker
To build oathkeeper in docker, you will need to `docker-compose build oathkeeper`.

## Local
For active oathkeeper development, it is annoying to have to build the docker container every time.
Instead, in this directory you can run:

```bash
# prod is used because it uses `localhost` to refer to resources which is needed if you are running outside of oathkeeper.
OATHKEEPER_ENV=prod ./build-config.sh
oathkeeper --config generated/config.yaml serve
```
