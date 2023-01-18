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
export interface StackInputs {
  appName: string;
  backendStaticSecretArn: string;
  cdkDefaultAccount: string;
  cdkDefaultRegion: string;
  databaseSecretArn: string;
  datadogApiKeyArn: string;
  domainName: string;
  domainZoneId: string;
  certificateArn: string;
  gitHubAppId: string;
  gitHubAppPrivateKey: string;
  gitHubAppLink: string;
  gitHubAppWebHookSecret: string;
  githubOauthAppLoginClientIdArn: string;
  githubOauthAppLoginSecretArn: string;
  kratosCipherSecretArn: string;
  kratosCookieSecretArn: string;
  kratosSlackSecretArn: string;
  discordWebhookUrlArn: string;
  hasuraAdminSecretArn: string;
  oathkeeperConfigBucketArn: string;
  vpcId: string;
  dbSecurityGroup: string;
}
