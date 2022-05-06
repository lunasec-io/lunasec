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
# LunaTrace

LunaTrace is a vulnerability scanner that tags and tracks inventories through to production deployment.  It combines static
analysis at build time with runtime tracking and the capability to automatically patch some high-profile vulnerabilities.

## Development
Hasura manages the GraphQl API and postgres database, found in the `./hasura` folder.

See `README_DEV_SETUP.md` for info on bringing up Hasura and Ory.


Do **not** use the Hasura "console" GUI for managing the database, either creating tables or modifying them.  Hasura produces
low quality up migrations and broken down migrations that are not maintainable.  For pre-production, modify the existing init migration files.
For production migration, use `hasura migrate create <name>` to scaffold manual migrations.

Use `hasura migrate apply --down 1` to do a down migration.

### Starting Everything
Tmux-p is used to start the cluster in dev mode. From the bsl folder, run `tmuxp load luantrace-tmuxp.yaml`

## Backend Data Ingestion
Backend services written in typescript can add data to postgres directly, bypassing Hasura when necessary.  These are found in the
`./backend` folder.  Run `yarn run vulnerabilities:update` from this folder to load the database with grype vulnerabilities. 

To scaffold a project and a build/scan run `yarn run test:scan:upload`
