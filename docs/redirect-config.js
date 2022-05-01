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
      to: '/pages/getting-started/dedicated-tokenizer/backend-setup/',
    },
    {
      from: '/pages/lunadefend/getting-started/dedicated-tokenizer/backend/',
      to: '/pages/lunadefend/getting-started/dedicated-tokenizer/backend-setup/',
    },
    {
      from: '/pages/overview/features/',
      to: '/pages/how-it-works/features/',
    },
    {
      from: '/pages/lunadefend/overview/features/',
      to: '/pages/lunadefend/how-it-works/features/',
    },
    {
      from: '/pages/overview/security/encryption/',
      to: '/pages/how-it-works/security/encryption/',
    },
    {
      from: '/pages/lunadefend/overview/security/encryption/',
      to: '/pages/lunadefend/how-it-works/security/encryption/',
    },
    {
      from: '/pages/overview/security/hackerone-top-10-vuln-types/',
      to: '/pages/how-it-works/security/hackerone-top-10-vuln-types/',
    },
    {
      from: '/pages/lunadefend/overview/security/hackerone-top-10-vuln-types/',
      to: '/pages/lunadefend/how-it-works/security/hackerone-top-10-vuln-types/',
    },
    {
      from: '/pages/overview/security/intro/',
      to: '/pages/how-it-works/security/introduction/',
    },
    {
      from: '/pages/lunadefend/overview/security/intro/',
      to: '/pages/lunadefend/how-it-works/security/introduction/',
    },
    {
      from: '/pages/overview/security/levels/',
      to: '/pages/how-it-works/security/levels/',
    },
    {
      from: '/pages/lunadefend/overview/security/levels/',
      to: '/pages/lunadefend/how-it-works/security/levels/',
    },
    {
      from: '/pages/overview/security/mitre-cwe-top-25-weaknesses/',
      to: '/pages/how-it-works/security/mitre-cwe-top-25-weaknesses/',
    },
    {
      from: '/pages/lunadefend/overview/security/mitre-cwe-top-25-weaknesses/',
      to: '/pages/lunadefend/how-it-works/security/mitre-cwe-top-25-weaknesses/',
    },
    {
      from: '/pages/overview/security/owasp-top-10/',
      to: '/pages/how-it-works/security/owasp-top-10/',
    },
    {
      from: '/pages/lunadefend/overview/security/owasp-top-10/',
      to: '/pages/lunadefend/how-it-works/security/owasp-top-10/',
    },
    {
      from: '/pages/overview/security/vulns-and-mitigations/',
      to: '/pages/how-it-works/security/vulns-and-mitigations/',
    },
    {
      from: '/pages/lunadefend/overview/security/vulns-and-mitigations/',
      to: '/pages/lunadefend/how-it-works/security/vulns-and-mitigations/',
    },
    {
      from: '/pages/getting-started/dedicated-tokenizer/frontend-config/',
      to: '/pages/getting-started/dedicated-tokenizer/frontend-setup/',
    },
    {
      from: '/pages/lunadefend/getting-started/dedicated-tokenizer/frontend-config/',
      to: '/pages/lunadefend/getting-started/dedicated-tokenizer/frontend-setup/',
    },
    {
      from: '/pages/overview/token-lifecycle/',
      to: '/pages/how-it-works/tokens/',
    },
    {
      from: '/pages/lunadefend/overview/token-lifecycle/',
      to: '/pages/lunadefend/how-it-works/tokens/',
    },
    {
      from: '/pages/overview/authentication/',
      to: '/pages/how-it-works/sessions/',
    },
    {
      from: '/pages/lunadefend/overview/authentication/',
      to: '/pages/lunadefend/how-it-works/sessions/',
    },
  ]
};

module.exports = redirectConfig;
