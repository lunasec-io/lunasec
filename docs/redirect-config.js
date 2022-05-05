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
      from: '/pages/cli/analytics/',
      to: '/pages/lunadefend/cli/analytics/',
    },
    {
      from: '/pages/getting-started/dedicated-tokenizer/graphql/',
      to: '/pages/lunadefend/getting-started/dedicated-tokenizer/graphql/',
    },
    {
      from: '/pages/getting-started/dedicated-tokenizer/handling-files/',
      to: '/pages/lunadefend/getting-started/dedicated-tokenizer/handling-files/',
    },
    {
      from: '/pages/cli-config/interfaces/DeploymentConfigOptions/',
      to: '/pages/lunadefend/cli-config/interfaces/DeploymentConfigOptions/'
    },
    {
      from: '/pages/cli-config/interfaces/DevelopmentConfigOptions/',
      to: '/pages/lunadefend/cli-config/interfaces/DevelopmentConfigOptions/'
    },
    {
      from: '/pages/cli-config/interfaces/GrantConfigOptions/',
      to: '/pages/lunadefend/cli-config/interfaces/GrantConfigOptions/'
    },
    {
      from: '/pages/cli-config/interfaces/JwksAuthProviderConfig/',
      to: '/pages/lunadefend/cli-config/interfaces/JwksAuthProviderConfig/'
    },
    {
      from: '/pages/cli-config/interfaces/LunaSecStackConfigOptions/',
      to: '/pages/lunadefend/cli-config/interfaces/LunaSecStackConfigOptions/'
    },
    {
      from: '/pages/cli-config/interfaces/MetricConfigOptions/',
      to: '/pages/lunadefend/cli-config/interfaces/MetricConfigOptions/'
    },
    {
      from: '/pages/cli/deploy/',
      to: '/pages/lunadefend/cli/deploy/'
    },
    {
      from: '/pages/cli/install/',
      to: '/pages/lunadefend/cli/install/'
    },
    {
      from: '/pages/cli/resources/',
      to: '/pages/lunadefend/cli/resources/'
    },
    {
      from: '/pages/cli/start/',
      to: '/pages/lunadefend/cli/start/'
    },
    {
      from: '/pages/deployment/analytics/',
      to: '/pages/lunadefend/deployment/analytics/'
    },
    {
      from: '/pages/deployment/deploy-with-aws/',
      to: '/pages/lunadefend/deployment/deploy-with-aws/'
    },
    {
      from: '/pages/deployment/secret-providers/',
      to: '/pages/lunadefend/deployment/secret-providers/'
    },
    {
      from: '/pages/getting-started/choose-your-setup/',
      to: '/pages/lunadefend/getting-started/choose-your-setup/'
    },
    {
      from: '/pages/getting-started/dedicated-tokenizer/handling-text/',
      to: '/pages/lunadefend/getting-started/dedicated-tokenizer/handling-text/'
    },
    {
      from: '/pages/getting-started/dedicated-tokenizer/introduction/',
      to: '/pages/lunadefend/getting-started/dedicated-tokenizer/introduction/'
    },
    {
      from: '/pages/getting-started/simple-tokenizer/guide/',
      to: '/pages/lunadefend/getting-started/simple-tokenizer/guide/'
    },
    {
      from: '/pages/getting-started/trying-lunasec/',
      to: '/pages/lunadefend/getting-started/trying-lunasec/'
    },
    {
      from: '/pages/how-it-works/grants/',
      to: '/pages/lunadefend/how-it-works/grants/'
    },
    {
      from: '/pages/how-it-works/secure-components/',
      to: '/pages/lunadefend/how-it-works/secure-components/'
    },
    {
      from: '/pages/how-it-works/security/introduction/',
      to: '/pages/lunadefend/how-it-works/security/introduction/'
    },
    {
      from: '/pages/how-it-works/sessions/',
      to: '/pages/lunadefend/how-it-works/sessions/'
    },
    {
      from: '/pages/how-it-works/tokens/',
      to: '/pages/lunadefend/how-it-works/tokens/'
    },
    {
      from: '/pages/node-sdk/',
      to: '/pages/lunadefend/node-sdk/'
    },
    {
      from: '/pages/node-sdk/classes/ExpressAuthPlugin/',
      to: '/pages/lunadefend/node-sdk/classes/ExpressAuthPlugin/'
    },
    {
      from: '/pages/node-sdk/classes/Grants/',
      to: '/pages/lunadefend/node-sdk/classes/Grants/'
    },
    {
      from: '/pages/node-sdk/classes/LunaSec/',
      to: '/pages/lunadefend/node-sdk/classes/LunaSec/'
    },
    {
      from: '/pages/node-sdk/classes/LunaSecError/',
      to: '/pages/lunadefend/node-sdk/classes/LunaSecError/'
    },
    {
      from: '/pages/node-sdk/classes/SecureResolver/',
      to: '/pages/lunadefend/node-sdk/classes/SecureResolver/'
    },
    {
      from: '/pages/node-sdk/classes/SimpleTokenizerBackend/',
      to: '/pages/lunadefend/node-sdk/classes/SimpleTokenizerBackend/'
    },
    {
      from: '/pages/node-sdk/classes/TokenDirective/',
      to: '/pages/lunadefend/node-sdk/classes/TokenDirective/'
    },
    {
      from: '/pages/node-sdk/enums/DeploymentStage/',
      to: '/pages/lunadefend/node-sdk/enums/DeploymentStage/'
    },
    {
      from: '/pages/node-sdk/interfaces/AwsCredentials/',
      to: '/pages/lunadefend/node-sdk/interfaces/AwsCredentials/'
    },
    {
      from: '/pages/node-sdk/interfaces/FunctionConfig/',
      to: '/pages/lunadefend/node-sdk/interfaces/FunctionConfig/'
    },
    {
      from: '/pages/node-sdk/interfaces/FunctionInvocationResult/',
      to: '/pages/lunadefend/node-sdk/interfaces/FunctionInvocationResult/'
    },
    {
      from: '/pages/node-sdk/interfaces/LunaSecConfig/',
      to: '/pages/lunadefend/node-sdk/interfaces/LunaSecConfig/'
    },
    {
      from: '/pages/node-sdk/interfaces/LunaSecErrorProperties/',
      to: '/pages/lunadefend/node-sdk/interfaces/LunaSecErrorProperties/'
    },
    {
      from: '/pages/node-sdk/interfaces/SecureResolverSdkConfig/',
      to: '/pages/lunadefend/node-sdk/interfaces/SecureResolverSdkConfig/'
    },
    {
      from: '/pages/node-sdk/interfaces/SimpleTokenizerBackendConfig/',
      to: '/pages/lunadefend/node-sdk/interfaces/SimpleTokenizerBackendConfig/'
    },
    {
      from: '/pages/overview/demo-app/overview/',
      to: '/pages/lunadefend/overview/demo-app/overview/'
    },
    {
      from: '/pages/overview/demo-app/walkthrough/',
      to: '/pages/lunadefend/overview/demo-app/walkthrough/'
    },
    {
      from: '/pages/overview/example-usage/',
      to: '/pages/lunadefend/overview/example-usage/'
    },
    {
      from: '/pages/overview/introduction/',
      to: '/pages/lunadefend/overview/introduction/'
    },
    {
      from: '/pages/react-sdk/',
      to: '/pages/lunadefend/react-sdk/'
    },
    {
      from: '/pages/react-sdk/interfaces/BaseDetokenizingComponentProps/',
      to: '/pages/lunadefend/react-sdk/interfaces/BaseDetokenizingComponentProps/'
    },
    {
      from: '/pages/react-sdk/interfaces/BaseTokenizingComponentProps/',
      to: '/pages/lunadefend/react-sdk/interfaces/BaseTokenizingComponentProps/'
    },
    {
      from: '/pages/react-sdk/interfaces/SecureInputPropsWithoutValidator/',
      to: '/pages/lunadefend/react-sdk/interfaces/SecureInputPropsWithoutValidator/'
    },
    {
      from: '/pages/react-sdk/interfaces/SecureInputPropsWithValidator/',
      to: '/pages/lunadefend/react-sdk/interfaces/SecureInputPropsWithValidator/'
    },
    {
      from: '/pages/react-sdk/interfaces/SecurePropsLookup/',
      to: '/pages/lunadefend/react-sdk/interfaces/SecurePropsLookup/'
    },
    {
      from: '/pages/react-sdk/interfaces/SecureUploadProps/',
      to: '/pages/lunadefend/react-sdk/interfaces/SecureUploadProps/'
    },
    {
      from: '/pages/tokenizer-api-spec/',
      to: '/pages/lunadefend/tokenizer-api-spec/'
    },
    {
      from: '/pages/tokenizer-sdk/',
      to: '/pages/lunadefend/tokenizer-sdk/'
    },
    {
      from: '/pages/tokenizer-sdk/classes/SimpleTokenizer/',
      to: '/pages/lunadefend/tokenizer-sdk/classes/SimpleTokenizer/'
    },
    {
      from: '/pages/tokenizer-sdk/classes/Tokenizer/',
      to: '/pages/lunadefend/tokenizer-sdk/classes/Tokenizer/'
    },
    {
      from: '/pages/tokenizer-sdk/interfaces/FileInfo/',
      to: '/pages/lunadefend/tokenizer-sdk/interfaces/FileInfo/'
    },
    {
      from: '/pages/tokenizer-sdk/interfaces/TokenizerClientConfig/',
      to: '/pages/lunadefend/tokenizer-sdk/interfaces/TokenizerClientConfig/'
    },
    {
      from: '/pages/tokenizer-sdk/interfaces/TokenizerDetokenizeFileInfo/',
      to: '/pages/lunadefend/tokenizer-sdk/interfaces/TokenizerDetokenizeFileInfo/'
    },
    {
      from: '/pages/tokenizer-sdk/interfaces/TokenizerDetokenizeFileResponse/',
      to: '/pages/lunadefend/tokenizer-sdk/interfaces/TokenizerDetokenizeFileResponse/'
    },
    {
      from: '/pages/tokenizer-sdk/interfaces/TokenizerDetokenizeResponse/',
      to: '/pages/lunadefend/tokenizer-sdk/interfaces/TokenizerDetokenizeResponse/'
    },
    {
      from: '/pages/tokenizer-sdk/interfaces/TokenizerDetokenizeToUrlResponse/',
      to: '/pages/lunadefend/tokenizer-sdk/interfaces/TokenizerDetokenizeToUrlResponse/'
    },
    {
      from: '/pages/tokenizer-sdk/interfaces/TokenizerFailApiResponse/',
      to: '/pages/lunadefend/tokenizer-sdk/interfaces/TokenizerFailApiResponse/'
    },
    {
      from: '/pages/tokenizer-sdk/interfaces/TokenizerGetMetadataResponse/',
      to: '/pages/lunadefend/tokenizer-sdk/interfaces/TokenizerGetMetadataResponse/'
    },
    {
      from: '/pages/tokenizer-sdk/interfaces/TokenizerSetGrantResponse/',
      to: '/pages/lunadefend/tokenizer-sdk/interfaces/TokenizerSetGrantResponse/'
    },
    {
      from: '/pages/tokenizer-sdk/interfaces/TokenizerTokenizeResponse/',
      to: '/pages/lunadefend/tokenizer-sdk/interfaces/TokenizerTokenizeResponse/'
    },
    {
      from: '/pages/tokenizer-sdk/interfaces/TokenizerVerifyGrantResponse/',
      to: '/pages/lunadefend/tokenizer-sdk/interfaces/TokenizerVerifyGrantResponse/'
    }
  ]
};

module.exports = redirectConfig;
