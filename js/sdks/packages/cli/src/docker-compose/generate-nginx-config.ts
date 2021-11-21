/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
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
import { LunaSecStackEnvironment } from './lunasec-stack';

export function generateNginxEnvConfig(
  env: LunaSecStackEnvironment,
  baseEnvConfig: Record<string, string>
): Record<string, string> {
  if (env !== 'hosted-live-demo') {
    return baseEnvConfig;
  }

  return {
    ...baseEnvConfig,
    APPLICATION_FRONT_END: 'https://app.lunasec.dev',
    CDN_PROTOCOL: 'https',
    CDN_HOST: 'secure-frame.lunasec.dev',
    LOCALSTACK_URL: 'http://localhost:4566',
    // TODO (freeqaz) I'm not sure what this value needs to be still.
    // LOCAL_HTTPS_PROXY: '', // 'https://localstack-proxy:4568',
    // LOCALSTACK_HOSTNAME: 'localstack.lunasec.dev',
    REACT_APP_EXPRESS_URL: 'https://express.lunasec.dev',
    REACT_APP_GRAPHQL_URL: 'https://graphql.lunasec.dev',
    REACT_APP_TOKENIZER_URL: 'https://tokenizer.lunasec.dev',
    // TODO Actually make this use the tests config
    SESSION_JWKS_URL: 'http://application-back-end:3001/.lunasec/jwks.json',
  };
}
