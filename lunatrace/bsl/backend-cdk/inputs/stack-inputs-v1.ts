/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { StackInputs } from './types';

export const stackInputsV1: StackInputs = {
  cdkDefaultRegion: 'us-west-2',
  cdkDefaultAccount: '134071937287',
  appName: 'lunatrace',
  domainName: 'lunatrace.lunasec.io',
  domainZoneId: 'Z0054573K1C8HQHBWE0L',
  vpcId: 'vpc-0c99b65a5fed1049e',
  oathkeeperConfigBucketArn: 'arn:aws:s3:::lunatrace-backendstack-oryconfig40a14966-7bohik8ti3qc',
  certificateArn: 'arn:aws:acm:us-west-2:134071937287:certificate/5a390bf1-cb77-4394-8d75-900d3b857fc7',
  backendStaticSecretArn: 'arn:aws:secretsmanager:us-west-2:134071937287:secret:LunaTraceBackendStaticSecret-rMiBGh',
  databaseSecretArn: 'arn:aws:secretsmanager:us-west-2:134071937287:secret:lunatrace-HasuraDatabaseUrlSecret-v2-HdcJ1q',
  gitHubAppId: '180838',
  gitHubAppPrivateKey: 'arn:aws:secretsmanager:us-west-2:134071937287:secret:LunaTraceGitHubAppPrivateKey-iAHHOb',
  gitHubAppLink: 'https://github.com/apps/lunatrace-by-lunasec/installations/new',
  gitHubAppWebHookSecret: 'arn:aws:secretsmanager:us-west-2:134071937287:secret:LunaTraceGitHubAppWebHookSecret-3YTJBv',
  kratosCookieSecretArn: 'arn:aws:secretsmanager:us-west-2:134071937287:secret:LunaTraceKratosCookieSecret-znMFAC',
  kratosCipherSecretArn: 'arn:aws:secretsmanager:us-west-2:134071937287:secret:LunaTraceKratosCipherSecret-ehfsGT',
  hasuraAdminSecretArn: 'arn:aws:secretsmanager:us-west-2:134071937287:secret:lunatrace-HasuraAdminSecret-pJLyHB',
  discordWebhookUrlArn: 'arn:aws:secretsmanager:us-west-2:916430638549:secret:discord-webhook-url-KRnik1',

  datadogApiKeyArn: 'arn:aws:secretsmanager:us-west-2:134071937287:secret:lunatrace-DatadogAPIKey-S19XEK',
  githubOauthAppLoginSecretArn:
    'arn:aws:secretsmanager:us-west-2:134071937287:secret:LunaTraceKratosGitHubOAuthAppLoginSecret-zrd4WX',
  githubOauthAppLoginClientIdArn:
    'arn:aws:secretsmanager:us-west-2:134071937287:secret:LunaTraceKratosGitHubOAuthAppLoginClientId-ryyGXL',
  kratosSlackSecretArn: 'arn:aws:secretsmanager:us-west-2:134071937287:secret:KratosSlackSecret-W5WX6d',
  dbSecurityGroup: 'sg-05b9e1c5e5c1b123a',
};
