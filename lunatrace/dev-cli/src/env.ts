/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
export function envVars(vars: Record<string, string>): string {
  return Object.keys(vars)
    .map((k) => `${k}="${vars[k]}"`)
    .join(' ');
}

// development configuration for the GitHub app
export const githubAppConfig = {
  GITHUB_APP_ID: '179126',
  GITHUB_APP_PRIVATE_KEY: `$(cat github-app-dev.2022-03-09.private-key.pem | base64 -w0)`,
};

export const smeeWebhookUrl = 'https://smee.io/PFQhzcyUpi770GiD';

export const backendEnv = envVars({
  ...githubAppConfig,
});

export function queueEnvConfig(
  handler: 'process-manifest' | 'process-sbom' | 'process-webhook' | 'process-repository'
): Record<string, string> {
  return {
    QUEUE_HANDLER: handler,
    WORKER_TYPE: 'queue-handler',
  };
}

export const manifestWorkEnv = envVars({
  ...githubAppConfig,
  ...queueEnvConfig('process-manifest'),
});

export const sbomWorkerEnv = envVars({
  ...githubAppConfig,
  ...queueEnvConfig('process-sbom'),
});

export const webhookWorkerEnv = envVars({
  ...githubAppConfig,
  ...queueEnvConfig('process-webhook'),
});

export const repositoryWorkerEnv = envVars({
  ...githubAppConfig,
  ...queueEnvConfig('process-repository'),
});

export const dbUrlEnv = envVars({
  DSN: 'postgres://postgres:postgrespassword@localhost:5431/lunatrace',
});
