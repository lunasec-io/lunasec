/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Creative Commons Attribution-ShareAlike 4.0 International
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
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

/**
 * Add links that need to be redirected here. This config will be used to generated an redirect config that is uploaded
 * to AWS S3 to perform the redirects. We have a little module that does this for us.
 * Important Note: Make sure you add a trailing slash to links to all links!
 */
const redirectConfig = {
  prefix: '/docs',
  links: [
    {
      from: '/pages/getting-started/dedicated-tokenizer/backend/',
      to: '/pages/lunadefend/getting-started/dedicated-tokenizer/backend-setup/',
    },
    {
      from: '/pages/getting-started/dedicated-tokenizer/backend-setup/',
      to: '/pages/lunadefend/getting-started/dedicated-tokenizer/backend-setup/',
    },
    {
      from: '/pages/overview/features/',
      to: '/pages/lunadefend/how-it-works/features/',
    },
    {
      from: '/pages/how-it-works/features/',
      to: '/pages/lunadefend/how-it-works/features/',
    },
    {
      from: '/pages/overview/security/encryption/',
      to: '/pages/lunadefend/how-it-works/security/encryption/',
    },
    {
      from: '/pages/how-it-works/security/encryption/',
      to: '/pages/lunadefend/how-it-works/security/encryption/',
    },
    {
      from: '/pages/overview/security/hackerone-top-10-vuln-types/',
      to: '/pages/lunadefend/how-it-works/security/hackerone-top-10-vuln-types/',
    },
    {
      from: '/pages/how-it-works/security/hackerone-top-10-vuln-types/',
      to: '/pages/lunadefend/how-it-works/security/hackerone-top-10-vuln-types/',
    },
    {
      from: '/pages/overview/security/intro/',
      to: '/pages/lunadefend/how-it-works/security/introduction/',
    },
    {
      from: '/pages/how-it-works/security/intro/',
      to: '/pages/lunadefend/how-it-works/security/introduction/',
    },
    {
      from: '/pages/overview/security/levels/',
      to: '/pages/lunadefend/how-it-works/security/levels/',
    },
    {
      from: '/pages/how-it-works/security/levels/',
      to: '/pages/lunadefend/how-it-works/security/levels/',
    },
    {
      from: '/pages/overview/security/mitre-cwe-top-25-weaknesses/',
      to: '/pages/lunadefend/how-it-works/security/mitre-cwe-top-25-weaknesses/',
    },
    {
      from: '/pages/how-it-works/security/mitre-cwe-top-25-weaknesses/',
      to: '/pages/lunadefend/how-it-works/security/mitre-cwe-top-25-weaknesses/',
    },
    {
      from: '/pages/overview/security/owasp-top-10/',
      to: '/pages/lunadefend/how-it-works/security/owasp-top-10/',
    },
    {
      from: '/pages/how-it-works/security/owasp-top-10/',
      to: '/pages/lunadefend/how-it-works/security/owasp-top-10/',
    },
    {
      from: '/pages/overview/security/vulns-and-mitigations/',
      to: '/pages/lunadefend/how-it-works/security/vulns-and-mitigations/',
    },
    {
      from: '/pages/how-it-works/security/vulns-and-mitigations/',
      to: '/pages/lunadefend/how-it-works/security/vulns-and-mitigations/',
    },
    {
      from: '/pages/getting-started/dedicated-tokenizer/frontend-config/',
      to: '/pages/lunadefend/getting-started/dedicated-tokenizer/frontend-setup/',
    },
    {
      from: '/pages/getting-started/dedicated-tokenizer/frontend-setup/',
      to: '/pages/lunadefend/getting-started/dedicated-tokenizer/frontend-setup/',
    },
    {
      from: '/pages/overview/token-lifecycle/',
      to: '/pages/lunadefend/how-it-works/tokens/',
    },
    {
      from: '/pages/how-it-works/token-lifecycle/',
      to: '/pages/lunadefend/how-it-works/tokens/',
    },
    {
      from: '/pages/overview/authentication/',
      to: '/pages/lunadefend/how-it-works/sessions/',
    },
    {
      from: '/pages/how-it-works/authentication/',
      to: '/pages/lunadefend/how-it-works/sessions/',
    },
    {
      from: '/pages/cli-config/',
      to: '/pages/lunadefend/cli-config/',
    },
    {
      from: '/pages/cli-config/interfaces/DeploymentConfigOptions/',
      to: '/pages/lunadefend/cli-config/interfaces/DeploymentConfigOptions/',
    },
    {
      from: '/pages/cli-config/interfaces/DevelopmentConfigOptions/',
      to: '/pages/lunadefend/cli-config/interfaces/DevelopmentConfigOptions/',
    },
    {
      from: '/pages/cli-config/interfaces/GrantConfigOptions/',
      to: '/pages/lunadefend/cli-config/interfaces/GrantConfigOptions/',
    },
    {
      from: '/pages/cli-config/interfaces/JwksAuthProviderConfig/',
      to: '/pages/lunadefend/cli-config/interfaces/JwksAuthProviderConfig/',
    },
    {
      from: '/pages/cli-config/interfaces/LunaSecStackConfigOptions/',
      to: '/pages/lunadefend/cli-config/interfaces/LunaSecStackConfigOptions/',
    },
    {
      from: '/pages/cli-config/interfaces/MetricConfigOptions/',
      to: '/pages/lunadefend/cli-config/interfaces/MetricConfigOptions/',
    },
    {
      from: '/pages/cli/analytics/',
      to: '/pages/lunadefend/cli/analytics/',
    },
    {
      from: '/pages/cli/deploy/',
      to: '/pages/defend/cli/deploy/',
    },
    {
      from: '/pages/cli/install/',
      to: '/pages/lunadefend/cli/install/',
    },
    {
      from: '/pages/cli/resources',
      to: '/pages/lunadefend/cli/resources',
    },
    {
      from: '/pages/cli/start/',
      to: '/pages/lunadefend/cli/start/',
    },
    {
      from: '/pages/deployment/analytics/',
      to: '/pages/lunadefend/deployment/analytics/',
    },
    {
      from: '/pages/deployment/deploy-with-aws/',
      to: '/pages/lunadefend/deployment/deploy-with-aws/',
    },
    {
      from: '/pages/deployment/secret-providers/',
      to: '/pages/lunadefend/deployment/secret-providers/',
    },
    {
      from: '/pages/getting-started/choose-your-setup/',
      to: '/pages/lunadefend/getting-started/choose-your-setup/',
    },
    {
      from: '/pages/getting-started/dedicated-tokenizer/backend-setup/',
      to: '/pages/lunadefend/getting-started/dedicated-tokenizer/backend-setup/',
    },
    {
      from: '/pages/getting-started/dedicated-tokenizer/frontend-setup/',
      to: '/pages/lunadefend/getting-started/dedicated-tokenizer/frontend-setup/',
    },
    {
      from: '/pages/getting-started/dedicated-tokenizer/graphql/',
      to: '/pages/lunadefend/getting-started/dedicated-tokenizer/graphql/',
    },
    {
      from: '/pages/getting-started/dedicated-tokenizer/handling-files/',
      to: '/pages/lunadefend/getting-started/dedicated-tokenizer/handling-files/',
    }
  ]
};

module.exports = redirectConfig;
