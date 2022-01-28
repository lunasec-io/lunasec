#!/usr/bin/env node
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

import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';

import { LunatraceBackendStack } from '../lib/lunatrace-backend-stack';

const domainName = process.env.STACK_DOMAIN_NAME;

if (!domainName) {
  throw new Error('STACK_DOMAIN_NAME is not set');
}

const domainZoneId = process.env.STACK_DOMAIN_ZONE_ID;

if (!domainZoneId) {
  throw new Error('STACK_DOMAIN_ZONE_ID is not set');
}

const app = new cdk.App();
new LunatraceBackendStack(app, 'LunatraceBackendStack', {
  domainName,
  domainZoneId,
});
