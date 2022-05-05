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
# LunaTrace Dev Setup

This is basically just going to be a collection of notes until we actually sit down to write this guide out better.

## System Requirements

- `docker`
- `docker-compose`
- `tmux`
- `tmuxp`
- `golang` (>=1.17)
- `node` (>=16)
- `yarn` (Just use `npm i -g yarn` if missing)
- Bash and other GNU utils (BSD utils are untested, i.e. Mac OSX)

## Dev Tools

We prefer IntelliJ by JetBrains and our dev configs are committed to the base of the repo under the `.idea` folder.

If you're using another IDE it'll probably work too because our workflows don't use the IDE a ton. We just use it for
stuff like auto-linting and various other quality of life tasks like easily navigating the codebase.

### AWS Credentials

In order to work with local dev, you'll have to have functional AWS credentials that the AWS CLI can find.

This exercise is left to you to sort out. Generally you'll need to put your credentials in `~/.aws/credentials` though.

## Repo setup

You'll have to clone the repo first and ` cd` to it first.

### Setup NPM Dependencies

Just run `yarn` from anywhere in the repo and it'll go sort out building deps. Otherwise, deps are committed to Git as
a part of the "Yarn PNP" flow. (You will not see a `node_modules` folder, only a `.yarn` one)

You'll also have to add `smee` to your path with:

```sh
npm install -g smee-client
```

### Setup AWS Dependencies

From `$REPO_ROOT/lunatrace/bsl/backend-cdk` folder, you'll need to run the following:
```sh
DEVELOPMENT=true DEV_USER=<YOURNAMEHERE> yarn run cdk deploy
```

That will run a real AWS deployment of the "dev" resources required. Once it finished, you should see something like:

```sh
  ✅  lunatrace-forrest-EtlStorage

✨  Deployment time: 187.97s

Outputs:
lunatrace-forrest-EtlStorage.GrypeDatabaseBucketName = lunatrace-forrest-etlsto-grypedatabasebucketddd6c-xaxd9qi54ohd
lunatrace-forrest-EtlStorage.ManifestBucketName = lunatrace-forrest-etlstora-manifestbucket46c412a5-1uj6ttbhojbec
lunatrace-forrest-EtlStorage.ProcessManifestProcessingQueueName = lunatrace-forrest-EtlStorage-ProcessManifestProcessingQueue7A1F1CB2-vktaIR4IhObz
lunatrace-forrest-EtlStorage.ProcessRepositoryProcessingQueueName = lunatrace-forrest-EtlStorage-ProcessRepositoryProcessingQueueD69CAA-ZzIT7dqqT7We
lunatrace-forrest-EtlStorage.ProcessSbomProcessingQueueName = lunatrace-forrest-EtlStorage-ProcessSbomProcessingQueueA3A9FE69-FUUYe8R7yq9j
lunatrace-forrest-EtlStorage.ProcessWebhookProcessingQueueName = lunatrace-forrest-EtlStorage-ProcessWebhookProcessingQueue475F8047-UID5vISORfui
lunatrace-forrest-EtlStorage.SbomBucketName = lunatrace-forrest-etlstorage-sbombucket8550fee8-1t3tw56o6azsh

Stack ARN:
arn:aws:cloudformation:us-west-2:134071937287:stack/lunatrace-forrest-EtlStorage/d8f85c50-cca8-11ec-8714-024c26edafc1


```

You'll need to format those values into an env file at `$REPO/lunatrace/backend/.env.dev`.  From the above output, mine looks like:

```env
S3_SBOM_BUCKET="lunatrace-forrest-etlstorage-sbombucket8550fee8-1t3tw56o6azsh"
S3_MANIFEST_BUCKET="lunatrace-forrest-etlstora-manifestbucket46c412a5-1uj6ttbhojbec"

PROCESS_WEBHOOK_QUEUE="lunatrace-forrest-EtlStorage-ProcessWebhookProcessingQueue475F8047-UID5vISORfui"
PROCESS_SBOM_QUEUE="lunatrace-forrest-EtlStorage-ProcessSbomProcessingQueueA3A9FE69-FUUYe8R7yq9j"
PROCESS_MANIFEST_QUEUE="lunatrace-forrest-EtlStorage-ProcessManifestProcessingQueue7A1F1CB2-vktaIR4IhObz"
PROCESS_REPOSITORY_QUEUE="lunatrace-forrest-EtlStorage-ProcessRepositoryProcessingQueueD69CAA-ZzIT7dqqT7We"

NODE_ENV=development

```

### Running `tmuxp`

From the `$REPO_ROOT/lunatrace/dev-cli` folder run `yarn run start` and you should see:

```
Generating tmuxp config: /home/free/code/temp/csp-test/lunatrace/bsl/generated-lunatrace-tmuxp.yaml...
<GARBAGE CLIPPED>
Starting tmuxp...
cd /home/<USER>/<PATH_TO_REPO>/lunatrace/bsl && tmuxp load /home/<USER>/<PATH_TO_REPO>/lunatrace/bsl/generated-lunatrace-tmuxp.yaml
```

Now that you have that file, you can run that bottom line and it'll set everything up for you to run. :)

_NOTE: If you're on a Mac, you might have to swap all `sudo docker` calls with `docker` because of differences in how the OS deals with Docker._

Also, if you ever need to "kill" tmux, you must do `Control-B` and then type `:kill-session` followed by Enter to confirm.

That'll nuke the whole session and sometimes Docker Compose might get angry with you about ports the next time you start
it up, so if you accidentally have problems after you can run `sudo docker-compose down` from the `bsl` folder.

### Setting up the Database

Everything will likely break a bunch at this point because the database hasn't properly been configured yet.

We use the open source microservices Hasura and Kratos, and both talk to the database. They will both need their migrations run.

#### Kratos (do this first):

```sh
sudo docker exec -it $(sudo docker ps | grep kratos | awk '{print $1}') /usr/bin/kratos migrate sql /config/config.yaml migrate sql -e --yes
```

This runs the kratos migrations from inside a docker container.

_NOTE: It may be possible to use the Kratos CLI from your machine directly instead if Docker is janky. But this approach
will ensure that your Kratos version is always in sync with the Docker version._

#### Hasura (second):

From the `bsl/hasura` folder run...

```sh
hasura migrate apply
hasura metadata apply
hasura metadata reload
```

Those should migrate the database. Once that's done you should be able to pull up the Hasura console either
by running `hasura console` or going to `http://localhost:9695/`. This will show you the GraphQL server and an admin
dashboard for the database.

### Re-run everything

At this point you should restart the cluster and see if it comes up properly.

This is important because otherwise the GraphQL code gen stuff will probably not have run, and then everything might break.

### Test flow

Open up `http://localhost:4455/` and you should hit the front-end of the app. If it's busted... go hit us up on Slack
and we'll help you sort it out. 
([Invite for the Slack](https://join.slack.com/t/lunaseccommunity/shared_invite/zt-178lvngk1-SHS6bMkQS71YWtCne2XWhA))

Hopefully this works. Please improve this doc when you use it and something is broken or could be improved. Thanks!
